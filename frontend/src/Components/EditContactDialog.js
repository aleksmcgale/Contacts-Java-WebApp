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


export default function EditContactDialog({open, contact, editContact,closeDialog, deleteContact}) {
  console.log(contact,'CONYAC')
  let c = contact;
  const [lastName, setLastName] = React.useState(c.lastName);
  const [firstName, setFirstName] = React.useState(contact.firstName);

  const [phoneNumber, setPhoneNumber] = React.useState(contact.phoneNumber);

  const [address, setAddress] = React.useState(contact.address);

  const [email, setEmail] = React.useState(contact.email);
  console.log(lastName)



  const handleClose = () => {
    closeDialog();
  };

  const handleEditContact = () =>{
    let data = {
      id: contact.id ,
      lastName: lastName || contact.lastName,
      firstName: firstName ||contact.firstName,
      address: address || contact.address,
      email: email || contact.email,
      phoneNumber: phoneNumber || contact.phoneNumber
    };
    editContact(contact,data);
    handleClose();

  }

  const handleDeleteContact = () =>{
    deleteContact(contact);
    handleClose();

  }



  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
        <DialogContent>
          <form  noValidate autoComplete="off">
            <TextField id="standard-basic" defaultValue={contact.lastName} value={lastName} onChange={e=>setLastName(e.target.value)} label="Last Name" />
            <TextField id="standard-basic" defaultValue={contact.firstName} value={firstName} onChange={e=>setFirstName(e.target.value)} label="First Name" />
            <TextField id="standard-basic" defaultValue={contact.phoneNumber} value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} label="Phone Number" />
            <TextField id="standard-basic"  defaultValue={contact.address} value={address} onChange={e=>setAddress(e.target.value)} label="Address" />
            <TextField id="standard-basic" defaultValue={contact.email}  value={email} onChange={e=>setEmail(e.target.value)} label="Emaill" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteContact} color="primary">
            Delete Contact
          </Button>
          <Button onClick={handleEditContact} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
