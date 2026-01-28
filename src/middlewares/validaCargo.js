const validaGerente = (req, res, next) => {
    const cargo = req.user?.cargo?.toUpperCase();

    if (cargo === "GERENTE") {
        next();
    } else {
        res.status(401).send("Sem nível de acesso").end();
    }
};

const validaSupervisor = (req, res, next) => {
    const cargo = req.user?.cargo?.toUpperCase();

    if (cargo === "SUPERVISOR" || cargo === "GERENTE") { 
        next();
    } else {
        res.status(401).send("Sem nível de acesso").end();
    }
};

module.exports = {
    validaGerente,
    validaSupervisor
};
