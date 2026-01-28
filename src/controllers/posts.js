const db = require("../data/connection");

const listarposts = async(req, res) => {
    const posts = await db.query ("SELECT * FROM posts");
    res.status(200).send(posts[0]).end();
};

const cadastrarpost = async (req,res)=>{
const {titulo,conteudo} = req.body;
const id_usuario = req.headers["user"].id;
const novopost = await db.query("INSERT INTO posts VALUES (DEFAULT,?,?,?);",[titulo,conteudo,id_usuario]);
res.send({
    id:novopost.insertID,
    titulo: titulo,
    conteudo:conteudo
}).end();
};
const excluirPost = async (req, res) => {
    const idPost = req.params.id;

    try {
        const delPost = await db.query("DELETE FROM posts WHERE id = ?", [idPost]);

        const info = { msg: "" };

        if (delPost[0].affectedRows === 1) {
            info.msg = "Excluído com sucesso";
        } else if (delPost[0].affectedRows === 0) {
            info.msg = "Post não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        const info = { msg: "" };

        if (error.errno === 1451) {
            info.msg = "Post vinculado a outro registro";
        }

        res.status(500).json(info).end();
    }
};

const atualizarPost = async (req, res) => {
    const { id, titulo, conteudo } = req.body;

    try {
        const atualiza = await db.query(
            "UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?",
            [titulo, conteudo, id]
        );

        const info = { msg: "" };

        if (atualiza[0].affectedRows === 0) {
            info.msg = "Nenhum post encontrado";
        } else if (atualiza[0].affectedRows === 1) {
            info.msg = "Post atualizado com sucesso";
        }

        res.status(200).json(info).end();

    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
};

module.exports = {
    listarposts,
    cadastrarpost,
    excluirPost,
    atualizarPost
}
