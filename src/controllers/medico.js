const db = require('../data/connection');
const crypto = require("node:crypto");
const jsonwebtoken = require("jsonwebtoken");


const listarConsultas = async (req, res) => {
    const { medicoId } = req.params;
    const [consultas] = await db.query("SELECT * FROM consulta WHERE id_medico = ?;",[medicoId]);
    res.send({ medicoId, consultas }).end();
};


const atualizarStatusConsulta = async (req, res) => {
    const { consultaId } = req.params;
    const { status } = req.body;

    const [resultado] = await db.query("UPDATE consulta SET status = ? WHERE id_consulta = ?;",[status, consultaId]);

    res.send({ consultaId, status, affectedRows: resultado.affectedRows }).end();
};


const adicionarObservacao = async (req, res) => {
    const { consultaId } = req.params;
    const { observacao } = req.body;

    const [resultado] = await db.query("UPDATE consulta SET observacao = ? WHERE id_consulta = ?;",[observacao, consultaId]);

    res.send({ consultaId, observacao, affectedRows: resultado.affectedRows }).end();
};

const login = async (req, res) => {
    const { user, psw } = req.body;
   
    try {
       const senhahash = crypto.createHash("MD5").update(psw).digest("hex").toString();

       const usuario = await db.query("SELECT * FROM medico WHERE nome = ? AND senha = ?;", [user,senhahash]);

        if(usuario[0].length == 0) return res.status(401).send({message:'E-mail or Password incorrect !'});

        const token = jsonwebtoken.sign(
            {
                id: usuario[0][0].id,
                name: usuario[0][0].nome,
                email: usuario[0][0].email,
                especialidade: usuario[0][0].especialidade
            },
            process.env.SECRET_JWT,
            { expiresIn: "60min" }
        );

        res.status(200).json({ token : token }).end();
    }catch(err) {
        console.log(err);
        res.status(500).send(err).end();
    }
   
    res.status(200).end();
};
module.exports = { 
    listarConsultas, 
    atualizarStatusConsulta, 
    adicionarObservacao,
    login
};
