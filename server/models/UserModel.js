import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName:{
			type:String,
			required:true,
			index:true,
		},
		lastName:{
			type:String,
			required:true,
			index:true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		role: {
			type:String,
			default: "user",
		},
		avatar: {
			type: String,
			default: "default-avatar-url.jpg",
		},
		cart: {
			type: Array,
			default: [],
		},
		stores: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Store',
		}],
		address: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    	wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
		isBlocked: {
			type:Boolean,
			default:false
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		googleId: {
			type: String,
			unique: false
		},
		facebookId: {
			type: String,
			unique: false
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);


export const User = mongoose.models.User || mongoose.model('User', userSchema);

