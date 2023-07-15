import Error from "next/error";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = NextResponse.json(
			{
				message: "Logout Successfully",
				success: true,
			},
			{ status: 200 }
		);

		response.cookies.set("token", "", { httpOnly: true });
		return response;
	} catch (err: any) {
		console.error(err);
		NextResponse.json(
			{
				error: err.message,
			},
			{ status: 500 }
		);
	}
}
