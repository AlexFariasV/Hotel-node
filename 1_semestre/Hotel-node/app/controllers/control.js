const tarefasModel = require("../models/models");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const TarefasControl = {

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
            const resultados = await tarefasModel.create(req.body)
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
            .withMessage("Email invalido "),

        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("senha invalido, deve conter pelo menos 8 digitos "),

    ],




}


module.exports = TarefasControl;