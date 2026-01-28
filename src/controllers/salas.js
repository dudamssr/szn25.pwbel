const db = require("../data/connection");
const crypto = require("node:crypto");

const listarSalas = async(req, res) => {
    const salas = await db.query ("SELECT * FROM salas");
    res.status(200).send(salas[0]).end();
};

// const reservasRealizadas = async(req, res) => {
//     const salas = await db.query (`SELECT reservas.id, reservas.data, reservas.hora, alunos.nome
//                                     AS aluno, salas.nome AS sala
//                                     FROM reservas
//                                     JOIN alunos ON reservas.aluno_id = alunos.id
//                                     JOIN salas ON reservas.sala_id = salas.id
//                                     ORDER BY reservas.data, reservas.hora`
//                                     );
//     res.status(200).send(salas[0]).end();
// };

const atualizarSalas = async (req, res) => {
    try {
        const idSala = req.params.id;
        const { nome, capacidade } = req.body;
        
        if (!nome || !capacidade) {
            return res.status(400).json({ msg: "Nome e capacidade obrigatórios" });
        }

        const [result] = await db.query("UPDATE salas SET nome = ?, capacidade = ? WHERE id = ?", [nome, capacidade, idSala]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Sala não encontrada" });
        }
        res.json({ msg: "Sala atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cadastrarSalas = async (req, res) => {
    try {
        const { nome, capacidade } = req.body;

        if (!nome || !capacidade ) {
            return res.status(400).json({ msg: "Nome e capacidade obrigatórios" });
        }

        const [novaSala] = await db.query(
            "INSERT INTO salas (nome, capacidade) VALUES (?, ?)", [nome, capacidade] );

        const sala = {
            id: novaSala.insertId,
            nome,
            capacidade
        };
        res.status(201).json(sala);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const excluirSalas = async (req, res) => {
  const idSala = req.params.id;

  try {
    const delsala = await db.query("DELETE FROM salas WHERE id= ?", [idSala]);
    const info = { msg: "" };

    if (delsala[0].affectedRows === 1) {
      info.msg = "Excluida com sucesso";
    } else if (delfil[0].affectedRows === 0) {
      info.msg = "Sala não encontrado";
    }

    res.status(201).json(info).end();
  } catch (error) {
    const info = {msg:""};

    if(error.errno === 1451) {
        info.msg = "Sala já cadastrada";
    }
    res.status(500).json(info).end();
  }
};

module.exports = { 
    listarSalas,
    atualizarSalas,
    excluirSalas,
    cadastrarSalas
};