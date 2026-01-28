const express = require("express"); 
const router = express.Router();

const playlistController = require("../controllers/playlist.controllers");


router.get("/playlist", playlistController.listar);
router.get("/playlist/:id", playlistController.buscar);
router.post("/playlist", playlistController.cadastrar);
router.delete("/playlist/:id", playlistController.apagar);
router.put("/playlist", playlistController.alterar);
router.patch("/playlist/:id", playlistController.atualizar);

module.exports = router;
