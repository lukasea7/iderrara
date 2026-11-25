import { describeLogo, toSvg, contrastColor, fileSlug } from './logo';
import { STYLES, buildDesign, EXAMPLES } from './data';

describe('motor da logomarca', () => {
  test.each(STYLES.map((s) => s.id))('gera SVG válido para o estilo %s', (id) => {
    const svg = toSvg(describeLogo(buildDesign(id, 'ANA CLARA MAKEUP', 'AC')));
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain('ANA CLARA MAKEUP');
    expect(svg).toContain('>AC<');
    expect(svg.endsWith('</svg>')).toBe(true);
  });

  test('exemplos da página inicial', () => {
    EXAMPLES.forEach((e) => expect(describeLogo(e.design).elements.length).toBeGreaterThan(0));
  });

  test('só iniciais não mostra o nome', () => {
    const svg = toSvg(describeLogo({ ...buildDesign('elegante', 'ANA CLARA', 'AC'), organization: 'initials' }));
    expect(svg).not.toContain('ANA CLARA');
  });

  test('só nome com formato envolve o texto', () => {
    const d = describeLogo({ ...buildDesign('elegante', 'ANA CLARA', 'AC'), organization: 'name' });
    expect(d.elements.some((e) => e.type === 'circle')).toBe(true);
  });

  test('fundo transparente', () => {
    const d = describeLogo({ ...buildDesign('minimalista', 'LUA', 'L'), transparent: true });
    expect(d.background).toBeNull();
    expect(toSvg(d)).not.toContain('fill="#ffffff"/>');
  });

  test('escapa caracteres especiais', () => {
    expect(toSvg(describeLogo(buildDesign('profissional', 'SILVA & ASSOCIADOS', 'SA')))).toContain('SILVA &amp; ASSOCIADOS');
  });

  test('frase de apoio aparece em maiúsculas', () => {
    const svg = toSvg(describeLogo({ ...buildDesign('classico', 'CASA FLORA', 'CF'), tagline: 'flores & presentes' }));
    expect(svg).toContain('FLORES &amp; PRESENTES');
  });

  test('contraste e nome de arquivo', () => {
    expect(contrastColor('#ffffff')).toBe('#111111');
    expect(contrastColor('#0f2a43')).toBe('#ffffff');
    expect(fileSlug('Ateliê Ana Clara!')).toBe('atelie-ana-clara');
  });
});
