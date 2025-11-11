import DownloadIcon from "@/assets/icons/ic_download";
import MyPageIcon from "@/assets/icons/ic_mypage";
import LogoContainer from "@/assets/logos/logo_container";
import Button from "@/components/button";

// import MailIcon from "@/assets/icons/ic_mail";
// import FileCsvIcon from "@/assets/icons/ic_file_csv";
// import FilePdfIcon from "@/assets/icons/ic_file_pdf";

import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { createLibrary } from "@/api/library";
import LibrarySaveModal from "@/components/library-save-modal";

type IsLoggedIn = "true" | "false";
type Dashboard = "true" | "false";
type IsPanel = "true" | "false";
type IsLibrary = "true" | "false";

interface HeaderProps {
  isLoggedIn?: IsLoggedIn;
  dashboard?: Dashboard;
  isPanel?: IsPanel;
  isLibrary?: IsLibrary;
  searchId?: string;
  totalCount?: number;
}

export default function Header({
  isLoggedIn = "false",
  dashboard = "false",
  isPanel = "false",
  isLibrary = "false",
  searchId,
  totalCount = 0,
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

  const handleSaveToLibrary = async (libraryName: string, tags: string[]) => {
    if (!searchId) {
      alert("검색 ID가 없습니다.");
      return;
    }

    try {
      const response = await createLibrary({
        search_history_id: Number(searchId),
        library_name: libraryName,
        tags,
      });

      if (response.is_success) {
        alert(
          `라이브러리 "${libraryName}"에 ${response.result.panel_count}개의 패널이 저장되었습니다.`
        );
        setIsExportOpen(false);
      }
    } catch (error) {
      console.error("라이브러리 저장 실패:", error);
      alert("라이브러리 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className="flex items-center justify-between bg-opacity-100 px-[80px] py-[16px]">
      <div onClick={() => navigate("/home")} className="cursor-pointer">
        <LogoContainer width={128} height={26} />
      </div>
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
          <div
            className={`text-subtitle1 ${
              isLibrary === "false" ? "text-primary-700" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => navigate("/home")}
          >
            검색
          </div>
          <div
            className={`text-subtitle1 ${
              isLibrary === "true" ? "text-primary-700" : "text-gray-700"
            } mr-[8px] cursor-pointer`}
            onClick={() => navigate("/home/library")}
          >
            라이브러리
          </div>
          <MyPageIcon />
        </div>
      )}
      {isLoggedIn === "true" && dashboard === "true" && isPanel === "false" && (
        <div className="flex items-center justify-center gap-[16px]">
          <div className="relative" ref={selectRef}>
            <Button
              variant="icon"
              size="large"
              onClick={() => setIsExportOpen(!isExportOpen)}
            >
              <div className="flex items-center gap-[8px]">
                <DownloadIcon width={20} height={20} color="white" />
                <span>라이브러리 저장</span>
              </div>
            </Button>
            <LibrarySaveModal
              open={isExportOpen}
              onClose={() => setIsExportOpen(false)}
              onSave={handleSaveToLibrary}
              totalCount={totalCount}
            />
            {/* {isExportOpen && (
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
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
