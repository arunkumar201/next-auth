import { NextResponse, NextRequest } from "next/server";
import { getUserData } from "@/helper/getDataFromToken";
import { User } from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
	try {
		const data: any = getUserData(request);
		const { email } = data;
		const user = await User.findOne(
			{ email: email },
			"-password -_id -isAdmin"
		);
		return NextResponse.json({
			message: "user successfully found",
			data: user,
		});
	} catch (err: Error | unknown) {
		return NextResponse.json({ message: err }, { status: 400 });
	}
}
