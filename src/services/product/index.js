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

export const getAllAdminProducts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/admin/all-products", {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};


export const updateAProduct = async (formData) => {
    try {
        const response = await fetch('/api/admin/update-product', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorizzation: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}


export const deleteAProduct = async (id) => {
    try {
        const response = await fetch(`/api/admin/delete-product?id=${id}`, {
            method: 'DELETE',
            headers: {
                Authorizzation: `Bearer ${Cookies.get('token')}`
            },
        });

        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}