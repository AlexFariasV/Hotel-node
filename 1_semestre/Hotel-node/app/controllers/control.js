const tarefasModel = require("../models/models");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const TarefasControl = {

    Criarussuario: async (req, res) => {
        try {
            const resultados = await tarefasModel.create(req.body)
            res.render("pages/template-home", { pagina: "home", logado: null });

        } catch (error) {
            return error;
        }
    },
    regrasValidacao: [
        body("nome")
            .isLength({ min: 5, max: 45 })
            .withMessage("Nome invalido "),

        body("prazo").isISO8601(),
        body("situacao").isNumeric(),

        body("email")
            .isEmail()
            .withMessage("Email invalido "),
        body("senha")
            .isEmail()
            .withMessage("senha invalido, deve conter pelo menos 8 digitos ")
            .isLength({ min: 8, max: 30 }),
        body("c-senha").custom((value, { req }) => {
            if (value !== req.body.senha) {
                throw new Error("Senhas diferentes");
            }else {
                (err)
            }
            return true;
        })

    ],
    
   /*  VerficacaoCadastro: async (req, res) => {
        res.locals.moment = moment;
        try {
          results = await tarefasModel.findAll();
          res.render("pages/template-home", { tarefas: results });
        } catch (e) {
          console.log(e); // exibir os erros no console do vs code
          res.json({ erro: "Falha ao acessar dados" });
        } */


}


module.exports = TarefasControl;