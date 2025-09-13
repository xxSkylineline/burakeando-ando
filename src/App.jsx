import { useState } from 'react';
import './App.css'

function App() {
  // Estados para los checkboxes
  const [corte, setCorte] = useState(false);
  const [pura, setPura] = useState(false);
  const [impura, setImpura] = useState(false);
  const [levantarMuerto, setLevantarMuerto] = useState(false);
  
  // Estados para los dropdowns
  const [puraCantidad, setPuraCantidad] = useState(1);
  const [impuraCantidad, setImpuraCantidad] = useState(1);
  
  // Estado para los puntos
  const [puntos, setPuntos] = useState(0);
  
  // Estados para los nombres de los equipos
  const [nombreEquipo1, setNombreEquipo1] = useState('');
  const [nombreEquipo2, setNombreEquipo2] = useState('');
  
  // Estado para almacenar las filas de puntos
  const [filasPuntos, setFilasPuntos] = useState([{ equipo1: null, equipo2: null }]);

  // Calcular el valor total
  const calcularValor = () => {
    let total = 0;
    
    if (corte) {
      total += 100;
    }
    
    if (pura) {
      total += 200 * puraCantidad;
    }
    
    if (impura) {
      total += 100 * impuraCantidad;
    }
    
    if (levantarMuerto) {
      total += 100;
    }
    
    return total;
  };

  // Generar opciones para los dropdowns
  const generarOpciones = () => {
    return Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
      <option key={num} value={num}>{num}</option>
    ));
  };
  
  // Calcular la suma de puntos para cada equipo
  const calcularSumaPuntos = () => {
    let sumaEquipo1 = 0;
    let sumaEquipo2 = 0;
    
    filasPuntos.forEach(fila => {
      if (fila.equipo1 !== null) {
        sumaEquipo1 += fila.equipo1;
      }
      if (fila.equipo2 !== null) {
        sumaEquipo2 += fila.equipo2;
      }
    });
    
    return { sumaEquipo1, sumaEquipo2 };
  };
  
  // Determinar el equipo ganador
  const determinarEquipoGanador = () => {
    const { sumaEquipo1, sumaEquipo2 } = calcularSumaPuntos();
    
    if (sumaEquipo1 > sumaEquipo2) {
      return { nombre: nombreEquipo1 || 'Equipo 1', puntos: sumaEquipo1 };
    } else if (sumaEquipo2 > sumaEquipo1) {
      return { nombre: nombreEquipo2 || 'Equipo 2', puntos: sumaEquipo2 };
    } else {
      // Empate
      return null;
    }
  };
  
  // Manejar el ingreso de puntos para el Equipo 1
  const handleIngresarPuntosEquipo1 = () => {
    const valorTotal = calcularValor();
    if (valorTotal > 0) {
      // Crear una copia del array de filas
      const nuevasFilas = [...filasPuntos];
      
      // Encontrar la primera fila donde el equipo 1 no tiene puntos
      let filaIndex = nuevasFilas.findIndex(fila => fila.equipo1 === null);
      
      // Si no se encontró una fila vacía, agregar una nueva fila
      if (filaIndex === -1) {
        nuevasFilas.push({ equipo1: valorTotal, equipo2: null });
      } else {
        // Si se encontró una fila, actualizar el valor del equipo 1
        nuevasFilas[filaIndex].equipo1 = valorTotal;
      }
      
      // Actualizar el estado
      setFilasPuntos(nuevasFilas);
    }
  };
  
  // Manejar el ingreso de puntos para el Equipo 2
  const handleIngresarPuntosEquipo2 = () => {
    const valorTotal = calcularValor();
    if (valorTotal > 0) {
      // Crear una copia del array de filas
      const nuevasFilas = [...filasPuntos];
      
      // Encontrar la primera fila donde el equipo 2 no tiene puntos
      let filaIndex = nuevasFilas.findIndex(fila => fila.equipo2 === null);
      
      // Si no se encontró una fila vacía, agregar una nueva fila
      if (filaIndex === -1) {
        nuevasFilas.push({ equipo1: null, equipo2: valorTotal });
      } else {
        // Si se encontró una fila, actualizar el valor del equipo 2
        nuevasFilas[filaIndex].equipo2 = valorTotal;
      }
      
      // Actualizar el estado
      setFilasPuntos(nuevasFilas);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column dark-theme">
      {/* Header */}
      <header className="bg-dark text-white p-4 text-center">
        <h1 className="h3 fw-bold mb-0">Burakeando ando</h1>
      </header>

      {/* Main */}
      <main className="flex-grow-1 p-4 d-flex flex-column align-items-center">
        {/* Inputs para ingresar nombres de equipos */}
        <div className="mb-4 w-100">
          <div className="d-flex align-items-center mb-2">
            <input
              type="text"
              value={nombreEquipo1}
              onChange={(e) => setNombreEquipo1(e.target.value)}
              placeholder="Nombre del Equipo 1"
              className="form-control me-2 flex-grow-1"
            />
            <input
              type="text"
              value={nombreEquipo2}
              onChange={(e) => setNombreEquipo2(e.target.value)}
              placeholder="Nombre del Equipo 2"
              className="form-control me-2 flex-grow-1"
            />
          </div>
          
        </div>

        {/* Contenedor de checkboxes */}
        <div className="border p-4 rounded mb-4 w-100">
          {/* Input para agregar puntos */}
          <div className="d-flex align-items-center mb-3">
            <input
              type="number"
              value={puntos}
              onChange={(e) => setPuntos(Number(e.target.value))}
              placeholder="Puntos"
              className="form-control me-2 flex-grow-1"
            />
          </div>
          
          <div className="d-grid gap-3">
            {/* Checkbox de corte */}
            <div className="form-check">
              <input
                type="checkbox"
                id="corte"
                checked={corte}
                onChange={(e) => setCorte(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="corte" className="form-check-label h5">Corte</label>
            </div>

            {/* Checkbox de pura con dropdown */}
            <div className="d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  type="checkbox"
                  id="pura"
                  checked={pura}
                  onChange={(e) => setPura(e.target.checked)}
                  className="form-check-input"
                />
                <label htmlFor="pura" className="form-check-label h5 me-2">Pura</label>
              </div>
              <select
                value={puraCantidad}
                onChange={(e) => setPuraCantidad(Number(e.target.value))}
                disabled={!pura}
                className="form-select w-auto"
              >
                {generarOpciones()}
              </select>
            </div>

            {/* Checkbox de impura con dropdown */}
            <div className="d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  type="checkbox"
                  id="impura"
                  checked={impura}
                  onChange={(e) => setImpura(e.target.checked)}
                  className="form-check-input"
                />
                <label htmlFor="impura" className="form-check-label h5 me-2">Impura</label>
              </div>
              <select
                value={impuraCantidad}
                onChange={(e) => setImpuraCantidad(Number(e.target.value))}
                disabled={!impura}
                className="form-select w-auto"
              >
                {generarOpciones()}
              </select>
            </div>

            {/* Checkbox de levantar el muerto */}
            <div className="form-check">
              <input
                type="checkbox"
                id="levantarMuerto"
                checked={levantarMuerto}
                onChange={(e) => setLevantarMuerto(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="levantarMuerto" className="form-check-label h5">Levantar el muerto</label>
            </div>

            {/* Mostrar valor total */}
            <div className="mt-4 p-4 bg-secondary text-white rounded">
              <p className="h4 fw-bold mb-0">Valor total: {calcularValor()}</p>
            </div>
            
            {/* Botones para agregar puntos y reset */}
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={handleIngresarPuntosEquipo1}
                className="btn btn-success"
              >
                Agregar Puntos Equipo 1
              </button>
              <button
                onClick={handleIngresarPuntosEquipo2}
                className="btn btn-danger"
              >
                Agregar Puntos Equipo 2
              </button>
              <button
                onClick={() => {
                  // Resetear el input de puntos
                  setPuntos(0);
                  // Desmarcar todos los checkboxes
                  setCorte(false);
                  setPura(false);
                  setImpura(false);
                  setLevantarMuerto(false);
                  // Resetear los dropdowns a 1
                  setPuraCantidad(1);
                  setImpuraCantidad(1);
                }}
                className="btn btn-warning"
              >
                RESET
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de equipos y puntos */}
        <div className="w-100 overflow-x-auto">
          <table className="table table-bordered">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="text-white">{nombreEquipo1 || 'Equipo 1'}</th>
                <th className="text-white">{nombreEquipo2 || 'Equipo 2'}</th>
              </tr>
            </thead>
            <tbody>
              {/* Mostrar puntos de los equipos */}
              {filasPuntos.map((fila, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'table-striped' : ''}>
                  <td className="text-center text-white">
                    {fila.equipo1 !== null ? fila.equipo1 : ''}
                  </td>
                  <td className="text-center text-white">
                    {fila.equipo2 !== null ? fila.equipo2 : ''}
                  </td>
                </tr>
              ))}
              {/* Agregar filas vacías si es necesario para llegar a 10 filas */}
              {Array.from({ length: Math.max(10 - filasPuntos.length, 0) }).map((_, index) => (
                <tr key={filasPuntos.length + index} className={(filasPuntos.length + index) % 2 === 0 ? 'table-striped' : ''}>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mensaje del equipo ganador */}
        <div className="mt-4 text-center text-white">
          {(() => {
            const equipoGanador = determinarEquipoGanador();
            if (equipoGanador) {
              return (
                <p className="h5">
                  Va ganando el equipo <strong>{equipoGanador.nombre}</strong> con <strong>{equipoGanador.puntos}</strong> puntos.
                </p>
              );
            } else {
              return <p className="h5">Los equipos están empatados.</p>;
            }
          })()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white p-4 text-center">
        <p className="mb-0">&copy; 2025 Burakeando ando. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
