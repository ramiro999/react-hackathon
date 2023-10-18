import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import CardComponent from "./CardComponent";
import ReCAPTCHA from "react-google-recaptcha";
import Particles from "react-particles";

export default function SimulationPay() {
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

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(container => {
    console.log(container);
  }, []);


  return (
    <div style={{ position: "relative" }}>
      <Particles
        params={{
          particles: {
            number: { value: 50 },
            size: { value: 3 },
          },
        }}
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      />
      <CardComponent>

        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
          <h1 className="text-2xl text-center text-green-500 font-bold mb-4">
            Pagos PSE de FC
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="monto" className="block text-gray-600">
                Monto:
              </label>
              <Controller
                name="monto"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
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
                name="tarjeta"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
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
                name="fecha"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
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
                name="cvv"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
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
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Realizar Pago
            </button>
          </form>
        </div>
      </CardComponent>
    </div>

  );
}

