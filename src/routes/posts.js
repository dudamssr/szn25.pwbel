const postsController = require("../controllers/posts");
const validate = require("../middlewares/auth"); 

const express = require('express');

const {validaGerente, validaSupervisor} = require("../middlewares/validaCargo"); 

postsRoutes = express.Router();

postsRoutes.get('/posts', validate, validaGerente, postsController.listarposts);
postsRoutes.post("/cadastrar/post", validate, validaGerente,postsController.cadastrarpost);
postsRoutes.delete("/post/:id", validate, validaSupervisor, postsController.excluirPost);
postsRoutes.put("/post", validate,validaSupervisor, postsController.atualizarPost);

module.exports = postsRoutes;