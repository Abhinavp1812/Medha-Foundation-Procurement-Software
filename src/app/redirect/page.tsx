import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function RedirectByRole() {
  const session = await auth();
  if (!session) redirect("/signin");
  redirect(session.user.role === "ADMIN" ? "/admin" : "/vendor");
}
