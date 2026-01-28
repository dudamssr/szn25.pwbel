const express = require("express");
const router = express.Router();

const musicasController = require("../controllers/musicas.controllers");


router.get("/musicas", musicasController.listar);
router.get("/musicas/:id", musicasController.buscar);
router.post("/musicas", musicasController.cadastrar);
router.delete("/musicas/:id", musicasController.apagar);
router.put("/musica", musicasController.alterar);
router.patch("/musicas/:id", musicasController.atualizar);

module.exports = router;
