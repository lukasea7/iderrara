// Dados do IDERRARA: estilos, paletas, fontes, ramos e geração de sugestões de nomes.

export const STYLES = [
  {
    id: 'elegante',
    label: 'Elegante',
    description: 'Refinado, com serifa fina e detalhes dourados.',
    defaults: { palette: 'ouro', font: 'didone', shape: 'circle', filled: false, icon: 'sparkle', layout: 'vertical', organization: 'both', divider: true },
  },
  {
    id: 'minimalista',
    label: 'Minimalista',
    description: 'Limpo, sem excessos, só o essencial.',
    defaults: { palette: 'branco', font: 'sans', shape: 'none', filled: false, icon: 'none', layout: 'horizontal', organization: 'both', divider: false },
  },
  {
    id: 'criativo',
    label: 'Criativo',
    description: 'Cores vivas e formas amigáveis.',
    defaults: { palette: 'sol', font: 'humanist', shape: 'rounded', filled: true, icon: 'heart', layout: 'vertical', organization: 'both', divider: false },
  },
  {
    id: 'classico',
    label: 'Clássico',
    description: 'Tradicional, com moldura e tons terrosos.',
    defaults: { palette: 'creme', font: 'classic', shape: 'frame', filled: false, icon: 'crown', layout: 'vertical', organization: 'both', divider: true },
  },
  {
    id: 'profissional',
    label: 'Profissional',
    description: 'Sóbrio e confiável, ideal para serviços.',
    defaults: { palette: 'oceano', font: 'sans', shape: 'square', filled: true, icon: 'none', layout: 'horizontal', organization: 'both', divider: false },
  },
];

export const PALETTES = [
  { id: 'ouro', name: 'Ouro & Noite', bg: '#14110f', fg: '#f3e5c0', accent: '#c9a24b' },
  { id: 'branco', name: 'Branco Puro', bg: '#ffffff', fg: '#111111', accent: '#111111' },
  { id: 'rose', name: 'Rosé', bg: '#fdf0f0', fg: '#5a2a35', accent: '#d98595' },
  { id: 'oceano', name: 'Oceano', bg: '#0f2a43', fg: '#ffffff', accent: '#4aa3df' },
  { id: 'floresta', name: 'Floresta', bg: '#f1f5ee', fg: '#1f3a2b', accent: '#5f9e6e' },
  { id: 'sol', name: 'Pôr do Sol', bg: '#fff7ed', fg: '#7c2d12', accent: '#f97316' },
  { id: 'lavanda', name: 'Lavanda', bg: '#f5f0ff', fg: '#3b2a66', accent: '#8b6bd9' },
  { id: 'grafite', name: 'Grafite', bg: '#1f2430', fg: '#f2f4f8', accent: '#7dd3fc' },
  { id: 'creme', name: 'Creme', bg: '#f8f3e8', fg: '#3b2f2f', accent: '#8b6b3e' },
];

// Fontes seguras (já instaladas nos sistemas), para que o PNG/SVG saia igual à pré-visualização.
// factor = largura média do caractere maiúsculo em relação ao tamanho da fonte (estimativa).
export const FONTS = [
  { id: 'didone', name: 'Didone', family: "Didot, 'Bodoni MT', 'Playfair Display', Georgia, serif", weight: 400, spacing: 0.14, factor: 0.7, caps: true },
  { id: 'serif', name: 'Serifada', family: "Georgia, 'Times New Roman', serif", weight: 700, spacing: 0.06, factor: 0.74, caps: true },
  { id: 'classic', name: 'Clássica', family: "'Palatino Linotype', Palatino, 'Book Antiqua', serif", weight: 400, spacing: 0.1, factor: 0.72, caps: true },
  { id: 'sans', name: 'Moderna', family: "'Helvetica Neue', Helvetica, Arial, sans-serif", weight: 700, spacing: 0.08, factor: 0.7, caps: true },
  { id: 'humanist', name: 'Amigável', family: "'Trebuchet MS', 'Lucida Grande', Verdana, sans-serif", weight: 700, spacing: 0.04, factor: 0.72, caps: true },
  { id: 'geometric', name: 'Geométrica', family: "'Century Gothic', Futura, Avenir, 'Trebuchet MS', sans-serif", weight: 400, spacing: 0.16, factor: 0.78, caps: true },
  { id: 'mono', name: 'Máquina', family: "'Courier New', Courier, monospace", weight: 700, spacing: 0.04, factor: 0.62, caps: true },
  { id: 'script', name: 'Manuscrita', family: "'Brush Script MT', 'Segoe Script', 'Snell Roundhand', cursive", weight: 400, spacing: 0.02, factor: 0.5, caps: false },
];

