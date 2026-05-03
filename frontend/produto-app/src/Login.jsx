import { useState } from "react";
import { gerarBasicAuth, salvarAuth } from "./auth";

export default function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  async function entrar() {

    setErro("");

    const auth = gerarBasicAuth(username, password);

    try {

      const res = await fetch("http://localhost:8080/auth/me", {
        headers: {
          Authorization: auth
        }
      });

      if (!res.ok) {
      console.log("Status:", res.status);
      throw new Error();
      }

      const user = await res.json();

      salvarAuth(auth);

      onLogin(user);

    } catch(erro) {
      console.log(erro);
      setErro("Usuário ou senha inválidos");

    }
  }

  return (
    <div>

      <h1>Login</h1>

      <input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={entrar}>
        Entrar
      </button>

      {erro && <p>{erro}</p>}

    </div>
  );
}