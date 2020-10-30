import React, { useState, useEffect } from 'react'
import {
    Grid, Container,
    makeStyles,
    TextField,
 MenuItem,
   
} from '@material-ui/core'
import countries from '../helpers/countries.json'
import states from '../helpers/states.json'
import cities from '../helpers/cities.json'
import { ButtonSpinner, Toast, Loader} from '../components'
import FormValidator from '../helpers/form-validator'
import { filterAlpha, filterNumber, onBlurEmail } from '../helpers/filterValues'
import { workCategories, candidateRegistration } from '../services'

const genders = [
    { name: "Masculino", id:1 },
    { name: "Femenino", id:2 }
]
const academicLevels = [
    { name: "Bachiller", id:1 },
    { name: "Tecnico", id:2 },
    { name: "Universitario", id:3 }
]

const validator = new FormValidator([
    {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Debe ingresar su correo electronico"
    },
    { 
        field: 'email', 
        method: 'isEmail', 
        validWhen: true, 
        message: 'Ingrese un correo electrónico valido' 
    },
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "Debe ingresar su nombre"
    },
    {
      field: "lastName",
      method: "isEmpty",
      validWhen: false,
      message: "Debe ingresar su apellido"
    },
    {
        field: "gender",
        method: "isEmpty",
        validWhen: false,
        message: "Debe seleccionar un genero"
    },
    {
        field: "birthDay",
        method: "isEmpty",
        validWhen: false,
        message: "Debe seleccionar una fecha de nacimiento"
    },
    {
        field: "countrie",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione pais"
    },
    {
        field: "state",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione estado"
    },
    {
        field: "city",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione ciudad"
    },
    {
        field: "academicLevel",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione su nivel academico"
    },
    {
        
        field: "university",
        method: "isEmpty",
        validWhen: false,
        message: "Debe ingresar el nombre del instituto o universidad"

    },
    {
        field: "categorie",
        method: "isEmpty",
        validWhen: false,
        message: "Debe seleccionar puesto al que aplica"
    },
    {
        field: "jobType",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione modalidad de trabajo"
    },
    {
        field: "salary",
        method: "isEmpty",
        validWhen: false,
        message: "Ingrese aspiracion salarial"
    },
    {
        field: "salary",
        method: "isNumeric",
        validWhen: true,
        message: "Debe ingresar un monto"
    }
]);

const validatorExperience = new FormValidator([
    {
        field: "startJob",
        method: "isEmpty",
        validWhen: false,
        message: "Debe seleccionar fecha de inicio"
    },
    {
        field: "endJob",
        method: "isEmpty",
        validWhen: false,
        message: "Debe seleccionar fecha de finalización"
    },
    {
        field: "position",
        method: "isEmpty",
        validWhen: false,
        message: "Debe Puesto en el que se desempeño"
    },
    {
        field: "time",
        method: "isEmpty",
        validWhen: false,
        message: "Debe ingresar tiempo que duro en el puesto"
    }
    
]);


