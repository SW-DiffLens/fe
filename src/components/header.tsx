import logoContainer from "@/assets/logo_container.svg";
import Button from "@/components/button";
import chevronDownIcon from "@/assets/ic_chevron_down.svg";
import mypageIcon from "@/assets/ic_mypage.svg";

type IsLoggedIn = "true" | "false";
type Dashboard = "true" | "false";

interface HeaderProps {
  isLoggedIn?: IsLoggedIn;
  dashboard?: Dashboard;
}

export default function Header({
  isLoggedIn = "false",
  dashboard = "false",
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-[80px] py-[16px] bg-opacity-100">
      <img
        src={logoContainer}
        alt="logoContainer"
        className="w-[128px] h-[26px]"
      />
      {isLoggedIn === "false" && (
        <div className="flex items-center gap-[16px]">
          <Button variant="outlined" size="large">
            로그인
          </Button>
          <Button variant="filled" size="large">
            회원가입
          </Button>
        </div>
      )}
      {isLoggedIn === "true" && dashboard === "false" && (
        <div className="flex items-center gap-[16px]">
          <div className="text-subtitle1 text-gray-700 cursor-pointer">
            검색
          </div>
          <div className="text-subtitle1 text-gray-700 cursor-pointer">
            라이브러리
          </div>
          <img
            src={mypageIcon}
            alt="mypage"
            className="w-[24px] h-[24px] ml-[8px] cursor-pointer"
          />
        </div>
      )}
      {isLoggedIn === "true" && dashboard === "true" && (
        <div className="flex items-center gap-[16px]">
          <Button variant="icon" size="large">
            <div>내보내기</div>
            <img src={chevronDownIcon} alt=">" className="w-[16px] h-[16px]" />
          </Button>
        </div>
      )}
    </div>
  );
}
