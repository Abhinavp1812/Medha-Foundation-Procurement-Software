import { NextRequest, NextResponse } from "next/server";
import { jwtDecrypt } from "jose";

async function getRole(req: NextRequest): Promise<string | null> {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  const token = req.cookies.get(cookieName)?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
    const { payload } = await jwtDecrypt(token, secret);
    return (payload as { role?: string }).role ?? null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = await getRole(req);

  const isAdminArea = pathname.startsWith("/admin");
  const isVendorArea = pathname.startsWith("/vendor");

  if ((isAdminArea || isVendorArea) && !role) {
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
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"],
};