export default function FormScreen() {
   
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [toast, setToast]=useState(false)
    const [toastMessage, setToastMessage]=useState('')
    const [newCities, setNewCities] = useState([])
    const [newStates, setNewtates] = useState([])

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [birthDay,  setBirthDay] = useState('')
    const [countrie, setCountrie] = useState('')
    const [state, setState]=useState('')
    const [city, setCity]=useState('')
    const [academicLevel, setAcademicLevel] = useState('')
    const [university, setUniversity] = useState('')
    const [categorie, setCategorie]=useState('')
    const [salary, setSalary] = useState('')
    const [jobType, setJobType]=useState('')

    const [startJob, setStartJob]=useState('')
    const [endJob, setEndJob]=useState('')
    const [position, setPosition]=useState('')
    const [time, setTime]=useState('')


    const [worksExperience, setWorksExperience]=useState([])
    const [categories, setCategories]=useState([])
    const [work_types, setWorkTypes] = useState([])


    const [emailError, setEmailError]=useState('')
    const [nameError, setNameError]=useState('')
    const [lastNameError, setLastNameError]=useState('')
    const [genderError, setGenderError]=useState('')
    const [birthDayError, setBirthDayError]=useState('')
    const [countrieError, setCountrieError]=useState('')
    const [stateError, setStateError]=useState('')
    const [cityError, setCityError]=useState('')
    const [academicLevelError, setAcademicLevelError]=useState('')
    const [universityError, setUniversityError]=useState('')
    const [categorieError, setCategorieError]=useState('')
    const [jobTypeError, setJobTypeError]=useState('')
    const [salaryError, setSalaryError]=useState('')
    const [startJobError, setStartJobError]=useState('')
    const [endJobError, setEndJobError]=useState('')
    const [positionError, setPositionError]=useState('')
    const [timeError, setTimeError]=useState('')

    const maxDate=`${new Date().getFullYear()}-${new Date().getMonth()+1<10?'0'+new Date().getMonth()+1:new Date().getMonth()+1}-${new Date().getDate()}`
    
    useEffect(()=>{
        async function init(){
            const { status, response } = await workCategories();
            if(status===200){
                let auxCategories=[], auxWorks=[]
                response.data.work_categories.forEach(item => auxCategories.push(item));
                response.data.work_type.forEach(item => auxWorks.push(item))
                setCategories(auxCategories);
                setWorkTypes(auxWorks)
            }
        }
        init()
    },[])

    const handleCountrieChnage= async (e)=>{
        
        await setCountrie(e.target.value)
        
        let aux=[]
        states.states.forEach(element => {
            if(element.id_country===e.target.value)  {
                aux.push(element)
            }
        })
        await setNewtates(aux)
        setCountrieError('')
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

    const sendData = async () => {

        let validation = validator.validate({
            email,
            name,
            lastName,
            gender,
            birthDay,
            countrie,
            state,
            city,
            academicLevel,
            university,
            categorie,
            jobType,
            salary
        });
        
        setEmailError(validation.email.message)
        setNameError(validation.name.message)
        setLastNameError(validation.lastName.message)
        setGenderError(validation.gender.message)
        setBirthDayError(validation.birthDay.message)
        setCountrieError(validation.countrie.message)
        setStateError(validation.state.message)
        setCityError(validation.city.message)
        setAcademicLevelError(validation.academicLevel.message)
        setUniversityError(validation.university.message)
        setCategorieError(validation.categorie.message)
        setJobTypeError(validation.jobType.message)
        setSalaryError(validation.salary.message)

        if(validation.isValid)
        {            
            let countrieAux=countries.countries.find(countries => countries.id===countrie)                
            let stateAux=newStates.find(states => states.id===state)
            try{
                setLoading(true)
                console.log('worksExperience', worksExperience)
                const { status, response } = await candidateRegistration({
                    person:{
                        "firstname": name,
                        "lastname": lastName,
                        "email": email,
                        "gender": gender,
                        "born_date": birthDay,
                        "work_exp_catg": `${categorie}`,
                        "salary_expectation": salary,
                        "work_type_available": `${jobType}`
                    },
                    background:[
                        {
                        "name": university,
                        "academic_level": academicLevel
                        }
                    ],
                    work_experience:worksExperience,
                    address:{
                        "country": countrieAux.name,
                        "state": stateAux.name,
                        "city": city
                    }
                })
                setLoading(false)
                console.log('status', status)
                if(status===200){
                    setToast(true)
                    setToastMessage(response.message)
                    console.log('response', response)
                }
                else if(status===405){
                    setToast(true)
                    setToastMessage(response.message)
                }
            }catch(e){
                setLoading(false)
                setToastMessage('error de conexion')
            }
        }

    }

    const addExperience = () => {
        let validation = validatorExperience.validate({
            startJob,
            endJob,
            position,
            time
        })
        setStartJobError(validation.startJob.message)
        setEndJobError(validation.endJob.message)
        setPositionError(validation.position.message)
        setTimeError(validation.time.message)
        if(validation.isValid){
            let aux=worksExperience
            aux.push(
                {
                    "start": startJob,
                    "end": endJob,
                    "position": position,
                    "time": time
                }
            )
            setWorksExperience(aux)
            setStartJob('')
            setEndJob('')
            setPosition('')
            setTime('')
        }
      
    }


    return (
        <div className={classes.container}>
            <Loader loading={loading}/>
            <Toast open={toast} message={toastMessage} close={() => setToast(false)}/>
            <Container maxWidth="lg" className={classes.containerChild} >
                <Grid container>
                    <Grid item lg={12} className={classes.header}>
                        <h2 className={classes.title}>Curriculum Vitae</h2>
                    </Grid>
                    <Grid item sm={4}  className={classes.grid}>
                        <h2 className={classes.title}>Datos Personales</h2>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            helperText={emailError}
                            error={emailError!==""}
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailError(onBlurEmail(email))}
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
                            helperText={nameError}
                            error={nameError!==""}
                            onBlur={() => setNameError(name!==''?'':'Debe ingresar su nombre')}
                            value={name}
                            onChange={(e) => setName(filterAlpha(e.target.value))}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Apellido"
                            name="lastname"
                            helperText={lastNameError}
                            error={lastNameError!==""}
                            onBlur={() => setLastNameError(lastName!==''?'':'Debe ingresar su apellido')}
                            autoComplete="lastname"
                            value={lastName}
                            onChange={(e) => setLastName(filterAlpha(e.target.value))}
                        />
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelid="demo-simple-select-outlined-label"
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
                            
                        <TextField
                            id="date"
                            label="Fecha de nacimiento"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={birthDay}
                            helperText={birthDayError}
                            error={birthDayError!==""}
                            inputProps={{  max: maxDate}}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="date"
                            onChange={(e) => setBirthDay(e.target.value+"")}
                            onBlur={() => setBirthDayError(birthDay!==''? '': 'Debe seleccionar una fecha de nacimiento')}
                        />
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelid="demo-simple-select-outlined-label"
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
                                countries.countries.map(countries => (<MenuItem key={countries.id} name={countries.id} value={countries.id}>{countries.name}</MenuItem>))
                        }
                        </TextField>
                        {
                            countrie!==''?
                            <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                                labelid="demo-simple-select-outlined-label"
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
                                labelid="demo-simple-select-outlined-label"
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
                    <Grid item sm={4}  className={classes.grid}>
                        <h2 className={classes.title}>Formación Academica</h2>
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelid="demo-simple-select-outlined-label"
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
                            helperText={universityError}
                            error={universityError!==""}
                            onChange={(e) => setUniversity(e.target.value)}
                            onBlur={() => setUniversityError(university!==''?'':'Debe ingresar el nombre del instituto o universidad')}
                        /> 
                    </Grid>
                    <Grid item sm={4}  className={classes.grid}>
                        <h2 className={classes.title}>Trabajo al que aplica</h2>
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelid="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={e => setCategorie(e.target.value)}
                            helperText={categorieError}
                            error={categorieError!==""}
                            defaultValue="none"
                            onBlur={() => setCategorieError(categorie!==''?'':'Seleccione trabajo al que aplica')}
                        >
                            <MenuItem value="none" disabled>
                                <em>Trabajos</em>
                            </MenuItem>
                        {
                            categories.map(categorie => (<MenuItem key={categorie.id} value={categorie.id}>{categorie.name}</MenuItem>))
                        }
                        </TextField>
                        <h2 className={classes.title}>Modalidad de trabajo</h2>
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelid="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={e => setJobType(e.target.value)}
                            helperText={jobTypeError}
                            error={jobTypeError!==""}
                            defaultValue="none"
                            onBlur={() => setJobTypeError(jobType!==''?'':'Seleccione modalidad de trabajo')}
                        >
                            <MenuItem value="none" disabled>
                                <em>Modalidad</em>
                            </MenuItem>
                        {
                            work_types.map(type => (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>))
                        }
                        </TextField>
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
                            
                            value={salary}
                            onChange={(e) => setSalary(filterNumber(e.target.value))}
                            onBlur={()=> setSalaryError(salary!==''?'':'Debe ingresar un monto')}
                            helperText={salaryError}
                            error={salaryError!==""}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={12} >
                        <h2 className={classes.title}>Experiencia laboral</h2>
                        <Grid container>
                            <Grid item sm={3} className={classes.grid}>
                                <TextField
                                    id="date"
                                    label="Inicio"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={startJob}
                                    inputProps={{  max: maxDate}}
                                    helperText={startJobError}
                                    error={startJobError!==""}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="date"
                                    onChange={(e) => setStartJob(e.target.value+"")}
                                    onBlur={() => setStartJobError(startJob!==''? '': 'Debe seleccionar fecha de inicio')}
                                />
                            </Grid>
                            <Grid item sm={3} className={classes.grid}>
                                <TextField
                                    id="date"
                                    label="Fin"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={endJob}
                                    inputProps={{  max: maxDate}}
                                    helperText={endJobError}
                                    error={endJobError!==""}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="date"
                                    onChange={(e) => setEndJob(e.target.value+"")}
                                    onBlur={() => setEndJobError(endJob!==''? '': 'Debe seleccionar fecha de finalización')}
                                />
                            </Grid>
                            <Grid item sm={3} className={classes.grid}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Posición"
                                    label="Puesto"
                                    name="position"
                                    autoComplete="position"
                                    
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    onBlur={()=> setPositionError(position!==''?'':'Debe Puesto en el que se desempeño')}
                                    helperText={positionError}
                                    error={positionError!==""}
                                />
                            </Grid>
                            <Grid item sm={3} className={classes.grid}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="time"
                                    label="Tiempo (Años)"
                                    name="time"
                                    autoComplete="time"
                                    
                                    value={time}
                                    onChange={(e) => setTime(filterNumber(e.target.value))}
                                    onBlur={()=> setTimeError(time!==''?'':'Debe ingresar tiempo que duro en el puesto')}
                                    helperText={timeError}
                                    error={timeError!==""}
                                />
                            </Grid>
                            <Grid item sm={12}  style={{display:"flex", justifyContent:"flex-end"}}>
                                <ButtonSpinner 
                                    
                                    action={addExperience}
                                    loading={loading}
                                    text="Agregar experiencia"
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item sm={3} className={classes.grid}>
                                <strong>Fecha de inicio</strong>
                            </Grid>
                            <Grid item sm={3} className={classes.grid}>
                                <strong>Fecha de finalización</strong>
                            </Grid>
                            <Grid item sm={3} className={classes.grid}>
                                <strong>Puesto</strong>
                            </Grid>
                            <Grid item sm={3} className={classes.grid}>
                                <strong>Tiempo</strong>
                            </Grid>
                        </Grid>
                        <Grid container>
                            {
                                worksExperience.map((experience, index) =>(
                                    <Grid item sm={12} key={index}>
                                        <Grid container>
                                            <Grid item sm={3} className={classes.grid}>
                                                <label>{experience.start}</label>
                                            </Grid>
                                            <Grid item sm={3} className={classes.grid}>
                                                <label>{experience.end}</label>
                                            </Grid>
                                            <Grid item sm={3} className={classes.grid}>
                                                <label>{experience.position}</label>
                                            </Grid>
                                            <Grid item sm={3} className={classes.grid}>
                                                <label>{experience.time}</label>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                             
                                ))
                            }
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item sm={12}  style={{display:"flex", justifyContent:"flex-end"}}>
                    <ButtonSpinner 
                        
                        action={sendData}
                        loading={loading}
                        text="Enviar Curriculum"
                    />
                </Grid>
            </Container>
            
        </div>
    )
}


const useStyles = makeStyles({
    container:{
        backgroundColor:'powderblue',
        display:'flex',
        alignItems:'center',
        flexDirection: 'column',
        minHeight:"100vh",
        backgroundSize:"cover",
        padding:"10px"
    },
    containerChild: {
        width:'100%', 
    },
    header:{
        width:'100%', 
        height:'100px',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 0
    },
    grid: {
        padding:'10px'
    },
    formTitle: {
        height: '56px',
        justifyContent: 'center'
    },
    formControlLabel: {
        height: '56px',
        justifyCcontent: 'center',
        marginTop: '16px',
        marginBottom: '8px',
    }
})