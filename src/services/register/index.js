export const registerNewUser = async (formdata) => {
    try {

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formdata)
        });

        const finalData = await response.json();
        return finalData;

    } catch (error) {
        console.log(error);
    }
}