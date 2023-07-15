import { NextRequest, NextResponse } from "next/server";
import { publicRoute } from "./constants/publicRoutes";

export function middleware(req: NextRequest) {
	const currentPath = req.nextUrl.pathname;
	const isPublicRoute = publicRoute.includes(currentPath);
	const token = req.cookies.get('token')?.value || "";
	
	if (isPublicRoute && token) {
		return NextResponse.redirect(new URL('/profile',req.nextUrl))
	}
	if(!isPublicRoute && !token){
		return NextResponse.redirect(new URL("/login",req.nextUrl));
	}

}

export const config = {
	matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
