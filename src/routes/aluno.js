const express = require('express');
const alunoController = require('../controllers/aluno');

const alunoRoutes = express.Router();

alunoRoutes.get('/aluno', alunoController.listarAlunos);
alunoRoutes.post("/cadastrar/aluno", alunoController.cadastrarAlunos);
alunoRoutes.delete("/aluno/:id", alunoController.excluirAlunos);
alunoRoutes.put("/aluno/:id", alunoController.atualizarAlunos);

module.exports = alunoRoutes;



