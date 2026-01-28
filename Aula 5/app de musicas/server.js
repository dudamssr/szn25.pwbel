const express = require("express"); //Importa um modulo
const cors = require("cors"); 

const app = express();

app.use(express.json()); //Habilita oomunicaçao via JSON
app.use(cors()); //Habilita requisiçao local

musicasRoutes = require("./src/routes/musicas.routes");
usuariosRoutes = require("./src/routes/usuarios.routes");
playlistRoutes = require("./src/routes/playlist.routes");
playlist_musicaRoutes = require("./src/routes/playlist_musica.routes");
possuiRoutes = require("./src/routes/possui.routes");

//Importar as rotas configuradas
app.use(musicasRoutes);
app.use(usuariosRoutes);
app.use(playlistRoutes);
app.use(playlist_musicaRoutes);
app.use(possuiRoutes);


app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});