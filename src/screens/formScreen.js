import React, { useState, useRef, useEffect } from 'react'
import {
    Grid, Container,
    makeStyles, CssBaseline,
    TextField, Select,
    FormControl, MenuItem,
    InputLabel, FormControlLabel,
    Checkbox
} from '@material-ui/core'
import countries from '../helpers/countries.json'
import states from '../helpers/states.json'
import cities from '../helpers/cities.json'
import knowledges from '../helpers/knowledge.json'
import Toast from '../components/Toast'
import ButtonSpinner from '../components/ButtonSpinner'

const genders = [
    { name: "Masculino" },
    { name: "Femenino" }
]
const academicLevels = [
    { name: "Bachiller" },
    { name: "Tecnico" },
    { name: "Universitario" }
]
const specializations = [
    { name: "Ninguna" },
    { name: "Maestria" },
    { name: "Postgrado" },
    { name: "Doctorado" }
]
const expYears = [
    { name: "Sin experiencia" },
    { name: "Menos de 1" },
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5+" },
    { name: "10+" }
]


export default function FormScreen() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail]=useState(false)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [countrie, setCountrie] = useState('')
    const [state, setState]=useState('')
    const [city, setCity]=useState('')
    const [newCities, setNewCities] = useState([])
    const [newStates, setNewtates] = useState([])
    const [labelWidth, setLabelWidth] = useState(0);
    const [date, setDate] = useState('')
    const [academicLevel, setAcademicLevel] = useState('')
    const [university, setUniversity] = useState('')
    const [specializationUniversity, setSpecializationUniversity] = useState('')
    const [specializationLevel, setSpecializationLevel] = useState('')
    const [salary, setSalary] = useState('')
    const [title, setTitle] = useState('')
    const [specializationTitle, setSpecializationTitle] = useState('')
    const [years, setYears] = useState('')
    const [company, setCompany] = useState('')
    const [job, setJob] = useState('')
    const [checkedTecnicalKnowledges, setTecnicalKnowledges] = useState([])
    const [checkedGeneralKnowledges, setGeneralKnowledges] = useState([])
    const [toast,setToast] = useState(false)
    const [toastMessage,setToastMessage] = useState('')
    
    useEffect(() => {setLabelWidth(inputLabel.current.offsetWidth)}, []);

    const handleChangeTecnicalKnowledges =async (event) => { 
        await setTecnicalKnowledges({...checkedTecnicalKnowledges, [event.target.value]: event.target.checked})
    }
    const handleChangeGeneralKnowledges =async (event) => {
       await setGeneralKnowledges({...checkedGeneralKnowledges, [event.target.value]: event.target.checked});
    }
    const handleCountrieChnage= async (e)=>{
        await setCountrie(e.target.value)
        let aux=[]
        states.states.forEach(element => {
            if(element.id_country===e.target.value)  {
                aux.push(element)
            }
        })
        await setNewtates(aux)
    }
    const handleStateChnage= async (e)=>{
        await setState(e.target.value)
        let aux=[]
        cities.cities.forEach(element => {
            if(element.id_state===e.target.value)  
                aux.push(element)
        })
        await setNewCities(aux)
    }
    const data = countries.countries;
    const inputLabel = useRef(null);
    const validateEmail= ()=> {
        if (email !== "") {
          let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(String(email).toLowerCase());
        } else {
          //this.ref.focus();
          return true;
        }
      }
    const handleOnBlurEmail = async () => {
        if (!validateEmail()) {
          await setValidEmail(true)
        }
        else await setValidEmail(false)

      };
    const validate=()=>{
        console.log("years",years)
        if(email===''){   
            setToast(true)
            setToastMessage('Debe ingresar un correo electronico')
            return false;
        }
        if(validEmail){   
            setToast(true)
            setToastMessage('Debe ingresar un correo electronico valido')
            return false;
        }
        else if(name===''){
            setToast(true)
            setToastMessage('Debe ingresar su nombre')
            return false;
        }
        else if(lastName===''){
            setToast(true)
            setToastMessage('Debe ingresar su apellido')
            return false;
        }
        else if(gender===''){
            setToast(true)
            setToastMessage('Debe ingresar su genero')
            return false;
        }
        else if(countrie===''){
            setToast(true)
            setToastMessage('Debe elegir su pais de residencia')
            return false;
        }
        else if(state===''){
            setToast(true)
            setToastMessage('Debe elegir su estado de residencia')
            return false;
        }
        else if(city===''){
            setToast(true)
            setToastMessage('Debe elegir su ciudad de residencia')
            return false;
        }
        else if(academicLevel===''){
            setToast(true)
            setToastMessage('Debe elegir su nivel Academico')
            return false;
        }
        if(academicLevel==='Tecnico' || academicLevel==='Universitario'){ 
            if(university===''){
                setToast(true)
                setToastMessage('Debe ingresar la universidad donde obtuvo su titulo')
                return false;
            }
            else if(title===''){
                setToast(true)
                setToastMessage('Debe ingresar el titulo que posee')
                return false;
            }
        }
        if(academicLevel==='Universitario' && specializationLevel===''){
            setToast(true)
            setToastMessage('Debe ingresar si posee alguna especializacion')
            return false;
        }
        if(academicLevel==='Universitario' && specializationLevel!=='Ninguna'){
            if(specializationUniversity==='')
            {   setToast(true)
                setToastMessage('Debe ingresar la universidad donde obtuvo su titulo de especializacion')
                return false;
            }
            if(specializationTitle==='')
            {
                setToast(true)
                setToastMessage('Debe ingresar el titulo de especializacion que posee')
                return false;
            }
        }
        if(years===''){
            setToast(true)
            setToastMessage('Debe elegir su tiempo de experiencia laboral')
            return false;
        }
        if(years!=='Sin experiencia' && years!=='Menos de 1' && company===''){
            setToast(true)
            setToastMessage('Debe indicar la empresa en la que trabajo mas tiempo')
            return false;
        }
        if(years!=='Sin experiencia' && years!=='Menos de 1' && job===''){
            setToast(true)
            setToastMessage('Debe indicar el cargo que desempeño')
            return false;
        }
        if(salary===''){
            setToast(true)
            setToastMessage('Debe indicar el salario al que aspira')
            return false;
        }
       
    }
    return (
        <div className={classes.container}>
            <Toast message={toastMessage} open={toast} close={()=>{setToast(false);}}/>
            <CssBaseline />
            <Grid lg={12} className={classes.header}>
                <h2 className={classes.title}>Curriculum Vitae</h2>
            </Grid>
            <Container maxWidth="lg" className={classes.containerChild} >
                <Grid lg={3} direction='column' className={classes.grid}>
                    <h2 className={classes.title}>Datos Personales</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        onBlur={handleOnBlurEmail}
                        error={validEmail}
                        helperText={validEmail ? 'Please enter a valid Email' : ' '}
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Apellido"
                        name="lastname"
                        autoComplete="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <FormControl variant="outlined" margin="normal" fullWidth>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Gender
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            labelWidth={labelWidth}
                            fullWidth

                        >
                            {
                                genders.map(gender => (<MenuItem key={gender.name} value={gender.name}>{gender.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        label="Fecha de nacimiento"
                        type="date"
                        defaultValue="2020-02-20"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="date"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <FormControl variant="outlined" margin="normal" fullWidth>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Pais de residencia
                        </InputLabel>
                        <Select
                            value={countrie.name}
                            onChange={handleCountrieChnage}
                            labelWidth={labelWidth}
                            fullWidth
                        
                        >
                            {
                                data.map(countries => (<MenuItem id={countries.id} value={countries.id}>{countries.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    {
                        countrie!==''?
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                Estado
                            </InputLabel>
                            <Select
                                value={state}
                                onChange={handleStateChnage}
                                labelWidth={labelWidth}
                                fullWidth
                            >
                            {
                                newStates.map(item => (<MenuItem id={item.id} value={item.id}>
                                {
                                    item.name
                                }
                                </MenuItem>))
                            }
                            </Select>
                        </FormControl>
                        :null
                    }
                    {
                        state!==''?
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                Ciudad
                            </InputLabel>
                            <Select
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                labelWidth={labelWidth}
                                fullWidth
                            >
                            {
                                newCities.map(item => (<MenuItem key={item.name} value={item.name}>
                                {
                                        item.name
                                }
                                </MenuItem>))
                            }
                            </Select>
                        </FormControl>
                        :null
                    }
                </Grid>
                <Grid lg={3} direction='column' className={classes.grid}>
                    <h2 className={classes.title}>Formación Academica</h2>
                    <FormControl variant="outlined" margin="normal" fullWidth>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Nivel Academico
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={academicLevel}
                            onChange={e => setAcademicLevel(e.target.value)}
                            labelWidth={labelWidth}
                            fullWidth
                        >
                            {
                                academicLevels.map(level => (<MenuItem key={level.name} value={level.name}>{level.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    {
                        academicLevel === "Universitario" || academicLevel === "Tecnico" ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="University"
                                label="Instituto o Universidad"
                                name="University"
                                autoComplete="University"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                            /> : null
                    }
                    {
                        academicLevel === "Universitario" || academicLevel === "Tecnico" ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Titulo"
                                name="title"
                                autoComplete="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            /> : null
                    }
                    {
                        academicLevel === "Universitario" ?
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                    Especialización
                            </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={specializationLevel}
                                    onChange={e => setSpecializationLevel(e.target.value)}
                                    labelWidth={labelWidth}
                                    fullWidth
                                >
                                    {
                                        specializations.map(level => (<MenuItem key={level.name} value={level.name}>{level.name}</MenuItem>))
                                    }
                                </Select>
                            </FormControl> : null
                    }
                    {
                        specializationLevel !== "Ninguna" && specializationLevel !== '' ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="nameUniversity"
                                label="Instituto o Universidad"
                                name="nameUniversity"
                                autoComplete="nameUniversity"
                                value={specializationUniversity}
                                onChange={(e) => setSpecializationUniversity(e.target.value)}
                            /> : null
                    }
                    {
                        specializationLevel !== "Ninguna" && specializationLevel !== '' ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="specializationTitle"
                                label="Titulo"
                                name="specializationTitle"
                                autoComplete="specializationTitle"
                                value={specializationTitle}
                                onChange={(e) => setSpecializationTitle(e.target.value)}
                            /> : null
                    }
                    <FormControl variant="outlined" margin="normal" fullWidth className={classes.formTitle}>
                        <h2 className={classes.title}>Experiencia Laboral</h2>
                    </FormControl>
                    <FormControl variant="outlined" margin="normal" fullWidth>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Años de experiencia
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={years}
                            onChange={e => setYears(e.target.value)}
                            labelWidth={labelWidth}
                            fullWidth
                        >
                            {
                                expYears.map(year => (<MenuItem value={year.name}>{year.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    {
                        years !== "Sin experiencia" && years !== "Menos de 1" && years !== '' ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="company"
                                label="Empresa en la que trabajo mas tiempo"
                                name="company"
                                autoComplete="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                            : null
                    }
                    {
                        years !== "Sin experiencia" && years !== "Menos de 1" && years !== '' ?
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="job"
                                label="Cargo que desempeño"
                                name="job"
                                autoComplete="job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                            : null
                    }
                </Grid>
                <Grid lg={3} direction='row' className={classes.grid}>
                    <h2 className={classes.title}>Conocimientos tecnicos</h2>
                    {
                        knowledges.technical.map(knowledge => (
                            <FormControlLabel className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        onClick={handleChangeTecnicalKnowledges}
                                        name={knowledge.name}
                                        checked={checkedTecnicalKnowledges[knowledge.name]}
                                       // onChange={handleChangeTecnicalKnowledges}
                                        value={knowledge.name}
                                        color="primary"
                                    />
                                }
                                label={knowledge.name}
                                key={knowledge.name}
                            />
                        ))
                    }
                    <FormControl variant="outlined" margin="normal" fullWidth className={classes.formTitle}>
                        <h2 className={classes.title}>Conicimientos Generales</h2>  
                    </FormControl>
                    {
                        knowledges.general.map(knowledge => (
                            <FormControlLabel className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        name={knowledge.name}
                                        checked={checkedTecnicalKnowledges[knowledge.name]}
                                        onChange={handleChangeGeneralKnowledges}
                                        value={knowledge.name}
                                        color="primary"
                                    />
                                }
                                label={knowledge.name}
                                key={knowledge.name}
                            />
                        ))
                    }
                </Grid>
                <Grid lg={3} direction='column' className={classes.grid}>
                    <h2 className={classes.title}>Salario</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="salary"
                        label="Aspiracion Salarial (Divisa dolar)"
                        name="salary"
                        autoComplete="salary"
                        autoFocus
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </Grid>
            </Container>
            <Grid lg={8} direction='column' className={classes.grid}>
                <ButtonSpinner 
                    fullWidth
                    action={validate}
                    loading={loading}
                    text="Enviar Curriculum"
                />
            </Grid>
        </div>
    )
}


const useStyles = makeStyles({
    container:{
        backgroundColor:'powderblue',
        display:'flex',
        alignItems:'center',
        flexDirection: 'column'
    },
    containerChild: {
        flexDirection: "row",
        display: 'flex',
        backgroundColor:'powderblue',
        width:100+'%', 
    },
    header:{
        width:100+'%', 
        height:100+'px',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:10+'px',
        borderColor: 'gray' 
    },
    title: {
        margin: 0
    },
    grid: {
        margin: 10 + 'px'
    },
    formTitle: {
        height: 56 + 'px',
        justifyContent: 'center'
    },
    formControlLabel: {
        height: 56 + 'px',
        justifyCcontent: 'center',
        marginTop: 16 + 'px',
        marginBottom: 8 + 'px',
    }
})