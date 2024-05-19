import { Sidebar } from "@/components/shared/Sidebar";
import { AuthProvider } from "@/providers/AuthProvider";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="root">
      <Sidebar />
      {/* <MobileNav /> */}

      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>

      {/* <Toaster /> */}
    </main>
  );
}
