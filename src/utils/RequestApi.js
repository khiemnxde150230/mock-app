import axios from "axios"

const RequestApi = axios.create({
    baseURL: "https://localhost:7023/api/"
});

export default RequestApi;