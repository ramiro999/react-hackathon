import { useForm, Controller } from "react-hook-form";
import CardComponent from "./CardComponent";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/img/logo_extendido.jpeg";
import { Captcha } from "./Captcha";

export default function SimulationPayPSE() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [allFieldsValid, setAllFieldsValid] = useState(false);
  //const [monto, setMonto] = useState("");

  const myParam = useLocation().search;
  const cuentaID = new URLSearchParams(myParam).get("cuentaid");
  console.log(cuentaID);

  async function requestPaymentToken(confirm, monto) {
    const response = await fetch(
      "https://fcpay-production.up.railway.app/token-pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirm: confirm,
          monto: monto,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  async function makePayment(token, cuenta_id, monto, ip) {
    console.log(String(token));
    const response = await fetch(
      "https://fcpay-production.up.railway.app/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: String(token),
          cuenta_id: Number(cuenta_id),
          monto: Number(monto),
          ip: ip,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  const handleFieldValidation = () => {
    // Verificar si todos los campos son válidos
    const isValid = Object.keys(errors).length === 0;
    setAllFieldsValid(isValid);
  };

  const onsubmit = (data, e) => {
    e.preventDefault();
    requestPaymentToken(true, data.monto).then((res) => {
      makePayment(res["token"], cuentaID, data.monto, "").then((response) => {
        console.log(response);
        swal({
          title: "¿Estás seguro?",
          text: "¿Deseas realizar el pago?",
          icon: "warning",
          buttons: ["No", "Sí"],
          dangerMode: true,
      })
      .then((willPay) => {
          if (willPay) {
              setTimeout(() => {
                  swal({
                      title: "¡Pago realizado!",
                      text: "El pago se realizó correctamente",
                      icon: "success",
                      button: "Aceptar",
                  })
                  .then(() => {
                      window.location.href = "/simulacion-pago-pse";
                  });
              }, 1500);
          }
      });
      });
    });
  };

  return (
    <CardComponent>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <div className="mb-3 flex justify-center">
          <img src={logo} width="100" height="100"  />{" "}
        </div>
        <h1 className="text-2xl text-center text-white bg-green-700 font-bold mb-4 rounded">
          Pagos PSE
        </h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-4">
            <label htmlFor="monto" className="block text-gray-600">
              Monto:
            </label>
            <Controller
              name="monto"
              control={control}

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
          
          <div className="mb-4 flex justify-center">
            
            <Captcha />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover-bg-green-400 text-white font-bold py-2 px-4 rounded"
            disabled={!allFieldsValid}
          >
            Realizar Pago
          </button>
        </form>
      </div>
    </CardComponent>
  );
}
