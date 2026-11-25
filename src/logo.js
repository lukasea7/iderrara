// Motor da logomarca do IDERRARA.
// describeLogo() gera uma descrição única (primitivas SVG) usada para
// a pré-visualização (components/Logo.js), o arquivo SVG e o PNG.
import { FONTS } from './data';

const MIN_W = 760;
const MIN_H = 520;
const PAD = 90;

const ICON_PATHS = {
  star: 'M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.1L12 17.6l-6.3 3.7 1.7-7.1L2 9.5l7.1-.6z',
  sparkle: 'M12 2c.6 5.2 3.8 8.4 10 10-6.2 1.6-9.4 4.8-10 10-.6-5.2-3.8-8.4-10-10 6.2-1.6 9.4-4.8 10-10z',
  heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  diamond: 'M12 2l8 10-8 10-8-10z',
  crown: 'M2 8l5.5 4.5L12 4l4.5 8.5L22 8l-2 11H4z',
  leaf: 'M20 4C10 4 4 9 4 16c0 1.5.4 2.8 1 4 1.5-4 5-7.5 9-9.5-3.5 3-6 6.5-7 10.5 1 .4 2 .5 3 .5 7 0 11-6 10-17z',
};

export function getFont(id) {
  return FONTS.find((f) => f.id === id) || FONTS[0];
}

