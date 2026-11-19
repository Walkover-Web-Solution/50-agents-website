// A guide's cover (D255 round 3, guides v5): drawn from data, never per guide. One component for every guide: the
// guide's category sets the scene (a chat for AI agents, a flow for automations, a browser for browser agents, a table
// for apps, an inbox and a calendar for email, a fork for choosing tools), the guide's kind sets the crew member who
// stands in it (the same face as its kind badge) and the one small tinted element, and a seed from the slug varies the
// layout, the side, the second crew member and the details. The frame stays neutral (no kind tint on big surfaces).
// Server-rendered SVG, decorative (the title sits beside it), a few kB per cover.
import { FACES } from '../faces';
import { KINDS } from '../parts';
import type { GuidePage } from './types';

const W = 480, H = 300;
const INK = '#16171A', CARD = '#fff', EDGE = '#E2E0DA', BAR = '#E4E2DC', FRAME = '#F2F1ED';
const CREW = ['chaser', 'booker', 'ledger', 'pilot', 'sprout', 'rosa', 'sunny', 'keeper', 'scout', 'sorter'];

// A small seeded random (mulberry32 on a string hash), so a cover is the same on every render.
function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  const next = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  return { f: next, r: (lo: number, hi: number) => lo + next() * (hi - lo), i: (lo: number, hi: number) => Math.floor(lo + next() * (hi - lo + 1)), pick: <T,>(xs: T[]) => xs[Math.floor(next() * xs.length)] };
}
type R = ReturnType<typeof rng>;
const n = (x: number) => Math.round(x * 10) / 10;
const rect = (x: number, y: number, w: number, h: number, r: number, fill: string, stroke = '') =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="1.5"` : ''}/>`;
const card = (x: number, y: number, w: number, h: number, r = 16) =>
  `<rect x="${n(x)}" y="${n(y + 3)}" width="${n(w)}" height="${n(h)}" rx="${r}" fill="${INK}" opacity=".05"/>` + rect(x, y, w, h, r, CARD, EDGE);
