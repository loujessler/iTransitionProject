import axios from "axios";
import {BASE_URL} from "./urls";

export default axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        "Content-type": "application/json"
    }
});