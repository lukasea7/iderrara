import React, { useMemo, useState } from 'react';
import './App.css';
import heroImage from './assets/iderrara-logo.jpg';
import Logo from './components/Logo';
import {
  BUSINESSES,
  EXAMPLES,
  FONTS,
  ICONS,
  LAYOUTS,
  ORGANIZATIONS,
  PALETTES,
  SHAPES,
  STYLES,
  buildDesign,
  businessWords,
  cleanText,
  getInitials,
  isInitialsInput,
  suggestNames,
} from './data';
import { describeLogo, downloadBlob, downloadSvg, fileSlug, getFont, toPng } from './logo';

const STEPS = ['Início', 'Nome', 'Estilo', 'Nomes', 'Personalizar', 'Finalizar'];

function Stepper({ step, onGo }) {
  return (
    <nav className="stepper" aria-label="Etapas">
      <ol>
        {STEPS.map((label, i) => (
          <li key={label} className={i === step ? 'current' : i < step ? 'done' : ''}>
            <button type="button" disabled={i >= step} onClick={() => onGo(i)} aria-current={i === step ? 'step' : undefined}>
              <span className="dot">{i + 1}</span>
              <span className="label">{label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function OptionGroup({ label, options, value, onChange }) {
  return (
    <div className="field">
      <span className="field-label" id={`g-${label.replace(/\s+/g, "-")}`}>{label}</span>
      <div className="chips" role="group" aria-labelledby={`g-${label.replace(/\s+/g, "-")}`}>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`chip ${value === o.id ? 'on' : ''}`}
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
          >
            {o.label || o.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Etapas ---------- */

function HomeStep({ onStart, onPickExample }) {
  return (
    <section className="home">
      <div className="hero-image">
        <img
          src={heroImage}
          alt="IDERRARA – Logo Marcas: lâmpada com pena de caneta-tinteiro e órbitas luminosas em azul"
        />
      </div>
      <div className="home-text">
        <h1>Crie a marca do seu negócio</h1>
        <p className="lead">
          Informe seu nome, escolha um estilo e personalize cores, fontes e formatos. Em poucos passos você baixa a sua
          logomarca em PNG ou SVG.
        </p>
        <button type="button" className="btn primary big" onClick={onStart}>Começar</button>

        <h2>Exemplos de marcas</h2>
        <div className="examples">
          {EXAMPLES.map((e) => (
            <button
              key={e.styleId}
              type="button"
              className="example"
              aria-label={`Criar marca no estilo ${e.caption}`}
              onClick={() => onPickExample(e.styleId)}
            >
              <span className="example-art" style={{ background: e.design.bg }}>
                <Logo config={e.design} className="example-logo" />
              </span>
              <span className="example-caption">{e.caption}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NameStep({ input, setInput }) {
  const initials = getInitials(input.text);
  return (
    <section>
      <h1>Qual é o nome da sua marca?</h1>
      <p className="lead">Digite seu nome, sobrenome ou as iniciais (por exemplo, “AC”) e escolha o ramo do negócio.</p>
      <div className="form">
        <label className="field">
          <span className="field-label">Nome, sobrenome ou iniciais</span>
          <input
            type="text"
            value={input.text}
            maxLength={40}
            placeholder="Ex.: Ana Clara"
            onChange={(e) => setInput({ ...input, text: e.target.value })}
          />
        </label>
        {initials && (
          <p className="hint">
            {isInitialsInput(input.text) ? 'Iniciais informadas' : 'Iniciais geradas'}: <strong>{initials}</strong>
          </p>
        )}
        <label className="field">
          <span className="field-label">Ramo do negócio</span>
          <select value={input.business} onChange={(e) => setInput({ ...input, business: e.target.value })}>
            {BUSINESSES.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </label>
        {input.business === 'outro' && (
          <label className="field">
            <span className="field-label">Qual é o ramo?</span>
            <input
              type="text"
              value={input.customBusiness}
              maxLength={20}
              placeholder="Ex.: Pet shop"
              onChange={(e) => setInput({ ...input, customBusiness: e.target.value })}
            />
          </label>
        )}
      </div>
    </section>
  );
}

function StyleStep({ styleId, setStyleId, previewText, initials }) {
  return (
    <section>
      <h1>Escolha um estilo</h1>
      <p className="lead">O estilo define cores, fonte e formato iniciais. Você poderá ajustar tudo depois.</p>
      <div className="style-grid" role="radiogroup" aria-label="Estilos">
        {STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={styleId === s.id}
            className={`style-card ${styleId === s.id ? 'on' : ''}`}
            onClick={() => setStyleId(s.id)}
          >
            <Logo config={buildDesign(s.id, previewText, initials)} className="style-preview" />
            <strong>{s.label}</strong>
            <span>{s.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function NamesStep({ suggestions, selected, setChosen, freeText, setFreeText }) {
  return (
    <section>
      <h1>Escolha o nome da marca</h1>
      <p className="lead">Veja composições sugeridas ou escreva o texto que preferir.</p>
      <div className="name-list" role="radiogroup" aria-label="Sugestões de nomes">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={selected === s}
            className={`name-option ${selected === s ? 'on' : ''}`}
            onClick={() => { setChosen(s); setFreeText(''); }}
          >
            {s}
          </button>
        ))}
      </div>
      <label className="field">
        <span className="field-label">Ou escreva um texto livre</span>
        <input
          type="text"
          value={freeText}
          maxLength={40}
          placeholder="Ex.: Ateliê Ana Clara"
          onChange={(e) => setFreeText(e.target.value)}
        />
      </label>
    </section>
  );
}

function CustomizeStep({ design, setDesign }) {
  const set = (patch) => setDesign({ ...design, ...patch });
  const applyPalette = (p) => set({ palette: p.id, bg: p.bg, fg: p.fg, accent: p.accent });
  const setColor = (key, value) => set({ palette: 'custom', [key]: value });
  const hasShape = design.shape !== 'none';

  return (
    <section>
      <h1>Personalize sua marca</h1>
      <div className="studio">
        <div className="preview-col">
          <div className="preview">
            <Logo config={design} className="preview-svg" />
          </div>
        </div>

        <div className="controls">
          <fieldset>
            <legend>Textos</legend>
            <label className="field">
              <span className="field-label">Nome da marca</span>
              <input type="text" value={design.text} maxLength={40} onChange={(e) => set({ text: e.target.value })} />
            </label>
            <label className="field">
              <span className="field-label">Iniciais</span>
              <input type="text" value={design.initials} maxLength={4} onChange={(e) => set({ initials: e.target.value.toUpperCase() })} />
            </label>
            <label className="field">
              <span className="field-label">Frase de apoio (opcional)</span>
              <input type="text" value={design.tagline} maxLength={36} placeholder="Ex.: beleza real" onChange={(e) => set({ tagline: e.target.value })} />
            </label>
          </fieldset>

          <fieldset>
            <legend>Cores</legend>
            <div className="swatches">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`swatch ${design.palette === p.id ? 'on' : ''}`}
                  title={p.name}
                  aria-label={`Paleta ${p.name}`}
                  aria-pressed={design.palette === p.id}
                  onClick={() => applyPalette(p)}
                  style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.accent} 50%)`, borderColor: p.fg }}
                />
              ))}
            </div>
            <div className="colors">
              <label>Fundo <input type="color" value={design.bg} onChange={(e) => setColor('bg', e.target.value)} /></label>
              <label>Texto <input type="color" value={design.fg} onChange={(e) => setColor('fg', e.target.value)} /></label>
              <label>Destaque <input type="color" value={design.accent} onChange={(e) => setColor('accent', e.target.value)} /></label>
            </div>
            <label className="check">
              <input type="checkbox" checked={design.transparent} onChange={(e) => set({ transparent: e.target.checked })} />
              Fundo transparente
            </label>
          </fieldset>

          <fieldset>
            <legend>Fonte</legend>
            <div className="chips">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`chip ${design.font === f.id ? 'on' : ''}`}
                  aria-pressed={design.font === f.id}
                  style={{ fontFamily: f.family }}
                  onClick={() => set({ font: f.id })}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Formato e disposição</legend>
            <OptionGroup label="Formato" options={SHAPES} value={design.shape} onChange={(v) => set({ shape: v })} />
            <label className="check">
              <input type="checkbox" checked={design.filled} disabled={!hasShape} onChange={(e) => set({ filled: e.target.checked })} />
              Formato preenchido
            </label>
            <OptionGroup label="Disposição" options={LAYOUTS} value={design.layout} onChange={(v) => set({ layout: v })} />
            <OptionGroup label="Iniciais e nome" options={ORGANIZATIONS} value={design.organization} onChange={(v) => set({ organization: v })} />
          </fieldset>

          <fieldset>
            <legend>Elementos gráficos</legend>
            <OptionGroup label="Ícone" options={ICONS} value={design.icon} onChange={(v) => set({ icon: v })} />
            <label className="check">
              <input type="checkbox" checked={design.divider} onChange={(e) => set({ divider: e.target.checked })} />
              Linha decorativa
            </label>
          </fieldset>
        </div>
      </div>
    </section>
  );
}

function FinishStep({ design, onRestart, onBack }) {
  const desc = useMemo(() => describeLogo(design), [design]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const slug = fileSlug(design.text);
  const font = getFont(design.font);

  const savePng = async () => {
    setBusy(true);
    setError('');
    try {
      downloadBlob(await toPng(desc), `${slug}.png`);
    } catch (e) {
      setError('Não foi possível gerar o PNG neste navegador. Tente baixar o SVG.');
    } finally {
      setBusy(false);
    }
  };

  const colors = [
    ['Fundo', design.bg],
    ['Texto', design.fg],
    ['Destaque', design.accent],
  ];

  return (
    <section>
      <h1>Finalize sua marca</h1>
      <div className="finish">
        <div className="preview">
          <Logo description={desc} config={design} className="preview-svg" />
        </div>
        <div className="finish-side">
          <h2>Baixar</h2>
          <div className="actions">
            <button type="button" className="btn primary" onClick={savePng} disabled={busy}>
              {busy ? 'Gerando…' : 'Baixar PNG'}
            </button>
            <button type="button" className="btn" onClick={() => downloadSvg(desc, `${slug}.svg`)}>Baixar SVG</button>
          </div>
          {error && <p className="error" role="alert">{error}</p>}
          <p className="hint">PNG para redes sociais e documentos; SVG para impressão e ampliação sem perda de qualidade.</p>

          <h2>Identidade visual</h2>
          <ul className="palette-list">
            {colors.map(([name, hex]) => (
              <li key={name}>
                <span className="chip-color" style={{ background: hex }} />
                {name}: <code>{hex.toUpperCase()}</code>
              </li>
            ))}
          </ul>
          <p>Fonte: <strong>{font.name}</strong></p>
          <ul className="tips">
            <li>Use no máximo 3 cores e 2 fontes em todos os materiais.</li>
            <li>Deixe um espaço livre ao redor da logomarca; não a encoste em bordas ou outros elementos.</li>
            <li>Teste em tamanho pequeno (foto de perfil) para ver se continua legível.</li>
            <li>Use o PNG transparente sobre fotos e fundos coloridos; mantenha o contraste com o fundo.</li>
            <li>Repita as mesmas cores e fontes em cartão, embalagens e redes sociais.</li>
          </ul>
          <div className="actions">
            <button type="button" className="btn" onClick={onBack}>Voltar e ajustar</button>
            <button type="button" className="btn" onClick={onRestart}>Criar outra marca</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- App ---------- */

const EMPTY_INPUT = { text: '', business: 'beleza', customBusiness: '' };

export default function App() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState(EMPTY_INPUT);
  const [styleId, setStyleId] = useState(null);
  const [chosen, setChosen] = useState('');
  const [freeText, setFreeText] = useState('');
  const [design, setDesign] = useState(null);

  const initials = getInitials(input.text);
  const words = businessWords(input.business, input.customBusiness);
  const suggestions = useMemo(() => suggestNames(input.text, words), [input.text, input.business, input.customBusiness]); // eslint-disable-line react-hooks/exhaustive-deps
  const free = cleanText(freeText);
  const selected = free ? '' : suggestions.includes(chosen) ? chosen : suggestions[0] || '';
  const finalText = free || selected;
  const previewText = suggestions[0] || cleanText(input.text).toUpperCase();

  const canContinue =
    (step === 1 && cleanText(input.text).length > 0) ||
    (step === 2 && Boolean(styleId)) ||
    (step === 3 && finalText.length > 0) ||
    step === 4;

  const goNext = () => {
    if (step === 3) {
      const key = [styleId, finalText, initials].join('|');
      if (!design || design.key !== key) setDesign({ ...buildDesign(styleId, finalText, initials), key });
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const restart = () => {
    setInput(EMPTY_INPUT);
    setStyleId(null);
    setChosen('');
    setFreeText('');
    setDesign(null);
    setStep(1);
  };

  return (
    <div className="app">
     <div className="stage">
      <header className="topbar">
        <button type="button" className="brand" onClick={() => setStep(0)} aria-label="Ir para o início">
          IDERRARA <small>logo marcas</small>
        </button>
        {step > 0 && <Stepper step={step} onGo={setStep} />}
      </header>

      <main className="card">
        <div className="content">
        {step === 0 && <HomeStep onStart={() => setStep(1)} onPickExample={(id) => { setStyleId(id); setStep(1); }} />}
        {step === 1 && <NameStep input={input} setInput={setInput} />}
        {step === 2 && <StyleStep styleId={styleId} setStyleId={setStyleId} previewText={previewText} initials={initials} />}
        {step === 3 && (
          <NamesStep suggestions={suggestions} selected={selected} setChosen={setChosen} freeText={freeText} setFreeText={setFreeText} />
        )}
        {step === 4 && design && <CustomizeStep design={design} setDesign={setDesign} />}
        {step === 5 && design && <FinishStep design={design} onRestart={restart} onBack={() => setStep(4)} />}
        </div>

        {step > 0 && step < STEPS.length - 1 && (
          <div className="nav">
            <button type="button" className="btn" onClick={() => setStep(step - 1)}>Voltar</button>
            <button type="button" className="btn primary" disabled={!canContinue} onClick={goNext}>
              {step === 4 ? 'Finalizar' : 'Continuar'}
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        O IDERRARA apoia a criação de identidades visuais. Não garante disponibilidade nem registro legal da marca;
        a verificação de marcas existentes (por exemplo, no INPI) deve ser feita separadamente.
      </footer>
     </div>
    </div>
  );
}
