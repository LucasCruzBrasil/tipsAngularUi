const express = require('express');
// iniciar o express
const app = express();
const appName = "interface-angular";
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/picTip'))

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/picTip/index.html')
})

app.listen(PORT, () => {
    console.log('servido iniciado na porta' + PORT)
})