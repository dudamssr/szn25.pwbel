const playlist_musica = require("../data/playlist_musica.data");

// Listar todas as playlists
const listar = (req, res) => {
    res.status(200).send(playlist_musica).end();
};

// Buscar playlist por ID
const buscar = (req, res) => {
    const idPlaylist = req.params.id;

    const playlistEncontrada = playlist_musica.find(pl => pl.id === idPlaylist);

    if (playlistEncontrada) {
        res.status(200).send(playlistEncontrada).end();
    } else {
        res.status(404).send("Playlist não encontrada").end();
    }
};

// Cadastrar nova playlist
const cadastrar = (req, res) => {
    const novaPlaylist = req.body;
    playlist_musica.push(novaPlaylist);
    res.status(201).send("Cadastrada com sucesso!").end();
};

// Apagar playlist por ID
const apagar = (req, res) => {
    const idPlaylist = req.params.id;

    const indice = playlist_musica.findIndex(pl => pl.id === idPlaylist);

    if (indice === -1) {
        res.status(404).send("Playlist não encontrada").end();
    } else {
        playlist_musica.splice(indice, 1);
        res.status(204).end();
    }
};

// Alterar playlist completamente (PUT)
const alterar = (req, res) => {
    const playlistAlterada = req.body;

    const indice = playlist_musica.findIndex(pl => pl.id === playlistAlterada.id);

    if (indice === -1) {
        res.status(404).send("Playlist não encontrada").end();
    } else {
        playlist_musica[indice] = playlistAlterada;
        res.status(200).send("Playlist alterada com sucesso").end();
    }
};

// Atualizar playlist parcialmente (PATCH)
const atualizar = (req, res) => {
    const idPlaylist = req.params.id;
    const novosDados = req.body;

    const indice = playlist_musica.findIndex(pl => pl.id === idPlaylist);

    if (indice === -1) {
        res.status(404).send("Playlist não encontrada").end();
    } else {
        Object.keys(novosDados).forEach(key => {
            playlist_musica[indice][key] = novosDados[key];
        });
        res.status(200).send("Playlist atualizada com sucesso").end();
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
