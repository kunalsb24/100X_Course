import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://kunalbhajbhuje5_db_user:GxO6Q2aPY6wQkFab@cluster0.5pnmte5.mongodb.net/?appName=Cluster0");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
export const UserModel = model("User", UserSchema);
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});
export const ContentModel = model("Content", ContentSchema);
//# sourceMappingURL=db.js.map