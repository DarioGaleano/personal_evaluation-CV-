import React, { useState, } from 'react'
import {
    Grid, Container,
    makeStyles, CssBaseline,
    TextField, 
    FormControl, MenuItem,
    FormControlLabel,
    Checkbox
} from '@material-ui/core'
import countries from '../helpers/countries.json'
import states from '../helpers/states.json'
import cities from '../helpers/cities.json'
import knowledges from '../helpers/knowledge.json'
import Toast from '../components/Toast'
import ButtonSpinner from '../components/ButtonSpinner'
import FormValidator from '../helpers/form-validator'
import { filterNumber, } from '../helpers/filterValues'

const genders = [
    { name: "Masculino", id:1 },
    { name: "Femenino", id:2 },
    { name: "Ambos", id:3 },
    
]
const academicLevels = [
    { name: "Bachiller", id:1 },
    { name: "Tecnico", id:2 },
    { name: "Universitario", id:3 }
]/*
const specializations = [
    { name: "Ninguna", id:1 },
    { name: "Maestria", id:2 },
    { name: "Postgrado", id:3 },
    { name: "Doctorado", id:4 }
]*/
const expYears = [
    { name: "Sin experiencia", id:1 },
    { name: "Menos de 1",id:2 },
    { name: "1", id:3 },
    { name: "2", id:4 },
    { name: "3", id:5 },
    { name: "4", id:6 },
    { name: "5+", id:7 },
    { name: "10+",id:8 }
]

const validator = new FormValidator([
    {
        field: "minAge",
        method: "isEmpty",
        validWhen: false,
        message: "Debe ingresar un minimo para la edad"
    },
    { 
        field: 'minAge', 
        method: 'isNumeric', 
        validWhen: true, 
        message: 'Debe ingresar solo numeros' 
    },
    {
      field: "maxAge",
      method: "isEmpty",
      validWhen: false,
      message: "Debe ingresar un maximo para la edad"
    },
    {
      field: "maxAge",
      method: "isNumeric",
      validWhen: true,
      message: "Debe ingresar solo numeros"
    },
    {
        field: "gender",
        method: "isEmpty",
        validWhen: false,
        message: "Debe seleccionar un genero"
    },
    {
        field: "countrie",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione pais de nacimiento"
    },
    {
        field: "state",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione tipo de documento"
    },
    {
        field: "city",
        method: "isEmpty",
        validWhen: false,
        message: "Ingrese numero de documento"
    },
    {
        field: "academicLevel",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione nivel academico"
    },
    {
        field: "years",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione años de experiencia"
    },
    {
        field: "salaryMin",
        method: "isEmpty",
        validWhen: false,
        message: "Debe ingresar un monto minimo"
    },
    {
        field: "salaryMin",
        method: "isNumeric",
        validWhen: true,
        message: "Debe ingresar un monto"
    },
    {
        field: "salaryMax",
        method: "isEmpty",
        validWhen: false,
        message: "Debe ingresar un monto maximo"
    },
    {
        field: "salaryMax",
        method: "isNumeric",
        validWhen: true,
        message: "Debe ingresar un monto"
    }
  ]);

