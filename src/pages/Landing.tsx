import Button from "@/components/button";
import arrowRightIcon from "@/assets/ic_arrow_right.svg";
import statusSquareIcon from "@/assets/ic_status_square.svg";
import groupIcon from "@/assets/ic_group.svg";
import exportIcon from "@/assets/ic_export.svg";
import docSearchIcon from "@/assets/ic_doc_search.svg";

export default function Landing() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-[80px] pt-[158px] pb-[120px] bg-opacity-200 px-[180px]">
        <div className="flex flex-col py-[32px] gap-[64px]">
          <div className="flex flex-col gap-[48px]">
            <div className="text-h2-secondary text-primary-950">
              차별화된 패널 데이터
              <br />
              검색과 비교 분석
            </div>
            <div className="text-body3-secondary text-gray-900">
              AI 기반 유사도 분석을 통한 차별화된 패널 데이터 검색 및 비교
              분석을
              <br />
              체험해보세요! 패널 데이터의 검색, 필터링, 시각화 기능을 통합한
              대시
              <br />
              보드 서비스까지.
            </div>
          </div>
          <div className="flex gap-[16px]">
            <Button variant="icon" size="medium">
              <div>회원가입</div>
              <img
                src={arrowRightIcon}
                alt="->"
                className="w-[14px] h-[14px]"
              />
            </Button>
            <Button variant="outlined" size="medium">
              로그인
            </Button>
          </div>
        </div>
        <div className="bg-black w-[500px] h-[425px]" />
      </div>
      <div className="flex flex-col items-center py-[80px] gap-[64px] bg-opacity-700 px-[180px]">
        <div className="text-h2-secondary text-primary-950">
          왜 DiffLens 일까요?
        </div>
        <div className="flex gap-[16px]">
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <img
              src={statusSquareIcon}
              alt="statusSquare"
              className="w-[48px] h-[48px]"
            />
            <div className="text-body3-primary text-gray-900 text-center">
              패널 데이터 검색/비교 분석
              <br />
              통합 대시보드 플랫폼 구축
            </div>
          </div>
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <img
              src={groupIcon}
              alt="statusSquare"
              className="w-[48px] h-[48px]"
            />
            <div className="text-body3-primary text-gray-900 text-center">
              AI 기반 유사도 분석을 통한
              <br />
              관련 패널 자동 추천 시스템
            </div>
          </div>
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <img
              src={exportIcon}
              alt="statusSquare"
              className="w-[48px] h-[48px]"
            />
            <div className="text-body3-primary text-gray-900 text-center">
              사용자별 맞춤형 데이터 내보
              <br />
              내기 및 집단 관리 기능
            </div>
          </div>
          <div className="flex flex-col items-center px-[16px] gap-[16px]">
            <img
              src={docSearchIcon}
              alt="statusSquare"
              className="w-[48px] h-[48px]"
            />
            <div className="text-body3-primary text-gray-900 text-center">
              특정 라이브러리 내 사용자가
              <br />
              놓친 집단 특성 리포트 기능
            </div>
          </div>
        </div>
        <Button variant="filled" size="large">
          시작하기
        </Button>
      </div>
    </div>
  );
}
