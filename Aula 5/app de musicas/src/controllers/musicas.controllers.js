const musicas = require("../data/musicas.data");

// LISTAR TODAS AS MÚSICAS
const listar = (req, res) => {
    res.status(200).send(musicas).end();
};


const buscar = (req, res) => {
    const idMusica = req.params.id;

    const musicaEncontrada = musicas.find((musica) => musica.id === idMusica);

    if (musicaEncontrada) {
        res.status(200).send(musicaEncontrada).end();
    } else {
        res.status(404).send("Música não encontrada").end();
    }
};


const cadastrar = (req, res) => {
    const novaMusica = req.body;
    musicas.push(novaMusica);
    res.status(201).send("Cadastrada com sucesso!").end();
};


const apagar = (req, res) => {
    const idMusica = req.params.id;

    const indice = musicas.findIndex((musica) => musica.id === idMusica);

    if (indice === -1) {
        res.status(404).send("Música não encontrada").end();
    } else {
        musicas.splice(indice, 1);
        res.status(204).end();
    }
};


const alterar = (req, res) => {
    const musicaAlterada = req.body;

    const indice = musicas.findIndex((musica) => musica.id === musicaAlterada.id);

    if (indice === -1) {
        res.status(404).send("Música não encontrada").end();
    } else {
        musicas[indice] = musicaAlterada;
        res.status(200).send("Música alterada com sucesso").end();
    }
};


const atualizar = (req, res) => {
    const idPlaylist = req.params.id;
    const novosDados = req.body;

    let indice = -1;

    musicas.forEach((pl, index) => {
        if (pl.id === idPlaylist) {
            indice = index;
        }
    });

    if (indice === -1) {
        res.status(404).send("Musica não encontrada").end();
    } else {
        if (novosDados && typeof novosDados === "object") {
            Object.keys(novosDados).forEach((key) => {
                musica[indice][key] = novosDados[key];
            });
        }
        res.status(200).send("Musica atualizada com sucesso").end();
    }
};



module.exports = {
    listar,
    buscar,
    cadastrar,
    apagar,
    alterar,
    atualizar
};
