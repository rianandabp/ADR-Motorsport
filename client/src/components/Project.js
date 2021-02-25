import React, { Fragment, useState } from 'react';
import { Card, CardActions, CardContent, Typography, makeStyles, Button, ButtonGroup, TextField} from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
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
        carModel: '',
        description: '',
        owner: '',
        plateNumber: ''
    });

    const {carModel, description, owner, plateNumber} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        const newProject = {
            carModel,
            description,
            owner,
            plateNumber
        }

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(newProject);

            const res = await axios.post('api/projects', body, config);
            console.log(res.data);

        } catch (err) {
            console.error(err.response.data);
        }
    }

    const { onClose, selectedValue, open } = props;
    
    const handleClose = () => {
        onClose(selectedValue);
    };
    
    
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add New Project</DialogTitle>
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="plateNumber" label="Plate Number" />
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="carModel" label="Car Model" />
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="owner" label="Owner" />
        <TextField onChange={e => onChange(e)} className={classes.dialog} name="description" label="Description" />
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

const Project = () => {

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
            <div className='buttons'>
            <Button id="bl" variant="contained" color="primary" onClick={handleClickOpen}>
                Add Project
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
            </div>
            <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                B 1787 WMR
                </Typography>
                <Typography variant="h5" component="h2">
                Toyota yaris TRD 2012
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                Ryan
                </Typography>
                <Typography variant="body2" component="p">
                Pasang turbo + overhaul
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                On Progress
                </Typography>
            </CardContent>
            <CardActions>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button href="/project/detail">View</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
            </CardActions>
            </Card>
        </Fragment>
    
  );
}

export default Project;