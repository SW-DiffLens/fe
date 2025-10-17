import logoContainer from "@/assets/logo_container.svg";
import Button from "@/components/button";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import MyPageIcon from "@/assets/icons/ic_mypage";

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
          <MyPageIcon color="black" width={24} height={24} />
        </div>
      )}
      {isLoggedIn === "true" && dashboard === "true" && (
        <div className="flex items-center gap-[16px]">
          <Button variant="icon" size="large">
            <div>내보내기</div>
            <ChevronDownIcon color="black" width={16} height={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
