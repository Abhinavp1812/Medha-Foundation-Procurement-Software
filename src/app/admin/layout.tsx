import { auth } from "@/auth";
import { DashboardShell } from "@/components/DashboardShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <DashboardShell
      role="ADMIN"
      userName={session?.user?.name ?? "Admin"}
      companyName="Medha Skilling Foundation"
    >
      {children}
    </DashboardShell>
  );
}
