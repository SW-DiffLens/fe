import Button from "@/components/button";
import FilterSection from "@/components/home/filter-section";
import { useState } from "react";
import SearchBar from "@/components/search-bar";
import FilterIcon from "@/assets/icons/ic_filter";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import ChevronUpIcon from "@/assets/icons/ic_chevron_up";
import QuickSearchButton from "@/components/home/quick-search-button";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterSections = [
    {
      id: 1,
      title: "연령",
      chips: [
        {
          id: 1,
          title: "50명",
        },
        {
          id: 2,
          title: "100명",
        },
        {
          id: 3,
          title: "300명",
        },
        {
          id: 4,
          title: "500명",
        },
        {
          id: 5,
          title: "1000명",
        },
      ],
    },
    {
      id: 2,
      title: "성별",
      chips: [
        {
          id: 1,
          title: "남성",
        },
        {
          id: 2,
          title: "여성",
        },
      ],
    },
    {
      id: 3,
      title: "연령대",
      chips: [
        {
          id: 1,
          title: "20-29세",
        },
        {
          id: 2,
          title: "30-39세",
        },
        {
          id: 3,
          title: "40-49세",
        },
        {
          id: 4,
          title: "50-59세",
        },
        {
          id: 5,
          title: "60-69세",
        },
      ],
    },
    {
      id: 4,
      title: "거주지역",
      chips: [
        {
          id: 1,
          title: "서울",
        },
        {
          id: 2,
          title: "경기",
        },
        {
          id: 3,
          title: "인천",
        },
        {
          id: 4,
          title: "부산",
        },
        {
          id: 5,
          title: "대구",
        },
        {
          id: 6,
          title: "광주",
        },
        {
          id: 7,
          title: "대전",
        },
        {
          id: 8,
          title: "울산",
        },
        {
          id: 9,
          title: "세종",
        },
        {
          id: 10,
          title: "강원",
        },
        {
          id: 11,
          title: "충북",
        },
        {
          id: 12,
          title: "충남",
        },
        {
          id: 13,
          title: "전북",
        },
        {
          id: 14,
          title: "전남",
        },
        {
          id: 15,
          title: "경북",
        },
        {
          id: 16,
          title: "경남",
        },
        {
          id: 17,
          title: "제주",
        },
      ],
    },
    {
      id: 5,
      title: "결혼상태",
      chips: [
        {
          id: 1,
          title: "미혼",
        },
        {
          id: 2,
          title: "기혼",
        },
        {
          id: 3,
          title: "이혼",
        },
        {
          id: 4,
          title: "사별",
        },
      ],
    },
    {
      id: 6,
      title: "자녀유무",
      chips: [
        {
          id: 1,
          title: "있음",
        },
        {
          id: 2,
          title: "없음",
        },
      ],
    },
    {
      id: 7,
      title: "직업",
      chips: [
        {
          id: 1,
          title: "학생",
        },
        {
          id: 2,
          title: "직장인",
        },
        {
          id: 3,
          title: "자영업",
        },
        {
          id: 4,
          title: "주부",
        },
        {
          id: 5,
          title: "무직",
        },
        {
          id: 6,
          title: "기타",
        },
      ],
    },
  ];
  const quickSearchButtons = [
    {
      id: 1,
      title: "20대 남성 100명",
      subtitle: "마케터 맞춤 추천",
    },
    {
      id: 2,
      title: "서울 거주 주부 300명",
      subtitle: "마케터 맞춤 추천",
    },
    {
      id: 3,
      title: "40대 기혼 남성 500명",
      subtitle: "마케터 맞춤 추천",
    },
    {
      id: 4,
      title: "20대 남성 100명",
      subtitle: "마케터 맞춤 추천",
    },
    {
      id: 5,
      title: "서울 거주 주부 300명",
      subtitle: "마케터 맞춤 추천",
    },
    {
      id: 6,
      title: "40대 기혼 남성 500명",
      subtitle: "마케터 맞춤 추천",
    },
  ];

  const [totalSelectedChips, setTotalSelectedChips] = useState(0);
  const [sectionSelectedCounts, setSectionSelectedCounts] = useState<number[]>(
    new Array(filterSections.length).fill(0)
  );
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleSectionSelectionChange = (
    sectionIndex: number,
    selectedCount: number
  ) => {
    const newCounts = [...sectionSelectedCounts];
    newCounts[sectionIndex] = selectedCount;
    setSectionSelectedCounts(newCounts);
    setTotalSelectedChips(newCounts.reduce((sum, count) => sum + count, 0));
  };

  const resetFilter = () => {
    setSectionSelectedCounts(new Array(filterSections.length).fill(0));
    setTotalSelectedChips(0);
    setResetTrigger((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-[124px] px-[272px]">
      <div className="text-h2 text-primary-950 mb-[63px]">
        원하는 패널을 찾아보세요
      </div>
      {/* 검색 영역 */}
      <div className="w-full flex flex-col items-start justify-center py-[32px] px-[40px] gap-[24px] bg-opacity-500 rounded-2xl mb-[40px]">
        <div className="text-subtitle1 text-gray-950">검색어를 입력하세요</div>
        <SearchBar
          placeholder="예시 : 20대 남자 100명"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="flex items-center justify-between w-full">
          <Button
            variant="icon"
            size="medium"
            bgColor="white"
            textColor="black"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FilterIcon color="black" width={14} height={14} />
            상세필터
            {totalSelectedChips > 0 && (
              <div className="w-[20px] h-[20px] bg-primary-700 rounded-full text-label text-white flex items-center justify-center">
                {totalSelectedChips}
              </div>
            )}
            {isFilterOpen ? (
              <ChevronUpIcon color="black" width={14} height={14} />
            ) : (
              <ChevronDownIcon color="black" width={14} height={14} />
            )}
          </Button>
          {totalSelectedChips > 0 && (
            <button
              className="text-button-medium text-tertiary-600 cursor-pointer outline-none border-none bg-transparent"
              onClick={resetFilter}
            >
              필터 초기화
            </button>
          )}
        </div>
        {/* 칩 영역 */}
        {isFilterOpen && (
          <div className="w-full">
            <div className="w-full h-[1px] bg-white mb-[24px]" />
            <div className="w-full flex flex-col items-start justify-center gap-[16px]">
              {filterSections.map((section, index) => (
                <FilterSection
                  key={section.id}
                  title={section.title}
                  chips={section.chips}
                  onSelectionChange={(selectedCount) =>
                    handleSectionSelectionChange(index, selectedCount)
                  }
                  reset={resetTrigger}
                />
              ))}
            </div>
          </div>
        )}

        <Button variant="filled" size="large" fullWidth>
          검색하기
        </Button>
      </div>
      {/* 빠른 검색 추천 영역 */}
      <div className="w-full flex flex-col items-start justify-center py-[32px] px-[40px] gap-[12px] bg-opacity-500 rounded-2xl">
        <div className="text-subtitle1 text-gray-950">빠른 검색 추천</div>
        <div className="w-full grid grid-cols-3 gap-[12px]">
          {quickSearchButtons.map((button) => (
            <QuickSearchButton
              key={button.id}
              title={button.title}
              subtitle={button.subtitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