const bar = (x: number, y: number, w: number, fill = BAR, h = 8) => rect(x, y, w, h, h / 2, fill);
const dot = (x: number, y: number, r: number, fill: string) => `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${fill}"/>`;
const tick = (x: number, y: number, s = 1) => `<path d="M${n(x - 4 * s)} ${n(y)}l${n(3 * s)} ${n(3 * s)}l${n(6 * s)} ${n(-6.5 * s)}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

/** A crew face placed in the cover: its height h in viewBox units, centred on (x, y), tilted by deg. */
function face(id: string, x: number, y: number, h: number, deg: number, cls: string) {
  const src = FACES[id] ?? FACES.keeper;
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(src);
  const w = vb ? (h * +vb[1]) / +vb[2] : h;
  const svg = src.replace(/^<svg class="face "/, `<svg class="face" x="${n(x - w / 2)}" y="${n(y - h / 2)}" width="${n(w)}" height="${n(h)}"`);
  return `<g class="${cls}"><g transform="rotate(${n(deg)} ${n(x)} ${n(y)})">${svg}</g></g>`;
}

type Scene = { art: string; main: [number, number, number]; second: [number, number, number] };

// AI agents: a conversation. The AI agent's reply (tinted) is being written, or waits for your approval, or a thread.
function chat(r: R, tint: string): Scene {
  const v = r.i(0, 2), x = 168, y = r.i(30, 44), w = 272, h = 232;
  let a = card(x, y, w, h, 20);
  const uw = r.i(96, 140), uy = y + 22;
  a += rect(x + w - 20 - uw, uy, uw, 34, 16, INK) + bar(x + w - 6 - uw, uy + 13, uw - 30, '#ffffff55');
  const ay = uy + 50, lines = r.i(2, 3), ah = 22 + lines * 16;
  a += rect(x + 20, ay, 200, ah, 16, tint);
  for (let i = 0; i < lines; i++) a += bar(x + 36, ay + 16 + i * 16, i === lines - 1 ? r.i(60, 110) : r.i(130, 164), '#16171A26');
  const ty = ay + ah + 14;
  if (v === 0) a += rect(x + 20, ty, 62, 30, 15, FRAME) + [0, 1, 2].map(i => dot(x + 38 + i * 13, ty + 15, 3, INK)).join('');
  else if (v === 1) a += rect(x + 20, ty, 92, 32, 11, INK) + bar(x + 36, ty + 12, 60, '#ffffff66') + rect(x + 120, ty, 80, 32, 11, CARD, EDGE) + bar(x + 136, ty + 12, 48);
  else { const w2 = r.i(80, 120); a += rect(x + w - 20 - w2, ty, w2, 30, 15, INK) + bar(x + w - 6 - w2, ty + 11, w2 - 30, '#ffffff55'); }
  return { art: a, main: [108, y + r.i(130, 160), 104], second: [x + w - 20, y + h - 4, 48] };
}

// Automations: three steps joined by a line; the step being done is tinted.
function flow(r: R, tint: string): Scene {
  const ys = [r.i(140, 180), r.i(70, 110), r.i(150, 190)], xs = [30, 186, 342], cw = 112, ch = 66;
  const lit = r.i(0, 2);
  let a = '';
  for (let i = 0; i < 2; i++) {
    const x1 = xs[i] + cw, y1 = ys[i] + ch / 2, x2 = xs[i + 1], y2 = ys[i + 1] + ch / 2, mx = (x1 + x2) / 2;
    a += `<path d="M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2 - 6} ${y2}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
    a += `<path d="M${x2 - 12} ${y2 - 5}l6 5l-6 5" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  xs.forEach((x, i) => {
    a += card(x, ys[i], cw, ch, 16);
    if (i === lit) a += rect(x, ys[i], cw, ch, 16, tint);
    a += rect(x + 14, ys[i] + 17, 32, 32, 10, i === lit ? '#ffffff' : FRAME);
    a += i === lit ? `<circle cx="${x + 30}" cy="${ys[i] + 33}" r="8" fill="${INK}"/>` + tick(x + 30, ys[i] + 33, 0.7) : '';
    a += bar(x + 56, ys[i] + 23, r.i(34, 44), i === lit ? '#16171A30' : BAR) + bar(x + 56, ys[i] + 37, r.i(20, 32), i === lit ? '#16171A1f' : BAR);
  });
  return { art: a, main: [xs[lit] + cw / 2, ys[lit] - 38, 72], second: [xs[(lit + 2) % 3] + cw - 8, ys[(lit + 2) % 3] + ch + 4, 46] };
}

// Browser agents: a web page with tiles; the one the browser agent is reading is tinted, with the pointer on it.
function browser(r: R, tint: string): Scene {
  const x = 150, y = 30, w = 296, h = 240;
  let a = card(x, y, w, h, 18);
  a += `<path d="M${x} ${y + 34}h${w}" stroke="${EDGE}" stroke-width="1.5"/>`;
  a += [0, 1, 2].map(i => dot(x + 20 + i * 13, y + 17, 4, BAR)).join('') + rect(x + 74, y + 9, r.i(130, 170), 16, 8, FRAME);
  a += bar(x + 22, y + 54, r.i(110, 150), '#16171A2e', 10);
  const cols = 3, tw = (w - 44 - 2 * 12) / cols, lit = r.i(0, cols - 1), form = r.f() < 0.35;
  if (form) {
    for (let i = 0; i < 3; i++) {
      const fy = y + 84 + i * 46;
      a += bar(x + 22, fy, 60, BAR, 7) + rect(x + 22, fy + 13, w - 44, 24, 8, i === lit ? tint : FRAME, i === lit ? INK : '');
      if (i === lit) a += `<path d="M${x + 34} ${fy + 19}v12" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`;
    }
    a += rect(x + w - 112, y + h - 34, 90, 22, 11, INK);
    const cy = y + 84 + lit * 46 + 30;
    a += `<path d="M${x + w - 70} ${cy}l0 22l6 -6l5 10l4 -2l-5 -10l8 0z" fill="${INK}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>`;
  } else {
    for (let i = 0; i < cols; i++) {
      const tx = x + 22 + i * (tw + 12), ty = y + 84;
      a += rect(tx, ty, tw, 112, 12, i === lit ? tint : FRAME, i === lit ? INK : '');
      a += rect(tx + 12, ty + 12, tw - 24, 50, 8, i === lit ? '#ffffffaa' : '#ffffff');
      a += bar(tx + 12, ty + 74, tw - 34, i === lit ? '#16171A33' : BAR) + bar(tx + 12, ty + 90, r.i(26, 40), i === lit ? INK : '#16171A40', 9);
    }
    a += bar(x + 22, y + 212, r.i(150, 210)) ;
    const cx = x + 22 + lit * (tw + 12) + tw - 18;
    a += `<path d="M${cx} ${y + 156}l0 22l6 -6l5 10l4 -2l-5 -10l8 0z" fill="${INK}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>`;
  }
  return { art: a, main: [100, r.i(132, 176), 100], second: [x + w - 14, y + 2, 46] };
}

