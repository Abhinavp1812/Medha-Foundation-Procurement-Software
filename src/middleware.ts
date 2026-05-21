import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  const isAdminArea = pathname.startsWith("/admin");
  const isVendorArea = pathname.startsWith("/vendor");

  if ((isAdminArea || isVendorArea) && !session) {
    const url = new URL("/signin", req.nextUrl);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminArea && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/vendor", req.nextUrl));
  }
  if (isVendorArea && role !== "VENDOR") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  runtime: "nodejs",
  matcher: ["/admin/:path*", "/vendor/:path*"],
};
