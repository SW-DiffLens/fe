import Button from "@/components/button";
import FilterSection from "@/components/home/filter-section";
import { useState, useEffect } from "react";
import SearchBar from "@/components/search-bar";
import FilterIcon from "@/assets/icons/ic_filter";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import ChevronUpIcon from "@/assets/icons/ic_chevron_up";
import QuickSearchButton from "@/components/home/quick-search-button";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { filterSections } from "@/data/filter-sectioins";

import apiClient from "@/api/client";

interface QuickSearchButton {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickSearchButtons, setQuickSearchButtons] = useState<
    QuickSearchButton[]
  >([]);

  const [totalSelectedChips, setTotalSelectedChips] = useState(0);
  const [selectedFilterCodes, setSelectedFilterCodes] = useState<number[][]>(
    new Array(filterSections.length).fill(null).map(() => [])
  );
  const [resetTrigger, setResetTrigger] = useState(0);

  const [searchType, setSearchType] = useState("FLEXIBLE");
  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
  };

  useEffect(() => {
    const fetchQuickSearchButtons = async () => {
      try {
        const response = await apiClient.get("/search/recommended");
        setQuickSearchButtons(response.data.result.recommendations);
        console.log(response.data);
      } catch (error) {
        console.error("빠른 검색 추천 데이터 로드 실패:", error);
      }
    };

    fetchQuickSearchButtons();
  }, []);

  const handleSectionSelectionChange = (
    sectionIndex: number,
    selectedCodes: number[]
  ) => {
    const newCodes = [...selectedFilterCodes];
    newCodes[sectionIndex] = selectedCodes;
    setSelectedFilterCodes(newCodes);
    setTotalSelectedChips(
      newCodes.reduce((sum, codes) => sum + codes.length, 0)
    );
  };

  const resetFilter = () => {
    setSelectedFilterCodes(
      new Array(filterSections.length).fill(null).map(() => [])
    );
    setTotalSelectedChips(0);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSearch = async () => {
    try {
      // 모든 섹션의 선택된 code들을 하나의 배열로 합치기
      const allFilterCodes = selectedFilterCodes.flat();
      const response = await apiClient.post("/search", {
        question: searchValue,
        mode: searchType,
        filters: allFilterCodes,
      });
      navigate(`/dashboard/${response.data.result.search_id}`, {
        state: {
          result: response.data.result,
          search_id: response.data.result.search_id,
          question: searchValue,
        },
      });
    } catch (error) {
      console.error("검색 요청 실패:", error);
    }
  };

  const handleQuickSearch = async (button: QuickSearchButton) => {
    try {
      const response = await apiClient.post(`/search/recommended/${button.id}`);
      // console.log(response.data);
      navigate(`/dashboard/${response.data.result.search_id}`, {
        state: {
          result: response.data.result,
          search_id: response.data.result.search_id,
          question: button.title,
        },
      });
    } catch (error) {
      console.error("빠른 검색 요청 실패:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      // 캐시 만료 오류인지 확인
      const isExpiredError =
        axiosError.response?.data.message === "만료된 추천 검색어입니다.";

      if (isExpiredError) {
        // 만료된 경우 title을 사용해서 자연어 검색 API 호출
        try {
          const allFilterCodes = selectedFilterCodes.flat();
          const searchQuery = button.title;

          const response = await apiClient.post("/search", {
            question: searchQuery,
            mode: searchType || "FLEXIBLE",
            filters: allFilterCodes,
          });
          console.log(response.data);
        } catch (searchError) {
          console.error("자연어 검색 실패:", searchError);

          // 자연어 검색도 실패하면 추천 검색어 API 재호출
          try {
            const refreshResponse = await apiClient.get("/search/recommended");
            setQuickSearchButtons(refreshResponse.data.result.recommendations);
            console.log(refreshResponse.data);
          } catch (refreshError) {
            console.error("추천 검색어 갱신 실패:", refreshError);
          }
        }
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-[124px] px-[272px]">
      <div className="text-h2 text-primary-950 mb-[63px]">
        원하는 패널을 찾아보세요
      </div>
      {/* 검색 영역 */}
      <div className="w-full flex flex-col items-start justify-center py-[32px] px-[40px] gap-[24px] bg-opacity-500 rounded-2xl mb-[40px]">
        <div className="flex items-center justify-between w-full">
          <div className="text-subtitle1 text-gray-950">
            검색어를 입력하세요
          </div>
          <div className="flex items-center justify-center gap-[20px] w-fit">
            <div className="flex items-center justify-center gap-[4px]">
              <input
                type="radio"
                name="search-type"
                id="FLEXIBLE"
                value="FLEXIBLE"
                checked={searchType === "FLEXIBLE"}
                onChange={(e) => handleSearchTypeChange(e.target.value)}
              />
              <label
                htmlFor="FLEXIBLE"
                className={`text-subtitle1 ${
                  searchType === "FLEXIBLE" ? "text-black" : "text-gray-600"
                }`}
              >
                유연 모드
              </label>
            </div>
            <div className="flex items-center justify-center gap-[4px]">
              <input
                type="radio"
                name="search-type"
                id="STRICT"
                value="STRICT"
                checked={searchType === "STRICT"}
                onChange={(e) => handleSearchTypeChange(e.target.value)}
              />
              <label
                htmlFor="STRICT"
                className={`text-subtitle1 ${
                  searchType === "STRICT" ? "text-black" : "text-gray-600"
                }`}
              >
                엄격 모드
              </label>
            </div>
          </div>
        </div>
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
                  onSelectionChange={(selectedCodes) =>
                    handleSectionSelectionChange(index, selectedCodes)
                  }
                  reset={resetTrigger}
                  singleSelect={section.singleSelect}
                />
              ))}
            </div>
          </div>
        )}

        <Button variant="filled" size="large" fullWidth onClick={handleSearch}>
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
              subtitle={button.description}
              onClick={() => handleQuickSearch(button)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
