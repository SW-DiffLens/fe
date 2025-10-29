import TrashIcon from "@/assets/icons/ic_trash";
import Button from "./button";

export default function Modal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center justify-start gap-[20px] bg-white rounded-2xl py-[32px] px-[52px] opacity-100">
        <div className="flex items-center justify-start gap-[20px] w-full">
          <div className="flex items-center justify-center rounded-full bg-error-ctr p-[10px]">
            <TrashIcon width={20} height={20} color="#8C1D18" />
          </div>
          <div>
            <div className="text-h5 text-black">항목 삭제</div>
            <div className="text-body5 text-gray-800">
              선택된 항목을 삭제하시겠습니까?
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[12px] w-[320px]">
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            borderColor="gray-700"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="filled"
            size="medium"
            fullWidth
            bgColor="error-default"
            textColor="white"
            onClick={onClose}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
