import { useState } from "react";
import BarChartIcon from "@/assets/icons/ic_bar_chart";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import TrashIcon from "@/assets/icons/ic_trash";
import Button from "@/components/button";
import Card from "@/components/library/card";
import DropdownFilter from "@/components/library/dropdown-filter";
import Modal from "@/components/modal";

const cards = [
  {
    id: 1,
    title: "20대 남성이 타는 차 브랜드 분포",
    description: "20대 남성 소비자의 자동차 브랜드 선호도 분석",
    tags: ["100명", "2025.10.26", "인구통계"],
    filters: ["성별: 남성", "연령: 20-29세", "차량보유: 있음"],
  },
  {
    id: 2,
    title: "30대 여성 화장품 구매 패턴",
    description: "30대 여성의 화장품 구매 행동 및 선호 브랜드 분석",
    tags: ["250명", "2025.10.26", "소비패턴"],
    filters: ["성별: 여성", "연령: 30-39세"],
  },
  {
    id: 3,
    title: "20대 남성이 타는 차 브랜드 분포",
    description: "20대 남성 소비자의 자동차 브랜드 선호도 분석",
    tags: ["100명", "2025.10.26", "인구통계"],
    filters: ["성별: 남성", "연령: 20-29세", "차량보유: 있음"],
  },
  {
    id: 4,
    title: "30대 여성 화장품 구매 패턴",
    description: "30대 여성의 화장품 구매 행동 및 선호 브랜드 분석",
    tags: ["250명", "2025.10.26", "소비패턴"],
    filters: ["성별: 여성", "연령: 30-39세"],
  },
  {
    id: 5,
    title: "20대 남성이 타는 차 브랜드 분포",
    description: "20대 남성 소비자의 자동차 브랜드 선호도 분석",
    tags: ["100명", "2025.10.26", "인구통계"],
    filters: ["성별: 남성", "연령: 20-29세", "차량보유: 있음"],
  },
  {
    id: 6,
    title: "30대 여성 화장품 구매 패턴",
    description: "30대 여성의 화장품 구매 행동 및 선호 브랜드 분석",
    tags: ["250명", "2025.10.26", "소비패턴"],
    filters: ["성별: 여성", "연령: 30-39세"],
  },
];

const filterOptions = [
  {
    id: 1,
    title: "모든 기간",
    options: ["모든 기간", "최근 7일", "최근 30일", "최근 3개월"],
  },
  {
    id: 2,
    title: "모든 유형",
    options: ["모든 유형", "인구통계", "소비패턴", "관심사"],
  },
  {
    id: 3,
    title: "날짜순",
    options: ["날짜순", "응답자수 순", "제목순", "최근 3개월"],
  },
];

export default function Library() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState<Record<number, boolean>>({});
  const [selectedFilters, setSelectedFilters] = useState<
    Record<number, string>
  >(
    filterOptions.reduce(
      (acc, filter) => {
        acc[filter.id] = filter.title;
        return acc;
      },
      {} as Record<number, string>
    )
  );

  const handleCardSelect = (id: number) => {
    setSelectedCards((prev) => [...prev, id]);
  };
  const handleCardDeselect = (id: number) => {
    setSelectedCards((prev) => prev.filter((card) => card !== id));
  };

  // 비교분석 disabled 처리
  const isCompareDisabled = selectedCards.length !== 2;
  const isDeleteDisabled = selectedCards.length < 1;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFilterToggle = (filterId: number) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  const handleFilterSelect = (filterId: number, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
    setOpenFilters((prev) => ({
      ...prev,
      [filterId]: false,
    }));
  };

  return (
    <>
      {isModalOpen && <Modal open={isModalOpen} onClose={handleModalClose} />}
      <div className="flex min-h-screen flex-col items-center justify-start gap-[40px] px-[193px] pt-[40px] pb-[80px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-[16px]">
            {filterOptions.map((filter) => (
              <div key={filter.id} className="relative">
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => handleFilterToggle(filter.id)}
                >
                  {selectedFilters[filter.id]}
                  <ChevronDownIcon color="black" width={14} height={14} />
                </Button>
                {openFilters[filter.id] && (
                  <DropdownFilter
                    options={filter.options}
                    open={openFilters[filter.id]}
                    setSelectedFilter={(value) =>
                      handleFilterSelect(filter.id, value)
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-[12px]">
            <div className="text-body5 text-gray-700">
              선택된 항목: {selectedCards.length}개
            </div>
            <Button
              variant="icon"
              size="small"
              disabled={isCompareDisabled}
              bgColor={isCompareDisabled ? "gray-300" : "success-ctr"}
              textColor={isCompareDisabled ? "gray-400" : "success-on-ctr"}
            >
              <BarChartIcon
                color={isCompareDisabled ? "#BDBDBD" : "#14632B"}
                width={14}
                height={14}
              />
              <div>비교분석</div>
            </Button>
            <Button
              variant="icon"
              size="small"
              disabled={isDeleteDisabled}
              bgColor={isDeleteDisabled ? "gray-300" : "error-ctr"}
              textColor={isDeleteDisabled ? "gray-400" : "error-on-ctr"}
              onClick={handleModalOpen}
            >
              <TrashIcon
                color={isDeleteDisabled ? "#BDBDBD" : "#8C1D18"}
                width={14}
                height={14}
              />
              <div>삭제</div>
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center justify-start px-[76.5px] text-gray-950 text-h5">
          저장된 분석 항목 (6개)
        </div>
        <div className="grid w-full grid-cols-2 gap-x-[32px] gap-y-[40px] px-[76.5px]">
          {cards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onSelect={handleCardSelect}
              onDeselect={handleCardDeselect}
              selectedCards={selectedCards}
            />
          ))}
        </div>
      </div>
    </>
  );
}
