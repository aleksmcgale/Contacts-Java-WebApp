import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';




import axios from 'axios'
import AddContactDialog from './AddContactDialog'
const CONTACTS_REST_API_URL = 'http://localhost:8080/api/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  table: {
    minWidth: 550,
  },
}));






export default function ContactTable({rows, openEdit}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const openEditDialog = (row)=>{
    openEdit(row)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)', marginTop:'40px' }}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="none" component="th" align="right"></TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Number</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Email</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} onClick={()=>openEditDialog(row)}>
                <TableCell align="right"><Avatar style={{backgroundColor:'navy'}}>{row.lastName[0] || ''}{row.firstName[1] || ''}</Avatar></TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.email}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>

  );
}

