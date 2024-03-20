const tarefasModel = require("../models/models");


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
            .withMessage("Email invalido "),
        if(req.body.senha){
            
        }else{
            (err)
        }



    ],


}






module.exports = TarefasControl;