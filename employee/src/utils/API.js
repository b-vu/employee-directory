import axios from "axios";

export default {
    getEmployees: () => {
        return axios.get("/api/employees");
    }
}