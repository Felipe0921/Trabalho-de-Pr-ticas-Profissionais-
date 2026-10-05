const app = require('./src/config/express');
const { mssql } = require('./src/config/database');

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API funcionando!'
    });
});

app.listen(3000, async () => {
    console.log('Servidor rodando em http://localhost:3000');
});