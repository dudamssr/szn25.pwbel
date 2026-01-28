
const express = require('express');
const administadorController = require('../controllers/administrador');


const administradorRoutes = express.Router();

administradorRoutes.post('/medico', administadorController.cadastrarMedico);
administradorRoutes.post('/paciente', administadorController.cadastrarPaciente);
administradorRoutes.post('/consulta', administadorController.agendarConsulta);
administradorRoutes.get('/consultas', administadorController.listarConsultas);
administradorRoutes.get('/consultas/relatorio-especialidade', administadorController.relatorioPorEspecialidade);
administradorRoutes.post('/administrador/login', administadorController.login);

module.exports = administradorRoutes;
