import "./Prestamos.css";

export default function Prestamos() {
  return (
    <div className="pr">
      <h1 className="pr-titulo">Préstamos</h1>

      <div className="pr-tarjeta">
        <h2 className="pr-subtitle">Solicitar</h2>

        <label className="pr-texto">Monto solicitado</label>
        <input className="pr-opciones" type="number" placeholder="Ej: 3,000,000" />

        <label className="pr-texto">Plazo (cuotas)</label>
        <select className="pr-opciones">
          <option>6 cuotas</option>
          <option>12 cuotas</option>
          <option>24 cuotas</option>
          <option>36 cuotas</option>
        </select>

        <label className="pr-texto">Descripción (opcional)</label>
        <input className="pr-opciones" type="text" placeholder="Ej: consolidar deudas" />

        <div className="pr-acciones">
          <button className="pr-btn">Solicitar</button>
          <button className="pr-btn pr-btn--light">Limpiar</button>
        </div>
      </div>

      <div className="pr-tarjeta">
        <h2 className="pr-subtitulo">Estado del préstamo</h2>

        <div className="pr-fila">
          <span>Deuda total:</span>
          <strong>$ —</strong>
        </div>
        <div className="pr-fila">
          <span>Cuotas restantes:</span>

      <strong>—</strong>
    </div>
    <div className="pr-fila">
      <span>Cuota estimada:</span>
      <strong>$ —</strong>
    </div>

    <button className="pr-btn pr-btn--light" disabled>
      Pagar una cuota
    </button>

   
  </div>
</div>
);
}