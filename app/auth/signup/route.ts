import { NextResponse } from "next/server";
import { APP_SIGNUP_URL } from "@/lib/app-urls";

/** Anyone hitting /auth/signup on the marketing site is sent to the web app signup. */
export function GET() {
    return NextResponse.redirect(APP_SIGNUP_URL, 307);
}
