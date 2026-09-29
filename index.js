const express = require('./config/express');
const { conectarBanco } = require('./database');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API funcionando!'
    });
});

app.listen(3000, async () => {
    console.log('Servidor rodando em http://localhost:3000');

    await conectarBanco();
});