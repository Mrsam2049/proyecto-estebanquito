import "./Transferencia.css";
import { useState, useEffect } from "react";

function Transferencias() {
  const [tipo, setTipo] = useState("transferencia");
  const [cuentaDestino, setCuentaDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");

  const [usuario, setUsuario] = useState(null);
  const [saldoPrestamos, setSaldoPrestamos] = useState(0); 
  const [saldoDisponible, setSaldoDisponible] = useState(0);

  const nombre = localStorage.getItem("nombre");

  
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/usuarios");
        const data = await res.json();
        const encontrado = data.find((u) => u.nombre === nombre); 

        if (encontrado) {
          setUsuario(encontrado);                        
          setSaldoDisponible(encontrado.saldo);

          const resCred = await fetch(
            `http://localhost:3000/api/creditos?usuario_id=${encontrado.id}`
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

    if (nombre) obtenerUsuario();
  }, [nombre]);

  const enviarOperacion = async () => {
    if (!usuario) {
      alert("No se encontró el usuario.");
      return;
    }
    if (!monto || Number(monto) <= 0) {
      alert("Ingresa un monto válido");
      return;
    }
    if (tipo !== "depósito" && parseFloat(monto) > usuario.saldo) {
      alert("No puedes operar por un monto mayor al saldo disponible.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/transacciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cuenta_id: usuario.id,
          tipo,
          monto: parseFloat(monto),
          concepto,
          cuenta_destino: cuentaDestino,
        }),
      });

      const data = await res.json();
      alert(data.message);

      
      const resUser = await fetch("http://localhost:3000/api/usuarios");
      const allUsers = await resUser.json();
      const actualizado = allUsers.find((u) => u.id === usuario.id);
      if (actualizado) {
        setUsuario(actualizado);
        setSaldoDisponible(actualizado.saldo);

      
        const resCred = await fetch(
          `http://localhost:3000/api/creditos?usuario_id=${actualizado.id}`
        );
        const dataCred = await resCred.json();
        const totalDeuda = dataCred
          .filter((c) => c.estado === "aprobado")
          .reduce((acc, c) => acc + Number(c.saldo_pendiente || 0), 0);
        setSaldoPrestamos(totalDeuda);
      }
    } catch (err) {
      console.error(err);
      alert("Error en la operación");
    }
  };

  if (!usuario) {
    return <div className="tx">Cargando información de la cuenta...</div>;
  }

  return (
    <div className="tx">
      <div className="tx__encabezado">
        <h1 className="tx__titulo">Operaciones</h1>
        <div className="tx__opciones">
          <button
            className={`tx__opcion ${tipo === "transferencia" ? "tx__opciones-contenedor" : ""}`}
            onClick={() => setTipo("transferencia")}
          >
            Transferir
          </button>
          <button
            className={`tx__opcion ${tipo === "depósito" ? "tx__opciones-contenedor" : ""}`}
            onClick={() => setTipo("depósito")}
          >
            Depositar
          </button>
          <button
            className={`tx__opcion ${tipo === "retiro" ? "tx__opciones-contenedor" : ""}`}
            onClick={() => setTipo("retiro")}
          >
            Retirar
          </button>
        </div>
      </div>

      <div className="tx__formulario">
        <div className="tx__fila">
          <div className="tx__contenedor">
            <label className="tx__cuenta">Cuenta origen</label>
            <select className="tx__elecciones">
              <option>
                Cuenta principal — ${usuario.saldo.toLocaleString("es-CO")}
              </option>
            </select>
          </div>

          <div className="tx__contenedor">
            <label className="tx__cuenta">Cuenta destino</label>
            <input
              className="tx__elecciones"
              type="text"
              placeholder="Cuenta destino"
              disabled={tipo !== "transferencia"}
              value={cuentaDestino}
              onChange={(e) => setCuentaDestino(e.target.value)}
            />
          </div>
        </div>

        <div className="tx__fila">
          <div className="tx__contenedor">
            <label className="tx__cuenta">Monto</label>
            <input
              className="tx__elecciones"
              type="number"
              placeholder="Ej: 50.000"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>

          <div className="tx__contenedor">
            <label className="tx__cuenta">Concepto (opcional)</label>
            <input
              className="tx__elecciones"
              type="text"
              placeholder="Descripción"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
            />
          </div>
        </div>

        <div className="tx__acciones">
          <button className="tx__btn" onClick={enviarOperacion}>
            {tipo === "transferencia" ? "Transferir" : tipo === "depósito" ? "Depositar" : "Retirar"}
          </button>
          <button
            className="tx__btn tx__btn--limpiar"
            onClick={() => {
              setMonto("");
              setConcepto("");
              setCuentaDestino("");
            }}
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="tx__saldos">
        <div className="tx__saldo">
          <div className="tx__saldo-texto">Saldo</div>
          <div className="tx__saldo-cantidad">
            ${saldoDisponible.toLocaleString("es-CO")}
          </div>
        </div>
        <div className="tx__saldo">
          <div className="tx__saldo-texto">Saldo pendiente (préstamo)</div>
          <div className="tx__saldo-cantidad">
            ${saldoPrestamos.toLocaleString("es-CO")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transferencias;
