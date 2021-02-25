import React, { Fragment } from 'react';
import { Grid, Switch, Typography,
    makeStyles, Button, TextField } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
    },
    title: {
      fontSize: 16,
      color: '#000000',
      marginTop: 15
    },
    title2:{
        marginBottom: 5,
        fontSize: 14,
        color: '#000000'
    },
    title3:{
        marginBottom: 5,
    },
    button:{
        marginBottom: 10,
        margin: 15,
        marginTop: 15
    },
    button2:{
        marginTop: 20
    },
    pos: {
      marginTop: 15,
    },
    container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 25
    },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    },
    dialog: {
        marginTop: 15,
        marginLeft: 45,
        marginRight: 45,
        width: 300
    },
  }));

    function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    
    const handleClose = () => {
        onClose(selectedValue);
    };
    
    
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add Work</DialogTitle>
        <TextField className={classes.dialog} label="Description" />
        <TextField className={classes.dialog} label="Price" />
        <Button className={classes.button} variant="contained" color="primary">
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'description',
        headerName: 'Description',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 500,
      },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 180,
    },
  ];
  
  const rows = [
    { id: 1, description: 'Extra injector 500cc',  price: 3000000 },
    { id: 2, description: 'Overhaul', price: 6500000 },
    { id: 3, description: 'Jasa pasang turbo', price: 2500000 },
  ];

  const columns2 = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'item',
        headerName: 'Item',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 250,
      },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 180,
    },
  ];
  
  const rows2 = [
    { id: 1, item: 'Injector',  price: 3000000 },
    { id: 2, item: 'Sparepart Mesin', price: 1500000 },
    { id: 3, item: 'Paking turbo', price: 250000 },
  ];
  

const ProjectDetails = () => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
    <Fragment>
        <Grid container className="table" justify="center" spacing="2">
                <Grid key="1" item xs="2">

                <Typography variant="h5" component="h2">
                    Project Toyota yaris TRD 2012
                </Typography> 
                <div className='date'>
                    <form className={classes.container} noValidate>
                        <TextField
                            label="Start Date"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>
                    <form className={classes.container} noValidate>
                    <TextField
                        label="End Date"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </form>
                    <Typography className={classes.pos} color="textSecondary">
                        Status
                    </Typography>
                    <Switch
                        checked='false'
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total Price: <br></br> Rp.25.500.000
                    </Typography>
                    <Button className={classes.button2} variant="contained" color="primary">
                        Export PDF
                    </Button> 
                </div>
                </Grid>
                <Grid key="2" item xs="6">
                <Typography className={classes.title3} variant="h5" component="h2">
                    Work Details
                </Typography>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleClickOpen}>
                    Add Work
                </Button>
                <Typography className={classes.title2} color="textSecondary" gutterBottom>
                Price: Rp.15.500.000
                </Typography> 
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>
                </Grid>
                <Grid key="3" item xs="4">
                <Typography className={classes.title3} variant="h5" component="h2">
                    Item Used
                </Typography>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleClickOpen}>
                    Add Item
                </Button>
                <Typography className={classes.title2} color="textSecondary" gutterBottom>
                Price: Rp.10.000.000
                </Typography>   
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows2} columns={columns2} pageSize={5} />
                </div>
                <SimpleDialog open={open} onClose={handleClose} /> 
                </Grid>
        </Grid>
    </Fragment>
  );
}

export default ProjectDetails;