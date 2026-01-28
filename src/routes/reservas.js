const express = require('express');
const reservaController = require('../controllers/reservas');

const reservaRoutes = express.Router();

reservaRoutes.get('/reserva', reservaController.listarReservas);
reservaRoutes.post("/cadastrar/reserva", reservaController.cadastrarReservas);
reservaRoutes.delete("/reserva/:id", reservaController.excluirReservas);
reservaRoutes.put("/reserva/:id", reservaController.atualizarReservas);
reservaRoutes.get("reserva/:aluno", reservaController.totalReservasPorAluno);
reservaRoutes.get("reserva/:sala", reservaController.totalReservasPorSala);

module.exports = reservaRoutes;
