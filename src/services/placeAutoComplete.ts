import axios from "axios";
import encodeUrl from "encodeurl";
import querystring from "querystring";
import config from "config";
import dotenv from "dotenv";

dotenv.config();

const autoCompletePlace = async (address: string) => {
  let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
  let params = {
    input: address,
    key: process.env.googleAPIKey,
  };
  const query = querystring.stringify(params);
  url = url.concat(query);
  try {
    const response = await axios.get(url);
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export default autoCompletePlace;
