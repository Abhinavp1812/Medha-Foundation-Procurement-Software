import { auth } from "@/auth";
import { DashboardShell } from "@/components/DashboardShell";

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <DashboardShell
      role="VENDOR"
      userName={session?.user?.name ?? "Vendor"}
    >
      {children}
    </DashboardShell>
  );
}
