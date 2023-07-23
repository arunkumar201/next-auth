import { NextRequest } from "next/server";
import Error from "next/error";
import jwt from "jsonwebtoken";

export const getIsAuth = (req: NextRequest) => {
	try {
		const tokenValue = req.cookies.get("token")?.value;
		if (!tokenValue) {
			return false;
		}
		const data = jwt.verify(tokenValue as string, process.env.TOKEN_SECRET!);
		return data;
	} catch (err) {
		console.error(err);
		return false;
	}
};
