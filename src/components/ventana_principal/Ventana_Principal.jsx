import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Ventana_Principal.css";


export default function Ventana_Principal() {
  const { state } = useLocation();
  const navigate = useNavigate();


  const nombre = state?.nombre || localStorage.getItem("nombre") || "usuario";


  const saldoDisponible = 1523000;      
  const saldoPendiente  = 480000;       

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("nombre");
    navigate("/");
  };

  return (
    <div className="vp">
      
      <div className="vp-barra">
        <div className="vp-marca">
          <img 
  className="vp-logo" src="/img/Opera Captura de pantalla_2025-10-19_233723_chatgpt.com.png" alt="Estebanquito" />
          <div className="vp-nombre">Estebanquito</div>
        </div>

        <div className="vp-usuario">
          <div className="vp-hola">Hola, {nombre}</div>
          <button className="vp-cerrarsesion" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>

      
      <div className="vp-principal">
        
        <div className="vp-saldo">
          <div className="vp-tarjeta">
            <div className="vp-titulo">Saldo disponible</div>
            <div className="vp-dinero">
              ${saldoDisponible.toLocaleString("es-CO")}
            </div>
          </div>

          <div className="vp-tarjeta">
            <div className="vp-titulo">Saldo pendiente (préstamo)</div>
            <div className="vp-dinero">
              ${saldoPendiente.toLocaleString("es-CO")}
            </div>
          </div>
        </div>

        
        <div className="vp-acciones">
          <Link to="/transferencia" className="vp-accion">
            <img src="/img/ChatGPT Image 21 oct 2025, 10_26_28 p.m..png" alt="Transferencias" />
            <h3>Transferencias</h3>
            <p>Mueve tu dinero fácil y rápido.</p>
          </Link>

          <Link to="/reportes" className="vp-accion">
            <img src="\img\ChatGPT Image 21 oct 2025, 10_30_32 p.m..png" alt="Reportes" />
            <h3>Reportes</h3>
            <p>Revisa tus movimientos y gastos.</p>
          </Link>

          <Link to="/prestamos" className="vp-accion">
            <img src="/img/ChatGPT Image 21 oct 2025, 10_34_32 p.m..png" alt="Préstamos" />
            <h3>Solicitar préstamo</h3>
            <p>Simula y solicita en minutos.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
