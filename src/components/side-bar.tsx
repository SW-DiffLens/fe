import ArchiveIcon from "@/assets/icons/ic_archive";
import EditIcon from "@/assets/icons/ic_edit";
import MenuIcon from "@/assets/icons/ic_menu";
import MyPageIcon from "@/assets/icons/ic_mypage";

export default function SideBar() {
  return (
    <div className="flex h-screen w-fit flex-col items-center justify-between bg-primary-50 px-[26px] py-[20px]">
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
