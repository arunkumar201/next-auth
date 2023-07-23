import { NextRequest } from "next/server";
import Error from "next/error";
import jwt from 'jsonwebtoken';

export const getUserData =  (req: NextRequest)=>{
	try {
		const tokenValue = req.cookies.get('token')?.value || "";
		const data =  jwt.verify(tokenValue,process.env.TOKEN_SECRET!)
		return data;
	} catch (err:Error | unknown) {
		console.log(err);
	}

}
