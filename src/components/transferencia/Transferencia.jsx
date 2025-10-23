
import "./Transferencia.css"; 

function Transferencias() {
  return (
    <div className="tx">
      {/* titulos*/}
      <div className="tx__encabezado">
        <h1 className="tx__titulo">Operaciones</h1>

        {/* opciones */}
        <div className="tx__opciones">
          <button className="tx__opciones-contenedor">Transferir</button>
          <button className="tx__opcion">Depositar</button>
          <button className="tx__opcion">Retirar</button>
        </div>
      </div>

      {/* informacion cuentas */}
      <div className="tx__formulario">
        {/* cuenta origen y cuenta destino */}
        <div className="tx__fila">
          <div className="tx__contenedor">
            <label className="tx__cuenta">Cuenta origen</label>
            <select className="tx__elecciones">
              <option>Cuenta principal — $ 1.523.000</option>
              <option>Ahorros — $ 300.000</option>
            </select>
          </div>

          <div className="tx__contenedor">
            <label className="tx__cuenta">Cuenta destino</label>
           
                      <input
          id="cuenta-destino"
          className="tx__elecciones"
          type="text"
          placeholder="Cuenta"
          
          
        />
           
          </div>
        </div>

        {/* Fila: monto y concepto */}
        <div className="tx__fila">
          <div className="tx__contenedor">
            <label className="tx__cuenta">Monto</label>
            <input className="tx__elecciones" type="number" placeholder="Ej: 50.000" />
          </div>

          <div className="tx__contenedor">
            <label className="tx__cuenta">Concepto (opcional)</label>
            <input className="tx__elecciones" type="text" placeholder="Descripción de la operación" />
          </div>
        </div>

        <div className="tx__acciones">
          <button className="tx__btn">Transferir</button>
          <button className="tx__btn tx__btn--limpiar">Limpiar</button>
        </div>
      </div>

      {/* Resumen de saldos */}
      <div className="tx__saldos">
        <div className="tx__saldo">
          <div className="tx__saldo-texto">Saldo disponible</div>
          <div className="tx__saldo-cantidad">$ 1.523.000</div>
        </div>
        <div className="tx__saldo">
          <div className="tx__saldo-texto">Saldo pendiente (préstamo)</div>
          <div className="tx__saldo-cantidad">$ 480.000</div>
        </div>
      </div>

      
    </div>
  );
}
export default Transferencias;
