import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import CompareCard from "@/components/compare/card";
import CompareBar from "@/components/compare/bar";
import DistributionBox from "@/components/compare/distribution-box";
import BasicInfo from "@/components/compare/basic-info";
import InsightItem from "@/components/compare/insight-item";

import { useNavigate } from "react-router-dom";

const data = [
  {
    title: "20대 남성이 타는 차 브랜드 분포",
    description: "20대 남성 소비자의 자동차 브랜드 선호도 분석",
    tags: ["100명", "2025.10.26", "인구통계"],
    filters: ["성별: 남성", "연령: 20-29세", "차량보유: 있음"],
    group: "A",
  },
  {
    title: "30대 여성 화장품 구매 패턴",
    description: "30대 여성의 화장품 구매 행동 및 선호 브랜드 분석",
    tags: ["250명", "2025.10.26", "소비패턴"],
    filters: ["성별: 여성", "연령: 30-39세"],
    group: "B",
  },
];

const distributionData = [
  {
    title: "성별 분포",
    categories: [
      {
        name: "남성",
        groupA: 100,
        groupB: 0,
      },
      {
        name: "여성",
        groupA: 0,
        groupB: 100,
      },
    ],
  },
  {
    title: "지역 분포",
    categories: [
      {
        name: "서울",
        groupA: 35,
        groupB: 35,
      },
      {
        name: "경기",
        groupA: 40,
        groupB: 40,
      },
      {
        name: "부산",
        groupA: 15,
        groupB: 15,
      },
      {
        name: "기타",
        groupA: 10,
        groupB: 10,
      },
    ],
  },
];

const basicInfoData = [
  {
    title: "평균 연령",
    groupA: "23.5세",
    groupB: "32.7세",
  },
  {
    title: "평균 가족 수",
    groupA: "3.2명",
    groupB: "4.2명",
  },
  {
    title: "평균 자녀 수",
    groupA: "0.8명",
    groupB: "3.4명",
  },
  {
    title: "차량 보유율",
    groupA: "72%",
    groupB: "30%",
  },
  {
    title: "평균 개인 소득",
    groupA: "420만원",
    groupB: "340만원",
  },
  {
    title: "평균 가구 소득",
    groupA: "340만원",
    groupB: "500만원",
  },
];

export default function Compare() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-start min-h-screen pt-[40px] px-[242px] pb-[88px] gap-[40px]">
      <div
        className="flex items-center justify-start gap-[8px] cursor-pointer"
        onClick={() => navigate("/home/library")}
      >
        <ChevronLeftIcon color="#616161" width={24} height={24} />
        <div className="text-h5 text-gray-700">라이브러리</div>
      </div>
      {/* 비교분석 대상 영역 */}
      <div className="w-full flex flex-col items-start justify-start gap-[20px] bg-opacity-500 rounded-2xl py-[32px] px-[40px]">
        <div className="text-h6 text-gray-950">비교분석 대상</div>
        <div className="w-full grid grid-cols-2 gap-[40px]">
          {data.map((item) => (
            <CompareCard
              key={item.title}
              title={item.title}
              description={item.description}
              tags={item.tags}
              filters={item.filters}
              group={item.group as "A" | "B"}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-[32px] bg-opacity-500 rounded-2xl py-[32px] px-[40px]">
        <div className="w-full flex items-center justify-between gap-[16px]">
          <div className="flex items-center justify-center gap-[12px]">
            <div className="rounded-full w-[16px] h-[16px] bg-secondary-300" />
            <div className="text-subtitle1 text-gray-950">A그룹</div>
            <div className="text-label text-gray-700">
              "20대 남성이 타는 차 브랜드 분포"
            </div>
          </div>
          <div className="flex items-center justify-center gap-[12px]">
            <div className="text-label text-gray-700">
              "30대 여성 화장품 구매 패턴"
            </div>
            <div className="text-subtitle1 text-gray-950">B그룹</div>
            <div className="rounded-full w-[16px] h-[16px] bg-tertiary-300" />
          </div>
        </div>
        {/* 비교분석 결과 영역 */}
        <div className="w-full flex flex-col items-start justify-start gap-[20px]">
          <CompareBar leftPercent={30} rightPercent={70} label="특성1" />
          <CompareBar leftPercent={30} rightPercent={70} label="특성2" />
          <CompareBar leftPercent={30} rightPercent={70} label="특성3" />
        </div>
        {distributionData.map((distribution) => (
          <DistributionBox
            key={distribution.title}
            title={distribution.title}
            categories={distribution.categories}
          />
        ))}
      </div>
      {/* 기본 정보 비교 영역 */}
      <div className="w-full flex flex-col items-start justify-start gap-[20px] bg-opacity-500 rounded-2xl py-[32px] px-[40px]">
        <div className="text-h6 text-gray-950">기본 정보 비교</div>
        <div className="w-full grid grid-cols-3 gap-[40px]">
          {basicInfoData.map((item) => (
            <BasicInfo
              key={item.title}
              title={item.title}
              groupA={item.groupA}
              groupB={item.groupB}
            />
          ))}
        </div>
      </div>
      {/* 핵심 인사이트 영역 */}
      <div className="w-full flex flex-col items-start justify-start gap-[20px] bg-opacity-500 rounded-2xl py-[32px] px-[40px]">
        <div className="text-h6 text-gray-950">핵심 인사이트</div>
        <div className="w-full flex flex-col items-center justify-center gap-[44px]">
          <InsightItem
            title="주요 차이점"
            description=" 두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은"
          />
          <InsightItem
            title="공통점"
            description=" 두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은"
          />
          <InsightItem
            title="시사점"
            description=" 두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두 분석은두
        분석은두 분석은두 분석은두 분석은두 분석은"
          />
        </div>
      </div>
    </div>
  );
}
