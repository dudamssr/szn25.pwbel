const express = require("express");
const router = express.Router();

const playlist_musicaController = require("../controllers/playlist_musica.controllers");


router.get("/playlist_musica", playlist_musicaController.listar);
router.get("/playlist_musica/:id", playlist_musicaController.buscar);
router.post("/playlist_musica", playlist_musicaController.cadastrar);
router.delete("/playlist_musica/:id", playlist_musicaController.apagar);
router.put("/playlist_musica", playlist_musicaController.alterar);
router.patch("/playlist_musica/:id", playlist_musicaController.atualizar);

module.exports = router;
