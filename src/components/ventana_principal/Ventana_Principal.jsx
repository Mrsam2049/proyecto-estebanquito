import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Ventana_Principal.css";

export default function Ventana_Principal() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const nombre = state?.nombre; 
  const [saldoDisponible, setSaldoDisponible] = useState(0);
  const [SaldoPrestamos, setSaldoPrestamos]= useState(0);
  const [numero_cuenta, setnumero_cuenta]= useState(0);

  
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/usuarios");
        const data = await res.json();

       
        const usuario = data.find((u) => u.nombre === nombre);

      if (usuario) {
          setnumero_cuenta(usuario.numero_cuenta)
          setSaldoDisponible(usuario.saldo); 
          const resCred = await fetch(
            `http://localhost:3000/api/creditos?usuario_id=${usuario.id}`
          );
          const dataCred = await resCred.json();

          const totalDeuda = dataCred
            .filter((c) => c.estado === "aprobado")
            .reduce((acc, c) => acc + Number(c.saldo_pendiente || 0), 0);

          setSaldoPrestamos(totalDeuda);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    if (nombre) {
      obtenerUsuario();
    }
  }, [nombre]);

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("nombre");
    navigate("/inicio");
  };

  return (
    <div className="vp">
      <div className="vp-barra">
        <div className="vp-marca">
          <img
            className="vp-logo"
            src="/img/Opera Captura de pantalla_2025-10-19_233723_chatgpt.com.png"
            alt="Estebanquito"
          />
          
          <div className="vp-nombre">Estebanquito</div>
        </div>

        <div className="vp-usuario">
          <div className="vp-Ncuenta"> N_cuenta: </div>
          <div className="vp-cuenta">{numero_cuenta.toLocaleString("cuenta")}</div>
          <div className="vp-hola">Hola, {nombre}</div>
          <button className="vp-cerrarsesion" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="vp-principal">
        <div className="vp-saldo">
          <div className="vp-tarjeta">
            <div className="vp-titulo">Saldo disponible</div>
            <div className="vp-dinero">
              ${saldoDisponible}
            </div>
          </div>

          <div className="vp-tarjeta">
            <div className="vp-titulo">Saldo pendiente (préstamo)</div>
            <div className="vp-dinero">
              ${SaldoPrestamos}
            </div>
          </div>
        </div>

        <div className="vp-acciones">
          <Link
            to="/transferencia"
            className="vp-accion"
            state={{ nombre: nombre }}
          >
            <img
              src="/img/ChatGPT Image 21 oct 2025, 10_26_28 p.m..png"
              alt="Transferencias"
            />
            <h3>Transferencias</h3>
            <p>Mueve tu dinero fácil y rápido.</p>
          </Link>

          <Link to="/reportes" className="vp-accion">
            <img
              src="\img\ChatGPT Image 21 oct 2025, 10_30_32 p.m..png"
              alt="Reportes"
            />
            <h3>Reportes</h3>
            <p>Revisa tus movimientos y gastos.</p>
          </Link>

          <Link to="/prestamos" className="vp-accion">
            <img
              src="/img/ChatGPT Image 21 oct 2025, 10_34_32 p.m..png"
              alt="Préstamos"
            />
            <h3>Solicitar préstamo</h3>
            <p>Simula y solicita en minutos.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
