var express = require("express");
var router = express.Router();
var TarefasControl = require("../controllers/control")
const tipoQuartosController = require("../controllers/tipoQuartosController");
const { body, validationResult } = require("express-validator");


router.get("/", function (req, res) {
    res.render("pages/template-home", {pagina:"home", logado:null});
});
/* ====================================NovasRotas=================================================== */
router.get("/quartos", function (req, res) {
    tipoQuartosController.listarTiposQuartos(req, res);
});

router.get("/quartos-estatico", function (req, res) {
    res.render("pages/template-home", {pagina:"quartos-estatico", logado:null});
});

/* ======================================================================================= */
router.get("/login", function (req, res) {
    res.render("pages/template-home", {pagina:"login", logado:null});
});
router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", {pagina:"cadastro", logado:null, retorno: null, listaErros: null, dados: null
    
    /* valores: { nome_usuario: ""  , email_usuario:"", senha_usuario:""   } */   });
});
router.post("/cadastro", TarefasControl.regrasValidacao,  async function (req, res) {
    TarefasControl.Criarussuario(req,res)
});

router.get("/perfil", function (req, res) {
    res.render("pages/template-home", {pagina:"perfil", logado:"logado"});
});

router.get("/adm", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"index"});
});
router.get("/adm-cliente", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/index"});
});

router.get("/adm-cliente-novo", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/create"});
});

router.get("/adm-cliente-edit", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/edit"});
});

router.get("/adm-cliente-list", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/detalhes"});
});

router.get("/adm-cliente-del", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/delete"});
});

module.exports = router;
