var pool = require("../../config/pool_conexoes");

const tarefasModel = {
    create: async (data) => {
        try {
            const [linhas] = await pool.query('INSERT INTO usuario (`nome_usuario`, `email_usuario`,`senha_usuario`  ) VALUES ( ? , ? , ? ) ', [ data.nome, data.email, data.senha  /* , data.c-senha */  ])  
            return linhas;

        } catch (error) {
            return error;
        }
    },
  
};

/* 
router.post("/verifica",

    body("dia", "", "", "").isInt({min:1,max:7}).withMessage("Valor Inválido!"),


    function (req, res) {
        let erros = validationResult(req);
        if(erros.isEmpty()){
            //não tem erro
            let dia = Number(req.body.dia);
            let resultado = funcao.verificaDiaSemana(dia);
            res.render("pages/index", { retorno: { dia_semana: resultado }, listaErros: null, valores: req.body })
        }else{
            //tem erro
            console.log(erros);
            res.render("pages/index", { retorno: null, listaErros: erros, valores: req.body })
        }

 

    }

); */



module.exports = tarefasModel;
