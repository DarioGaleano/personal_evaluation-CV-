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
import { ButtonSpinner, Toast, Loader } from '../components/'
import FormValidator from '../helpers/form-validator'
import { filterNumber, } from '../helpers/filterValues'
import { workCategories, searchCandidatePresencial, searchCandidateRemote } from '../services'

const jobTypes = [
    { name: "Remoto", id:"1" },
    { name: "Presencial", id:"2" },
]

const validatorAddress = new FormValidator([
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
]);

const validator = new FormValidator([
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
        message: "Debe ingresar salario"
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
]);

export default function RequestScreen() {



    const classes = useStyles();
    const [countrie, setCountrie] = useState('')
    const [state, setState]=useState('')
    const [city, setCity]=useState('')
    const [years, setYears] = useState('')
    const [salary, setSalary] = useState('')

    const [categorie, setCategorie]=useState('')
    const [jobType, setJobType]=useState('')


    const [countrieError, setCountrieError]=useState('')
    const [stateError, setStateError]=useState('')
    const [cityError, setCityError]=useState('')
    const [yearsError, setYearsError]=useState('')
    const [categorieError, setCategorieError]=useState('')
    const [jobTypeError, setJobTypeError]=useState('')
    const [salaryError, setSalaryError]=useState('')


    const [newCities, setNewCities] = useState([])
    const [newStates, setNewtates] = useState([])
    const [categories, setCategories]=useState([])

    const [loading,setLoading]=useState(false)
    const [toast,setToast] = useState(false)
    const [toastMessage,setToastMessage] = useState('')

   
    useEffect(()=>{
        async function init(){
            const { status, response } = await workCategories();
            if(status===200){
                let aux=[]
                response.data.forEach(item => aux.push(item));
                setCategories(aux);
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
          console.log("AUX", newStates)
    }
    const handleStateChnage= async (e)=>{
        await setState(e.target.value)
        let aux=[]
        cities.cities.forEach(element => {
            if(element.id_state===e.target.value)  {
                aux.push(element)
            }
        })
        await setNewCities(aux)
    }
    const data = countries.countries;


    const onSubmit=async ()=>{
        
        let validation = validator.validate({
            years,
            salary,
            categorie,
            jobType
           
        });
        setYearsError(validation.years.message)
        setSalaryError(validation.salary.message)
        setCategorieError(validation.categorie.message)
        setJobTypeError(validation.jobType.message)

        if(validation.isValid){
            if(jobType==="1"){
                let validationAddress = validatorAddress.validate({
                    countrie,
                    state,
                    city
                })
                setCountrieError(validationAddress.countrie.message)
                setStateError(validationAddress.state.message)
                setCityError(validationAddress.city.message)
                if(validationAddress.isValid){
                    let countrieAux=countries.countries.find(countries => countries.id===countrie)                
                    try{
                        setLoading(true)
                        const { status, response } = await searchCandidatePresencial({
                            catg_position_id:`${categorie}`,
                            experience_years:years,
                            salary_offer:salary,
                            work_type_available:jobType,
                            country:countrieAux.name,
                            city:city
                        })
                        setLoading(false)
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
            else {
                try{
                    setLoading(true)
                    const { status, response } = await searchCandidateRemote({
                        catg_position_id:`${categorie}`,
                        experience_years:years,
                        salary_offer:salary,
                        work_type_available:jobType
                    })
                    setLoading(false)
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
      
    }
    return (
        <div className={classes.container}>
            <Loader loading={loading} />
            <Toast open={toast} message={toastMessage} close={() => setToast(false)}/>
            <Grid item lg={12} className={classes.header}>
                <h2 className={classes.title}>Requerimiento</h2>
            </Grid>
            <Container maxWidth="lg" className={classes.containerChild} >
                <Grid item lg={3} className={classes.grid}>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{maxLength: 2}}
                        helperText={yearsError}
                        error={yearsError!==""}
                        id="years"
                        label="Años de experiencia"
                        name="years"
                        autoComplete="years"
                        value={years}
                        onBlur={() => setYearsError(years!==''?'':'Debe ingresar años de experiencia')}
                        onChange={(e) => setYears(filterNumber(e.target.value))}
                    />
             
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
                            jobTypes.map(type => (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>))
                        }
                    </TextField>
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
                    {
                        jobType!=="1"? null:
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
                    }
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
        justifyContent:"center",
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