import MenuIcon from "@/assets/icons/ic_menu";
import EditIcon from "@/assets/icons/ic_edit";
import ArchiveIcon from "@/assets/icons/ic_archive";
import MyPageIcon from "@/assets/icons/ic_mypage";

export default function SideBar() {
  return (
    <div className="flex flex-col px-[26px] py-[20px] items-center justify-between h-screen bg-primary-50 w-fit">
      <div className="flex flex-col items-center justify-center gap-[60px]">
        <MenuIcon />
        <div className="flex flex-col items-center justify-center gap-[40px]">
          <EditIcon />
          <ArchiveIcon />
        </div>
      </div>
      <MyPageIcon width={32} height={32} />
    </div>
  );
}
