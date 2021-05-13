import axios from "axios";

export default axios.create({
  //withCredentials: true,
  //baseURL: "https://domain.com/",
  baseURL: "http://localhost:8080/api/workouts/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
