import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)
export default UserModel