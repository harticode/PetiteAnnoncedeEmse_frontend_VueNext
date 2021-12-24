import axios from "axios";

export default axios.create({
  baseURL: "https://hamza.aitbaali.petiteannoncedeemse.cleverapps.io:443/api",
  headers: {
    "Content-type": "application/json"
  }
});