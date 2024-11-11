// auth.routes.js
const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Cria uma instância do roteador
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

// Registrar um novo usuário
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log('Tentando registrar novo usuário:', { username, email });

    // Verificar se o usuário ou e-mail já existe
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      console.log('Usuário ou e-mail já existe:', userExists);
      return res.status(400).json({ message: 'Usuário ou e-mail já existe' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    console.log('Usuário registrado com sucesso:', user);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
});

// Exportar o roteador
module.exports = router;
