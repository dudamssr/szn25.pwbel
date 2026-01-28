

const express = require('express');
const medicoController = require('../controllers/medico');

const medicoRoutes = express.Router();

medicoRoutes.get('/consultas/:medicoId', medicoController.listarConsultas);
medicoRoutes.put('/consulta/:id/status', medicoController.atualizarStatusConsulta);
medicoRoutes.put('/consulta/:id/observacoes', medicoController.adicionarObservacao);
medicoRoutes.post('/medico:login', medicoController.login);

module.exports = medicoRoutes;
