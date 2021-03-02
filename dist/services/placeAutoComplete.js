"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const autoCompletePlace = (address) => {
    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    let params = {
        input: address,
        key: process.env.googleAPIKey
    };
    const query = querystring_1.default.stringify(params);
    console.log(query);
};
autoCompletePlace("42a oakdale road");
exports.default = autoCompletePlace;
