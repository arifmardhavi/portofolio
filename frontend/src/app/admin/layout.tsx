import { MobileAdminSidebar, AdminSidebar } from "./components/AdminSidebar";
import { ThemeToggle } from "@/components/theme-toggle"; // Assuming this exists or will exist

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar className="hidden border-r bg-muted/40 md:block" />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between md:justify-end">
          <MobileAdminSidebar />
          <div className="flex items-center gap-4">
             {/* Add language/theme toggle here later */}
             <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
