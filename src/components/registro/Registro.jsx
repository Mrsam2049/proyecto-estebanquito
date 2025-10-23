import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registro.css"; 

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email,  setEmail]  = useState("");
  const [pass,   setPass]   = useState("");

  const onSubmit = () => {
    if (!nombre.trim() || !email.trim() || !pass.trim()) {
      alert("Completa nombre, correo y contraseña");
      return;
    }
    if (pass.length < 6) {
      alert("La contraseña debe tener mínimo 6 caracteres");
      return;
    }
    
    alert("Registro exitoso. Inicia sesión para continuar.");
    navigate("/");
  };


  const onKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="registro">           
      <div className="registro-cuadro">  
        <h1 className="rg-titulo">Crear cuenta</h1>

        <label className="rg-texto" htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          className="registro-input"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          
        />

        <label className="texto" htmlFor="email">Correo</label>
        <input
          id="email"
          className="registro-input"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          
        />

        <label className="texto" htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          className="registro-input"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          onKeyDown={onKeyDown}
        />

        <button type="button" className="registro-btn" onClick={onSubmit}>
          Registrarme
        </button>

        <p className="registro-hint">
          ¿Ya tienes cuenta? <Link to="/" className="login-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
export default Registro;
