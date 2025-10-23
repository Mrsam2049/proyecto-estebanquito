
import { useMemo, useState } from "react";
import "./Reporte.css";

export default function Reporte() {
 
return (
    <div className="rep">
      <h1 className="rep-titulo">Reportes</h1>

      
      <div className="rep-filtro">
        <label className="rep-filtro__texto">Ver:</label>
        <select className="rep-filtro__eleccion">
          <option>Todos</option>
          <option>Ingresos</option>
          <option>Egresos</option>
          <option>Deudas</option>
        </select>
      </div>

      
      <div className="rep-tabla">
        <div className="cabeza">
          <div>Fecha</div>
          <div>Tipo</div>
          <div>Concepto</div>
          <div className="right">Monto</div>
        </div>

        <div className="fila">
          <div>20/10/2025 10:12</div>
          <div><span className="pill ingreso">Ingreso</span></div>
          <div>Nómina</div>
          <div className="rp-dinero">+$ 2.500.000</div>
        </div>

        <div className="fila">
          <div>19/10/2025 18:40</div>
          <div><span className="pill egreso">Egreso</span></div>
          <div>Mercado</div>
          <div className="rp-dinero">-$ 180.000</div>
        </div>

        <div className="fila">
          <div>19/10/2025 09:00</div>
          <div><span className="pill deuda">Deuda</span></div>
          <div>Préstamo banco</div>
          <div className="rp-dinero">$ 480.000</div>
        </div>
      </div>
    </div>
  );
}