export function titleCase(text) {
  return text.toLowerCase().replace(/(^|\s|[-–])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
}

export function contrastColor(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '#111111';
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#111111' : '#ffffff';
}

export function estimateWidth(text, size, font, spacing = font.spacing) {
  return [...text].length * size * (font.factor + spacing);
}

function wrapLines(text, size, font, maxWidth) {
  const words = text.split(' ').filter(Boolean);
  const lines = [];
  let current = '';
  words.forEach((w) => {
    const test = current ? `${current} ${w}` : w;
    if (current && estimateWidth(test, size, font) > maxWidth) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function textEl({ text, x, y, size, font, fill, anchor = 'middle', weight, spacing, opacity = 1 }) {
  const sp = spacing === undefined ? font.spacing : spacing;
  const ls = size * sp;
  return {
    type: 'text',
    text,
    // o espaçamento é somado depois da última letra; compensa para centralizar
    x: anchor === 'middle' ? x + ls / 2 : x,
    y,
    size,
    family: font.family,
    weight: weight === undefined ? font.weight : weight,
    letterSpacing: ls,
    anchor,
    fill,
    opacity,
    width: estimateWidth(text, size, font, sp),
  };
}

function iconEl(kind, cx, cy, size, fill) {
  const s = size / 24;
  return {
    type: 'path',
    d: ICON_PATHS[kind],
    transform: `translate(${cx - 12 * s} ${cy - 12 * s}) scale(${s})`,
    fill,
    stroke: 'none',
    strokeWidth: 0,
    bbox: [cx - size / 2, cy - size / 2, cx + size / 2, cy + size / 2],
  };
}

function shapeEls(kind, cx, cy, w, h, accent, filled) {
  const fill = filled ? accent : 'none';
  const sw = 4;
  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  switch (kind) {
    case 'circle':
      return [{ type: 'circle', cx, cy, r: Math.max(w, h) / 2, fill, stroke: accent, strokeWidth: sw }];
    case 'square':
      return [{ type: 'rect', x: x0, y: y0, width: w, height: h, rx: 0, fill, stroke: accent, strokeWidth: sw }];
    case 'rounded':
      return [{ type: 'rect', x: x0, y: y0, width: w, height: h, rx: Math.min(w, h) * 0.22, fill, stroke: accent, strokeWidth: sw }];
    case 'frame':
      return [
        { type: 'rect', x: x0, y: y0, width: w, height: h, rx: 0, fill, stroke: accent, strokeWidth: 3 },
        { type: 'rect', x: x0 + 12, y: y0 + 12, width: w - 24, height: h - 24, rx: 0, fill: 'none', stroke: filled ? contrastColor(accent) : accent, strokeWidth: 1.5 },
      ];
    case 'arch': {
      const r = w / 2;
      const d = `M${x0} ${y0 + h} L${x0} ${y0 + r} A${r} ${r} 0 0 1 ${x0 + w} ${y0 + r} L${x0 + w} ${y0 + h} Z`;
      return [{ type: 'path', d, transform: '', fill, stroke: accent, strokeWidth: sw, bbox: [x0, y0, x0 + w, y0 + h] }];
    }
    default:
      return [];
  }
}

function elBounds(el) {
  switch (el.type) {
    case 'circle': {
      const r = el.r + el.strokeWidth / 2;
      return [el.cx - r, el.cy - r, el.cx + r, el.cy + r];
    }
    case 'rect': {
      const h = el.strokeWidth / 2;
      return [el.x - h, el.y - h, el.x + el.width + h, el.y + el.height + h];
    }
    case 'path': {
      const h = el.strokeWidth / 2;
      return [el.bbox[0] - h, el.bbox[1] - h, el.bbox[2] + h, el.bbox[3] + h];
    }
    case 'line':
      return [Math.min(el.x1, el.x2), Math.min(el.y1, el.y2) - 1, Math.max(el.x1, el.x2), Math.max(el.y1, el.y2) + 1];
    case 'text': {
      const left = el.anchor === 'middle' ? el.x - el.width / 2 : el.x;
      return [left, el.y - el.size * 0.8, left + el.width, el.y + el.size * 0.25];
    }
    default:
      return [0, 0, 0, 0];
  }
}

export function computeBounds(elements) {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  elements.forEach((el) => {
    const e = elBounds(el);
    b[0] = Math.min(b[0], e[0]);
    b[1] = Math.min(b[1], e[1]);
    b[2] = Math.max(b[2], e[2]);
    b[3] = Math.max(b[3], e[3]);
  });
  return b;
}

function shift(elements, dx, dy) {
  elements.forEach((el) => {
    if (el.type === 'text') { el.x += dx; el.y += dy; }
    else if (el.type === 'circle') { el.cx += dx; el.cy += dy; }
    else if (el.type === 'rect') { el.x += dx; el.y += dy; }
    else if (el.type === 'line') { el.x1 += dx; el.x2 += dx; el.y1 += dy; el.y2 += dy; }
    else if (el.type === 'path') {
      el.bbox = [el.bbox[0] + dx, el.bbox[1] + dy, el.bbox[2] + dx, el.bbox[3] + dy];
      el.transform = `translate(${dx} ${dy}) ${el.transform}`.trim();
    }
  });
  return elements;
}

// Marca (monograma): formato + elemento gráfico + iniciais.
function buildMark(cfg, font, cx, cy, size) {
  const hasShape = cfg.shape !== 'none';
  const filled = Boolean(cfg.filled) && hasShape;
  const ink = filled ? contrastColor(cfg.accent) : cfg.fg;
  const iconColor = filled ? ink : cfg.accent;
  const initials = (cfg.initials || '').trim().toUpperCase();
  const hasIcon = cfg.icon && cfg.icon !== 'none';
  const els = shapeEls(cfg.shape, cx, cy, size, size, cfg.accent, filled);

  if (hasIcon && initials) {
    els.push(iconEl(cfg.icon, cx, cy - size * 0.25, size * 0.18, iconColor));
  } else if (hasIcon) {
    els.push(iconEl(cfg.icon, cx, cy, size * 0.38, iconColor));
  }
  if (initials) {
    const fs = Math.min(size * 0.34, (size * 0.66) / (initials.length * (font.factor + 0.04)));
    const centerY = cy + (hasIcon ? size * 0.1 : 0);
    els.push(textEl({ text: initials, x: cx, y: centerY + fs * 0.35, size: fs, font, fill: ink, spacing: 0.04 }));
  }
  return els;
}

// Bloco de texto: nome (com quebra de linha), linha decorativa e frase de apoio.
function buildTextBlock(cfg, font, { text, anchor, x, nameSize, maxWidth, tagSize }) {
  const els = [];
  const tagline = (cfg.tagline || '').trim().toUpperCase();
  const lineHeight = nameSize * 1.15;
  let cursor = 0;

  if (text) {
    wrapLines(text, nameSize, font, maxWidth).forEach((line, i) => {
      els.push(textEl({ text: line, x, y: cursor + nameSize * 0.8 + i * lineHeight, size: nameSize, font, fill: cfg.fg, anchor }));
    });
    cursor += els.length * lineHeight;
  }
  if (cfg.divider) {
    cursor += (text ? nameSize * 0.2 : 0) + 10;
    const len = 120;
    const x1 = anchor === 'middle' ? x - len / 2 : x;
    els.push({ type: 'line', x1, y1: cursor, x2: x1 + len, y2: cursor, stroke: cfg.accent, strokeWidth: 2 });
    cursor += 14;
  }
  if (tagline) {
    cursor += text || cfg.divider ? tagSize * 0.5 : 0;
    els.push(textEl({ text: tagline, x, y: cursor + tagSize * 0.85, size: tagSize, font, fill: cfg.fg, anchor, weight: 400, spacing: 0.3, opacity: 0.85 }));
    cursor += tagSize * 1.3;
  }
  return { els, height: cursor };
}

export function describeLogo(cfg) {
  const font = getFont(cfg.font);
  const raw = (cfg.text || '').trim();
  const name = font.caps ? raw.toUpperCase() : titleCase(raw);
  const initials = (cfg.initials || '').trim();
  let org = cfg.organization || 'both';
  if ((org === 'both' || org === 'initials') && !initials) org = 'name';
  if (org === 'name' && !name) org = initials ? 'initials' : 'name';

  let elements = [];

  if (org === 'initials') {
    const size = 340;
    elements.push(...buildMark(cfg, font, 0, 0, size));
    const block = buildTextBlock(cfg, font, { text: '', anchor: 'middle', x: 0, nameSize: 0, maxWidth: 0, tagSize: 22 });
    elements.push(...shift(block.els, 0, size / 2 + 40));
  } else if (org === 'both' && cfg.layout === 'horizontal') {
    const size = 240;
    const nameSize = 54;
    const textX = size / 2 + 50;
    const block = buildTextBlock(cfg, font, { text: name, anchor: 'start', x: textX, nameSize, maxWidth: 520, tagSize: 20 });
    elements.push(...buildMark(cfg, font, 0, 0, size));
    elements.push(...shift(block.els, 0, -block.height / 2));
  } else if (org === 'both') {
    const size = 260;
    const block = buildTextBlock(cfg, font, { text: name, anchor: 'middle', x: 0, nameSize: 62, maxWidth: 820, tagSize: 22 });
    elements.push(...buildMark(cfg, font, 0, 0, size));
    elements.push(...shift(block.els, 0, size / 2 + 40));
  } else {
    // só o nome: elemento gráfico em cima e, se houver, o formato envolve tudo
    const hasShape = cfg.shape !== 'none';
    const maxWidth = !hasShape ? 820 : cfg.shape === 'frame' ? 620 : 460;
    const nameSize = hasShape ? 56 : 66;
    const hasIcon = cfg.icon && cfg.icon !== 'none';
    const filled = Boolean(cfg.filled) && hasShape;
    const ink = filled ? contrastColor(cfg.accent) : cfg.fg;
    const inner = { ...cfg, fg: ink, accent: filled ? ink : cfg.accent };
    const block = buildTextBlock(inner, font, { text: name, anchor: 'middle', x: 0, nameSize, maxWidth, tagSize: 20 });
    const content = [];
    let top = 0;
    if (hasIcon) {
      content.push(iconEl(cfg.icon, 0, 28, 56, filled ? ink : cfg.accent));
      top = 56 + 24;
    }
    content.push(...shift(block.els, 0, top));
    const [x1, y1, x2, y2] = computeBounds(content);
    const bw = x2 - x1;
    const bh = y2 - y1;
    const ccx = (x1 + x2) / 2;
    const ccy = (y1 + y2) / 2;
    if (hasShape) {
      let container;
      if (cfg.shape === 'circle') {
        const dia = 2 * Math.hypot(bw / 2 + 30, bh / 2 + 30);
        container = shapeEls('circle', ccx, ccy, dia, dia, cfg.accent, filled);
      } else if (cfg.shape === 'arch') {
        const w = bw + 120;
        const h = bh + 80 + w * 0.3;
        container = shapeEls('arch', ccx, ccy - w * 0.15, w, h, cfg.accent, filled);
      } else {
        container = shapeEls(cfg.shape, ccx, ccy, bw + 120, bh + 100, cfg.accent, filled);
      }
      elements.push(...container);
    }
    elements.push(...content);
  }

  const [bx1, by1, bx2, by2] = computeBounds(elements);
  const w = Math.max(MIN_W, bx2 - bx1 + PAD * 2);
  const h = Math.max(MIN_H, by2 - by1 + PAD * 2);
  const viewBox = { x: (bx1 + bx2) / 2 - w / 2, y: (by1 + by2) / 2 - h / 2, w, h };
  return { viewBox, background: cfg.transparent ? null : cfg.bg, elements };
}

const num = (n) => Math.round(n * 100) / 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function elToString(el) {
  switch (el.type) {
    case 'circle':
      return `<circle cx="${num(el.cx)}" cy="${num(el.cy)}" r="${num(el.r)}" fill="${el.fill}" stroke="${el.stroke}" stroke-width="${el.strokeWidth}"/>`;
    case 'rect':
      return `<rect x="${num(el.x)}" y="${num(el.y)}" width="${num(el.width)}" height="${num(el.height)}" rx="${num(el.rx)}" fill="${el.fill}" stroke="${el.stroke}" stroke-width="${el.strokeWidth}"/>`;
    case 'path':
      return `<path d="${el.d}"${el.transform ? ` transform="${el.transform}"` : ''} fill="${el.fill}" stroke="${el.stroke}" stroke-width="${el.strokeWidth}"/>`;
    case 'line':
      return `<line x1="${num(el.x1)}" y1="${num(el.y1)}" x2="${num(el.x2)}" y2="${num(el.y2)}" stroke="${el.stroke}" stroke-width="${el.strokeWidth}" stroke-linecap="round"/>`;
    case 'text':
      return `<text x="${num(el.x)}" y="${num(el.y)}" font-family="${esc(el.family)}" font-size="${num(el.size)}" font-weight="${el.weight}" letter-spacing="${num(el.letterSpacing)}" text-anchor="${el.anchor}" fill="${el.fill}" fill-opacity="${el.opacity}">${esc(el.text)}</text>`;
    default:
      return '';
  }
}

export function toSvg(desc) {
  const { x, y, w, h } = desc.viewBox;
  const bg = desc.background ? `<rect x="${num(x)}" y="${num(y)}" width="${num(w)}" height="${num(h)}" fill="${desc.background}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${num(x)} ${num(y)} ${num(w)} ${num(h)}" width="${num(w)}" height="${num(h)}">${bg}${desc.elements.map(elToString).join('')}</svg>`;
}

export function toPng(desc, pixelWidth = 1600) {
  return new Promise((resolve, reject) => {
    const svg = toSvg(desc);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelWidth;
      canvas.height = Math.round((pixelWidth * desc.viewBox.h) / desc.viewBox.w);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Falha ao gerar o PNG'))), 'image/png');
    };
    img.onerror = () => reject(new Error('Falha ao gerar o PNG'));
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}

export function fileSlug(text) {
  const s = (text || 'logomarca')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return s || 'logomarca';
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadSvg(desc, filename) {
  downloadBlob(new Blob([toSvg(desc)], { type: 'image/svg+xml;charset=utf-8' }), filename);
}
