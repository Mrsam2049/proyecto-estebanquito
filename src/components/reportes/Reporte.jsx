import { useEffect, useState } from "react";
import "./Reporte.css";

export default function Reporte() {
  const [usuario, setUsuario] = useState(null);
  const [transacciones, setTransacciones] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [totales, setTotales] = useState({
    total_ingresos: 0,
    total_egresos: 0,
    total_deudas: 0,
  });


  useEffect(() => {
    const nombre = localStorage.getItem("nombre");
    if (!nombre) return;

    const fetchUsuario = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/usuarios");
        const data = await res.json();
        const encontrado = data.find((u) => u.nombre === nombre);
        setUsuario(encontrado || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsuario();
  }, []);


  useEffect(() => {
    if (!usuario) return;

    const fetchTransacciones = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/transacciones?cuenta_id=${usuario.id}`
        );
        const data = await res.json();
        setTransacciones(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTotales = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/reportes/${usuario.id}`
        );
        const data = await res.json();
        setTotales({
          total_ingresos: data.total_ingresos || 0,
          total_egresos: data.total_egresos || 0,
          total_deudas: data.total_deudas || 0, 
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransacciones();
    fetchTotales();
  }, [usuario]);

  
  const mapearTipo = (tipoBackend) => {
    if (tipoBackend === "depósito") return "Ingreso";
    if (tipoBackend === "transferencia") return "Egreso";
    if (tipoBackend === "retiro") return "Egreso";
    if (tipoBackend === "deuda") return "Deuda";
    return tipoBackend;
  };

  
  const transFiltradas = transacciones.filter((t) => {
    const tipoUI = mapearTipo(t.tipo);

    if (filtro === "Todos") return true;
    if (filtro === "Ingresos") return tipoUI === "Ingreso";
    if (filtro === "Egresos") return tipoUI === "Egreso";
    if (filtro === "Deudas") return tipoUI === "Deuda"; 
    return true;
  });

 
  let totalMostrado = 0;
  if (filtro === "Todos") {
    
    totalMostrado = 0;
  } else if (filtro === "Ingresos") {
    totalMostrado = totales.total_ingresos;
  } else if (filtro === "Egresos") {
    totalMostrado = totales.total_egresos;
  } else if (filtro === "Deudas") {
    totalMostrado = totales.total_deudas;
  }

  return (
    <div className="rep">
      <h1 className="rep-titulo">Reportes</h1>

      
      <div className="rep-filtro">
        <label className="rep-filtro__texto">Ver:</label>
        <select
          className="rep-filtro__eleccion"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option>Todos</option>
          <option>Ingresos</option>
          <option>Egresos</option>
          <option>Deudas</option>
        </select>
      </div>

    
      {filtro !== "Todos" && (
        <div style={{ marginBottom: "10px", fontWeight: 700, color: "#0f172a" }}>
          Total de {filtro.toLowerCase()}: ${totalMostrado.toLocaleString("es-CO")}
        </div>
      )}

   
      <div className="rep-tabla">
        <div className="cabeza">
          <div>Fecha</div>
          <div>Tipo</div>
          <div>Concepto</div>
          <div className="right">Monto</div>
        </div>

        {transFiltradas.map((t) => {
          const tipoUI = mapearTipo(t.tipo);
          const clasePill =
            tipoUI === "Ingreso"
              ? "pill ingreso"
              : tipoUI === "Egreso"
              ? "pill egreso"
              : "pill deuda";

          const fecha = new Date(t.fecha).toLocaleString("es-CO");

          let montoFormateado = `$ ${Number(t.monto)}`;
          if (tipoUI === "Ingreso") {
            montoFormateado = `+$ ${Number(t.monto)}`;
          }
          if (tipoUI === "Egreso") {
            montoFormateado = `-$ ${Number(t.monto)}`;
          }

          return (
            <div key={t.id} className="fila">
              <div>{fecha}</div>
              <div>
                <span className={clasePill}>{tipoUI}</span>
              </div>
              <div>{t.concepto || "—"}</div>
              <div className="rp-dinero">{montoFormateado}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
