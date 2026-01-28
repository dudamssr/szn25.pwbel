const express = require('express');
const salaController = require('../controllers/salas');

const salaRoutes = express.Router();

salaRoutes.get('/sala', salaController.listarSalas);
salaRoutes.post("/cadastrar/sala", salaController.cadastrarSalas);
salaRoutes.delete("/sala/:id", salaController.excluirSalas);
salaRoutes.put("/sala/:id", salaController.atualizarSalas);

module.exports = salaRoutes;
