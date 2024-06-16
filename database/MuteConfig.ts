import { Schema, model } from "mongoose";

let muteSchema = new Schema({
    GuildID: String,
    RoleID: String,
});

export default model('MuteConfig', muteSchema);