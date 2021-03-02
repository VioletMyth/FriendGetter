"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const autoCompletePlace = (address) => {
    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    const params = {
        input: address,
        key: config_1.default.get("googleAPIKey")
    };
    console.log();
};
autoCompletePlace();
