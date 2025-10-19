import LogoContainer from "@/assets/logos/logo_container";
import Button from "@/components/button";
import ListItem from "@/components/pricing/list_item";

export default function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-[107.5px] px-[181px]">
      <div className="w-full flex flex-col items-center justify-center py-[64px] px-[80px] gap-[48px] bg-opacity-500 rounded-2xl">
        {/* 상단 영역 */}
        <div className="flex flex-col items-center justify-center">
          <LogoContainer width={128} height={26} />
          <div className="text-h2 text-gray-950 mt-[8px] mb-[16px]">
            계정 유형을 고르세요
          </div>
          <div className="text-body4 text-gray-900">
            차별화된 패널 데이터 검색과 비교 분석을 체험해보세요
          </div>
        </div>
        {/* 하단 영역 */}
        <div className="w-full grid grid-cols-2 gap-[24px]">
          {/* 개인 */}
          <div className="flex flex-col items-center justify-center gap-[32px] py-[48px] px-[24px] border border-white rounded-lg bg-opacity-800">
            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="text-h3 text-gray-950">개인</div>
              <div className="text-body3 text-primary-800">
                개인 프로젝트를 진행 중이라면
              </div>
            </div>
            <div className="flex flex-col items-start gap-[8px]">
              <ListItem title="1일 검색 횟수 제한" />
              <ListItem title="패널 데이터 검색 및 분석" />
              <ListItem title="개인맞춤 패널 자동 추천" />
              <ListItem title="데이터 분석 결과 내보내기" />
              <ListItem title="라이브러리 최대 10개 저장" />
              <ListItem title="라이브러리 1주일 보관" />
            </div>
            <Button variant="filled" size="large">
              시작하기
            </Button>
          </div>
          {/* 비즈니스 */}
          <div className="flex flex-col items-center justify-center gap-[32px] py-[48px] px-[24px] border border-white rounded-lg bg-opacity-800">
            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="text-h3 text-gray-950">비즈니스</div>
              <div className="text-body3 text-primary-800">
                전문가 또는 기업에서 프로젝트를 진행 중이라면
              </div>
            </div>
            <div className="flex flex-col items-start gap-[8px]">
              <ListItem title="검색 횟수 무제한" />
              <ListItem title="패널 데이터 검색 및 분석" />
              <ListItem title="개인맞춤 패널 자동 추천" />
              <ListItem title="데이터 분석 결과 내보내기 무제한" />
              <ListItem title="라이브러리 무제한 저장" />
              <ListItem title="라이브러리 영구 보관" />
            </div>
            <Button variant="filled" size="large">
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
