import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

export default function Newsletter() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const [message, setMessage] = useState(
    'Subscribe to the SolePost newsletter! Enter your email below and hit subscribe for occasional updates.'
  );
  const [error, setError] = useState(false);

  const isValid = (email) => {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      'gm'
    );
    if (emailRegex.test(email)) {
      return true;
    }
    return false;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage(
      'Subscribe to the SolePost newsletter! Enter your email below and hit subscribe for occasional updates.'
    );
  };

  const subscribeUser = async (e) => {
    e.preventDefault();

    if (!isValid(inputRef.current.value)) {
      setError(true);
      setMessage('Please check that the email you entered is valid.');
      return;
    } else {
      setError(false);
    }

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
      console.log(error);
      setMessage('Sorry, something went wrong. Please try again!');
      return;
    } else {
      setMessage('Success! Thanks for subscribing.');
    }
    inputRef.current.value = '';
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#9c27b0'),
    backgroundColor: '#d32f2f',
    '&:hover': {
      backgroundColor: '#b71c1c',
    },
  }));

  return (
    <div>
      <ColorButton onClick={handleClickOpen}>
        Newsletter
      </ColorButton>
      <Dialog open={open} onClose={handleClose} fullWidth style={{textAlign:'center'}}>
        <DialogTitle color="secondary">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText color="secondary">{message}</DialogContentText>
          <form>
            <FormControl sx={{ width: '100%' }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type={'email'}
                fullWidth
                variant="standard"
                inputRef={inputRef}
                error={error}
                required
              />

              <DialogActions>
                <Button color="secondary" onClick={handleClose}>
                  Close
                </Button>
                <ColorButton
                  variant="contained"
                  type="submit"
                  value=""
                  onClick={subscribeUser}
                >
                  Subscribe
                </ColorButton>
              </DialogActions>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
