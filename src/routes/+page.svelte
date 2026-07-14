<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { revealAll, counter } from '$lib/motion.js';
  import PieceDefs from '$lib/PieceDefs.svelte';
  import Board from '$lib/Board.svelte';
  import OperaStudy from '$lib/OperaStudy.svelte';

  /* Réti, 1921 — White to play and draw. Four pieces, one miracle. */
  const retiStudy = [
    { id: 'wK', color: 'w', type: 'k', sq: 'h8' },
    { id: 'wPc', color: 'w', type: 'p', sq: 'c6' },
    { id: 'bK', color: 'b', type: 'k', sq: 'a6' },
    { id: 'bPh', color: 'b', type: 'p', sq: 'h5' }
  ];

  let loaded = $state(false);
  let dark = $state(false);
  let authDone = $state(false);

  function syncTheme() {
    dark = document.documentElement.dataset.theme === 'dark';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#1b1712' : '#efe9dc');
  }
  function toggleTheme() {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('endgame-theme', root.dataset.theme); } catch (e) {}
    syncTheme();
  }

  function onAuth(e) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    authDone = true;
  }

  onMount(() => {
    syncTheme();
    requestAnimationFrame(() => (loaded = true));
  });

  const features = [
    {
      key: 'tactics',
      title: 'The tactics ladder',
      body: 'Three thousand positions sorted not by rating but by the mistake you actually make. Miss a deflection twice and the ladder quietly serves you a third. It is very patient. It has to be.',
      spec: 'pins · forks · deflections · 12 themes'
    },
    {
      key: 'openings',
      title: 'Repertoire drills',
      body: 'Your lines, spaced-repetition style — drilled until your hands know them, then drilled against the sidelines your opponents actually play, which are never the ones in the book.',
      spec: 'spaced repetition · 40+ systems'
    },
    {
      key: 'endgames',
      title: 'The endgame lab',
      body: 'Réti, Lucena, Philidor, the wrong-coloured bishop. Ninety-six positions every game is secretly heading toward. Learn them once; collect half-points forever.',
      spec: 'tablebase-checked · 96 studies'
    },
    {
      key: 'postmortem',
      title: 'The post-mortem',
      body: 'Import a game and get the honest version of what happened. Blunders annotated without mercy, improvements explained without jargon, and one theme to fix before Thursday.',
      spec: 'engine lines · human words'
    }
  ];

  const tiers = [
    {
      name: 'Pawn',
      price: '£0',
      per: 'forever',
      line: 'Every grandmaster was one.',
      star: false,
      cta: 'Start walking',
      feats: ['10 puzzles a day', 'club games, unrated & rated', 'the weekly study, replayable', "the members' book (read-only)"]
    },
    {
      name: 'Knight',
      price: '£6',
      per: '/ month',
      line: 'Arrives at the fight by an odd route.',
      star: true,
      cta: 'Take the knight',
      feats: ['the full tactics ladder', 'repertoire drills, all systems', 'post-mortems — 3 a month', 'club tournaments & leagues', 'everything in Pawn']
    },
    {
      name: 'Queen',
      price: '£12',
      per: '/ month',
      line: 'Goes anywhere. So will you.',
      star: false,
      cta: 'Claim the file',
      feats: ['unlimited post-mortems', 'the endgame lab, unlocked', 'a monthly simul with a titled guest', 'coach office hours, twice a month', 'everything in Knight']
    }
  ];

  const quotes = [
    {
      text: 'I joined for the tactics ladder. I stayed because somebody finally explained why the rook belongs behind the passed pawn — mine or theirs.',
      who: 'Priya N.',
      meta: 'member since 2022 · 1740'
    },
    {
      text: 'My rating went down for six weeks and then up for good. The post-mortems are rude the way good teachers are rude.',
      who: 'Marcus T.',
      meta: 'member since 2024 · 1512'
    },
    {
      text: 'The weekly study is the closest thing I know to a seat in the second row at the opera. I have replayed the queen sacrifice more often than I have called my brother.',
      who: 'Elif K.',
      meta: 'member since 2021 · 1988'
    }
  ];
</script>

