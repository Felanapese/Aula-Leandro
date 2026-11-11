
const express = require('express');

const app = express();
const PORT = 3003;

// Permite receber JSON
app.use(express.json());

// Banco de dados temporário
let usuarios = [];

// Rota POST - Cadastrar usuário
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            erro: 'Nome e email são obrigatórios'
        });
    }

    const usuario = {
        id: Date.now(),
        nome,
        email
    };

    usuarios.push(usuario);

    return res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!',
        usuario
    });
});

// Rota PUT - Atualizar usuário
app.put('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: 'Usuário não encontrado'
        });
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.email = email ?? usuario.email;

    return res.json({
        mensagem: 'Usuário atualizado com sucesso!',
        usuario
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
