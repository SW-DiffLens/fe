import { useState } from "react";
import TrashIcon from "@/assets/icons/ic_trash";
import Button from "./button";
import DownloadIcon from "@/assets/icons/ic_download";

export default function Modal({
  open,
  onClose,
  title = "항목 삭제",
  description = "선택된 항목을 삭제하시겠습니까?",
  type = "delete",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type: "delete" | "save";
}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center justify-start gap-[20px] bg-white rounded-2xl py-[32px] px-[52px] opacity-100">
        <div className="flex items-center justify-start gap-[20px] w-full">
          <div
            className={`flex items-center justify-center rounded-full bg-${
              type === "delete" ? "error-ctr" : "success-ctr"
            } p-[10px]`}
          >
            {type === "delete" ? (
              <TrashIcon width={20} height={20} color="#8C1D18" />
            ) : (
              <DownloadIcon width={20} height={20} color="#14632B" />
            )}
          </div>
          <div>
            <div className="text-h5 text-black">{title}</div>
            <div className="text-body5 text-gray-800">{description}</div>
          </div>
        </div>
        {type === "save" && (
          <div className="flex flex-col items-end justify-start gap-[4px] w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setInputValue(e.target.value);
                }
              }}
              maxLength={50}
              className="w-full px-[20px] py-[8px] border border-gray-700 text-body5 rounded-lg placeholder:text-body5 placeholder:text-gray-700 focus:outline-none"
              placeholder="라이브러리 이름"
            />
            <div className="text-caption text-gray-500">
              {inputValue.length}/50자
            </div>
          </div>
        )}
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
            bgColor={type === "delete" ? "error-default" : "success-default"}
            textColor="white"
            onClick={onClose}
          >
            {type === "delete" ? "삭제" : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}
