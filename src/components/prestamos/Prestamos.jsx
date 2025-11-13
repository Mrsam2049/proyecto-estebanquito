import { useEffect, useState } from "react";
import "./Prestamos.css";

export default function Prestamos() {
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("6"); 
  const [descripcion, setDescripcion] = useState("");

  const [usuario, setUsuario] = useState(null);
  const [prestamo, setPrestamo] = useState(null); 
  const [cargando, setCargando] = useState(false);


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
    const fetchCreditos = async () => {
      if (!usuario) return;
      try {
        const res = await fetch(
          `http://localhost:3000/api/creditos?usuario_id=${usuario.id}`
        );
        const data = await res.json();

     
        const aprobado = data.find((c) => c.estado === "aprobado");
        const pendiente = data.find((c) => c.estado === "pendiente");

      
        setPrestamo(aprobado || pendiente || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCreditos();
  }, [usuario]);


  const solicitarPrestamo = async () => {
    if (!usuario) {
      alert("No se encontró el usuario");
      return;
    }
    if (!monto || Number(monto) <= 0) {
      alert("Ingresa un monto válido");
      return;
    }

    setCargando(true);
    try {
      const res = await fetch("http://localhost:3000/api/creditos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuario.id,
          monto: Number(monto),
          plazo: Number(plazo),
          descripcion: descripcion, 
        }),
      });

      const data = await res.json();
      alert(data.message || "Solicitud enviada");

      
      const res2 = await fetch(
        `http://localhost:3000/api/creditos?usuario_id=${usuario.id}`
      );
      const data2 = await res2.json();
      const aprobado = data2.find((c) => c.estado === "aprobado");
      const pendiente = data2.find((c) => c.estado === "pendiente");
      setPrestamo(aprobado || pendiente || null);

      
      setDescripcion("");
      
    } catch (err) {
      console.error(err);
      alert("Error solicitando el préstamo");
    } finally {
      setCargando(false);
    }
  };


  const pagarCuota = async () => {
    if (!prestamo) return;
    if (prestamo.estado !== "aprobado") {
      alert("Solo puedes pagar préstamos aprobados");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/creditos/pagar/${prestamo.id}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      alert(data.message);

     
      const res2 = await fetch(
        `http://localhost:3000/api/creditos?usuario_id=${usuario.id}`
      );
      const data2 = await res2.json();
      const aprobado = data2.find((c) => c.estado === "aprobado");
      const pendiente = data2.find((c) => c.estado === "pendiente");
      setPrestamo(aprobado || pendiente || null);
    } catch (err) {
      console.error(err);
      alert("Error pagando la cuota");
    }
  };

  return (
    <div className="pr">
      <h1 className="pr-titulo">Préstamos</h1>

     
      <div className="pr-tarjeta">
        <h2 className="pr-subtitle">Solicitar</h2>

        <label className="pr-texto">Monto solicitado</label>
        <input
          className="pr-opciones"
          type="number"
          placeholder="Ej: 3,000,000"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <label className="pr-texto">Plazo (cuotas)</label>
        <select
          className="pr-opciones"
          value={plazo}
          onChange={(e) => setPlazo(e.target.value)}
        >
          <option value="6">6 cuotas</option>
          <option value="12">12 cuotas</option>
          <option value="24">24 cuotas</option>
          <option value="36">36 cuotas</option>
        </select>

        <label className="pr-texto">Descripción (opcional)</label>
        <input
          className="pr-opciones"
          type="text"
          placeholder="Ej: consolidar deudas"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <div className="pr-acciones">
          <button
            className="pr-btn"
            onClick={solicitarPrestamo}
            disabled={cargando}
          >
            {cargando ? "Enviando..." : "Solicitar"}
          </button>
          <button
            className="pr-btn pr-btn--light"
            onClick={() => {
              setMonto("");
              setDescripcion("");
              setPlazo("6");
            }}
          >
            Limpiar
          </button>
        </div>
      </div>

      
      <div className="pr-tarjeta">
        <h2 className="pr-subtitulo">Estado del préstamo</h2>

        <div className="pr-fila">
          <span>Deuda total:</span>
          <strong>
            $
            {prestamo
              ? Number(prestamo.saldo_pendiente).toLocaleString("es-CO")
              : " —"}
          </strong>
        </div>
        <div className="pr-fila">
          <span>Cuotas restantes:</span>
          <strong>
            {prestamo
              ? 
                Number(prestamo.plazo) - Number(prestamo.cuotas_pagadas)
              : "—"}
          </strong>
        </div>
        <div className="pr-fila">
          <span>Cuota estimada:</span>
          <strong>
            $
            {prestamo
              ? Number(prestamo.cuota_valor).toLocaleString("es-CO")
              : " —"}
          </strong>
        </div>

        <button
          className="pr-btn pr-btn--light"
          onClick={pagarCuota}
          disabled={!prestamo || prestamo.estado !== "aprobado"}
        >
          Pagar una cuota
        </button>

        {prestamo && (
          <p style={{ marginTop: "6px" }}>
            Estado: <strong>{prestamo.estado}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
