"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const autoCompletePlace = (address) => __awaiter(void 0, void 0, void 0, function* () {
    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    let params = {
        input: address,
        key: process.env.googleAPIKey,
    };
    const query = querystring_1.default.stringify(params);
    url = url.concat(query);
    try {
        const response = yield axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = autoCompletePlace;
