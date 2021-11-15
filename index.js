const express = require('express');
const app = express();
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.use('/imgs',express.static(__dirname + '/imgs'));

app.use(expressFileUpload({
    limits: { fileSize: 5*1024*1024 },
    abortOnLimit: true,
    responseOnLimit:"Limite de archivo superado"
}));

app.get('/', (req, res) => {
    
    res.sendFile(__dirname+'/formulario.html');;
});
app.get('/collage', (req, res) => {
    res.sendFile(__dirname+'/collage.html');
});
app.post('/imagen', (req, res) => {
    const {target_file} = req.files;
    const {posicion} = req.body;
    target_file.mv(`${__dirname}/imgs/imagen-${posicion}.jpg`, (err) => {
        res.redirect('/collage');
        // res.send('Archivo subido');
    });
});

app.get('/deleteImg/:imagen', (req, res) => {
    const {imagen} = req.params;
    const path = `${__dirname}/imgs/${imagen}`;
    fs.unlink(path, (err) => {
        err
        ?res.send('Imagen no egiste en el servidor')
        :res.redirect('/collage');
    });
});

