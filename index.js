const app = require('./src/config/express');
require('./src/config/database.js')

require('./src/app/routes/usuarioRoutes')(app);
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API funcionando!'
    });
});

app.listen(3000, () => {
    console.log("SERVIDOR RODANDO");
});