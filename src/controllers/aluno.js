const db = require("../data/connection");

const listarAlunos = async (req, res) => {
    try {
        const [alunos] = await db.query("SELECT * FROM alunos");
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cadastrarAlunos = async (req, res) => {
    try {
        const { nome, turma } = req.body;

        if (!nome || !turma) {
            return res.status(400).json({ msg: "Nome e turma são obrigatórios" });
        }

        const [novoAluno] = await db.query("INSERT INTO alunos (nome, turma) VALUES (?, ?)", [nome, turma]);

        const aluno = {
            id: novoAluno.insertId,
            nome,
            turma
        };
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const atualizarAlunos = async (req, res) => {
    try {
        const idAluno = req.params.id;
        const { nome, turma } = req.body;

        if (!nome || !turma) {
            return res.status(400).json({ msg: "Nome e turma obrigatórios" });
        }

        const [result] = await db.query("UPDATE alunos SET nome = ?, turma = ? WHERE id = ?", [nome, turma, idAluno]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        res.json({ msg: "Aluno atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const excluirAlunos = async (req, res) => {
    try {
        const idAluno = req.params.id;

      
        await db.query("DELETE FROM reservas WHERE aluno_id = ?", [idAluno]);

        const [result] = await db.query("DELETE FROM alunos WHERE id = ?", [idAluno]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        res.json({ msg: "Excluído com sucesso" });
    } catch (error) {
        if (error.errno === 1451) {
            return res.status(400).json({ msg: "Exclusão negada: existem reservas vinculadas" });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarAlunos,
    cadastrarAlunos,
    excluirAlunos,
    atualizarAlunos
};
