import React, { Fragment, useState } from 'react';
import { Card, CardActions, CardContent, Typography, makeStyles, Button, ButtonGroup, TextField } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    dialog: {
        marginTop: 15,
        marginLeft: 45,
        marginRight: 45,
        width: 300
    },
    button: {
        margin: 15,
        marginTop: 35
    },
  });

function SimpleDialog(props) {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        accountNumber: '',
        salary: 0
    });

    const {name, address, phoneNumber, accountNumber, salary} = formData;

    const { onClose, selectedValue, open } = props;
      
        const handleClose = () => {
          onClose(selectedValue);
        };
      

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        const newEmployee = {
            name,
            address,
            phoneNumber,
            accountNumber,
            salary
        }

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(newEmployee);

            const res = await axios.post('api/employees', body, config);
            console.log(res.data);

        } catch (err) {
            console.error(err.response.data);
        }
    }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add New Employee</DialogTitle>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="name" label="Name" value={name}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="address" label="Address" value={address}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="phoneNumber" label="Phone Number" value={phoneNumber}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="accountNumber" label="Account Number" value={accountNumber}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="salary" label="Salary" type="number" value={salary}/>
        <Button onClick={e => onSubmit(e)} className={classes.button} variant="contained" color="primary">
            Submit
        </Button>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  function UpdateDialog(props) {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
        phoneNumber: '',
        accountNumber: '',
        salary: 0
    });

    const {id, name, address, phoneNumber, accountNumber, salary} = formData;

    const { onClose, selectedValue, open } = props;
      
        const handleClose = () => {
          onClose(selectedValue);
        };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        const newEmployee = {
            name,
            address,
            phoneNumber,
            accountNumber,
            salary
        }

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(newEmployee);

            const res = await axios.patch(`api/employees/${id}`, body, config);
            console.log(res.data);

        } catch (err) {
            console.error(err.response.data);
        }
    }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Update Employee</DialogTitle>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="id" label="ID" value={id}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="name" label="Name" value={name}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="address" label="Address" value={address}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="phoneNumber" label="Phone Number" value={phoneNumber}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="accountNumber" label="Account Number" value={accountNumber}/>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="salary" label="Salary" type="number" value={salary}/>
        <Button onClick={e => onSubmit(e)} className={classes.button} variant="contained" color="primary">
            Submit
        </Button>
      </Dialog>
    );
  }
  
  UpdateDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  function DeleteDialog(props) {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        id: '',
    });

    const {id} = formData;

    const { onClose, selectedValue, open } = props;
      
        const handleClose = () => {
          onClose(selectedValue);
        };
      

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        
        try{
            await axios.delete(`api/employees/${id}`);

        } catch (err) {
            console.error(err.response.data);
        }
    }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add New Employee</DialogTitle>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="id" label="ID" value={id}/>
        <Button onClick={e => onSubmit(e)} className={classes.button} variant="contained" color="primary">
            Submit
        </Button>
      </Dialog>
    );
  }
  
  DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  async function getData() {
    let res = await axios.get('api/employees');
    console.log(res.data);
    return res.data;
  }
  
const Employee = () => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleClose1 = (value) => {
      setOpen1(false);
  };
  const handleClose2 = (value) => {
    setOpen2(false);
};

    return (
    <Fragment>
        <div className='buttons'>
            <Button id="bl" variant="contained" color="primary" onClick={handleClickOpen}>
                Add Employee
            </Button>
            <Button id="bl" variant="contained" color="primary" onClick={handleClickOpen2}>
                Update Employee
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClickOpen1}>
                Delete
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
            <DeleteDialog open={open1} onClose={handleClose1} />
            <UpdateDialog open={open2} onClose={handleClose2} />
        </div>
            <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              Phone Number: 082110500074
              </Typography>
              <Typography variant="h5" component="h2">
              Ferdyan
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              644502114
              </Typography>
              <Typography variant="body2" component="p">
              Perumahan Puri Bintaro Hijau B6/12, Pondok Aren, Tanggerang Selatan
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              Rp.5.000.000
              </Typography>
            </CardContent>
            <CardActions>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            </CardActions>
            </Card>
    </Fragment>
  );
}

export default Employee;