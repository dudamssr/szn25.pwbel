const db = require('../data/connection');
const crypto = require("node:crypto");
const jsonwebtoken = require("jsonwebtoken");

const cadastrarMedico = async (req, res) => {
  const { id_medico, nome, especialidade } = req.body;
  try {
    const [resultado] = await db.query('INSERT INTO medico (id_medico, nome, especialidade) VALUES (?, ?, ?);',[id_medico, nome, especialidade]);
    res.status(201).json({ message: 'Médico cadastrado com sucesso', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar médico', error: error.message });
  }
};


const cadastrarPaciente = async (req, res) => {
  const { id_paciente, nome, telefone } = req.body;
  try {
    const [resultado] = await db.query('INSERT INTO paciente (id_paciente, nome, telefone) VALUES (?, ?, ?);', [id_paciente, nome, telefone]
    );
    res.status(201).json({ message: 'Paciente cadastrado com sucesso', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar paciente', error: error.message });
  }
};


const agendarConsulta = async (req, res) => {
  const { id_paciente, id_medico, data } = req.body;

  const [existente] = await db.query('SELECT * FROM consulta WHERE id_paciente = ? AND id_medico = ? AND data = ?;', [id_paciente, id_medico, data]);

  if (existente.length > 0) {
    return res.status(409).json({ message: 'Já existe consulta marcada para esse médico, paciente e data.' });
  }
  
try {
  const [resultado] = await db.query('INSERT INTO consulta (id_paciente, id_medico, data, hora, status) VALUES (?, ?, ?, ?, ?);', [id_paciente, id_medico, data, hora, status || 'agendada']);
  res.status(201).json({ message: 'Consulta agendada com sucesso', id: resultado.insertId });
} catch (error) {
  res.status(500).json({ message: 'Erro ao agendar consulta', error: error.message });
}
};


const listarConsultas = async (req, res) => {
  try {
    const [consulta] = await db.query(`SELECT c.id_consulta, c.data, c.hora, c.status, p.nome AS paciente_nome, m.nome AS medico_nome, m.especialidade FROM consulta c
         JOIN paciente p ON c.id_paciente = p.id_paciente
         JOIN medico m ON c.id_medico = m.id_medico;`
    );
    res.json(consulta);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar consultas', error: error.message });
  }
};

const relatorioPorEspecialidade = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT m.especialidade, COUNT(c.id) AS total FROM consulta c JOIN medico m ON c.medico_id = m.id GROUP BY m.especialidade;`);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório', error: error.message });
  }

};

const login = async (req, res) => {
    const { user, psw } = req.body;
   
    try {
       const senhahash = crypto.createHash("MD5").update(psw).digest("hex").toString();

       console.log(user, senhahash);

       const usuario = await db.query("SELECT * FROM administrador WHERE email = ? AND senha = ?;", [user,senhahash]);

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
  cadastrarMedico,
  cadastrarPaciente,
  agendarConsulta,
  listarConsultas,
  relatorioPorEspecialidade,
  login
};

