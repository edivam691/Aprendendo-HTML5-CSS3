const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dadosCliente = new schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }, 
    logradouro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    }
});

mongoose.model('dados_clientes', dadosCliente);