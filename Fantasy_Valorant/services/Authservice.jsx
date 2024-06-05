import axios from "axios";
import { getToken, setToken } from "./TokenService";


export async function login(credentials){
    const {data} = await axios.post("http://192.168.8.203:8000/api/login", 
      credentials,
      {
        headers: {
          Accept: "application/json"
        }
      });

      console.log("res", data)

      await setToken(data.token);

}

export async function loaduser(){
    const token = await getToken();
    const {data: profile} = await axios.get("http://192.168.8.203:8000/api/profile",{
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    console.log("profile", profile)
    return profile;
}

