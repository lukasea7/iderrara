import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('página inicial mostra a imagem da marca e exemplos', () => {
  render(<App />);
  expect(screen.getByAltText(/IDERRARA – Logo Marcas/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /crie a marca do seu negócio/i })).toBeInTheDocument();
  expect(screen.getByText('Exemplos de marcas')).toBeInTheDocument();
});

test('exemplos de marcas são clicáveis e levam ao fluxo com o estilo escolhido', () => {
  render(<App />);
  userEvent.click(screen.getByRole('button', { name: /estilo Criativo/i }));
  expect(screen.getByRole('heading', { name: /qual é o nome da sua marca/i })).toBeInTheDocument();
  userEvent.type(screen.getByLabelText(/nome, sobrenome ou iniciais/i), 'Lua');
  userEvent.click(screen.getByRole('button', { name: 'Continuar' }));
  expect(screen.getByRole('radio', { name: /criativo/i })).toHaveAttribute('aria-checked', 'true');
});

test('fluxo completo até a finalização', () => {
  render(<App />);
  userEvent.click(screen.getByRole('button', { name: 'Começar' }));

  const next = () => userEvent.click(screen.getByRole('button', { name: /^(continuar|finalizar)$/i }));
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();

  userEvent.type(screen.getByLabelText(/nome, sobrenome ou iniciais/i), 'Ana Clara');
  next();

  expect(screen.getByRole('heading', { name: /escolha um estilo/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
  userEvent.click(screen.getByRole('radio', { name: /elegante/i }));
  next();

  expect(screen.getByRole('radio', { name: 'ANA CLARA MAKEUP' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: 'AC – MAKEUP STUDIO' })).toBeInTheDocument();
  userEvent.click(screen.getByRole('radio', { name: 'AC BEAUTY' }));
  next();

  expect(screen.getByRole('heading', { name: /personalize sua marca/i })).toBeInTheDocument();
  expect(screen.getByLabelText('Nome da marca')).toHaveValue('AC BEAUTY');
  next();

  expect(screen.getByRole('heading', { name: /finalize sua marca/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Baixar PNG' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Baixar SVG' })).toBeInTheDocument();
});
