import axios from "axios";
import encodeUrl from "encodeurl"
import querystring from "querystring"
import config from "config"

const autoCompletePlace = (address: string) => {
    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    const params = {
        input: address,
        key: config.get("googleAPIKey")
    }
    console.log()
}

autoCompletePlace();
