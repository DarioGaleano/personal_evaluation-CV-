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


export default function RequestScreen() {
    const classes = useStyles();
    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [gender, setGender] = useState('')
    const [countrie, setCountrie] = useState('')
    const [state, setState]=useState('')
    const [city, setCity]=useState('')
    const [newCities, setNewCities] = useState([])
    const [newStates, setNewtates] = useState([])
    const [labelWidth, setLabelWidth] = useState(0);
    const [academicLevel, setAcademicLevel] = useState('')
    const [salaryMin, setSalaryMin] = useState('')
    const [salaryMax, setSalaryMax] = useState('')
    const [years, setYears] = useState('')
    const [checkedTecnicalKnowledges, setTecnicalKnowledges] = useState([])
    const [checkedGeneralKnowledges, setGeneralKnowledges] = useState([])


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
    const inputLabel = useRef(null);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    return (
        <div className={classes.container}>
            <Grid lg={12} className={classes.header}>
                <h2 className={classes.title}>Requerimiento</h2>
            </Grid>
            <Container maxWidth="lg" className={classes.containerChild} >
                <CssBaseline />
                <Grid lg={3} direction='column' className={classes.grid}>
                    <h2 className={classes.title}>Perfil Personal</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Edad minima"
                        name="name"
                        autoComplete="name"
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Edad Maxima"
                        name="lastname"
                        autoComplete="lastname"
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
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
                <Grid lg={3} direction='column' className={classes.grid}>
                    <h2 className={classes.title}>Salario</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="salary"
                        label="Salario minimo(Divisa dolar)"
                        name="salary"
                        autoComplete="salary"
                        autoFocus
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="salary"
                        label="Salario maximo(Divisa dolar)"
                        name="salary"
                        autoComplete="salary"
                        autoFocus
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                    />
                </Grid>
            </Container>
        </div>
    )
}


const useStyles = makeStyles({
    container:{
        backgroundColor:'powderblue'
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