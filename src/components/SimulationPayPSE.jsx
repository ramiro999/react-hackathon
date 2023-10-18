import { useForm, Controller } from "react-hook-form";
import CardComponent from "./CardComponent";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function SimulationPayPSE() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [monto, setMonto] = useState("");

  useEffect(() => {
    // Realiza una petición a una API
    fetch(
      "https://fcpay-production.up.railway.app/docs#/default/create_payment_token_token_pay_post",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setMonto(data));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  const navigate = useNavigate();

  const onChange = (value) => {
    console.log("Captcha value:", value);
  };

  const handleChange = () => {
    navigate("/simulacion-pago-pse");
  };

  const handleFieldValidation = () => {
    // Verificar si todos los campos son válidos
    const isValid = Object.keys(errors).length === 0;
    setAllFieldsValid(isValid);
  };

  return (
    <CardComponent>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl text-center text-white bg-green-700 font-bold mb-4 rounded">
          Pagos PSE
        </h1>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            if (allFieldsValid) {
              handleChange();
            }
          })}
        >
          <div className="mb-4">
            <label htmlFor="monto" className="block text-gray-600">
              Monto:
            </label>
            <Controller
              name="monto"
              control={control}
              defaultValue={monto}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  step={0}
                  min={0}
                  className="w-full p-2 border rounded"
                  onBlur={handleFieldValidation}
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
              name="tarjeta"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  pattern="[0-9]+"
                  maxLength={16}
                  className="w-full p-2 border rounded"
                  onBlur={handleFieldValidation}
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
              name="fecha"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full p-2 border rounded"
                  onBlur={handleFieldValidation}
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
              name="cvv"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  pattern="[0-9]+"
                  maxLength={3}
                  className="w-full p-2 border rounded"
                  onBlur={handleFieldValidation}
                />
              )}
            />
            {errors.cvv && <p className="text-red-500">Campo requerido</p>}
          </div>
          <div className="recaptcha mx-10 mb-5">
            <ReCAPTCHA
              sitekey="6LcJxq4oAAAAAPCUQ7dWBG_mb-0GaJSExqJG_k4o"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover-bg-green-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleChange}
            disabled={!allFieldsValid}
          >
            Realizar Pago
          </button>
        </form>
      </div>
    </CardComponent>
  );
}