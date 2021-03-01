import express from "express";
import mongoose from "mongoose";
import userRoute from  "./routes/user"

mongoose
    .connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to FriendGetter Database"))
    .catch(err => console.log("Failed to connect to FriendGetter Database"))
const app = express();
app.use(express.json())
app.use("/api/users", userRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
