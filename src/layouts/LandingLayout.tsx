import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LandingLayout() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
      }}
    >
      <Header isLoggedIn="false" dashboard="false" />
      <main>
        <Outlet />
      </main>
      <Footer transparency="off" />
    </div>
  );
}
