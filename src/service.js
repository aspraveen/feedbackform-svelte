import {API_URL} from './settings'

export const validate = (data) => {
    let validationResult = {
        errors: [],
        isValid: true
    }

    for(var [key, value] of data.entries()) {
        // simplest validator possible
        // here we can extend it and add more sophisticated rules
        if(value.length < 4) {
            validationResult.errors.push(key)
            validationResult.isValid = false
        }
     }
    return validationResult
}

async function postData(data) {
    const response = await fetch(API_URL, {
        method: 'POST', 
        body: data
    })
    return await response.json()
}

export const trySendData = async (formData) => {
    console.log(formData)
    const senddata = {}
    try {
        const data = await postData(new URLSearchParams(formData))
        senddata.success = true
    } catch (error) {
        senddata.error = error
    }
    return senddata
}