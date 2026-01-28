const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarios.controllers");


router.get("/usuarios", usuariosController.listar);
router.get("/usuarios/:id", usuariosController.buscar);
router.post("/usuarios", usuariosController.cadastrar);
router.delete("/usuarios/:id", usuariosController.apagar);
router.put("/usuarios/:id", usuariosController.alterar);
router.patch("/usuarios/:id", usuariosController.atualizar);

module.exports = router;
