import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { RegistrationForm } from "../RegistrationForm";

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
}

export const RegistrationDialog: FC<Props> = ({ isOpen, closeDialog }) => {
  const onCancel = () => {
    closeDialog();
  };

  const close = () => {
    closeDialog();
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <RegistrationForm onCancel={onCancel} close={close} />
      </DialogContent>
    </Dialog>
  );
};
