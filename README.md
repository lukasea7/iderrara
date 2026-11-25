# IDERRARA

Protótipo funcional de uma ferramenta de apoio à criação de marcas e logomarcas, feito em React (Create React App).

## Como rodar

```bash
npm install
npm start      # http://localhost:3000
npm test       # testes da lógica de iniciais e sugestões
npm run build  # versão de produção
```

## Fluxo do usuário

1. **Início**: apresentação da ferramenta com exemplos de marcas.
2. **Nome**: nome, sobrenome ou iniciais, mais o ramo do negócio.
3. **Estilo**: elegante, minimalista, criativo, clássico ou profissional.
4. **Nomes**: sugestões de composições (ex.: ANA CLARA MAKEUP, AC BEAUTY, ANA C. BEAUTY, AC – MAKEUP STUDIO) ou texto livre.
5. **Personalizar**: cores, fontes, formato, disposição, elementos gráficos, organização de iniciais e nome, frase de apoio. A pré-visualização atualiza ao vivo.
6. **Finalizar**: download em PNG ou SVG e orientações básicas de identidade visual.

## Estrutura

- `src/App.js`: etapas e estado do fluxo.
- `src/logo.js`: motor da logomarca (gera SVG, PNG e a pré-visualização a partir da mesma descrição).
- `src/data.js`: estilos, paletas, fontes, ramos e geração de sugestões de nomes.
- `src/components/Logo.js`: desenha a logo em SVG.

## Próximos passos possíveis

- Sugestões de nomes com IA.
- Mais modelos de ícones e layouts.
- Exportação em PDF e kit de aplicação (cartão, perfil de rede social).

## Aviso

O IDERRARA apoia a criação de identidades visuais. Não garante disponibilidade nem registro legal da marca; a verificação de marcas existentes (por exemplo, no INPI) deve ser feita separadamente.
