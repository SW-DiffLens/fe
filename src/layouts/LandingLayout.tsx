import { Outlet } from "react-router-dom";
import Button from "@/components/button";
import mailIcon from "@/assets/ic_mail.svg";
import xBox from "@/assets/x-box.svg";

export default function LandingLayout() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
      }}
    >
      {/* header 추후에 컴포넌트 분리 예정 */}
      <header className="flex items-center justify-between px-[80px] py-[16px] bg-opacity-200">
        <div className="flex items-center gap-[4px]">
          <img src={xBox} alt="xBox" className="w-[24px] h-[24px]" />
          <div className="text-h4-primary text-gray-600">DiffLens</div>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button variant="outlined" size="large">
            로그인
          </Button>
          <Button variant="filled" size="large">
            회원가입
          </Button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      {/* footer 추후에 컴포넌트 분리 예정 */}
      <footer className="flex items-start justify-between px-[80px] py-[40px] bg-primary-100">
        <div className="flex items-center gap-[4px]">
          <img src={xBox} alt="xBox" className="w-[24px] h-[24px]" />
          <div className="text-h4-primary text-gray-600">DiffLens</div>
        </div>
        <div className="flex flex-col items-end gap-[8px]">
          <img src={mailIcon} alt="mail" className="w-[24px] h-[24px]" />
          <div className="text-body5-secondary text-gray-950">
            Copyright© 2025. DiffLens. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
