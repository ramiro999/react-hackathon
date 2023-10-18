import { useForm, Controller } from "react-hook-form";
import CardComponent from "./CardComponent";
import ReCAPTCHA from "react-google-recaptcha";

export default function SimulationPayFC() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onChange = (value) => {
    console.log("Captcha value:", value);
  }


  return (
    <CardComponent>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl text-center text-white bg-green-700 font-bold mb-4 rounded">
          Pagos FC
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="monto" className="block text-gray-600">
              Monto:
            </label>
            <Controller
              name="montoFC"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full p-2 border rounded"
                />
              )}
            />
            {errors.monto && <p className="text-red-500">Campo requerido</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="tarjeta" className="block text-gray-600">
              Número de Tarjeta:
            </label>
            <Controller
              name="tarjetaFC"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full p-2 border rounded"
                />
              )}
            />
            {errors.tarjeta && <p className="text-red-500">Campo requerido</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-gray-600">
              Fecha de Vencimiento:
            </label>
            <Controller
              name="fechaFC"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full p-2 border rounded"
                />
              )}
            />
            {errors.fecha && <p className="text-red-500">Campo requerido</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-600">
              CVV:
            </label>
            <Controller
              name="cvvFC"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full p-2 border rounded"
                />
              )}
            />
            {errors.cvv && <p className="text-red-500">Campo requerido</p>}
          </div>
          <div className="recaptcha mx-10 mb-5">
            <ReCAPTCHA sitekey="6LcJxq4oAAAAAPCUQ7dWBG_mb-0GaJSExqJG_k4o" onChange={onChange} />
            </div>
          
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          >
            Realizar Pago
          </button>
        </form>
      </div>
    </CardComponent>
  );
}