export const SHAPES = [
  { id: 'none', label: 'Sem formato' },
  { id: 'circle', label: 'Círculo' },
  { id: 'square', label: 'Quadrado' },
  { id: 'rounded', label: 'Arredondado' },
  { id: 'arch', label: 'Arco' },
  { id: 'frame', label: 'Moldura' },
];

export const ICONS = [
  { id: 'none', label: 'Nenhum' },
  { id: 'star', label: 'Estrela' },
  { id: 'sparkle', label: 'Brilho' },
  { id: 'leaf', label: 'Folha' },
  { id: 'heart', label: 'Coração' },
  { id: 'diamond', label: 'Diamante' },
  { id: 'crown', label: 'Coroa' },
];

export const LAYOUTS = [
  { id: 'vertical', label: 'Vertical' },
  { id: 'horizontal', label: 'Horizontal' },
];

export const ORGANIZATIONS = [
  { id: 'both', label: 'Iniciais + nome' },
  { id: 'name', label: 'Só o nome' },
  { id: 'initials', label: 'Só as iniciais' },
];

export const BUSINESSES = [
  { id: 'beleza', label: 'Beleza e maquiagem', words: ['MAKEUP', 'BEAUTY', 'STUDIO'] },
  { id: 'moda', label: 'Moda e acessórios', words: ['MODAS', 'FASHION', 'ATELIÊ'] },
  { id: 'gastronomia', label: 'Gastronomia', words: ['KITCHEN', 'FOOD', 'CAFÉ'] },
  { id: 'saude', label: 'Saúde e bem-estar', words: ['CLÍNICA', 'SAÚDE', 'CARE'] },
  { id: 'fitness', label: 'Fitness e esportes', words: ['FIT', 'TRAINING', 'STUDIO'] },
  { id: 'tecnologia', label: 'Tecnologia', words: ['TECH', 'DIGITAL', 'LABS'] },
  { id: 'consultoria', label: 'Consultoria e serviços', words: ['CONSULTORIA', 'GROUP', 'PARTNERS'] },
  { id: 'arquitetura', label: 'Arquitetura e design', words: ['DESIGN', 'ARQUITETURA', 'STUDIO'] },
  { id: 'fotografia', label: 'Fotografia e vídeo', words: ['FOTOGRAFIA', 'FILMES', 'STUDIO'] },
  { id: 'educacao', label: 'Educação', words: ['EDUCAÇÃO', 'ACADEMY', 'ESCOLA'] },
  { id: 'artesanato', label: 'Artesanato', words: ['ATELIÊ', 'HANDMADE', 'ARTE'] },
  { id: 'outro', label: 'Outro ramo', words: ['STUDIO', 'BRAND', 'CO.'] },
];

const CONNECTORS = ['de', 'da', 'do', 'das', 'dos', 'e', 'di', 'du'];

export function cleanText(value) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

// "AC", "A.C." e "A C" são tratados como iniciais; "Ana Clara" como nome.
export function isInitialsInput(value) {
  const text = cleanText(value);
  if (!text) return false;
  const tokens = text.split(/[\s.]+/).filter(Boolean);
  const isLetter = (t) => /^\p{L}$/u.test(t);
  if (tokens.length >= 2 && tokens.length <= 4) return tokens.every(isLetter);
  if (tokens.length === 1 && /^\p{L}{2}$/u.test(tokens[0])) {
    return tokens[0] === tokens[0].toUpperCase();
  }
  return false;
}

