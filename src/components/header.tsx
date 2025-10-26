import LogoContainer from "@/assets/logos/logo_container";
import Button from "@/components/button";

import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import MyPageIcon from "@/assets/icons/ic_mypage";
import MailIcon from "@/assets/icons/ic_mail";
import FileCsvIcon from "@/assets/icons/ic_file_csv";
import FilePdfIcon from "@/assets/icons/ic_file_pdf";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

type IsLoggedIn = "true" | "false";
type Dashboard = "true" | "false";
type IsPanelLibrary = "true" | "false";

interface HeaderProps {
  isLoggedIn?: IsLoggedIn;
  dashboard?: Dashboard;
  isPanelLibrary?: IsPanelLibrary;
}

export default function Header({
  isLoggedIn = "false",
  dashboard = "false",
  isPanelLibrary = "false",
}: HeaderProps) {
  const navigate = useNavigate();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsExportOpen(false);
      }
    }
    if (isExportOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExportOpen]);
  return (
    <div className="flex items-center justify-between px-[80px] py-[16px] bg-opacity-100">
      <LogoContainer width={128} height={26} />
      {isLoggedIn === "false" && (
        <div className="flex items-center gap-[16px]">
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
          <Button
            variant="filled"
            size="large"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </div>
      )}
      {isLoggedIn === "true" && dashboard === "false" && (
        <div className="flex items-center gap-[16px]">
          <div className="text-subtitle1 text-primary-700 cursor-pointer">
            검색
          </div>
          <div className="text-subtitle1 text-gray-700 cursor-pointer mr-[8px]">
            라이브러리
          </div>
          <MyPageIcon />
        </div>
      )}
      {isLoggedIn === "true" &&
        dashboard === "true" &&
        isPanelLibrary === "false" && (
          <div className="flex justify-center items-center gap-[16px]">
            <div className="relative" ref={selectRef}>
              <Button
                variant="icon"
                size="large"
                onClick={() => setIsExportOpen(!isExportOpen)}
              >
                <div>내보내기</div>
                <ChevronDownIcon color="white" width={16} height={16} />
              </Button>
              {isExportOpen && (
                <ul className="absolute right-0 top-full mt-[12px] inline-block whitespace-nowrap min-w-[180px] bg-white rounded-lg py-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-20">
                  <li
                    id="mail"
                    onClick={() => setIsExportOpen(false)}
                    className="px-[16px] py-[12px] flex items-center gap-[8px] text-body4 text-gray-950 hover:bg-gray-300 cursor-pointer"
                  >
                    <MailIcon width={20} height={20} color="#5632A5" />
                    메일로 전송
                  </li>
                  <li
                    id="csv"
                    onClick={() => setIsExportOpen(false)}
                    className="px-[16px] py-[12px] flex items-center gap-[8px] text-body4 text-gray-950 hover:bg-gray-300 cursor-pointer"
                  >
                    <FileCsvIcon width={20} height={20} />
                    .csv로 다운로드
                  </li>
                  <li
                    id="pdf"
                    onClick={() => setIsExportOpen(false)}
                    className="px-[16px] py-[12px] flex items-center gap-[8px] text-body4 text-gray-950 hover:bg-gray-300 cursor-pointer"
                  >
                    <FilePdfIcon width={20} height={20} />
                    .pdf로 다운로드
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
