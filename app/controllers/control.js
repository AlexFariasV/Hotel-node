const tarefasModel = require("../models/models");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const salt = bycrypt.genSaltSync(12)

const TarefasControl = {

    logar: (req, res) => {
        const erros = validationResult(req);

        if (!erros.isEmpty()) {
            
            return res.render("pages/template-home", {pagina:"login", logado:null, dados: req.body, listaErros: erros })
        }

        if (req.session.autenticado != null) {
            res.redirect("/");
        } else {
            res.render("pages/template-home", {pagina:"login", logado:null, dados: null, listaErros: null,})
        }

        /* req.flash('success', 'Usuário logado') */

        if (req.session.autenticado.tipo == 1) {
            res.redirect("/quartos");
        } else if (req.session.autenticado.tipo == 3) {
            res.redirect("/adm");
        } 

    },

    regrasValidacaoFormLogin: [
        body("email")
        .isEmail()
        .withMessage("Email invalido "),
        body("senha")
        .isLength({ min: 8, max: 30 })
        .withMessage("Senha inválida, deve conter pelo menos 8 caracteres")
        .bail()
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
        .withMessage("Senha inválida, deve conter pelo menos 1 letra, 1 número e 1 caractere especial"),
          
    ],


    Criarussuario: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return res.render("pages/template-home", {
            dados: req.body,
            listaErros: errors,
            pagina: "cadastro",
            logado: null

          });
        }
        try {
            const resultados = await tarefasModel.create({...req.body,senha: bycrypt.hashSync(req.body.senha)})
            res.render("pages/template-home", { pagina: "home", logado: null, });

        } catch (error) {
            return error;
        }
    },
    regrasValidacao: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),

        body("email")
            .isEmail()
            .withMessage("Email invalido ")
            .custom(async (value) => {
                const email = await tarefasModel.findByEmail(value)
                if (email.length > 0) {
                    throw new Error('Email já utilizado.');
                }
                return true;
            
            }), 

        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("senha invalido, deve conter pelo menos 8 digitos "),

        body("c-senha")
            .notEmpty()
            .withMessage('Campo vazio.')
            .custom((value, { req }) => {
                const senha = req.body.senha
                if (value != senha) {
                    throw new Error('Senha diferentes.')
                }
                return true;
            })
    ],

   
   
}


module.exports = TarefasControl;