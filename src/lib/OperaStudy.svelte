<script>
  /**
   * THE SIGNATURE FLOURISH — the Opera Game, scrubbed by scroll.
   *
   * The section is a tall track with a sticky stage inside. Scroll
   * progress through the track picks a ply (0–33); the board pieces
   * CSS-transition to the snapshot for that ply while the notation
   * ticker scrolls in lockstep and captions surface on the key moves.
   *
   * Scroll is the single source of truth: the play button and the
   * step buttons don't mutate the ply directly — they scroll the page
   * to the offset that *means* that ply, so board, ticker, scrollbar
   * and thumb never disagree.
   *
   * Server-rendered state is the FINAL position with the full score,
   * so no-JS readers get the whole game. Reduced motion keeps exactly
   * that: final position, full notation, no per-move animation — the
   * controls still work, they just jump.
   */
  import { onMount } from 'svelte';
  import Board from './Board.svelte';
  import { START, PLIES, INTRO, buildStates, moveLabel } from './game.js';
  import { prefersReduced } from './motion.js';

  const { states, hls } = buildStates();
  const N = PLIES.length;

  let ply = $state(N);            // SSR: final position
  let teleport = $state(false);   // transitions off during the initial rewind
  let playing = $state(false);
  let reduced = false;
  let track;
  let tickerEl;
  let timer = 0;

  const pieces = $derived(START.map((p) => ({ ...p, ...states[ply][p.id] })));
  const hl = $derived(hls[ply]);
  const caption = $derived.by(() => {
    for (let i = ply; i >= 1; i--) if (PLIES[i - 1].note) return PLIES[i - 1].note;
    return INTRO;
  });
  const readout = $derived(
    ply === 0 ? 'move 0 · the pieces are set' : `${moveLabel(ply - 1)} ${PLIES[ply - 1].san} · ${ply % 2 === 1 ? 'white' : 'black'}`
  );

  // keep the active move centred in the score column
  $effect(() => {
    const k = ply;
    if (!tickerEl) return;
    const el = tickerEl.children[Math.max(0, k - 1)];
    if (el) {
      tickerEl.scrollTo({
        top: el.offsetTop - tickerEl.clientHeight / 2 + el.offsetHeight / 2,
        behavior: 'instant'
      });
    }
  });

  function stopPlay() {
    playing = false;
    if (timer) { clearInterval(timer); timer = 0; }
  }

  /**
   * Scroll the page to the offset that corresponds to ply k.
   * Instant on purpose: inside the sticky stage the viewport doesn't
   * visually move, so the only animation that matters is the pieces'
   * own CSS glide — and instant scrolls can't be suppressed the way
   * smooth ones sometimes are.
   */
  function scrollToPly(k) {
    k = Math.max(0, Math.min(N, k));
    if (reduced || !track) { ply = k; return; }
    const top = window.scrollY + track.getBoundingClientRect().top;
    const total = track.offsetHeight - window.innerHeight;
    if (total <= 0) { ply = k; return; }
    window.scrollTo({ top: top + (k / N) * total + 1, behavior: 'instant' });
  }

  function step(d) {
    stopPlay();
    scrollToPly(ply + d);
  }

  function togglePlay() {
    if (playing) { stopPlay(); return; }
    playing = true;
    if (ply >= N) {
      // restart from the top — hard jump, no 33-piece glide
      teleport = true;
      scrollToPly(0);
      ply = 0;
      requestAnimationFrame(() => requestAnimationFrame(() => (teleport = false)));
    }
    timer = setInterval(() => {
      if (ply >= N) stopPlay();
      else scrollToPly(ply + 1);
    }, 1500);
  }

  onMount(() => {
    reduced = prefersReduced();
    if (reduced) return;         // final position + full score stay put

    // rewind to move 0 without animating 32 pieces across the board
    teleport = true;
    ply = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => (teleport = false)));

    let raf = 0;
    const drive = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const k = Math.round(p * N);
      if (k !== ply) ply = k;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(drive); };
    const onInput = () => stopPlay();   // the user grabbed the wheel — cinema over

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    addEventListener('wheel', onInput, { passive: true });
    addEventListener('touchstart', onInput, { passive: true });
    drive();

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      removeEventListener('wheel', onInput);
      removeEventListener('touchstart', onInput);
      stopPlay();
      if (raf) cancelAnimationFrame(raf);
    };
  });
</script>

<section id="study" class="study" aria-labelledby="study-title">
  <span class="wm" aria-hidden="true">1858</span>
  <div class="wrap sec-head">
    <p class="kicker mono reveal">[ The study hall ]</p>
    <h2 id="study-title" class="reveal">Seventeen moves at the opera.</h2>
    <p class="lede reveal">Every week the club takes one classic apart, move by move. This is the
      first one every member replays: Morphy against a Duke and a Count, Paris, 1858. Scroll, and
      the board plays it back — the pin, both sacrifices, and the quietest queen move ever to
      shout. <span class="mono study-hint">(or press play and keep your hands on the clock)</span></p>
  </div>

  <div class="study-track" bind:this={track} style="--plies: {N}">
    <div class="study-stage">
      <div class="wrap study-grid">
        <figure class="study-fig">
          <Board
            {pieces}
            {hl}
            {teleport}
            label="Replay board for the Opera Game. The position updates as you scroll or use the replay controls; the full notation is listed alongside."
          />
          <figcaption class="study-cap mono" aria-hidden="true">{readout}</figcaption>
        </figure>

        <div class="study-side">
          <p class="study-note">{caption}</p>

          <ol class="ticker mono" bind:this={tickerEl}
            aria-label="Full notation — Morphy versus Duke Karl of Brunswick and Count Isouard, Paris 1858">
            {#each PLIES as m, i}
              <li class:on={i === ply - 1} class:past={i < ply - 1}>
                <span class="tick-n">{moveLabel(i)}</span><span class="tick-san">{m.san}</span>
              </li>
            {/each}
          </ol>

          <div class="study-controls">
            <button type="button" class="ctl" onclick={() => step(-1)} disabled={ply <= 0} aria-label="Previous move">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 3 L5.5 8 L10.5 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button type="button" class="ctl ctl-play" onclick={togglePlay} aria-pressed={playing} aria-label={playing ? 'Pause the replay' : 'Play the replay'}>
              {#if playing}
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 3.5v9M10.5 3.5v9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
              {:else}
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2 L12.4 8 L5 12.8 Z" fill="currentColor"/></svg>
              {/if}
            </button>
            <button type="button" class="ctl" onclick={() => step(1)} disabled={ply >= N} aria-label="Next move">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 3 L10.5 8 L5.5 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <span class="ctl-read mono">{ply} / {N} half-moves</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
