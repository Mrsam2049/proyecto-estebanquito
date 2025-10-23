import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./Inicio.css";



function Inicio(){
const beneficios = [
    {
      img: "/img/ChatGPT Image 20 oct 2025, 12_06_46 a.m..png",
      titulo: "Trasferencias instantaneas",
      texto: "Mueve tu dinero a la velocidad de la luz, facilidad y rapidez",
    },
    {
      img: "/img/ChatGPT Image 19 oct 2025, 11_57_27 p.m..png",
      titulo: "Prestamos",
      texto: "Préstamos claros, sin sorpresas. Como un amigo de verdad..",
    },
    {
      img: "/img/687b2c02-78c3-4a55-b21e-eb9369ea84af.png",
      titulo: "Tarjeta de credito",
      texto: "Tu crédito siempre claro, con la confianza de Estebanquito.",
    },
  ];
return(
    <div className="inicio">

      <div className="barra">
        <div className="marca">
          <img 
           className="logo" src="/img/Opera Captura de pantalla_2025-10-19_233723_chatgpt.com.png" alt="Estebanquito" />
          <div className="vp-nombre">Estebanquito</div>
        </div>

       
      </div>
{/* pantalla de inicio */}
<div className="principal">
    <div className="fondo-principal"></div>
<div className="contenido">
    <h1 className="titulo">
        La nueva forma de ahorrar y crecer, se llama Estebanquito.
    </h1>
    <p className="subtitulo">
        Te ofrecemos finanzas fáciles y la seguridad de un amigo
    </p>

{/* parte del login */}
 <Link to="/" className="btn-login">
            Ingresar
</Link>

</div>

</div>

{/* flexbox beneficios */}

<div className="beneficios">
    <h2 className="beneficios-titulo">Nuestros productos</h2>
    <div className="caja-beneficios">
         {beneficios.map((b, i) =>(
            <article className="tarjeta" key={i}>
                <img className="tarjeta-img" src={b.img} alt={b.titulo} />
                <h3 className="titulo-tarjeta">{b.titulo}</h3>
                <p className="texto-tarjeta">{b.texto}</p>
                <button className="btn-mas">Saber mas</button>

            </article>
         ))}

    </div>

</div>

    </div>
)

}
export default Inicio;