// Apps: a small app. Its table (tinted header, one row done) or its board (columns of cards, one moving on).
function table(r: R, tint: string): Scene {
  if (r.f() < 0.45) {
    const x = 50, y = r.i(54, 70), cw = 120, gap = 14;
    let a = '';
    for (let c = 0; c < 3; c++) {
      const cx = x + c * (cw + gap), k = [3, 2, 1][c] - (c === 2 ? 0 : r.i(0, 1));
      a += rect(cx, y, cw, 214, 16, '#E9E8E3') + bar(cx + 14, y + 16, r.i(40, 60), '#16171A33', 7);
      for (let i = 0; i < k; i++) {
        const lit = c === 1 && i === 0;
        a += card(cx + 8, y + 38 + i * 58, cw - 16, 48, 11);
        if (lit) a += rect(cx + 8, y + 38, cw - 16, 48, 11, tint, INK);
        a += bar(cx + 20, y + 52 + i * 58, r.i(50, 80), lit ? '#16171A40' : '#16171A26', 7) + bar(cx + 20, y + 66 + i * 58, r.i(26, 46), lit ? '#16171A1f' : BAR, 7);
      }
    }
    return { art: a, main: [x + 2 * (cw + gap) + cw - 30, y - 20, 70], second: [x + 8, y + 214, 46] };
  }
  const x = 64, y = r.i(56, 70), w = 352, rows = 4, rh = 40, h = 46 + rows * rh + 6;
  let a = card(x, y, w, h, 18);
  a += `<path d="M${x} ${y + 46}h${w}" stroke="${EDGE}" stroke-width="1.5"/>`;
  a += rect(x + 1, y + 1, w - 2, 45, 17, tint) + rect(x + 1, y + 26, w - 2, 20, 0, tint);
  a += bar(x + 22, y + 19, 70, '#16171A33') + bar(x + 170, y + 19, 50, '#16171A26') + bar(x + 268, y + 19, 44, '#16171A26');
  const done = r.i(0, rows - 1);
  for (let i = 0; i < rows; i++) {
    const ry = y + 46 + i * rh;
    if (i) a += `<path d="M${x + 16} ${ry}h${w - 32}" stroke="${FRAME}" stroke-width="1.5"/>`;
    a += dot(x + 30, ry + rh / 2, 9, i === done ? INK : FRAME) + (i === done ? tick(x + 30, ry + rh / 2, 0.75) : '');
    a += bar(x + 50, ry + rh / 2 - 4, r.i(70, 104)) + bar(x + 170, ry + rh / 2 - 4, r.i(40, 76));
    a += rect(x + 268, ry + rh / 2 - 9, r.i(46, 62), 18, 9, i === done ? '#DDEFE3' : FRAME);
  }
  return { art: a, main: [x + w - 64, y - 30, 72], second: [x + 6, y + h - 6, 46] };
}

