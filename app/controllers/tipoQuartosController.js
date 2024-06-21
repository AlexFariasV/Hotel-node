const tipoQuartosModel = require("../models/tipoQuartos");
const tipoQuartosController = {
  regrasValidacao: [],

  listarTiposQuartos: async (req, res) => {
    try {
  /*     results = await tipoQuartosModel.findAll();
      res.render("pages/template-home", { listaTipoQuartos: results, pagina: "quartos", logado: null }); */

      let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
      let results = null
      let regPagina = 2
      let inicio = parseInt(pagina - 1) * regPagina
      let totReg = await tipoQuartosModel.totalReg();
      let totPaginas = Math.ceil(totReg[0].total / regPagina);
      results = await tipoQuartosModel.findPage(inicio, regPagina);
      let paginador = totReg[0].total <= regPagina
        ? null
        : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };
      /*  res.render("pages/index", { tarefas: results, paginador: paginador }); */
      res.render("pages/template-home", { listaTipoQuartos: results, pagina: "quartos", logado: null, paginador: paginador, dadosNotificacao: null });

    } catch (e) {
      console.log(e); // exibir os erros no console do vs code
      res.json({ erro: "Falha ao acessar dados" });
    }


    

  },



};

module.exports = tipoQuartosController;
