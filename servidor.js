const express = require('express');
const path = require('path');

const app = express();

// Porta dinâmica para compatibilidade com EasyPanel / Docker / Heroku ou fallback local 5173
const PORT = process.env.PORT || 5173;
const HOST = '0.0.0.0';

// Configuração de cache e entrega de arquivos estáticos
app.use(express.static(path.join(__dirname), {
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Rota fallback para navegação direta ou refresh de página
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Servidor da Aura Digital rodando com sucesso!`);
  console.log(`📡 Porta: ${PORT} | Host: ${HOST}`);
  console.log(`🔗 Acesse: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
