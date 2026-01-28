const express = require("express");
const router = express.Router();

const possuiController = require("../controllers/possui.controllers");

router.get("/possui", possuiController.listar);
router.get("/possui/:id", possuiController.buscar);
router.post("/possui", possuiController.cadastrar);
router.delete("/possui/:id", possuiController.apagar);
router.put("/possui/", possuiController.alterar);
router.patch("/possui/:id", possuiController.atualizar);

module.exports = router;
