import api from ".";



export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });
    // if (response.data.token) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    // }
    return response.data;
};


export const register = async (nama, email, password) => {
    const response = await api.post("/auth/register", {
        nama,
        email,
        password,
    });
    return response.data;
};