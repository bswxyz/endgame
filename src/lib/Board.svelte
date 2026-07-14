<script>
  /**
   * A chessboard. Pieces are keyed SVG groups positioned with a CSS
   * transform — change a piece's square and it *glides* there, because
   * the movement is just a `transition: transform` in app.css.
   *
   * pieces:   [{ id, color: 'w'|'b', type: 'p n b r q k', sq: 'e4', dead? }]
   * hl:       squares to tint (last move from/to)
   * teleport: true → transitions off (used for the initial rewind)
   * entrance: true → pieces fade in, staggered (hero board)
   */
  let { pieces = [], hl = [], label = 'Chessboard', teleport = false, entrance = false } = $props();

  const S = 44;   // square size
  const M = 14;   // coordinate gutter
  const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const sqX = (sq) => M + FILES.indexOf(sq[0]) * S;
  const sqY = (sq) => M + (8 - +sq[1]) * S;

  const squares = Array.from({ length: 64 }, (_, i) => {
    const c = i % 8;
    const r = Math.floor(i / 8);
    return { x: M + c * S, y: M + r * S, dark: (c + r) % 2 === 1 };
  });
</script>

<svg class="board" class:teleport class:entrance viewBox="0 0 380 380" role="img" aria-label={label}>
  <rect class="b-frame" x="1.5" y="1.5" width="377" height="377" rx="10" />
  <g aria-hidden="true">
    {#each squares as s}
      <rect class="sq {s.dark ? 'sq-d' : 'sq-l'}" x={s.x} y={s.y} width={S} height={S} />
    {/each}
    {#each FILES as f, i}
      <text class="b-coord" x={M + i * S + S / 2} y="374" text-anchor="middle">{f}</text>
    {/each}
    {#each RANKS as r, i}
      <text class="b-coord" x="7" y={M + (7 - i) * S + S / 2 + 3} text-anchor="middle">{r}</text>
    {/each}
    {#each hl as h (h)}
      <rect class="sq-hl" x={sqX(h)} y={sqY(h)} width={S} height={S} rx="3" />
    {/each}
    {#each pieces as p, i (p.id)}
      <g
        class="pieceg"
        class:dead={p.dead}
        style={`transform: translate(${sqX(p.sq)}px, ${sqY(p.sq)}px); --d: ${0.25 + i * 0.14}s`}
      >
        <use href="#pc-{p.type}" width="44" height="44" class="pcu {p.color === 'w' ? 'pcu-w' : 'pcu-b'}" />
      </g>
    {/each}
  </g>
</svg>
