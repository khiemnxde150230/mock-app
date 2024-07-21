import RequestApi from "../utils/RequestApi"

// Fuction Login by user includes: email and password
export const loginService = async (user) => {
    try {
        const respone = await RequestApi({
            method: "post",
            url: "login",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(user)
        });
        return respone.data
    } catch (e) {
        return e;
    }

}

// Function Register by user includes: email, password, name, idCard, phone
export const registerService = async (user) => {
    try {
        const respone = await RequestApi({
            method: "post",
            url: "register",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(user)
        });
        return respone.data
    } catch (e) {
        return e;
    }
}

// Function get infomation using token
export const getInfoService = async (token) => {
    try {
        const respone = await RequestApi({
            method: "get",
            url: `user/info?token=${token}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data
    } catch (e) {
        return e;
    }
}

// Function verify account when user registe success
export const confirmAccountService = async (id) => {
    try {
        const respone = await RequestApi({
            method: "get",
            url: `confirm?id=${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

// Function Login with account Google
export const loginWithGoogleService = async (user) => {
    console.log("user", user);
    debugger;
    try {
        const respone = await RequestApi({
            method: "get",
            url: `user/search?email=${user.email}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (respone.status === 200) {
            const data = {
                email: user.email,
                password: user.password
            };
            return await loginService(data);
        }
        const result = await registerService(user);
        // console.log(result);
        if (result.status === 200) {
            const data = {
                email: user.email,
                password: user.password
            };
            // console.log("login",data);
            return await loginService(data);
        }
    } catch (e) {
        return e;
    }
}

// Function Fofgot Password with email
export const forgotPasswordService = async (email) => {
    try {
        const respone = await RequestApi({
            method: "post",
            url: "user/forgot",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(email)
        });
        return respone.data
    } catch (e) {
        return e;
    }
}