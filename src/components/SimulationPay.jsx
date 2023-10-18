
import CardComponent from './CardComponent';

export default function SimulationPay() {
  return (
    <CardComponent>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Pagos PSE De Financiera Comultrasan</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="monto" className="block text-gray-600">Monto:</label>
            <input type="text" id="monto" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="tarjeta" className="block text-gray-600">Número de Tarjeta:</label>
            <input type="text" id="tarjeta" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-gray-600">Fecha de Vencimiento:</label>
            <input type="text" id="fecha" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-600">CVV:</label>
            <input type="text" id="cvv" className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Realizar Pago
          </button>
        </form>
      </div>
    </CardComponent>
  );
}
