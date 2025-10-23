import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  Link } from "react-router-dom";
import "./Login.css";

function Login(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");

  const validarUsuario = () => {
    if (email.trim() === "samuel213417@gmail.com") {
      navigate("/Ventana_Principal", { state: { nombre: email } });
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login">
      <div className="login-cuadro">
        <h1 className="lg-titulo">Inicio de sesión</h1>

        <label className="lg-texto" htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          className="login-input"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <label className="texto" htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          className="login-input"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="current-password"
        />

        <button type="button" className="login-btn" onClick={validarUsuario}>
          Iniciar sesión
        </button>
        <p className="login-hint">
          ¿No tienes cuenta? <Link to="/registro" className="login-link">Registro</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;