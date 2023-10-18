import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimulationPayPSE from './components/SimulationPayPSE';
import SimulationPayFC from './components/SimulationPayFC';

function App() {
  return (
    <>
    
    <Router>
      <div>
        <Routes>
          <Route path="/simulacion-pago-pse" element={<SimulationPayPSE />} />
          <Route path="/simulacion-pago-fc" element={<SimulationPayFC />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

