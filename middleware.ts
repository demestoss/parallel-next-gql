import { tokenKey } from "@/utils/token";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	if (!request.cookies.has(tokenKey)) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}
}

export const config = {
	matcher: ["/"],
};
