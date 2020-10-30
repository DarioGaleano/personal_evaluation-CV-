//test
//const base ='http://misitio.local'
//production
const base ='https://frozen-mesa-63851.herokuapp.com'


const workCategories = async () =>{
    const request = await fetch(`${base}/data/search/candidates`,{});
    const response = await request.json()
    return{
        status:request.status,
        response
    }
}

const candidateRegistration = async ({person, background, work_experience, address}) => {
    console.log(JSON.stringify({
        person,
        background,
        work_experience,
        address
    }))
    const request = await fetch(`${base}/registration`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            person,
            background,
            work_experience,
            address
        })
    })
    const response = await request.json()
    return {
        status: request.status,
        response
    }
}

const searchCandidate = async ({catg_position_id, experience_years, salary_offer, work_type_available, country, city }) => {
    console.log(JSON.stringify({
        catg_position_id, 
        experience_years, 
        salary_offer, 
        work_type_available, 
        country, 
        city
    }))
    const request = await fetch(`${base}/jobs/search`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            catg_position_id, 
            experience_years, 
            salary_offer, 
            work_type_available, 
            country, 
            city
        })
    })
    const response = await request.json()
    return {
        status: request.status,
        response
    }
}

export{
    workCategories,
    candidateRegistration,
    searchCandidate
}