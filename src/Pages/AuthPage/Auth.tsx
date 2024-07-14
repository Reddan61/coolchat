import { FC, useEffect, useState } from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { ForgotDialog } from "../../Components/ForgotDialog";
import { LoginDialog } from "../../Components/LoginDialog";
import { RegistrationDialog } from "../../Components/RegistrationDialog";
import { useAppSelector } from "../../Redux/store";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    minHeight: "100vh",
    Width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: "200px",
  },
});

const Auth: FC = () => {
  const classes = useStyle();

  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isOpenRegistration, setOpenRegistration] = useState(false);
  const [isOpenForgotPassword, setOpenForgotPassword] = useState(false);

  return (
    <>
      <LoginDialog
        isOpen={isOpenLogin}
        closeDialog={() => setOpenLogin(false)}
        openForgotPasswordDialog={() => setOpenForgotPassword(true)}
      />

      <RegistrationDialog
        isOpen={isOpenRegistration}
        closeDialog={() => setOpenRegistration(false)}
      />

      <ForgotDialog
        isOpen={isOpenForgotPassword}
        closeDialog={() => setOpenForgotPassword(false)}
      />

      <Box className={classes.root}>
        <Button onClick={() => setOpenLogin(true)} className={classes.button}>
          Войти
        </Button>
        <Button onClick={() => setOpenRegistration(true)} className={classes.button}>
          Регистрация
        </Button>
      </Box>
    </>
  );
};

export default Auth;
