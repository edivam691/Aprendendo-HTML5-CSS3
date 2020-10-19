const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/dados_cliente');
const dadosCliente = mongoose.model('dados_clientes');

router.post('/form_contato', (req, res) => {

    dadosCliente.findOne({ senha: req.body.t_senha }).then((senha) => {

        if (senha) {

            res.render('_textos/senha_existente');

        } else {

            const cadastroDadosCliente = {

                nome: req.body.t_nome,
                senha: req.body.t_senha,
                email: req.body.t_email,
                sexo: req.body.sexo,
                data: req.body.d_nasc,
                logradouro: req.body.t_lograd,
                numero: req.body.t_num,
                estado: req.body.t_estd,
                cidade: req.body.t_cidade
            }

            new dadosCliente(cadastroDadosCliente).
                save().then(() => {
                    res.render('_textos/senhas_salvas');

                    console.log('dados salvos com sucesso!')

                }).catch((err) => {

                    console.log('erro ao tentar salvar os dados! ' + err)

                    res.render('_textos/error');
                });

        }

    }).catch((err) => {

        console.log('houve um erro ao pesquisar senha! ' + err);
        res.render('_textos/error');
    });

});


module.exports = router;