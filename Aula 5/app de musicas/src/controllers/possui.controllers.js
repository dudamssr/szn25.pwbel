const possui = require("../data/possui.data");


const listar = (req, res) => {
    res.status(200).send(possui).end();
};


const buscar = (req, res) => {
    const id = req.params.id;
    const itemEncontrado = possui.find(item => item && item.id === id);
    if (itemEncontrado) {
        res.status(200).send(itemEncontrado).end();
    } else {
        res.status(404).send("Relação não encontrada").end();
    }
};




const cadastrar = (req, res) => {
    const novaRelacao = req.body;
    possui.push(novaRelacao);
    res.status(201).send("Relação cadastrada com sucesso!").end();
};


const apagar = (req, res) => {
    const id = req.params.id;
    const indice = possui.findIndex(item => item.id === id);

    if (indice === -1) {
        res.status(404).send("Relação não encontrada").end();
    } else {
        possui.splice(indice, 1);
        res.status(204).end();
    }
};


const alterar = (req, res) => {
    const relacaoAlterada = req.body;
    const indice = possui.findIndex(item => item.id === relacaoAlterada.id);

    if (indice === -1) {
        res.status(404).send("Relação não encontrada").end();
    } else {
        possui[indice] = relacaoAlterada;
        res.status(200).send("Relação alterada com sucesso").end();
    }
};


const atualizar = (req, res) => {
    const id = req.params.id;
    const novosDados = req.body;
    const indice = possui.findIndex(item => item.id === id);

    if (indice === -1) {
        res.status(404).send("Relação não encontrada").end();
    } else {
        Object.keys(novosDados).forEach(key => {
            possui[indice][key] = novosDados[key];
        });
        res.status(200).send("Relação atualizada com sucesso").end();
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
