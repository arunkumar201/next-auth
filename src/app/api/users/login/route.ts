import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/model/userModel";
import jwt from "jsonwebtoken";
import { userInfo } from "os";
connect();

export async function POST(request: NextRequest) {
	try {
		//getting data from the request
		const reqBody = await request.json();
		const { email, password } = reqBody;
		//check user exist or not
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: "User Does Not Found" },
				{ status: 400 }
			);
		}
		//check if pass is valid or not
		const isValid = await bcrypt.compare(password, user.password);
		
		if (!isValid) {
			return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
		}
		//create the token for the user
		//token data
		const tokenData = {
			id: user._id,
			email: user.email,
			password: user.password,
		};
		//now create the token
		const token = await jwt.sign(
			tokenData,
			process.env.TOKEN_SECRET as string,
			{ expiresIn: "1d" }
		);
		const response = NextResponse.json({
			message: "Login Success",
			success: true,
		});

		response.cookies.set("token", token, {
			httpOnly: true,
		});

		return response;
	} catch (e: any) {
		return NextResponse.json(
			{ error: e.message },
			{
				status: 500,
			}
		);
	}
}
