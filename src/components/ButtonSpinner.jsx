import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button} from '@material-ui/core/';

function ButtonSpinner(props){
    const { classes } = props;
    return (   
    <Button
        style={{ marginTop:'10px'}}
        variant="contained"
        fullWidth={props.fullWidth}
        className={classes.button}
        disabled={props.loading||props.disabled}
        onClick={props.action}
    >
        {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        {props.text}
    </Button>
    );
}

ButtonSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    button:{
      backgroundColor:'#e8007c',
      color:'white',
      '&:hover': {
        backgroundColor:'#a30258',
      },
      '&:active': {
        backgroundColor:'#e8007c',
      },
      '&:focus': {
        backgroundColor:'#a30258',
      },
    },
    buttonProgress: {
      color: '#a30258',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });
  export default withStyles(styles)(ButtonSpinner);
