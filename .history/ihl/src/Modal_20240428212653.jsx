import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import useNavigate from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, onClose, onLogin, onPasswordChange }) {
  const [open, setOpen] = React.useState(true);
  const [pwd, setPwd] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWrong = () => {
    setOpen(false);
    // navigate("/");
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Enter Password
          </DialogContentText>
          <input onChange={(e) => setPwd(e.target.value)} className='bg-white'/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWrong}>Go back</Button>
          <Button onClick={handleClose} disabled={pwd !== "ihlfinal"}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}