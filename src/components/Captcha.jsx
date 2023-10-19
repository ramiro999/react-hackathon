import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";


export const Captcha = () => {
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);
  const [text, setText] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(8));
  };

  const matchCaptcha = (event) => {
    event.preventDefault();
    if (text === captcha) {
      setValid(false);
      setSuccess(true);
    } else {
      setValid(true);
      setSuccess(false);
    }
  };

  return (
    <React.Fragment>
      <div className="card">
        <CardHeader title="No soy un robot" />
        <Divider />

        <CardContent>
          <CardActions>
            <div className="h3">{captcha} </div>
            <Button
              startIcon={<RefreshIcon />}
              onClick={refreshString}
            ></Button>
          </CardActions>

          <form onSubmit={matchCaptcha}>
            <TextField
              label="Digita el Captcha"
              focused
              value={text}
              fullWidth
              onChange={(e) => setText(e.target.value)}
              error={valid}
              helperText={valid && "Captcha Invalido"}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onClick={matchCaptcha}
            >
              Submit
            </Button>
            {success && (
              <div style={{ color: "green", marginTop: "10px" }}>
                Captcha validado
              </div>
            )}
          </form>
        </CardContent>
      </div>
    </React.Fragment>
  );
};
