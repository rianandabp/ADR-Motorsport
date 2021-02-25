import React, { Fragment, useState } from 'react';
import { makeStyles, Button, Card, CardContent,
         Typography, ButtonGroup, CardActions, TextField} from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import axios from 'axios';

    const useStyles = makeStyles((theme) => ({
        formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        },
        selectEmpty: {
        marginTop: theme.spacing(2),
        },
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
    }));


    function SimpleDialog(props) {
        const classes = useStyles();

        const [formData, setFormData] = useState({
            category: '',
            name: '',
            quantity: 0,
            price: 0
        });
    
        const {category, name, quantity, price} = formData;

        const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

        const onSubmit = async e => {
            e.preventDefault();
            const newItem = {
                category,
                name,
                quantity,
                price
            }
    
            try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
    
                const body = JSON.stringify(newItem);
    
                const res = await axios.post('api/items', body, config);
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
            <DialogTitle id="simple-dialog-title">Add New Item</DialogTitle>
            <TextField  onChange={e => onChange(e)} className={classes.dialog} name="name" label="Name" />
            <TextField  onChange={e => onChange(e)} className={classes.dialog} name="category" label="Category" />
            <TextField  onChange={e => onChange(e)} className={classes.dialog} name="quantity" label="Quantity" type="number" />
            <TextField  onChange={e => onChange(e)} className={classes.dialog} name="price" label="Price" type="number"/>
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
  
    

const Item = () => {

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
                Add Item
            </Button>
            <Button id="br" variant="contained" color="primary">
                Filter
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Category: Fluid
                </Typography>
                <Typography variant="h5" component="h2">
                Oli Q4 4L
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                Quantity: 10
                </Typography>
                <Typography variant="body2" component="p">
                Rp. 120.000
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

export default Item;