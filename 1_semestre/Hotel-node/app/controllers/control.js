const tarefasModel = require("../models/models");


const TarefasControl ={

    Criarussuario: async ( req, res) => {
        try {
            
            const resultados = await tarefasModel.create(req.body)

        } catch (error) {
            return error;
        }
    },

}

module.exports = TarefasControl;