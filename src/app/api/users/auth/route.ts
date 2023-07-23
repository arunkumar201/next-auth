import { NextResponse, NextRequest } from "next/server";
import { User } from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getIsAuth } from "@/helper/isAuth";
connect();

export async function GET(request: NextRequest) {
	try {
		const data: any = getIsAuth(request);
		const { email } = data;
		const user = await User.findOne(
			{ email: email },
			"-password -_id -isAdmin"
		);
		if (user) {
			return NextResponse.json({
				message: "user Authenticated successfully",
				data: true,
			});
		} else {
			return NextResponse.json(
				{
					message: "user doesn't Authenticated  ",
					data: false,
				},
				{
					status: 201,
				}
			);
		}
	} catch (err: Error | unknown) {
		return NextResponse.json({ message: err }, { status: 400 });
	}
}
