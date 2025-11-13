import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registro.css"; 

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email,  setEmail]  = useState("");
  const [pass,   setPass]   = useState("");
  const [pass2, setPass2] = useState("");  
  const [tipoCuenta, setTipoCuenta] = useState(""); 

  const onSubmit = async () => {
    if (!nombre.trim() || !email.trim() || !pass.trim()) {
      alert("Completa nombre, correo y contraseña");
      return;
    }
        if (pass.length < 6) {
      alert("La contraseña debe tener mínimo 6 caracteres");
      return;
    }
    if (pass !== pass2) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    if (!["ahorros", "corriente"].includes(tipoCuenta)) {
      alert("Selecciona un tipo de cuenta válido");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          password: pass,
          tipo_cuenta: tipoCuenta,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso. Inicia sesión para continuar.");
        navigate("/");
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red");
    }
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
        <label className="texto" htmlFor="pass2">Confirmar contraseña</label>
        <input
          id="pass2"
          className="registro-input"
          type="password"
          placeholder="Repite la contraseña"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          onKeyDown={onKeyDown}
        />
        <label className="texto" htmlFor="tipo">Tipo de cuenta</label>
        <select
          id="tipo"
          className="registro-input"
          value={tipoCuenta}
          onChange={(e) => setTipoCuenta(e.target.value)}
        >
          <option value="ahorros">Cuenta de ahorros</option>
          <option value="corriente">Cuenta corriente</option>
        </select>

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
