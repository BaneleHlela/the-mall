import mongoose from "mongoose";
import bcrypt from "bcrypt";

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        index:true,
    },
    lastname:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    facebookId: {
        type: String,
        unique: true
    },
    googleId: {
        type: String,
        unique: true
    },
    role: {
        type:String,
        default: "user",
    },
    avatar: {
        type: String,
        default: "default-avatar-url.jpg",
    },
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
    }],
    isBlocked: {
        type:Boolean,
        default:false
    },
    cart: {
        type: Array,
        default: [],
    },
    address: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    refreshToken: {
        type: String,
    }
},{
        timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    if (!enteredPassword) {
        throw new Error("Password is required for comparison");
    }
    return await bcrypt.compare(enteredPassword, this.password);
};
export const User = mongoose.models.User || mongoose.model('User', userSchema);

