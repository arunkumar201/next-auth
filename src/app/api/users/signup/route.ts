import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { IUser,User } from "@/model/userModel";

export async function POST(req: NextRequest){
	try {
		if (req.method === "POST") {
			const {
				email,
				password,
				fullName,
				profileImg,
				dateOfBirth,
				phoneNumber,
				country,
				city,
				stateOrProvince,
				postalCode,
				gender,
				interests,
				bio,
			} = await req.json();
			// Check if email and password are provided
			if (!email || !password || !fullName || !profileImg) {
				return NextResponse.json({ error: "Please provide all required fields" });
			}

			// Check if email is already registered
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return NextResponse.json({
					error: "Email already registered",
				});
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create a new user
			const user: IUser = new User({
				email,
				password: hashedPassword,
				fullName,
				profileImg,
				dateOfBirth,
				phoneNumber,
				country,
				city,
				stateOrProvince,
				postalCode,
				gender,
				interests,
				bio,
			});
			const savedUser = await user.save();
			return NextResponse.json({
				message: "User created successfully",
				user: savedUser,
			});
		} else {
			return NextResponse.json({ error: "Method not allowed" });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Server error" });
	}
}
connect();
