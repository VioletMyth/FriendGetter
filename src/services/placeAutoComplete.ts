import axios from "axios";
import encodeUrl from "encodeurl"
import querystring from "querystring"
import config from "config"
import dotenv from "dotenv"

dotenv.config()

const autoCompletePlace = (address: string) => {
    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    let params = {
        input: address,
        key: process.env.googleAPIKey
    }
    const query = querystring.stringify(params)
    console.log(query)
}

autoCompletePlace("42a oakdale road");

export default autoCompletePlace
