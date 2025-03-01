import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = (AutoIncrementFactory as any)(mongoose);


const ProductSchema = new mongoose.Schema({
    id: { type: Number, unique: true, autoIncrement: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

ProductSchema.plugin(AutoIncrement, { inc_field: "id" });

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin", enum: ["admin", "user"] },
});

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);