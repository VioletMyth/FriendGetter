"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const friend_1 = __importDefault(require("./routes/friend"));
if (!process.env.jwtPrivateKey) {
    console.log(process.env.jwtPrivateKey);
    console.log("FATAL ERROR JWTPRIVATEKEY HAS NOT BEEN DEFINED.");
    process.exit(1);
}
mongoose_1.default
    .connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to FriendGetter Database"))
    .catch((err) => console.log("Failed to connect to FriendGetter Database"));
const app = express_1.default();
app.use(express_1.default.json());
app.use("/api/users", user_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/friends", friend_1.default);
// autoCompletePlace("42a Oakdale Road")
// console.log(something)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
