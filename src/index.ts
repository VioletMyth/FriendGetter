import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import friendRoute from "./routes/friend";
import dotenv from "dotenv"
import autoCompletePlace from "./services/placeAutoComplete"

if(!process.env.jwtPrivateKey){
    console.log(process.env.jwtPrivateKey)
    console.log("FATAL ERROR JWTPRIVATEKEY HAS NOT BEEN DEFINED.")
    process.exit(1)
}

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to FriendGetter Database"))
  .catch((err) => console.log("Failed to connect to FriendGetter Database"));
const app = express();
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/friends", friendRoute);
// autoCompletePlace("42a Oakdale Road")
// console.log(something)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