// Email and calendar: an inbox with one message picked out beside a month with one day marked, or a day's meetings
// gathered into one message.
function inbox(r: R, tint: string): Scene {
  if (r.f() < 0.4) {
    const x = 60, y = 34, w = 210, h = 232;
    let a = card(x, y, w, h, 18) + bar(x + 18, y + 18, 70, '#16171A33', 8);
    const ev = [[0, 2], [3, 1], [5, 2]].map(([s0, l]) => [s0 + r.i(0, 1), l] as const);
    for (let i = 0; i < 7; i++) a += `<path d="M${x + 16} ${y + 50 + i * 26}h${w - 32}" stroke="${FRAME}" stroke-width="1.5"/>`;
    ev.forEach(([s0, l], i) => { a += rect(x + 46, y + 54 + s0 * 26, w - 66, l * 26 - 8, 9, i === 1 ? tint : FRAME, i === 1 ? INK : '') + bar(x + 58, y + 62 + s0 * 26, r.i(50, 90), '#16171A2e', 7); });
    const mx = 296, my = r.i(96, 120);
    a += `<path d="M${x + w + 6} ${my + 30}C${mx - 10} ${my + 30} ${mx - 20} ${my + 30} ${mx - 6} ${my + 30}" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M${mx - 12} ${my + 25}l6 5l-6 5" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    a += card(mx, my, 150, 92, 16) + rect(mx + 14, my + 14, 26, 26, 8, INK) + bar(mx + 48, my + 18, 70, '#16171A33', 7) + bar(mx + 14, my + 52, 118) + bar(mx + 14, my + 68, r.i(60, 100));
    return { art: a, main: [mx + 124, my - 26, 64], second: [x + 4, y + h - 4, 44] };
  }
  const x = 34, y = r.i(44, 60), w = 236, h = 204;
  let a = card(x, y, w, h, 18);
  const lit = r.i(0, 3);
  for (let i = 0; i < 4; i++) {
    const ry = y + 14 + i * 47;
    if (i === lit) a += rect(x + 8, ry, w - 16, 42, 12, tint);
    a += dot(x + 28, ry + 21, 9, i === lit ? '#ffffff' : FRAME);
    a += bar(x + 46, ry + 12, r.i(80, 120), i === lit ? '#16171A40' : '#16171A26', 7) + bar(x + 46, ry + 25, r.i(110, 150), i === lit ? '#16171A1f' : BAR, 7);
  }
  const cx = 298, cy = y + 40, cw = 150, chh = 168;
  a += card(cx, cy, cw, chh, 16) + rect(cx + 1, cy + 1, cw - 2, 30, 15, FRAME) + rect(cx + 1, cy + 16, cw - 2, 15, 0, FRAME);
  a += bar(cx + 16, cy + 12, 52, '#16171A33', 7);
  const day = r.i(3, 15), gs = 24;
  for (let i = 0; i < 20; i++) {
    const gx = cx + 15 + (i % 5) * gs, gy = cy + 44 + Math.floor(i / 5) * 28;
    a += i === day ? rect(gx, gy, 20, 20, 6, INK) + tick(gx + 10, gy + 10, 0.6) : rect(gx, gy, 20, 20, 6, FRAME);
  }
  return { art: a, main: [cx + cw - 26, cy - 30, 68], second: [x + 18, y + h + 2, 44] };
}

// Choosing tools: one question splits into options and the right one for you is ticked, or three options side by side
// with the one that wins its rows raised.
function fork(r: R, tint: string): Scene {
  if (r.f() < 0.45) {
    const x = 70, y = r.i(44, 58), cw = 104, gap = 14, rows = 4, win = r.i(0, 2);
    let a = '';
    for (let c = 0; c < 3; c++) {
      const cx = x + c * (cw + gap), lift = c === win ? 14 : 0;
      a += card(cx, y - lift, cw, 200 + lift, 16);
      if (c === win) a += rect(cx, y - lift, cw, 42, 16, tint) + rect(cx, y - lift + 26, cw, 16, 0, tint);
      a += bar(cx + 16, y - lift + 17, r.i(40, 60), '#16171A33', 8);
      for (let i = 0; i < rows; i++) {
        const ry = y + 58 + i * 36, yes = c === win || r.f() < 0.4;
        a += yes ? dot(cx + 26, ry, 9, INK) + tick(cx + 26, ry, 0.65) : dot(cx + 26, ry, 9, FRAME) + `<path d="M${cx + 22} ${ry}h8" stroke="#16171A55" stroke-width="2" stroke-linecap="round"/>`;
        a += bar(cx + 42, ry - 4, r.i(30, 46));
      }
    }
    return { art: a, main: [x + win * (cw + gap) + cw / 2, y - 50, 62], second: [x + 3 * (cw + gap) + 20, y + 186, 46] };
  }
  const ox = 176, oy = 150, k = r.i(2, 3), cx = 288, cw = 160, ch = 54, gap = k === 3 ? 18 : 40;
  const top = oy - (k * ch + (k - 1) * gap) / 2, pick = r.i(0, k - 1);
  let a = dot(ox, oy, 6, INK);
  for (let i = 0; i < k; i++) {
    const y = top + i * (ch + gap), ty = y + ch / 2;
    a += `<path d="M${ox} ${oy}C${ox + 60} ${oy} ${cx - 60} ${ty} ${cx - 4} ${ty}" fill="none" stroke="${INK}" stroke-width="1.6"${i === pick ? '' : ' stroke-dasharray="2 6" stroke-linecap="round"'}/>`;
    a += card(cx, y, cw, ch, 16);
    if (i === pick) a += rect(cx, y, cw, ch, 16, tint, INK);
    a += i === pick ? dot(cx + 26, ty, 11, INK) + tick(cx + 26, ty, 0.8) : dot(cx + 26, ty, 11, FRAME) + `<path d="M${cx + 21} ${ty}h10" stroke="#16171A55" stroke-width="2" stroke-linecap="round"/>`;
    a += bar(cx + 46, ty - 10, r.i(64, 92), i === pick ? '#16171A40' : '#16171A26', 8) + bar(cx + 46, ty + 4, r.i(40, 70), i === pick ? '#16171A1f' : BAR, 7);
  }
  const py = top + pick * (ch + gap);
  return { art: a, main: [100, oy, 104], second: [cx + cw - 10, py - 6, 40] };
}

const SCENES: Record<GuidePage['group'], (r: R, tint: string) => Scene> = {
  'AI agents': chat, Automations: flow, 'Browser agents': browser, Apps: table, 'Email and calendar': inbox, 'Choosing tools': fork,
};

/** Keeps a face of height h whole inside the frame once the scene is zoomed by z about its centre (14 units clear). */
function inside(x: number, y: number, h: number, z: number): [number, number] {
  const fit = (v: number, size: number, half: number) => {
    const m = 14 + half * z, c = size / 2, lo = c + (m - c) / z, hi = c + (size - m - c) / z;
    return Math.min(hi, Math.max(lo, v));
  };
  return [fit(x, W, h * 0.66), fit(y, H, h / 2)];
}

/** The cover's SVG markup for a guide. Mirrored by the seed, the faces stay upright and unmirrored. */
export function coverSvg(g: Pick<GuidePage, 'slug' | 'kind' | 'group'>) {
  const r = rng(g.slug);
  const k = KINDS[g.kind];
  const s = SCENES[g.group](r, k.tint);
  const flip = r.f() < 0.5;
  const fx = (x: number) => (flip ? W - x : x);
  const crew = CREW.filter(c => c !== k.face);
  const second = crew[Math.floor(r.f() * crew.length)];
  const art = flip ? `<g transform="translate(${W} 0) scale(-1 1)">${s.art}</g>` : s.art;
  const z = n(r.r(1, 1.12)), zoom = `translate(${n((W - W * z) / 2)} ${n((H - H * z) / 2)}) scale(${z})`;
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="presentation" aria-hidden="true" focusable="false"><rect width="${W}" height="${H}" fill="${FRAME}"/><g transform="${zoom}">${art}`
    + face(second, ...inside(fx(s.second[0]), s.second[1], s.second[2], z), s.second[2], r.r(-12, 12), 'c2')
    + face(k.face, ...inside(fx(s.main[0]), s.main[1], s.main[2], z), s.main[2], r.r(-7, 7), 'c1')
    + '</g></svg>';
}

export function GuideCover({ g, size = 'card' }: { g: Pick<GuidePage, 'slug' | 'kind' | 'group'>; size?: 'card' | 'feature' | 'hero' }) {
  return <div className={`gcv gcv-${size}`} dangerouslySetInnerHTML={{ __html: coverSvg(g) }} />;
}
