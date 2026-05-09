import { NextResponse } from "next/server";
import { APP_SIGNIN_URL } from "@/lib/app-urls";

/** Anyone hitting /auth/signin on the marketing site is sent to the web app signin. */
export function GET() {
    return NextResponse.redirect(APP_SIGNIN_URL, 307);
}