<svelte:head>
  <title>Endgame — online chess club, study &amp; trainer</title>
  <meta
    name="description"
    content="Endgame is an online chess club and trainer for people who would rather understand ten moves than memorise a thousand. Replay the classics move by move, drill the positions that decide games, and earn your endgames."
  />
  <meta property="og:title" content="Endgame — online chess club, study &amp; trainer" />
  <meta property="og:description" content="Openings are borrowed. Endgames are earned. Replay the Opera Game move by move, then join the club." />
  <meta property="og:type" content="website" />
</svelte:head>

<PieceDefs />
<div class="film" aria-hidden="true"></div>
<a class="skip" href="#main">Skip to content</a>

<header class="nav">
  <a class="brand" href="{base}/" aria-label="Endgame home">
    <svg class="brand-mark" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <use href="#pc-n" width="44" height="44" />
    </svg>
    <span class="brand-word">Endgame</span>
  </a>
  <nav class="nav-links" aria-label="Primary">
    <a href="#study">The study hall</a>
    <a href="#trainer">The trainer</a>
    <a href="#tiers">Membership</a>
    <a href="{base}/guide/">Guide</a>
    <a class="nav-cta" href="#join">Sign in</a>
    <button
      class="theme-btn"
      type="button"
      onclick={toggleTheme}
      aria-pressed={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title="Toggle light / dark"
    >
      <svg class="ico-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><g stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></g></svg>
      <svg class="ico-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></svg>
    </button>
  </nav>
</header>

<main id="main" use:revealAll>
  <!-- ============ hero ============ -->
  <section class="hero" class:loaded aria-labelledby="hero-title">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow mono">[ Online chess club · est. 2019 · study &amp; trainer ]</p>
        <h1 id="hero-title" class="hero-title">
          <span class="line"><span>Openings are</span></span>
          <span class="line"><span>borrowed. Endgames</span></span>
          <span class="line"><span>are <em>earned</em>.</span></span>
        </h1>
        <p class="hero-sub">Endgame is a club for people who would rather understand ten moves than
          memorise a thousand. Replay the classics until they are yours, drill the positions that
          decide games, and lose — briefly, on purpose, to better players who explain why.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#tiers">Join the club</a>
          <a class="btn btn-ghost" href="#study">Replay the Opera Game →</a>
        </div>
        <dl class="hero-facts">
          <div><dt class="mono">Members</dt><dd><span use:counter data-to="12417">12,417</span></dd></div>
          <div><dt class="mono">Puzzles set</dt><dd><span use:counter data-to="3200">3,200</span></dd></div>
          <div><dt class="mono">Studies annotated</dt><dd><span use:counter data-to="96">96</span></dd></div>
        </dl>
      </div>

      <figure class="hero-fig" aria-labelledby="hero-cap">
        <Board
          pieces={retiStudy}
          entrance
          label="Chessboard showing Réti's 1921 study: white king on h8, white pawn on c6, black king on a6, black pawn on h5. White to play and draw."
        />
        <figcaption id="hero-cap" class="hero-cap mono">
          <span>STUDY No. 96 — Réti, 1921</span>
          <span>White to play and draw. Yes, really.</span>
        </figcaption>
      </figure>
    </div>
    <p class="hero-scroll mono" aria-hidden="true">scroll — the curtain is going up</p>
  </section>

  <!-- ============ the study hall — signature scroll replay ============ -->
  <OperaStudy />

  <!-- ============ the trainer ============ -->
  <section id="trainer" class="trainer" aria-labelledby="trainer-title">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker mono reveal">[ The trainer ]</p>
        <h2 id="trainer-title" class="reveal">Drill the game you actually lose.</h2>
        <p class="lede reveal">Not another puzzle firehose. The trainer watches how your games go
          wrong and builds the syllabus backwards from there — the openings you flub, the
          middlegames you drift through, the endgames you almost hold.</p>
      </div>
      <div class="feat-grid">
        {#each features as f (f.key)}
          <article class="feat reveal">
            <span class="feat-ico" aria-hidden="true">
              {#if f.key === 'tactics'}
                <svg viewBox="0 0 44 44"><use href="#pc-n" width="44" height="44" /></svg>
              {:else if f.key === 'openings'}
                <svg viewBox="0 0 32 32"><path d="M16 8c-3-2.2-7-2.4-10-1.4v17c3-1 7-.8 10 1.4 3-2.2 7-2.4 10-1.4v-17c-3-1-7-.8-10 1.4z M16 8v17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></svg>
              {:else if f.key === 'endgames'}
                <svg viewBox="0 0 44 44"><use href="#pc-k" width="44" height="44" /></svg>
              {:else}
                <svg viewBox="0 0 32 32"><circle cx="14" cy="14" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M19.5 19.5 L26 26" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M10.5 14h7M14 10.5v7" stroke="currentColor" stroke-width="1.4" /></svg>
              {/if}
            </span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
            <span class="feat-spec mono">{f.spec}</span>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- ============ membership tiers ============ -->
  <section id="tiers" class="tiers" aria-labelledby="tiers-title">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker mono reveal">[ Membership ]</p>
        <h2 id="tiers-title" class="reveal">Three ways to take a seat.</h2>
        <p class="lede reveal">All of them come with the club: rated games, league nights, and the
          weekly study. The difference is how much of the trainer you want pointed at you.</p>
      </div>
      <div class="tier-grid">
        {#each tiers as t (t.name)}
          <article class="tier reveal" class:tier--star={t.star}>
            {#if t.star}<span class="tier-tag mono">Most joined</span>{/if}
            <h3>{t.name}</h3>
            <p class="tier-price"><strong>{t.price}</strong><span class="mono">{t.per}</span></p>
            <p class="tier-line">{t.line}</p>
            <ul class="mono">
              {#each t.feats as feat}<li>{feat}</li>{/each}
            </ul>
            <a class="btn btn-block {t.star ? 'btn-primary' : 'btn-ghost'}" href="#join">{t.cta}</a>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- ============ the members' book ============ -->
  <section id="book" class="book" aria-labelledby="book-title">
    <div class="wrap">
      <div class="sec-head">
        <p class="kicker kicker--brass mono reveal">[ The members' book ]</p>
        <h2 id="book-title" class="reveal">Signed between rounds.</h2>
      </div>
      <div class="quote-grid">
        {#each quotes as q (q.who)}
          <figure class="quote reveal">
            <blockquote>{q.text}</blockquote>
            <figcaption class="mono"><b>{q.who}</b> · {q.meta}</figcaption>
          </figure>
        {/each}
      </div>
    </div>
  </section>

  <!-- ============ the club door — demo sign-in ============ -->
  <section id="join" class="join" aria-labelledby="join-title">
    <div class="wrap join-grid">
      <div class="join-info">
        <p class="kicker mono reveal">[ The club door ]</p>
        <h2 id="join-title" class="reveal">The clocks are already running.</h2>
        <p class="join-sub reveal">Sign in and pick up where you adjourned: your ladder rung, your
          repertoire, your unfinished post-mortem. New members start as Pawns — promotion is
          traditional.</p>
        <ul class="join-list mono">
          <li>League nights Tuesday &amp; Thursday, 19:00 GMT</li>
          <li>The weekly study lands every Sunday</li>
          <li>Adjourned games keep for thirty days</li>
        </ul>
      </div>
      <div class="join-card reveal" aria-live="polite">
        {#if authDone}
          <div class="join-done">
            <strong>Your seat is kept.</strong>
            <span class="mono">demo only — no credentials left this page. white to move.</span>
          </div>
        {:else}
          <form onsubmit={onAuth} novalidate={false}>
            <div class="field">
              <label for="jEmail">Email</label>
              <input id="jEmail" name="email" type="email" required autocomplete="email" placeholder="you@example.com" />
            </div>
            <div class="field">
              <label for="jPass">Password</label>
              <input id="jPass" name="password" type="password" required minlength="8" autocomplete="current-password" placeholder="min. 8 characters — like a good combination" />
            </div>
            <button class="btn btn-primary btn-block" type="submit">Take your seat</button>
            <p class="join-fine mono">Demo sign-in — nothing is sent, nobody is rated. See the README.</p>
          </form>
        {/if}
      </div>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="wrap foot-top">
    <span class="foot-brand">Endgame</span>
    <nav class="foot-links" aria-label="Footer">
      <a href="#study">The study hall</a><a href="#trainer">The trainer</a><a href="#tiers">Membership</a><a href="#book">The book</a><a href="{base}/guide/">Guide</a>
    </nav>
  </div>
  <div class="wrap foot-bottom mono">
    <span>© 2026 Endgame — a design-showcase concept, not a real club. Members, ratings and league nights are fiction. The Opera Game is not.</span>
    <span>Designed &amp; built by Parable · <a href="{base}/guide/">How this was built →</a></span>
  </div>
</footer>
