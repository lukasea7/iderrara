import { getInitials, isInitialsInput, suggestNames, businessWords } from './data';

describe('iniciais', () => {
  test('nome e sobrenome', () => expect(getInitials('Ana Clara')).toBe('AC'));
  test('ignora conectivos', () => expect(getInitials('Ana de Souza')).toBe('AS'));
  test('três nomes usam primeiro e último', () => expect(getInitials('maria clara souza')).toBe('MS'));
  test('nome único', () => expect(getInitials('Ana')).toBe('A'));
  test('iniciais digitadas', () => {
    expect(getInitials('A.C.')).toBe('AC');
    expect(getInitials('AC')).toBe('AC');
    expect(getInitials('a b')).toBe('AB');
  });
  test('detecta entrada de iniciais', () => {
    expect(isInitialsInput('AC')).toBe(true);
    expect(isInitialsInput('A.C.')).toBe(true);
    expect(isInitialsInput('Ana C.')).toBe(false);
    expect(isInitialsInput('Ana')).toBe(false);
    expect(isInitialsInput('')).toBe(false);
  });
});

describe('sugestões de nomes', () => {
  const words = businessWords('beleza');
  test('exemplos do fluxo', () => {
    const s = suggestNames('Ana Clara', words);
    expect(s).toEqual(expect.arrayContaining(['ANA CLARA MAKEUP', 'AC BEAUTY', 'ANA C. BEAUTY', 'AC – MAKEUP STUDIO']));
  });
  test('a partir de iniciais', () => {
    const s = suggestNames('AC', words);
    expect(s[0]).toBe('AC BEAUTY');
    expect(s).toContain('AC – MAKEUP STUDIO');
  });
  test('nome único não gera iniciais soltas', () => {
    const s = suggestNames('Ana', words);
    expect(s[0]).toBe('ANA MAKEUP');
    expect(s.some((x) => x.startsWith('A '))).toBe(false);
  });
  test('vazio', () => expect(suggestNames('  ', words)).toEqual([]));
  test('ramo personalizado', () => expect(businessWords('outro', 'Pet shop')[0]).toBe('PET SHOP'));
});
