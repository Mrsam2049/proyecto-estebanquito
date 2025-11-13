import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  Link } from "react-router-dom";
import "./Login.css";

function Login(){
  const navigate = useNavigate();
    
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState({});
  

  const validarUsuario = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Credenciales inválidas");
        return;
      }

      
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("nombre", data.user.nombre);

      
      navigate("/ventana_principal", { state: { nombre: data.user.nombre } });
    } catch (error) {
      console.error(error);
      alert("Error de red");
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
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <label className="texto" htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          className="login-input"
          type="password"
          placeholder="Ingresa tu contraseña"
          onChange={(e) => setPass(e.target.value)}
          autoComplete="current-password"
        />

        <button type="button" className="login-btn" onClick={validarUsuario}>
          Iniciar sesión
        </button>
       <div>{user.nombre}</div>
       <div>{user.edad}</div>
        <p className="login-hint">
          ¿No tienes cuenta? <Link to="/registro" className="login-link">Registro</Link>
        </p>
        
      </div>
      
    </div>
  );
}

export default Login;