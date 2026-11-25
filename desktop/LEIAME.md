# IDERRARA – aplicativo de desktop (opcional)

Gera um executável (.exe no Windows, .dmg no Mac, AppImage no Linux).

```bash
cd desktop
npm install
npm run dist      # executável gerado na pasta desktop/dist
npm start         # apenas abrir em janela, sem gerar o instalador
```

O arquivo `IDERRARA.html` é a versão autônoma do app. Para atualizá-la depois de
mudar o código, gere o HTML de novo e copie para esta pasta.
