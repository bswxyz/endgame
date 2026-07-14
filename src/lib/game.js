/* ============================================================
   ENDGAME — the Opera Game as data.
   Morphy vs Duke Karl of Brunswick & Count Isouard,
   Paris Opera, 1858. Seventeen moves, two sacrifices, one mate.

   Every ply is a diff: which piece moves where (`ops`), what is
   captured (`x`), and what the caption should say (`note`).
   buildStates() folds the whole game into 34 position snapshots
   so scroll-scrubbing is trivially reversible — jump to any ply
   and the pieces CSS-transition to where they belong.
   ============================================================ */

/** The 32 pieces, by stable id. w/b + type + home square. */
export const START = [
  { id: 'wRa', color: 'w', type: 'r', sq: 'a1' },
  { id: 'wNb', color: 'w', type: 'n', sq: 'b1' },
  { id: 'wBc', color: 'w', type: 'b', sq: 'c1' },
  { id: 'wQ',  color: 'w', type: 'q', sq: 'd1' },
  { id: 'wK',  color: 'w', type: 'k', sq: 'e1' },
  { id: 'wBf', color: 'w', type: 'b', sq: 'f1' },
  { id: 'wNg', color: 'w', type: 'n', sq: 'g1' },
  { id: 'wRh', color: 'w', type: 'r', sq: 'h1' },
  { id: 'wPa', color: 'w', type: 'p', sq: 'a2' },
  { id: 'wPb', color: 'w', type: 'p', sq: 'b2' },
  { id: 'wPc', color: 'w', type: 'p', sq: 'c2' },
  { id: 'wPd', color: 'w', type: 'p', sq: 'd2' },
  { id: 'wPe', color: 'w', type: 'p', sq: 'e2' },
  { id: 'wPf', color: 'w', type: 'p', sq: 'f2' },
  { id: 'wPg', color: 'w', type: 'p', sq: 'g2' },
  { id: 'wPh', color: 'w', type: 'p', sq: 'h2' },
  { id: 'bRa', color: 'b', type: 'r', sq: 'a8' },
  { id: 'bNb', color: 'b', type: 'n', sq: 'b8' },
  { id: 'bBc', color: 'b', type: 'b', sq: 'c8' },
  { id: 'bQ',  color: 'b', type: 'q', sq: 'd8' },
  { id: 'bK',  color: 'b', type: 'k', sq: 'e8' },
  { id: 'bBf', color: 'b', type: 'b', sq: 'f8' },
  { id: 'bNg', color: 'b', type: 'n', sq: 'g8' },
  { id: 'bRh', color: 'b', type: 'r', sq: 'h8' },
  { id: 'bPa', color: 'b', type: 'p', sq: 'a7' },
  { id: 'bPb', color: 'b', type: 'p', sq: 'b7' },
  { id: 'bPc', color: 'b', type: 'p', sq: 'c7' },
  { id: 'bPd', color: 'b', type: 'p', sq: 'd7' },
  { id: 'bPe', color: 'b', type: 'p', sq: 'e7' },
  { id: 'bPf', color: 'b', type: 'p', sq: 'f7' },
  { id: 'bPg', color: 'b', type: 'p', sq: 'g7' },
  { id: 'bPh', color: 'b', type: 'p', sq: 'h7' }
];

export const INTRO =
  'Paris, 1858. Norma is playing. Paul Morphy sits with his back to the stage, ' +
  'facing a Duke and a Count who have agreed to consult against him. He would rather watch the opera.';

