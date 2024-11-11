import React, { useState } from "react";
import styled from "styled-components";
import { loginUser } from "../api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginBox = styled.div`
  width: 350px;
  padding: 40px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0,0,0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setMessage(`Login bem-sucedido! Token: ${response.token}`);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>
        {message && <p>{message}</p>}
      </LoginBox>
    </Container>
  );
}

export default Login;
