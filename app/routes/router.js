var express = require("express");
var router = express.Router();
var TarefasControl = require("../controllers/control")
const tipoQuartosController = require("../controllers/tipoQuartosController");
const { body, validationResult } = require("express-validator");
const {gravarUsuAutenticado} = require('../models/autenticador_middleware')


router.get("/", function (req, res) {
    res.render("pages/template-home", {pagina:"home", logado:null});
});
router.get("/quartos", function (req, res) {
    tipoQuartosController.listarTiposQuartos(req, res);
});

router.get("/quartos-estatico", function (req, res) {
    res.render("pages/template-home", {pagina:"quartos-estatico", logado:null});
});

router.get("/login", function (req, res) {
    res.render("pages/template-home", {pagina:"login", logado:null, dados: null, listaErros: null});
});
router.post('/login', TarefasControl.regrasValidacaoFormLogin, gravarUsuAutenticado , function (req, res) {
    TarefasControl.logar(req, res);
})

router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", {pagina:"cadastro", logado:null, retorno: null, listaErros: null, dados: null, dadosNotificacao: null
});
});
router.post("/cadastro", TarefasControl.regrasValidacao,  async function (req, res) {
    TarefasControl.Criarussuario(req,res)
});

router.get("/perfil", function (req, res) {
    res.render("pages/template-home", {pagina:"perfil", logado:"logado"});
});

router.get("/adm", verificarUsuAutorizado([3], 'pages/restrito') ,function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"index"});
});
router.get("/adm-cliente",verificarUsuAutorizado([3], 'pages/restrito') , function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/index"});
});

router.get("/adm-cliente-novo", verificarUsuAutorizado([3], 'pages/restrito') ,function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/create"});
});

router.get("/adm-cliente-edit",verificarUsuAutorizado([3], 'pages/restrito') , function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/edit"});
});

router.get("/adm-cliente-list",verificarUsuAutorizado([3], 'pages/restrito') , function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/detalhes"});
});

router.get("/adm-cliente-del",verificarUsuAutorizado([3], 'pages/restrito') , function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/delete"});
});

module.exports = router;
