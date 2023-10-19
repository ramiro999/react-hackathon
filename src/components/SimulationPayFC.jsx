import { useForm, Controller } from "react-hook-form";
import CardComponent from "./CardComponent";
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/img/logo_extendido.jpeg";

export default function SimulationPayFC() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const onChange = (value) => {
    console.log("Captcha value:", value);
  };

  const handleChange = () => {
    navigate("/simulacion-pago-fc");
  }

  const navigate = useNavigate();

  const handleFieldValidation = () => {
    // Verificar si todos los campos son válidos
    const isValid = Object.keys(errors).length === 0;
    setAllFieldsValid(isValid);
  };

  const handlePayment = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas realizar el pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
        Swal.fire({
          title: "¡Pago realizado!",
          text: "El pago se realizó correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/simulacion-pago-fc";
          }
        });
      }, 1500);
    }
    });
  }

  return (
    <CardComponent>
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <div className="mb-3 flex justify-center">
          <img src={logo} width="100" height="100"  />{" "}
        </div>
        <h1 className="text-2xl text-center text-white bg-green-700 font-bold mb-4 rounded">
          Pagos FC
        </h1>
        <form onSubmit={handleSubmit((data) => {
            onSubmit(data);
            if (allFieldsValid) {
              handleChange();
            }
          })}>
          <div className="mb-4">
            <label htmlFor="monto" className="block text-green-600">
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
              name="tarjetaFC"
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
              name="fechaFC"
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
              name="cvvFC"
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
            className="w-full bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
            disabled={!allFieldsValid}
            onClick={handlePayment}      
          >
            Realizar Pago
          </button>
        </form>
      </div>
    </CardComponent>
  );
}
