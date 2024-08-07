const { validationResult } = require("express-validator");
const usuario = require("../models/models");
const bcrypt = require("bcryptjs");

verificarUsuAutenticado = (req, res, next) => {
    if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
        req.session.logado = req.session.logado + 1;
    } else {
        var autenticado = { autenticado: null, id: null, tipo: null };
        req.session.logado = 0;
    }
    req.session.autenticado = autenticado;
    next();
}

limparSessao = (req, res, next) => {
    req.session.destroy();
    next()
}

gravarUsuAutenticado = async (req, res, next) => {
    erros = validationResult(req)
    if (erros.isEmpty()) {
        /* var dadosForm = {
            email_usuario: req.body.email,
            senha_usuario: req.body.senha,
        }; 
        var results = await usuario.findByEmail(dadosForm); */

        const errorLogin = {
            errors: [
                { msg: 'Email ou Senha incorreta', path: 'email' },
            ]
        }

        var results = await usuario.findByEmail(req.body.email); 
        var total = Object.keys(results).length;
       /*  console.log(results)
        console.log(bcrypt.compareSync(req.body.senha, results[0].senha_usuario)) */
        if (total == 1) {
            if (bcrypt.compareSync(req.body.senha, results[0].senha_usuario)) {

               
                var autenticado = {
                    autenticado: results[0].nome_usuario,
                    id: results[0].id_usuario,
                    tipo: results[0].tipo_usuario
                };
            } else {
                // erro senha incorreta
                return res.render("pages/template-home", {pagina:"login", logado:null, dados: req.body, listaErros: errorLogin,dadosNotificacao: null  })
            }
        } else {
            // var autenticado =  { autenticado: null, id: null, tipo: null };
            // erro email nao encontrado
            return res.render("pages/template-home", {pagina:"login", logado:null, dados: req.body, listaErros: errorLogin, dadosNotificacao: null })
        }
    } /* else {
        // var autenticado =  { autenticado: null, id: null, tipo: null };
    } */
    req.session.autenticado = autenticado;
    req.session.logado = 0;
    next();
}

// gravar o usuario - 

/* gravarUsuAutenticadoCadastro = (req, res, next) => {
    const erros = validationResult(req)
    if (erros.isEmpty()) {
        var autenticado = {
            autenticado: req.body.nome,
            // id: results[0].id_usuario,
            tipo: req.body.type
        }
    }
    req.session.autenticado = autenticado
    next()
} */

//verrificar usuario - 

verificarUsuAutorizado = (tipoPermitido, destinoFalha) => {
    return (req, res, next) => {
        if (req.session?.autenticado != null && tipoPermitido.find((item) => { return item == req.session.autenticado.tipo }) != undefined) {
            next();
        } else {
            res.render(destinoFalha, { autenticado: req.session.autenticado });
        }
    };
}

module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado,
    verificarUsuAutorizado,
    /* gravarUsuAutenticadoCadastro */
}