export default function RequestScreen() {



    const classes = useStyles();
    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [gender, setGender] = useState('')
    const [countrie, setCountrie] = useState('')
    const [state, setState]=useState('')
    const [city, setCity]=useState('')
    const [academicLevel, setAcademicLevel] = useState('')
    const [years, setYears] = useState('')
    const [salaryMin, setSalaryMin] = useState('')
    const [salaryMax, setSalaryMax] = useState('')

    const [minAgeError, setMinAgeError] = useState('')
    const [maxAgeError, setMaxAgeError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [countrieError, setCountrieError]=useState('')
    const [stateError, setStateError]=useState('')
    const [cityError, setCityError]=useState('')
    const [academicLevelError, setAcademicLevelError]=useState('')
    const [yearsError, setYearsError]=useState('')
    const [salaryMinError, setSalaryMinError] = useState('')
    const [salaryMaxError, setSalaryMaxError] = useState('')


    const [newCities, setNewCities] = useState([])
    const [newStates, setNewtates] = useState([])
   
    const [checkedTecnicalKnowledges, setTecnicalKnowledges] = useState([])
    const [checkedGeneralKnowledges, setGeneralKnowledges] = useState([])
    const [loading,setLoading]=useState(false)
    const [toast,setToast] = useState(false)
    const [toastMessage,setToastMessage] = useState('')

    const handleChangeTecnicalKnowledges =async (event) => {
        // updating an object instead of a Map
       await setTecnicalKnowledges({
            ...checkedTecnicalKnowledges, [event.target.value]: event.target.checked
        });
        console.log(checkedTecnicalKnowledges)
    }
    const handleChangeGeneralKnowledges =async (event) => {
        // updating an object instead of a Map
       await setGeneralKnowledges({
            ...checkedGeneralKnowledges, [event.target.value]: event.target.checked
        });
        console.log(checkedGeneralKnowledges)
    }
    

    const handleCountrieChnage= async (e)=>{
        await setCountrie(e.target.value)
        let aux=[]
        states.states.forEach(element => {
            if(element.id_country===e.target.value)  {
                console.log("AQUIIIIIIIIIIIIIII",element.name)
                aux.push(element)
            }
        })
        await setNewtates(aux)
          console.log("AUX", newStates)
    }
    const handleStateChnage= async (e)=>{
        await setState(e.target.value)
        let aux=[]
        cities.cities.forEach(element => {
            if(element.id_state===e.target.value)  {
                console.log("AQUIIIIIIIIIIIIIII",element.name)
                aux.push(element)
            }
        })
        await setNewCities(aux)
    }
    const data = countries.countries;


    const onSubmit=async ()=>{
        let validation = validator.validate({
            minAge,
            maxAge,
            gender,
            countrie,
            state,
            city,
            academicLevel,
            years,
            salaryMin,
            salaryMax
        });
        setMinAgeError(validation.minAge.message)
        setMaxAgeError(validation.maxAge.message)
        setGenderError(validation.gender.message)
        setCountrieError(validation.countrie.message)
        setStateError(validation.state.message)
        setCityError(validation.city.message)
        setAcademicLevelError(validation.academicLevel.message)
        setYearsError(validation.years.message)
        setSalaryMinError(validation.salaryMin.message)
        setSalaryMaxError(validation.salaryMax.message)
        
        setLoading(true)

        if(validation.isValid){
            let workExperience={
                "years":years
            }
            let countrieAux=data.find(countries=> countries.id===countrie)                
            let stateAux=newStates.find(states=> states.id===state)
            let request={
                "personalData":{
                    "minAge":minAge,
                    "maxAge":maxAge,
                    "gender":gender,
                    "countrie":countrieAux.name,
                    "state":stateAux.name,
                    "city":city
                },
                "academicLevel":academicLevel,
                "workExperience":workExperience,
                "tecnicalKnowledges":checkedTecnicalKnowledges,
                "generalKnowledges":checkedGeneralKnowledges,
            }
            
            console.log("request", request)

        }
        setLoading(false)
    }
    return (
        <div className={classes.container}>
            <Toast message={toastMessage} open={toast} close={()=>{setToast(false);}}/>
            <Grid item lg={12} className={classes.header}>
                <h2 className={classes.title}>Requerimiento</h2>
            </Grid>
            <Container maxWidth="lg" className={classes.containerChild} >
                <CssBaseline />
                <Grid item lg={3} className={classes.grid}>
                    <h2 className={classes.title}>Perfil Personal</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="minAge"
                        label="Edad minima"
                        inputProps={{maxLength: 2}}
                        helperText={minAgeError}
                        error={minAgeError!==""}
                        name="minAge"
                        autoComplete="minAge"
                        value={minAge}
                        onBlur={()=>setMinAgeError(minAge!==''?'':'Debe ingresar un minimo para la edad')}
                        onChange={(e) => setMinAge(filterNumber(e.target.value))}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{maxLength: 2}}
                        helperText={maxAgeError}
                        error={maxAgeError!==""}
                        id="maxAge"
                        label="Edad Maxima"
                        name="maxAge"
                        autoComplete="maxAge"
                        value={maxAge}
                        onBlur={() => setMaxAgeError(maxAge!==''?'':'Debe ingresar un maximo para la edad')}
                        onChange={(e) => setMaxAge(filterNumber(e.target.value))}
                    />
                    <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            id="demo-simple-select-outlined"
                            onChange={e => setGender(e.target.value)}
                            helperText={genderError}
                            error={genderError!==""}
                            //value={gender}
                            defaultValue="none"
                            onBlur={() => setGenderError(gender!==''?'':'Debe seleccionar un genero')}
                        >
                            <MenuItem value="none" disabled>
                                <em>Genero</em>
                            </MenuItem>
                    {
                        
                        genders.map(gender => (<MenuItem key={gender.id} value={gender.name}>{gender.name}</MenuItem>))
                    }
                    </TextField>
                    
                    <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            id="demo-simple-select-outlined"
                            onChange={handleCountrieChnage}
                            helperText={countrieError}
                            error={countrieError!==""}
                            defaultValue="none"
                            onBlur={() => setCountrieError(countrie!==''?'':'Debe seleccionar un pais')}
                        >
                            <MenuItem value="none" disabled>
                                <em>Pais de residencia</em>
                            </MenuItem>
                        {
                                data.map(countries => (<MenuItem key={countries.id} name={countries.id} value={countries.id}>{countries.name}</MenuItem>))
                        }
                    </TextField>
                    {
                        countrie!==''?
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                                id="demo-simple-select-outlined"
                                onChange={handleStateChnage}
                                helperText={stateError}
                                error={stateError!==""}
                                defaultValue="none"
                                onBlur={() => setStateError(state!==''?'':'Debe seleccionar un estado')}
                            >
                                <MenuItem value="none" disabled>
                                    <em>Estado</em>
                                </MenuItem>
                            {
                                newStates.map(item => (<MenuItem key={item.id} name={item.id} value={item.id}>{item.name}</MenuItem>))
                            }
                        </TextField>
                        :null
                    }
                    {
                        state!==''?
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                                id="demo-simple-select-outlined"
                                onChange={e => setCity(e.target.value)}
                                helperText={cityError}
                                error={cityError!==""}
                                defaultValue="none"
                                onBlur={() => setCityError(city!==''?'':'Debe seleccionar una ciudad')}
                            >
                                <MenuItem value="none" disabled>
                                    <em>Ciudad</em>
                                </MenuItem>
                            {
                                newCities.map(item => (<MenuItem key={item.id} id={item.id}value={item.name}>{item.name}</MenuItem>))
                            }
                        </TextField>
                        :null
                    }
                </Grid>
                <Grid item lg={3} className={classes.grid}>
                    <h2 className={classes.title}>Formación Academica</h2>
                    <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            id="demo-simple-select-outlined"
                            onChange={e => setAcademicLevel(e.target.value)}
                            helperText={academicLevelError}
                            error={academicLevelError!==""}
                            defaultValue="none"
                            onBlur={() => setAcademicLevelError(academicLevel!==''?'':'Seleccione su nivel academico')}
                        >
                            <MenuItem value="none" disabled>
                                <em>Nivel Academico</em>
                            </MenuItem>
                        {
                            academicLevels.map(level => (<MenuItem key={level.id} value={level.name}>{level.name}</MenuItem>))
                        }
                    </TextField>
                    <FormControl variant="outlined" margin="normal" fullWidth className={classes.formTitle}>
                        <h2 className={classes.title}>Experiencia Laboral</h2>
                    </FormControl>
                    <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            id="demo-simple-select-outlined"
                            onChange={e => setYears(e.target.value)}
                            helperText={yearsError}
                            error={yearsError!==""}
                            defaultValue="none"
                            onBlur={() => setYearsError(years!==''?'':'Seleccione años de experiencia')}
                        >
                            <MenuItem value="none" disabled>
                                <em>Años de experiencia</em>
                            </MenuItem>
                        {
                            expYears.map(year => (<MenuItem key={year.id} value={year.name}>{year.name}</MenuItem>))
                        }
                    </TextField>
                </Grid>
                <Grid item lg={3}  className={classes.grid}>
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
                        <h2 className={classes.title}>Caracteristicas del cargo</h2>  
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
                <Grid item lg={3} className={classes.grid}>
                    <h2 className={classes.title}>Salario</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="salaryMin"
                        label="Salario minimo(Divisa dolar)"
                        name="salary"
                        autoComplete="salary"
                        helperText={salaryMinError}
                        error={salaryMinError!==""}
                        inputProps={{maxLength: 5}}
                        autoFocus
                        value={salaryMin}
                        onBlur={()=> setSalaryMinError(salaryMin!==''?'':'Debe ingresar un monto minimo')}
                        onChange={(e) => setSalaryMin(filterNumber(e.target.value))}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="salaryMax"
                        label="Salario maximo(Divisa dolar)"
                        name="salary"
                        autoComplete="salary"
                        helperText={salaryMaxError}
                        error={salaryMaxError!==""}
                        inputProps={{maxLength: 5}}
                        autoFocus
                        value={salaryMax}
                        onBlur={()=>setSalaryMaxError(salaryMax!==''?'':'Debe ingresar un monto maximo')}
                        onChange={(e) => setSalaryMax(filterNumber(e.target.value))}
                    />
                </Grid>
            </Container>
            <Grid item lg={8}  className={classes.grid}>
                <ButtonSpinner 
                    fullWidth
                    action={onSubmit}
                    loading={loading}
                    text="Continuar"
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
        flexDirection: 'column',
        height:"100vh"
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