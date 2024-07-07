import Cookies from "js-cookie";

//add a new product service
export const addNewProduct = async (formData) => {
    try {
        const response = await fetch('/api/admin/add-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorizzation: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })

        const finalResult = await response.json();
        return finalResult;

    } catch (error) {
        console.log(error);
    }
}