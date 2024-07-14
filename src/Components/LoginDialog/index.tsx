import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { LoginForm } from "../LoginForm";

interface Props {
  isOpen: boolean;
  openForgotPasswordDialog: () => void;
  closeDialog: () => void;
}

export const LoginDialog: FC<Props> = ({
  isOpen,
  closeDialog,
  openForgotPasswordDialog,
}) => {
  const onCancel = () => {
    closeDialog();
  };

  const onForgot = () => {
    closeDialog();
    openForgotPasswordDialog();
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <LoginForm onCancel={onCancel} onForgot={onForgot} />
      </DialogContent>
    </Dialog>
  );
};
