import express from "express";
import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost/IBS")
    .then(() => console.log("Connected to FriendGetter Database"))
    .catch(err => console.log("Failed to connect to FriendGetter Database"))
const app = express();


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
