import { useEffect, useState } from "react";
import { getLibraries } from "@/api/library";
import BarChartIcon from "@/assets/icons/ic_bar_chart";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import TrashIcon from "@/assets/icons/ic_trash";
import Button from "@/components/button";
import Card from "@/components/library/card";
import DropdownFilter from "@/components/library/dropdown-filter";
import Modal from "@/components/modal";
import type { Library } from "@/types/library";

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
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // 라이브러리 목록 조회
  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setIsLoading(true);
        const response = await getLibraries();
        if (response.is_success) {
          setLibraries(response.result.libraries);
        }
      } catch (error) {
        console.error("Failed to fetch libraries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibraries();
  }, []);

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

  const handleDelete = () => {
    console.log("삭제할 항목:", selectedCards);
    setSelectedCards([]);
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
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          title="항목 삭제"
          description="선택된 항목을 삭제하시겠습니까?"
          type="delete"
          onDelete={handleDelete}
        />
      )}
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
          저장된 분석 항목 ({isLoading ? "..." : libraries.length}개)
        </div>
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-[100px] text-gray-500">
            로딩 중...
          </div>
        ) : libraries.length === 0 ? (
          <div className="flex w-full items-center justify-center py-[100px] text-gray-500">
            저장된 라이브러리가 없습니다.
          </div>
        ) : (
          <div className="grid w-full grid-cols-2 gap-x-[32px] gap-y-[40px] px-[76.5px]">
            {libraries.map((library) => (
              <Card
                key={library.library_id}
                id={library.library_id}
                title={library.library_name}
                description={`패널 수: ${library.panel_count}개`}
                tags={library.tags}
                filters={[
                  `생성일: ${new Date(library.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, "/").replace(".", "")}`,
                ]}
                onSelect={handleCardSelect}
                onDeselect={handleCardDeselect}
                selectedCards={selectedCards}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
