import { Schema, model } from "mongoose";

let joinRolesSchema = new Schema({
    GuildID: String,
    RoleID: String,
});

export default model('JoinRolesConfig', joinRolesSchema);