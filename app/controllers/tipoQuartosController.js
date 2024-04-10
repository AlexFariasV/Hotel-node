const tipoQuartosModel = require("../models/tipoQuartos");
const tipoQuartosController = {
  regrasValidacao: [],

  listarTiposQuartos: async (req, res) => {
    try {
      results = await tipoQuartosModel.findAll();
      res.render("pages/template-home", { listaTipoQuartos: results,pagina:"quartos", logado:null });
    } catch (e) {
      console.log(e); // exibir os erros no console do vs code
      res.json({ erro: "Falha ao acessar dados" });
    }
  },


};

module.exports = tipoQuartosController;
