import {API_URL} from './settings'

export const validate = (data) => {
    let hasError = false;
    for (let key in data) {
        debugger
        if(data[key].length < 4) {
            data[key].error = true;
            hasError = true;
        }
    }
    return hasError;
}

async function postData(data) {
    const response = await fetch(API_URL, {
        method: 'POST', 
        body: JSON.stringify(data)
    });
    return await response.json(); 
}

export const trySendData = async (formData) => {
    console.log(formData)
    try {
        const data = await postData(formData);
        senddata.success = true;
    } catch (error) {
        senddata.error = error;
    }
}