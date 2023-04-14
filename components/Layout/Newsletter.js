import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';
import { FormControl } from '@mui/material';

export default function Newsletter() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const subscribeUser = async (e) => {
    e.preventDefault();
    console.log(inputRef.current.value)
    // this is where your mailchimp request is made

    const res = await fetch('/api/subcribers', {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),

      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
    });

    const { error } = await res.json();
    
    if (error) {
        console.log('error, idiot!')
   
        return;
    }
  inputRef.current.value = '';

  handleClose()
};

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[900],
    },
  }));

  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen}>
        Newsletter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color='secondary'>Subscribe</DialogTitle>
        <form>
        <FormControl>
        <DialogContent>
          <DialogContentText color='secondary'>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            inputRef={inputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>Cancel</Button>
          <ColorButton variant='contained' type="submit" value="" onClick={subscribeUser}>Subscribe</ColorButton>
        </DialogActions>
        </FormControl>
        </form>
      </Dialog>
    </div>
  );
}