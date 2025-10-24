import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import { Outlet } from "react-router-dom";

export default function PanelLayout() {
  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
      }}
    >
      <main>
        <div className="w-full h-full z-0 relative">
          {/* 피그마 시안대로 blur-[197.3px]로 하면 블러 효과가 너무 강해서 blur-3xl로 변경 */}
          <div className="absolute blur-3xl w-[342px] h-[342px] bg-secondary-100 rounded-full top-[124px] left-[624px]" />
          <div className="absolute blur-3xl w-[501px] h-[501px] bg-primary-300 rounded-full top-[347px] left-[219px]" />
          <div className="absolute blur-3xl w-[413px] h-[413px] bg-tertiary-200 rounded-full top-[512px] left-[841px]" />
        </div>
        <div className=" w-full h-full z-10 flex">
          <SideBar />
          <div className="w-full z-10">
            <Header isLoggedIn="true" dashboard="true" isPanelLibrary="true" />
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
