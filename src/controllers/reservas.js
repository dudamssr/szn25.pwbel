const db = require("../data/connection");
const crypto = require("node:crypto");

const listarReservas = async(req, res) => {
    const reservas = await db.query ("SELECT * FROM reservas");
    res.status(200).send(reservas[0]).end();
};

const atualizarReservas = async (req, res) => {
    try {
        const idReserba = req.params.id;
        const { aluno_id, sala_id, data, hora} = req.body;
        
        if (!aluno_id || !sala_id || !data || !hora) {
            return res.status(400).json({ msg: "Informações obrigatórias" });
        }

        const [result] = await db.query("UPDATE reservas SET aluno_id = ?, sala_id = ?, data = ?, hora = ?", [aluno_id, sala_id, data, hora]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Reserva não encontrada" });
        }
        res.json({ msg: "Reserva atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cadastrarReservas = async (req, res) => {
    try {
        const { aluno_id, sala_id, data, hora } = req.body;

        if (!aluno_id || !sala_id || !data || !hora) {
            return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
        }

        const [novaReserva] = await db.query("INSERT INTO reservas (aluno_id, sala_id, data, hora) VALUES (?, ?, ?, ?)",[aluno_id, sala_id, data, hora]);

        const reservaCriada = {
            id: novaReserva.insertId,
            aluno_id: aluno_id,
            sala_id: sala_id,
            data: data,
            hora: hora,
        };

        res.status(201).json(reservaCriada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const excluirReservas = async (req, res) => {
  const idReserva = req.params.id;

  try {
    const delres = await db.query("DELETE FROM reservas WHERE id= ?", [idReserva]);
    const info = { msg: "" };

    if (delres[0].affectedRows === 1) {
      info.msg = "Reserva excluida com sucesso";
    } else if (delfil[0].affectedRows === 0) {
      info.msg = "Reserva não encontrada";
    }

    res.status(201).json(info).end();
  } catch (error) {
    const info = {msg:""};

    if(error.errno === 1451) {
        info.msg = "Reserva já cadastrada";
    }
    res.status(500).json(info).end();
  }
};


const totalReservasPorSala = async (req, res) => {
    try {
        const [salas] = await db.query(`SELECT salas.id, salas.nome, salas.capacidade, COUNT(reservas.id) AS total_reservas FROM salas  LEFT JOIN reserva ON s.id = reservas.sala_id GROUP BY salas.id, salas.nome, salas.capacidade ORDER BY total_reservas DESC`);
        res.status(200).json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const totalReservasPorAluno = async (req, res) => {
    try {
        const [alunos] = await db.query(`
            SELECT alunos.id, alunos.nome, alunos.turma, COUNT(reservas.id) AS total_reservas FROM alunos LEFT JOIN reservas r ON alunos.id = reservas.aluno_id GROUP BY alunos.id, alunos.nome, alunos.turma ORDER BY total_reservas DESC`);
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
   listarReservas,
   atualizarReservas,
   excluirReservas,
   cadastrarReservas,
   totalReservasPorAluno,
   totalReservasPorSala
};