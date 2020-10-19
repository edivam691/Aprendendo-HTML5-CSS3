const express = require('express');
const bodyParser = require('body-parser');
const contato = require('./routers/form_contato');
const path = require('path');
const session = require('express-session');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./models/dados_cliente');
const dadosCliente = mongoose.model('dados_clientes');
const db = require('./config/db');

//settings:

//session
app.use(session({
    secret: 'rdfetyuioapkq',
    resave: true,
    saveUninitialized: true
}));

//bordyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongoose
mongoose.promise = global.Promise
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('conectado com sucesso!');
}).catch((err) => {
    console.log('error ao se conectar ' + err);
});

//public
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//routers

app.get('/', (req, res) => {
    res.render('_textos/index-txt');
});

app.get('/_textos/validar_senha', (req, res) => {

    res.render('_textos/validar_senha');
});

app.post('/form_contato', contato);

app.post('/_textos/listar_dados', (req, res) => {

    dadosCliente.findOne({ senha: req.body.t_senha }).then((dados) => {

        if (dados) {

            res.render('_textos/listar_dados');

            const clientes = dados;

            io.on('connection', (socket) => {

                socket.emit('dadosCliente', (clientes));

            });

            let contador = io.listenerCount('connection');

            console.log(contador)

            if (contador == 10) {

                io.removeAllListeners('connection');

                contador = 0
            }


        } else {

            res.render('_textos/validar_senha');

            io.on('connection', (socket) => {

                const senha = false

                socket.emit('senhaInvalida', (senha));
            });

            let contador_1 = io.listenerCount('connection');

            console.log(contador_1)

            if (contador_1 == 10) {

                io.removeAllListeners('connection');

                contador_1 = 0
            }

        }

    }).catch((err) => {
        console.log('erro ao tentar salvar dados' + err);
        res.render('_textos/error');
    });
});


//others
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log('servidor de pé em http://localhost:3000')
});
