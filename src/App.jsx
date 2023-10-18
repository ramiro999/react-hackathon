
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimulationPay from './components/SimulationPay';

function App() {
  return (
    <>
    
    <Router>
      <div>
        <Routes>
          <Route path="/simulacion-pago" element={<SimulationPay />} />
          
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

