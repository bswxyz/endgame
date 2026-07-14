import{a as f,f as S}from"../chunks/CNSdF9RK.js";import{h as C,s as b}from"../chunks/NchSdl53.js";import{o as G}from"../chunks/CC-BhRLe.js";import{f as E,u as P,g as y,i as v,j as A,k as H,l as x,n as B,o as j,q as M,t as c,v as N,w as O,x as V,y as z,z as l,$ as R,A as p}from"../chunks/DvvkgNeE.js";import{b as w}from"../chunks/BnnEhUVQ.js";function $(n=!1){const t=E,e=t.l.u;if(!e)return;let r=()=>B(t.s);if(n){let o=0,a={};const u=j(()=>{let i=!1;const d=t.s;for(const s in d)d[s]!==a[s]&&(a[s]=d[s],i=!0);return i&&o++,o});r=()=>x(u)}e.b.length&&P(()=>{k(t,r),v(e.b)}),y(()=>{const o=A(()=>e.m.map(H));return()=>{for(const a of o)typeof a=="function"&&a()}}),e.a.length&&y(()=>{k(t,r),v(e.a)})}function k(n,t){if(n.l.s)for(const e of n.l.s)x(e);t()}var J=S('<meta name="description" content="Build notes for Endgame: the scroll-scrubbed Opera Game replay, position snapshots and CSS-transitioned SVG pieces, an honest reduced-motion story, and shipping SvelteKit adapter-static to GitHub Pages."/>'),K=S(`<div class="film" aria-hidden="true"></div> <main class="doc"><a class="doc-back">← Back to Endgame</a> <p class="eyebrow mono">[ Parable build guide ]</p> <h1>How Endgame was built</h1> <p class="lede">An online chess club whose showpiece is a <strong>famous game scrubbed by
    scroll</strong> — the Opera Game of 1858, replayed move by move as the page moves, with the
    notation ticking alongside and captions surfacing on the sacrifices. No chess engine, no
    animation library: precomputed snapshots and one CSS transition.</p> <div class="tag-row"><span>SvelteKit + adapter-static</span><span>SVG board, zero images</span><span>Cormorant / Public Sans / JetBrains Mono</span><span>light + dark</span><span>reduced-motion honest</span></div> <h2>The idea</h2> <p>Chess clubs sell a feeling older than the internet: sitting beside someone stronger while they
    replay a game and tell you where it turned. A static diagram can't do that, and a video does it <em>to</em> you rather than <em>with</em> you. Scroll is the right verb — you set the tempo, you
    back up when the queen sacrifice doesn't make sense, and the page never moves on without you.
    So the club's whole pitch ("study the classics until they're yours") is also the page's
    signature interaction.</p> <h2>The stack</h2> <p>SvelteKit with <code>adapter-static</code>, fully prerendered — no server, no fallback page,
    output straight into <code>docs/</code> for GitHub Pages. Svelte earns its keep here: the board
    position is a single <code>$derived</code> value, so scrubbing, stepping and autoplay are all
    the same one-line state change. Type is Cormorant (a bookish display serif for a club that
    reveres its classics), Public Sans for body copy, and JetBrains Mono for the language chess
    already writes in monospace: notation, ratings, clock times.</p> <h2>Signature technique — the scroll-scrubbed replay</h2> <p>The trick is to make the game <strong>data, not procedure</strong>. Each half-move is a tiny
    diff — which piece moves where, what gets captured, what the caption should say — and the whole
    game is folded once, up front, into 34 position snapshots:</p> <pre><code></code></pre> <p>Captured pieces keep the square they died on with a <code>dead</code> flag, so they fade in
    place — and fade <em>back</em> when you scroll uphill. Snapshots make the replay perfectly
    reversible: any scroll position maps to a ply, and jumping between plies is just handing the
    board a different snapshot.</p> <pre><code></code></pre> <p>Because each piece is a keyed SVG group whose position is a CSS transform, "animation" is
    nothing more than the browser transitioning that transform — the knight glides to b5, the queen
    slides into b8, and fast scrubbing settles gracefully instead of stuttering. The play button
    and step buttons never touch the ply directly; they scroll the page to the offset that <em>means</em> that ply, so the scrollbar, the board and the notation ticker can never
    disagree.</p> <h2>Details that matter</h2> <ul><li><strong>No JS, whole game.</strong> The server-rendered state is the final position with
      the full score printed — kill JavaScript and you still get mate and all seventeen moves.</li> <li><strong>Reduced motion is the same answer.</strong> Under <code>prefers-reduced-motion</code> the scroll driver never attaches, the track collapses to
      normal height, transitions are off, and the board is one static frame: the final position,
      full notation beside it. The controls still work — they just jump.</li> <li><strong>The teleport class.</strong> On mount the board rewinds from the prerendered final
      position to move zero; a one-frame <code>transitions: none</code> class stops 32 pieces from
      streaking across the board on page load.</li> <li><strong>One set of piece paths.</strong> The six piece types are drawn once as SVG symbols;
      colour arrives through CSS custom properties, which inherit through <code>&lt;use&gt;</code> shadow trees — so the same paths serve both sides and both
      themes.</li> <li><strong>Scroll math is cheap.</strong> One passive scroll listener, throttled by <code>requestAnimationFrame</code>, doing a rectangle read and a division. There is no
      per-frame loop anywhere on the page.</li> <li><strong>Autoplay yields to humans.</strong> A wheel or touch cancels the play timer
      immediately — the cinema stops the moment you reach for the board.</li></ul> <div class="callout"><p>The sign-in form is a demo — it validates and confirms in place but sends
    nothing anywhere. Wire it to your real auth (an identity provider, your own endpoint) before
    seating actual members.</p></div> <h2>Ship it on GitHub Pages</h2> <p>The whole site prerenders, so deployment is a folder. <code>adapter-static</code> writes into <code>docs/</code> and the base path handles the repo subdirectory:</p> <pre><code></code></pre> <pre><code></code></pre> <p>A <code>.nojekyll</code> file in <code>static/</code> keeps GitHub from re-processing the
    output. That's the entire pipeline: push, point Pages at <code>/docs</code>, done.</p> <a class="doc-back" style="margin-top: 2.6rem">← Back to Endgame</a></main>`,1);function U(n,t){M(t,!1),G(()=>{var h;const g=document.documentElement.dataset.theme==="dark";(h=document.querySelector('meta[name="theme-color"]'))==null||h.setAttribute("content",g?"#1b1712":"#efe9dc")}),$();var e=K();C("36n0qb",g=>{var h=J();z(()=>{R.title="How Endgame was built — Parable build guide"}),f(g,h)});var r=c(N(e),2),o=l(r),a=c(o,22),u=l(a);u.textContent=`// every ply is data: what moves where, what dies, what to say
{ san: 'Qb8+!!', ops: [['wQ', 'b8']],
  note: 'The queen sacrifice. Black must take…' },
{ san: 'Nxb8',   ops: [['bNg', 'b8']], x: 'wQ' },
{ san: 'Rd8#',   ops: [['wRh', 'd8']],
  note: 'Mate — a rook and a bishop, the only two pieces…' }

// …and the whole game folds into 34 snapshots, once, up front
export function buildStates() {
  const pos = {};
  START.forEach((p) => (pos[p.id] = { sq: p.sq, dead: false }));
  const states = [snapshot(pos)];
  for (const ply of PLIES) {
    if (ply.x) pos[ply.x] = { sq: pos[ply.x].sq, dead: true };
    for (const [id, to] of ply.ops) pos[id] = { sq: to, dead: false };
    states.push(snapshot(pos));
  }
  return states;
}`,p(a);var i=c(a,4),d=l(i);d.textContent=`// scroll is the only clock: progress through the tall
// track picks the ply; the pieces do the rest in CSS
const rect = track.getBoundingClientRect();
const total = track.offsetHeight - window.innerHeight;
const p = Math.min(1, Math.max(0, -rect.top / total));
const k = Math.round(p * N);
if (k !== ply) ply = k;

// a piece is just a keyed SVG group; moving it is a style change
<g class="pieceg" style="transform: translate({x}px, {y}px)">
  <use href="#pc-{type}" />
</g>

/* app.css — the actual animation */
.pieceg { transition: transform .55s var(--ease); }`,p(i);var s=c(i,14),_=l(s);_.textContent=`import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    // prerender straight into /docs for GitHub Pages
    adapter: adapter({ pages: 'docs', assets: 'docs', fallback: null }),
    // every link + asset gets the repo prefix in production
    paths: { base: process.env.NODE_ENV === 'production' ? '/endgame' : '' }
  }
};`,p(s);var m=c(s,2),T=l(m);T.textContent=`npm run build              # → docs/index.html + docs/guide/index.html
git add -A && git commit -m "Endgame — online chess club"
gh repo create bswxyz/endgame --public --source . --push
# GitHub → Settings → Pages → Branch: main · Folder: /docs
# live at https://bswxyz.github.io/endgame/`,p(m);var q=c(m,4);p(r),O(()=>{b(o,"href",`${w??""}/`),b(q,"href",`${w??""}/`)}),f(n,e),V()}export{U as component};
