
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from "./components/login/Login";
import Inicio from './components/inicio/Inicio';
import Registro from "./components/registro/Registro";
import Ventana_Principal from "./components/ventana_principal/Ventana_Principal";
import Transferencia from "./components/Transferencia/Transferencia";
import Reporte from "./components/reportes/Reporte";
import Prestamos from './components/prestamos/prestamos.jsx';
function App() {
  

 

  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login />}/>
  <Route path='/inicio' element={<Inicio/>}/>
  <Route path="/registro" element={<Registro />} />
  <Route path="/ventana_principal" element={<Ventana_Principal />} />
  <Route path="/transferencia" element={<Transferencia />} />
  <Route path="/reportes" element={<Reporte/>} />
  <Route path="/prestamos" element={<Prestamos/>} />

</Routes>
</BrowserRouter>

  )
}

export default App