function nameWords(value) {
  return cleanText(value).split(' ').filter(Boolean);
}

export function getInitials(value, max = 2) {
  const text = cleanText(value);
  if (!text) return '';
  if (isInitialsInput(text)) {
    return text.split(/[\s.]+/).filter(Boolean).join('').toUpperCase().slice(0, 4);
  }
  let words = nameWords(text);
  const significant = words.filter((w) => !CONNECTORS.includes(w.toLowerCase()));
  if (significant.length > 0) words = significant;
  const letters = words.map((w) => (w.match(/\p{L}/u) || [''])[0].toUpperCase()).filter(Boolean);
  if (letters.length <= max) return letters.join('');
  return letters[0] + letters[letters.length - 1];
}

export function businessWords(businessId, custom = '') {
  const found = BUSINESSES.find((b) => b.id === businessId) || BUSINESSES[BUSINESSES.length - 1];
  if (found.id !== 'outro') return found.words;
  const c = cleanText(custom).toUpperCase();
  return c ? [c, 'STUDIO', 'BRAND'].filter((w, i, a) => a.indexOf(w) === i) : found.words;
}

export function suggestNames(value, words = ['STUDIO', 'BRAND', 'CO.']) {
  const text = cleanText(value);
  if (!text) return [];
  const [w1, w2 = w1, w3 = w1] = words;
  const studio = w1 === 'STUDIO' ? '' : ' STUDIO';
  const out = [];
  const add = (label) => {
    const l = cleanText(label);
    if (l && !out.includes(l)) out.push(l);
  };

  if (isInitialsInput(text)) {
    const ini = getInitials(text);
    add(`${ini} ${w2}`);
    add(`${ini} – ${w1}${studio}`);
    add(`${ini} ${w1}`);
    add(`${ini} ${w3}`);
    add(`${ini} – ${w2}`);
    return out.slice(0, 6);
  }

  const words_ = nameWords(text.toUpperCase());
  const full = words_.join(' ');
  const first = words_[0];
  if (words_.length === 1) {
    add(`${full} ${w1}`);
    add(`${full} ${w2}`);
    add(`${full} – ${w1}${studio}`);
    add(`${full} ${w3}`);
    add(full);
    return out.slice(0, 6);
  }

  const last = words_[words_.length - 1];
  const ini = getInitials(text);
  add(`${full} ${w1}`);
  add(`${ini} ${w2}`);
  add(`${first} ${last[0]}. ${w2}`);
  add(`${ini} – ${w1}${studio}`);
  add(`${first} ${w1}`);
  add(full);
  return out.slice(0, 6);
}

export function getPalette(id) {
  return PALETTES.find((p) => p.id === id) || PALETTES[0];
}

// Monta a configuração inicial da logomarca para um estilo.
export function buildDesign(styleId, text, initials) {
  const style = STYLES.find((s) => s.id === styleId) || STYLES[0];
  const palette = getPalette(style.defaults.palette);
  return {
    ...style.defaults,
    text: cleanText(text),
    initials: (initials || '').toUpperCase(),
    tagline: '',
    bg: palette.bg,
    fg: palette.fg,
    accent: palette.accent,
    transparent: false,
  };
}

export const EXAMPLES = [
  { styleId: 'elegante', caption: 'Elegante', design: buildDesign('elegante', 'ANA CLARA MAKEUP', 'AC') },
  { styleId: 'minimalista', caption: 'Minimalista', design: buildDesign('minimalista', 'BRUNO LIMA ARQUITETURA', 'BL') },
  { styleId: 'criativo', caption: 'Criativo', design: buildDesign('criativo', 'LUA CAFÉ', 'LC') },
  { styleId: 'profissional', caption: 'Profissional', design: buildDesign('profissional', 'SILVA & ASSOCIADOS', 'SA') },
];
