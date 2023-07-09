import mongoose, { Document } from "mongoose";
mongoose.Promise = global.Promise;
export interface IUser extends Document {
	email: string;
	password: string;
	fullName: string;
	profileImg: string;
	dateOfBirth?: string;
	phoneNumber?: string;
	country?: string;
	city?: string;
	stateOrProvince?: string;
	postalCode?: string;
	gender?: string;
	interests?: string[];
	bio?: string;
	isVerified: boolean;
	isAdmin: boolean;
	forgotPasswordToken?: string;
	forgotPasswordTokenExpiry?: Date;
	verifyToken?: string;
	verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	fullName: {
		type: String,
		required: [true, "Please provide a full name"],
	},
	profileImg: {
		type: String,
		required: [true, "Please provide a profile image"],
	},
	dateOfBirth: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	country: {
		type: String,
	},
	city: {
		type: String,
	},
	stateOrProvince: {
		type: String,
	},
	postalCode: {
		type: String,
	},
	gender: {
		type: String,
	},
	interests: {
		type: [String],
	},
	bio: {
		type: String,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: {
		type: String,
	},
	forgotPasswordTokenExpiry: {
		type: Date,
	},
	verifyToken: {
		type: String,
	},
	verifyTokenExpiry: {
		type: Date,
	},
});

// const User = mongoose.model<IUser>("User", userSchema);
 export const User= mongoose.models.User || mongoose.model("User", userSchema);
