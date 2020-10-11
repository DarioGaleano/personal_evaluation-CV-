import React, { useState } from 'react'
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
import { filterAlpha, filterNumber, onBlurEmail } from '../helpers/filterValues'

const genders = [
    { name: "Masculino", id:1 },
    { name: "Femenino", id:2 }
]
const academicLevels = [
    { name: "Bachiller", id:1 },
    { name: "Tecnico", id:2 },
    { name: "Universitario", id:3 }
]
const specializations = [
    { name: "Ninguna", id:1 },
    { name: "Maestria", id:2 },
    { name: "Postgrado", id:3 },
    { name: "Doctorado", id:4 }
]
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
        message: "Seleccione su nivel academico"
    },
    {
        field: "years",
        method: "isEmpty",
        validWhen: false,
        message: "Seleccione años de experiencia"
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

export default function FormScreen() {
   
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
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
    const [title, setTitle] = useState('')
    const [specializationLevel, setSpecializationLevel] = useState('')
    const [specializationUniversity, setSpecializationUniversity] = useState('')
    const [specializationTitle, setSpecializationTitle] = useState('')

    const [years, setYears] = useState('')
    const [company, setCompany] = useState('')
    const [job, setJob] = useState('')

    const [salary, setSalary] = useState('')
    
    const [checkedTecnicalKnowledges, setTecnicalKnowledges] = useState([])
    const [checkedGeneralKnowledges, setGeneralKnowledges] = useState([])
    const [toast,setToast] = useState(false)
    const [toastMessage,setToastMessage] = useState('')

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
    const [titleError, setTitleError]=useState('')
    const [specializationLevelError, setSpecializationLevelError]=useState('')
    const [specializationUniversityError, setSpecializationUniversityError]=useState('')
    const [specializationTitleError, setSpecializationTitleError]=useState('')
    const [yearsError, setYearsError]=useState('')
    const [companyError, setCompanyError]=useState('')
    const [jobError, setJobError]=useState('')
    const [salaryError, setSalaryError]=useState('')

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
    const data = countries.countries;
    const sendData =()=>{

        console.log(checkedGeneralKnowledges)
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
            years,
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
        setYearsError(validation.years.message)
        setSalaryError(validation.salary.message)

        let valid=true;
        if(academicLevel==='Tecnico' || academicLevel==='Universitario'){ 
            if(university===''){
                setUniversityError('Debe ingresar la universidad')
                valid=false 
            }
            else setUniversityError('')
            if(title===''){
                setTitleError('Debe ingresar el titulo que posee')
                valid=false 
            }
            else setTitleError('')       
        }

        if(academicLevel==='Universitario' && specializationLevel===''){
            setSpecializationLevelError('Debe ingresar si posee alguna especializacion')
            valid=false 
        }
        else setSpecializationLevelError('')
        
        if(academicLevel==='Universitario' && specializationLevel!=='Ninguna'){
            if(specializationUniversity===''){   
                setSpecializationUniversityError('Debe ingresar la universidad donde obtuvo su titulo de especializacion')
                valid=false 
            }
            else setSpecializationUniversityError('')
            if(specializationTitle===''){
                setSpecializationTitleError('Debe ingresar el titulo de especializacion que posee')
                valid=false 
            }
            else setSpecializationTitleError('')
        }
        if(years!=='Sin experiencia' && years!=='Menos de 1' && company===''){
            setCompanyError('Debe indicar la empresa en la que trabajo mas tiempo')
            valid=false 
        }
        else setCompanyError('')
        if(years!=='Sin experiencia' && years!=='Menos de 1' && job===''){
            setJobError('Debe indicar el cargo que desempeño')
            valid=false 
        }
        else setJobError('')
        if(validation.isValid && valid)
        {            
            let academicFormacion={
                "academicLevel": academicLevel
            }

            if(university!=='')
                academicFormacion.university=university
            if(title!=='')
                academicFormacion.title=title
            if(specializationLevel!=='')
                academicFormacion.specializationLevel=specializationLevel
            if(specializationUniversity!=='')
                academicFormacion.specializationUniversity=specializationUniversity
            if(specializationTitle!=='')
                academicFormacion.specializationTitle=specializationTitle
            
            let workExperience={
                "years":years
            }
            if(company!=='')
                workExperience.company=company
            if(job!=='')
                workExperience.job=job

            let countrieAux=data.find(countries=> countries.id===countrie)                
            let stateAux=newStates.find(states=> states.id===state)

            let curriculum={
                "person":{
                    "email":email,
                    "name":name,
                    "lastName":lastName,
                    "gender":gender,
                    "birthDay":birthDay,
                    "countrie":countrieAux.name,
                    "state":stateAux.name,
                    "city":city
                },
                "background":[academicFormacion],
                "work_experience":[workExperience],
                "tecnical_knowledges":checkedTecnicalKnowledges,
                "general_knowledges":checkedGeneralKnowledges,
                "salary":salary
            }
            console.log("curriculum", JSON.stringify(curriculum))
        }

    }

    return (
        <div className={classes.container}>
            <Toast message={toastMessage} open={toast} close={()=>{setToast(false);}}/>
            <CssBaseline />
            
            <Container maxWidth="lg" className={classes.containerChild} >
                <Grid container>
                    <Grid item lg={12} className={classes.header}>
                        <h2 className={classes.title}>Curriculum Vitae</h2>
                    </Grid>
                    <Grid item sm={3}  className={classes.grid}>
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
                            id="lastName"
                            label="Apellido"
                            name="lastName"
                            helperText={lastNameError}
                            error={lastNameError!==""}
                            onBlur={() => setLastNameError(lastName!==''?'':'Debe ingresar su apellido')}
                            autoComplete="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(filterAlpha(e.target.value))}
                        />
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelId="demo-simple-select-outlined-label"
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
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="date"
                            onChange={(e) => setBirthDay(e.target.value+"")}
                            onBlur={() => setBirthDayError(birthDay!==''? '': 'Debe seleccionar una fecha de nacimiento')}
                        />
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelId="demo-simple-select-outlined-label"
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
                                labelId="demo-simple-select-outlined-label"
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
                                labelId="demo-simple-select-outlined-label"
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
                    <Grid item sm={3}  className={classes.grid}>
                        <h2 className={classes.title}>Formación Academica</h2>
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelId="demo-simple-select-outlined-label"
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
                                    helperText={universityError}
                                    error={universityError!==""}
                                    onChange={(e) => setUniversity(e.target.value)}
                                    onBlur={() => setUniversityError(university!==''?'':'Debe ingresar la universidad')}
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
                                    helperText={titleError}
                                    error={titleError!==""}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={() => setTitleError(title!==''?'':'Debe ingresar el titulo que posee')}
                                /> : null
                        }
                        {
                            academicLevel === "Universitario" ?
                                <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={e => setSpecializationLevel(e.target.value)}
                                    helperText={specializationLevelError}
                                    error={specializationLevelError!==""}
                                    defaultValue="none"
                                    onBlur={() => setSpecializationLevelError(specializationLevel!==''?'':'Debe ingresar si posee alguna especializacion')}
                                >
                                    <MenuItem value="none" disabled>
                                        <em>Especialización</em>
                                    </MenuItem>
                                {
                                    specializations.map(level => (<MenuItem key={level.id} value={level.name}>{level.name}</MenuItem>))
                                }
                                </TextField>
                                : null
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
                                    helperText={specializationUniversityError}
                                    error={specializationUniversityError!==""}
                                    onChange={(e) => setSpecializationUniversity(e.target.value)}
                                    onBlur={()=> setSpecializationUniversityError(specializationUniversity!==''?'':'Debe ingresar la universidad donde obtuvo su titulo de especializacion')}
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
                                    helperText={specializationTitleError}
                                    error={specializationTitleError!==""}
                                    onBlur={()=> setSpecializationTitleError(specializationTitle!==''?'':'Debe ingresar el titulo de especializacion que posee')}
                                    onChange={(e) => setSpecializationTitle(e.target.value)}
                                /> : null
                        }
                        <FormControl variant="outlined" margin="normal" fullWidth className={classes.formTitle}>
                            <h2 className={classes.title}>Experiencia Laboral</h2>
                        </FormControl>
                        <TextField variant="outlined" select fullWidth style={{margin:"16px 0 8px"}}
                            labelId="demo-simple-select-outlined-label"
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
                                    helperText={companyError}
                                    error={companyError!==""}
                                    onBlur={()=> setCompanyError(company!==''?'':'Debe indicar la empresa en la que trabajo mas tiempo')}
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
                                    helperText={jobError}
                                    error={jobError!==""}
                                    onBlur={()=>setJobError(job!==''?'':'Debe indicar el cargo que desempeño')}
                                    onChange={(e) => setJob(e.target.value)}
                                />
                                : null
                        }
                    </Grid>
                    <Grid item sm={3}  className={classes.grid}>
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
                                            value={knowledge.name || ""}
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
                                            value={knowledge.name || ""}
                                            color="primary"
                                        />
                                    }
                                    label={knowledge.name}
                                    key={knowledge.name}
                                />
                            ))
                        }
                    </Grid>
                    <Grid item sm={3}  className={classes.grid}>
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
                            onChange={(e) => setSalary(filterNumber(e.target.value))}
                            onBlur={()=> setSalaryError(salary!==''?'':'Debe ingresar un monto')}
                            helperText={salaryError}
                            error={salaryError!==""}
                        />
                    </Grid>
                    <Grid item sm={12}  style={{display:"flex", justifyContent:"flex-end"}}>
                        <ButtonSpinner 
                            
                            action={sendData}
                            loading={loading}
                            text="Enviar Curriculum"
                        />
                    </Grid>
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