const playlist = require("../data/playlist.data");

//req => Resquest(requisiçao)
//res => Response(Resposta)
const listar = (req, res) => {
    res.status(201).send(playlist).end();
};

const buscar = (req, res) => {
    //    /playlist/id
    const idPlaylist = req.params.id;

    var user = "Não encontrado";

    playlist.forEach((playlist, index) => {
        if (playlist.id === idPlaylist) {
            user = playlist;
        }
    });

    res.send(user).end();
}

const cadastrar = (req, res) => {
    const novaPlaylist = req.body;
    playlist.push(novaPlaylist);
    res.status(201).send("Cadastrada com Sucesso!").end();
};

const apagar = (req, res) => {
    // playlist /id > parametro
    const idplaylist = req.params.id;

    var indice = -1;

    playlist.forEach((playlist, index) => {
        if (playlist.id === idplaylist) {
            indice = index;
        }
    });

    if (indice === -1) {
        res.status(404).end();
    } else {
        playlist.splice(indice, 1);
        res.status(204).end();
    }
};

const alterar = (req, res) => {
    const playlistAlterada = req.body;

    var encontrei = false;

    playlist.forEach((palylist, index) => {
        if (playlist.id === playlistAlterada.id) {
            playlist[index] = playlistAlterada;
            encontrei = true;
        }
    });

    if (encontrei === false) {
        res.status(404).end();
    } else {
        res.status(201).end();
    }
};

const atualizar = (req, res) => {
    const idPlaylist = req.params.id;
    const novaPlaylist = req.body;

    var indice = -1;

    playlist.forEach((playlist, index) => {

        if (playlist.id === idPlaylist) indice = index;
    });
    if (indice === -1) {
        res.status(404).end();
    } else {
        Object.keys(novaPlaylist).forEach((key) => {
            idPlaylist[indice][key] = novaPlaylist[key];
        });
        res.status(204).end();
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