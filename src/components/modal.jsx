
import React, {useState, useEffect} from "react";
import { Grid, Typography } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from "@material-ui/core/styles";

export default function MyModal(props){
    const classes=useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [firstname, setFirstname]=useState('')
    const [lastname, setLastname]=useState('')
    const [gender, setGender]=useState('')
    const [born_date, setBorn_date]=useState('')
    const [email, setEmail]=useState('')
    const [work_exp_catg, setWork_exp_catg]=useState('')
    const [work_type_available, setWork_type_available]=useState('')
    const [backgrounds, setBackGrounds] = useState([])
    const [work_experiences, setWorkExperiences] = useState([])
    function getModalStyle() {
        const top = 50;
        const left = 50;
        
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    useEffect(()=>{
        if(props.open){
            const {personal_data, backgrounds, work_experiences} = props.candidate
            setFirstname(personal_data.firstname)
            setLastname(personal_data.lastname)
            setGender(personal_data.gender)
            setBorn_date(personal_data.born_date)
            setEmail(personal_data.email)
            setWork_exp_catg(personal_data.work_exp_catg)
            setWork_type_available(personal_data.work_type_available)
            setBackGrounds(backgrounds)
            setWorkExperiences(work_experiences)
        }
    },[props])

    return(
        <Modal open={props.open} onClose={props.close} disableBackdropClick={false}>  
        <>
            <Grid container style={modalStyle} className={classes.paper}>
                <Grid item md={12}><Typography><strong>Datos Basicos</strong></Typography></Grid>
                <Grid item md={3} >
                    <Typography><strong>Nombre: </strong>{firstname}</Typography>
                </Grid>
                <Grid item md={3} >
                    <Typography><strong>Apellido: </strong>{lastname}</Typography>
                </Grid>
                <Grid item md={3} >
                    <Typography><strong>Genero: </strong>{gender}</Typography>
                </Grid>
                <Grid item md={3} >
                    <Typography><strong>Fecha de nacimiento: </strong>{born_date}</Typography>
                </Grid>
                <Grid item md={3} >
                    <Typography><strong>email: </strong>{email}</Typography>
                </Grid>
                <Grid item md={3} >
                    <Typography><strong>Aplica a:</strong>{work_exp_catg}</Typography>
                </Grid>
                <Grid item md={3} >
                    <Typography><strong>Modalidad: </strong>{work_type_available}</Typography>
                </Grid>
                <Grid item md={12}><Typography><strong>Formación Academica</strong></Typography></Grid>
                {
                    backgrounds.length!==0 && backgrounds.map((background, index) => (
                        <Grid container key={index}>
                            <Grid item md={3}>
                                <Typography><strong>Nivel Academico:</strong>{background.academic_level}</Typography>
                            </Grid>
                            <Grid item md={3} >
                                <Typography><strong>Instituto:</strong>{background.name}</Typography>
                            </Grid>
                        </Grid>
                    ))
                }
                <Grid item md={12}><Typography><strong>Experiencia Laboral</strong></Typography></Grid>
                <Grid container>
                    <Grid item md={3}>
                        <Typography><strong>Puesto </strong></Typography>
                    </Grid>
                    <Grid item md={3} >
                        <Typography><strong>Inicio </strong></Typography>
                    </Grid>
                    <Grid item md={3} >
                        <Typography><strong>Fin</strong></Typography>
                    </Grid>
                    <Grid item md={3} >
                        <Typography><strong>Duración</strong></Typography>
                    </Grid>
                </Grid>
                {
                    work_experiences.length!==0 && work_experiences.map((experience, index) => (
                        <Grid container key={index}>
                            <Grid item md={3}>
                                <Typography>{experience.position}</Typography>
                            </Grid>
                            <Grid item md={3} >
                                <Typography>{experience.start}</Typography>
                            </Grid>
                            <Grid item md={3} >
                                <Typography>{experience.end}</Typography>
                            </Grid>
                            <Grid item md={3} >
                                <Typography>{`${experience.time} ${experience.time===1?'año':'años'}`}</Typography>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>        
        </>
        </Modal>
    )
}



const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: "80%",
      height:"80%",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #FFF',
      boxShadow: theme.shadows[5],
      padding:"20px",
      outline: 'none',
      overflowY:"scroll",
      justifyContent:"flex-start", 
      alignItems:"flex-start"
    },
    aceptButtonLabel: {
        color: "#ffffff",
        fontSize: "0.8rem",
        
    },
    h2:{
        color:"#777777",
        fontWeight: "unset",
        fontSize: "1rem",
    },
    modalText:{
        color:"#575756",
        fontWeight: "bold",
        fontSize: "0.8rem",
    },
    p:{
        fontSize:"1.3rem",
        color:"#848484",
    },
    highlightedP:{
        fontSize:"1.5rem",
        color:"#af0061",
    },
    
  }));