/** Every half-move of the game. */
export const PLIES = [
  { san: 'e4',     ops: [['wPe', 'e4']] },
  { san: 'e5',     ops: [['bPe', 'e5']] },
  { san: 'Nf3',    ops: [['wNg', 'f3']] },
  { san: 'd6',     ops: [['bPd', 'd6']],
    note: 'The Philidor Defence — solid, passive, and about to be punished for the second quality.' },
  { san: 'd4',     ops: [['wPd', 'd4']] },
  { san: 'Bg4?',   ops: [['bBc', 'g4']],
    note: 'The bishop pins the knight. A natural move — and the losing one, though nobody in the box knows it yet.' },
  { san: 'dxe5',   ops: [['wPd', 'e5']], x: 'bPe' },
  { san: 'Bxf3',   ops: [['bBc', 'f3']], x: 'wNg' },
  { san: 'Qxf3',   ops: [['wQ', 'f3']], x: 'bBc' },
  { san: 'dxe5',   ops: [['bPd', 'e5']], x: 'wPd' },
  { san: 'Bc4',    ops: [['wBf', 'c4']],
    note: 'The bishop finds f7. Morphy is not attacking yet — he is merely pointing everything at the same address.' },
  { san: 'Nf6',    ops: [['bNg', 'f6']] },
  { san: 'Qb3',    ops: [['wQ', 'b3']],
    note: 'One queen move, two targets: b7 and f7. Development, with a bill attached.' },
  { san: 'Qe7',    ops: [['bQ', 'e7']] },
  { san: 'Nc3',    ops: [['wNb', 'c3']],
    note: 'Morphy declines to win a pawn. Taking on b7 costs three moves of attention; he would rather have the moves.' },
  { san: 'c6',     ops: [['bPc', 'c6']] },
  { san: 'Bg5',    ops: [['wBc', 'g5']],
    note: 'Every white piece is out. Black’s rooks are still in their dressing rooms.' },
  { san: 'b5?',    ops: [['bPb', 'b5']] },
  { san: 'Nxb5!',  ops: [['wNb', 'b5']], x: 'bPb',
    note: 'The first sacrifice. The knight goes; the queenside opens. Morphy pays in wood and collects in tempo.' },
  { san: 'cxb5',   ops: [['bPc', 'b5']], x: 'wNb' },
  { san: 'Bxb5+',  ops: [['wBf', 'b5']], x: 'bPc' },
  { san: 'Nbd7',   ops: [['bNb', 'd7']] },
  { san: 'O-O-O',  ops: [['wK', 'c1'], ['wRa', 'd1']],
    note: 'Castling long: king to safety, rook to the pinned knight. One move, two jobs — the whole game in miniature.' },
  { san: 'Rd8',    ops: [['bRa', 'd8']] },
  { san: 'Rxd7!',  ops: [['wRa', 'd7']], x: 'bNb',
    note: 'The exchange sacrifice. Morphy trades a rook for the only currency he respects: time on the d-file.' },
  { san: 'Rxd7',   ops: [['bRa', 'd7']], x: 'wRa' },
  { san: 'Rd1',    ops: [['wRh', 'd1']],
    note: 'The other rook arrives. Black is a rook and a knight up, and completely lost.' },
  { san: 'Qe6',    ops: [['bQ', 'e6']] },
  { san: 'Bxd7+',  ops: [['wBf', 'd7']], x: 'bRa' },
  { san: 'Nxd7',   ops: [['bNg', 'd7']], x: 'wBf' },
  { san: 'Qb8+!!', ops: [['wQ', 'b8']],
    note: 'The queen sacrifice. Black must take. The quietest loud move in chess — the house is listening to Bellini and missing the better opera.' },
  { san: 'Nxb8',   ops: [['bNg', 'b8']], x: 'wQ' },
  { san: 'Rd8#',   ops: [['wRh', 'd8']],
    note: 'Mate — a rook and a bishop, the only two pieces Morphy had left, and the only two he needed. Development is not a style. It is the point.' }
];

const snapshot = (pos) =>
  Object.fromEntries(Object.entries(pos).map(([k, v]) => [k, { ...v }]));

/**
 * Fold the game into position snapshots + last-move highlights.
 * states[k] = position after k half-moves; hls[k] = squares to tint.
 * Captured pieces keep the square they died on (`dead: true`) so
 * they can fade in place — and fade back when you scroll uphill.
 */
export function buildStates() {
  const pos = {};
  START.forEach((p) => (pos[p.id] = { sq: p.sq, dead: false }));
  const states = [snapshot(pos)];
  const hls = [[]];
  for (const ply of PLIES) {
    const hl = [];
    if (ply.x) pos[ply.x] = { sq: pos[ply.x].sq, dead: true };
    for (const [id, to] of ply.ops) {
      hl.push(pos[id].sq, to);
      pos[id] = { sq: to, dead: false };
    }
    states.push(snapshot(pos));
    hls.push(hl);
  }
  return { states, hls };
}

/** "1." for white plies, "1…" for black plies. i is a 0-based ply index. */
export const moveLabel = (i) => `${Math.floor(i / 2) + 1}${i % 2 === 0 ? '.' : '…'}`;
