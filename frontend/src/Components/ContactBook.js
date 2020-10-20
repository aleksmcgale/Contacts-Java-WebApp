import React, { Component } from 'react';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Custom Components
import ContactTable from './ContactTable'
import AddContactDialog from './AddContactDialog'
import EditContactDialog from './EditContactDialog'

const CONTACTS_REST_API_URL = 'http://localhost:8080/api/';


class ContactBook extends Component {
  constructor(props){
    super(props);
    this.closeAddContactDialog = this.closeAddContactDialog.bind(this);
    this.openEditContactDialog = this.openEditContactDialog.bind(this);
    this.state = {
      isLoading: true,
      contacts: [],
      addContact:false,
      editContact:false,
      editItem: {},
      filter_value:''
    };
  }

  componentDidMount() {
    axios.get(CONTACTS_REST_API_URL + 'contacts')
      .then(response => {
        this.setState({contacts: response.data, isLoading: false})
      })
  }

  closeAddContactDialog = () =>{
    this.setState({ addContact:false})
  }

  closeEditContactDialog = () =>{
    this.setState({editContact: false})
  }

  openEditContactDialog = (row)=>{
    this.setState({editContact: true, editItem: row})

  }

  handleAddContact = (contact) =>{
    axios.post(CONTACTS_REST_API_URL + 'contacts', contact)
      .then(response => {
        console.log(response)
        console.log(response.data)
        //this.setState({contacts: response.data, isLoading: false})
        this.setState(prevState=>({
          contacts: [response.data, ...prevState.contacts]
        }))
      })
  }

  handleEditContact = (contact, data) =>{
    console.log(contact, data)
    axios.put(CONTACTS_REST_API_URL + 'contacts/'+ String(contact.id),  data)
      .then(response => {
        let temp_array = [...this.state.contacts];
        let index = temp_array.indexOf(contact)
        if (index !== -1) {
          temp_array.splice(index, 1);
          this.setState({
            contacts: temp_array
          })
        }
        this.setState(prevState=>({
          contacts: [response.data, ...prevState.contacts]
        }))


      })

  }


  handleDeleteContact = (contact) =>{
    axios.delete(CONTACTS_REST_API_URL + 'contacts/'+ String(contact.id) )
      .then(response => {
        let temp_array = [...this.state.contacts];
        var index = temp_array.indexOf(contact)
        if (index !== -1) {
          temp_array.splice(index, 1);
          this.setState({
            contacts: temp_array
          })
        }
      })
  }

  render() {
    const {contacts, isLoading, filter_value} = this.state;
    let filtered_contacts  = contacts.filter(e => e.lastName.includes(filter_value))
    if (isLoading) {
      return <p>Loading...</p>;

    }
    console.log(contacts)

    return (
      <div>
        <div>
          <div style={{overflow:'hidden', paddingRight:'.5em'}}>

            <TextField label="Search..." style={{width: '100%',color:'black'}} color="black" onChange={(e)=>this.setState({filter_value:e.target.value})} margin="normal" variant="outlined"  />


          </div>
          <Button variant="contained" style={{float:'right', backgroundColor:'lightgrey',color:'black'}}  onClick={()=>this.setState({ addContact:true})} >
            Add Contact
          </Button>
          <AddContactDialog open={this.state.addContact} addContact={this.handleAddContact} closeDialog={this.closeAddContactDialog}/>
        </div>
        <ContactTable rows={filtered_contacts} openEdit={this.openEditContactDialog}/>
        <EditContactDialog open={this.state.editContact} contact={this.state.editItem} editContact={this.handleEditContact} closeDialog={this.closeEditContactDialog} deleteContact={this.handleDeleteContact}/>
      </div>

    );
  }
}

export default ContactBook;
