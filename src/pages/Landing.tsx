import Button from "@/components/button";
import ArrowRightIcon from "@/assets/icons/ic_arrow_right";
import StatusSquareIcon from "@/assets/icons/ic_status_square";
import GroupIcon from "@/assets/icons/ic_group";
import ExportIcon from "@/assets/icons/ic_export";
import DocSearchIcon from "@/assets/icons/ic_doc_search";
import LogoText from "@/assets/logos/logo_text";

import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="flex gap-[80px] pt-[158px] pb-[120px] bg-opacity-200 px-[180px] grid grid-cols-2">
        <div className="flex flex-col py-[32px] gap-[64px]">
          <div className="flex flex-col gap-[48px]">
            <div className="text-h2 text-primary-950">
              차별화된 패널 데이터
              <br />
              검색과 비교 분석
            </div>
            <div className="text-body3 text-gray-900">
              AI 기반 유사도 분석을 통한 차별화된 패널 데이터 검색 및 비교
              분석을 체험해보세요! 패널 데이터의 검색, 필터링, 시각화 기능을
              통합한 대시 보드 서비스까지.
            </div>
          </div>
          <div className="flex gap-[16px]">
            <Button
              variant="icon"
              size="medium"
              onClick={() => navigate("/signup")}
            >
              <div>회원가입</div>
              <ArrowRightIcon color="white" width={14} height={14} />
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/login")}
            >
              로그인
            </Button>
          </div>
        </div>
        <div className="bg-gray-300 rounded-lg w-full h-[425px]" />
      </div>
      <div className="flex flex-col items-center py-[80px] gap-[64px] bg-opacity-700 px-[180px]">
        <div className="text-h2 text-black flex items-center gap-[8px]">
          왜
          <LogoText width={177} height={46} />
          일까요?
        </div>
        <div className="flex gap-[16px]">
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <StatusSquareIcon color="black" width={48} height={48} />
            <div className="text-body3 text-gray-900 text-center ">
              패널 데이터 검색/비교 분석 통합 대시보드 플랫폼 구축
            </div>
          </div>
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <GroupIcon color="black" width={48} height={48} />
            <div className="text-body3 text-gray-900 text-center">
              AI 기반 유사도 분석을 통한 관련 패널 자동 추천 시스템
            </div>
          </div>
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <ExportIcon color="black" width={48} height={48} />
            <div className="text-body3 text-gray-900 text-center">
              사용자별 맞춤형 데이터 내보내기 및 집단 관리 기능
            </div>
          </div>
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <DocSearchIcon color="black" width={48} height={48} />
            <div className="text-body3 text-gray-900 text-center">
              특정 라이브러리 내 사용자가 놓친 집단 특성 리포트 기능
            </div>
          </div>
        </div>
        <Button
          variant="filled"
          size="large"
          onClick={() => navigate("/signup")}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
