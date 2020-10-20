import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
const CONTACTS_REST_API_URL = 'http://localhost:8080/api/';


export default function AddContactDialog({open, closeDialog, addContact}) {
  // const [open, setOpen] = React.useState(false);
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');

  const [phoneNumber, setPhoneNumber] = React.useState('');

  const [address, setAddress] = React.useState('');

  const [email, setEmail] = React.useState('');



  const handleClose = () => {
    closeDialog();
  };

  const handleAddContact = () => {
    let data = {
      lastName: lastName,
      firstName: firstName,
      address: address,
      email: email,
      phoneNumber: parseInt(phoneNumber)
    };
    addContact(data);
    handleClose();

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
        <DialogContent>
          <form  noValidate autoComplete="off">
            <TextField id="standard-basic" value={lastName} onChange={e=>setLastName(e.target.value)} label="Last Name" />
            <TextField id="standard-basic" value={firstName} onChange={e=>setFirstName(e.target.value)} label="First Name" />
            <TextField id="standard-basic" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} label="Phone Number" />
            <TextField id="standard-basic"  value={address} onChange={e=>setAddress(e.target.value)} label="Address" />
            <TextField id="standard-basic"  value={email} onChange={e=>setEmail(e.target.value)} label="Emaill" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddContact} color="primary">
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
