import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiClient from "@/api/client";
import { getLibraryById } from "@/api/library";
import PlusIcon from "@/assets/icons/ic_plus";
import ColumnChartComponent from "@/components/dashboard/column-chart";
import IndividualResponses from "@/components/dashboard/individual-responses";
import LineChartComponent from "@/components/dashboard/line-chart";
import PieChartComponent from "@/components/dashboard/pie-chart";
import SearchBar from "@/components/search-bar";
import { useDashboard } from "@/contexts/DashboardContext";
import type { DashboardPanel } from "@/types/dashboard_panel";
import type { DashboardResult } from "@/types/dashboard_result";
import type { LibraryDetailResponse } from "@/types/library";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [mode, setMode] = useState("profile");
  const [data, setData] = useState<DashboardPanel>();
  const [page, setPage] = useState(1);
  const { setDashboardData } = useDashboard();
  const [libraryData, setLibraryData] = useState<LibraryDetailResponse | null>(
    null
  );

  // URL 경로로 라이브러리인지 검색 결과인지 판단
  const isLibrary = location.pathname.includes("/library/");
  const libraryId = isLibrary ? Number(params.id) : null;

  // location.state가 있으면 검색 결과, 없으면 라이브러리
  const stateData = location.state as DashboardResult | null;
  const { result, search_id, question } = stateData || {
    result: null,
    search_id: null,
    question: "",
  };

  const handleMode = (mode: string) => {
    setMode(mode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLibrary && libraryId) {
          // 라이브러리 데이터 로드
          const response = await getLibraryById(libraryId);
          if (response.is_success) {
            setLibraryData(response.result);

            // 라이브러리 패널 데이터를 DashboardPanel 형식으로 변환
            const panelData = response.result.panels || [];
            const startIndex = (page - 1) * 5;
            const endIndex = startIndex + 5;
            const paginatedPanels = panelData.slice(startIndex, endIndex);

            const transformedData: DashboardPanel = {
              keys: ["gender"],
              values: paginatedPanels.map((panel) => ({
                respondent_id: panel.panel_id,
                gender: panel.gender,
                age: String(panel.age),
                residence: panel.residence || "-",
                personal_income: "-", // 라이브러리 데이터에는 소득 정보가 없음
                concordance_rate: "-", // 라이브러리에는 일치율이 없음
              })) as any,
              page_info: {
                offset: (page - 1) * 5,
                limit: 5,
                current_page: page,
                current_page_count: paginatedPanels.length,
                total_page_count: Math.ceil(panelData.length / 5),
                total_count: panelData.length,
                has_next: endIndex < panelData.length,
                has_previous: page > 1,
              },
            };
            setData(transformedData);
          }
        } else if (search_id) {
          // 검색 결과 데이터 로드
          const response = await apiClient.get(
            `/search/${search_id}/each-responses`,
            {
              params: {
                page,
                size: 5,
              },
            }
          );
          const resultData = response.data.result;
          setData(resultData);

          // Context에 dashboard 데이터 설정
          if (resultData?.page_info?.total_count) {
            setDashboardData(search_id, resultData.page_info.total_count);
          }
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setData(undefined);
        setLibraryData(null);
      }
    };
    fetchData();
  }, [search_id, page, setDashboardData, isLibrary, libraryId]);

  const handlePanelClick = (panelId: string, concordanceRate: string) => {
    navigate(`/panel/${panelId}`, {
      state: {
        question,
        concordanceRate,
      },
    });
  };

  // console.log(data);
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 pt-[40px] pb-[80px]">
      <div className="flex w-full max-w-[1280px] flex-col gap-[40px]">
        {/* 상단 영역 */}
        <div className="grid w-full grid-cols-[54%_1fr] items-stretch gap-[20px]">
          {/* 왼쪽 */}
          <div className="flex h-full w-full flex-col items-start justify-between rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
            <div className="flex w-full flex-col items-center justify-center gap-[48px]">
              <div className="w-full text-start text-gray-950 text-h4">
                {isLibrary ? libraryData?.library_name : question}
              </div>
              {result?.pie && (
                <PieChartComponent
                  data={result.pie.data_points}
                  title={result.pie.title}
                />
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-[16px]">
              <div className="w-full text-center text-caption text-gray-700">
                {isLibrary ? (
                  <>
                    패널 수: {libraryData?.panel_count}명 / 생성일:{" "}
                    {libraryData?.created_at
                      ? new Date(libraryData.created_at).toLocaleDateString(
                          "ko-KR"
                        )
                      : "-"}
                  </>
                ) : (
                  <>
                    표본 수: {result?.summary?.total_respondents}명 / 데이터
                    수집일: {result?.summary?.data_capture_date} / 신뢰도:{" "}
                    {result?.summary?.confidence_level || "-"}%
                  </>
                )}
              </div>
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="flex h-full w-full flex-col items-start justify-center gap-[28px]">
            {!isLibrary && (
              <div className="flex w-full flex-col items-start justify-center gap-[16px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
                <div className="w-full text-start text-gray-950 text-h5">
                  검색 결과 내 재검색
                </div>
                <SearchBar
                  placeholder={question}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            )}
            <div className="flex w-full flex-col items-start justify-center gap-[16px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
              <div className="w-full text-start text-gray-950 text-h5">
                {isLibrary ? "라이브러리 태그" : "검색 조건 및 필터"}
              </div>
              {isLibrary
                ? libraryData?.tags?.map((tag, index) => {
                    const colorClass =
                      index % 3 === 0
                        ? "text-primary-700 bg-primary-100"
                        : index % 3 === 1
                          ? "text-secondary-700 bg-secondary-100"
                          : "text-tertiary-700 bg-tertiary-100";

                    return (
                      <div
                        key={`${tag}-${index}`}
                        className={`text-body3 ${colorClass} w-full rounded-lg px-[20px] py-[8px] text-start`}
                      >
                        {tag}
                      </div>
                    );
                  })
                : result?.applied_filters_summary?.map(
                    (
                      filter: { key: string; display_value: string },
                      index: number
                    ) => {
                      const colorClass =
                        index % 3 === 0
                          ? "text-primary-700 bg-primary-100"
                          : index % 3 === 1
                            ? "text-secondary-700 bg-secondary-100"
                            : "text-tertiary-700 bg-tertiary-100";

                      return (
                        <div
                          key={`${filter.key}-${index}`}
                          className={`text-body3 ${colorClass} w-full rounded-lg px-[20px] py-[8px] text-start`}
                        >
                          {filter.key}: {filter.display_value}
                        </div>
                      );
                    }
                  )}
              {!isLibrary && (
                <div className="flex w-full cursor-pointer items-center justify-center gap-[8px] rounded-lg bg-gray-200 px-[20px] py-[12px] text-body3 text-gray-950">
                  <PlusIcon color="black" width={20} height={21} />
                  조건 추가
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 중간 영역 */}
        <div className="flex w-full flex-col items-start justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="w-full text-start text-gray-950 text-h4">
            상세 분석 및 교차 탐색
          </div>
          <div className="flex w-full items-center justify-start gap-[20px] border-gray-500 border-b-[0.5px]">
            <div
              className={`text-body5 ${
                mode === "profile"
                  ? "border-tertiary-500 border-b text-tertiary-500"
                  : "text-gray-700"
              } cursor-pointer py-[5px]`}
              onClick={() => handleMode("profile")}
            >
              응답자 전체 프로필
            </div>
            <div
              className={`text-body5 ${
                mode === "history"
                  ? "border-tertiary-500 border-b text-tertiary-500"
                  : "text-gray-700"
              } cursor-pointer py-[5px]`}
              onClick={() => handleMode("history")}
            >
              교차 분석 도구
            </div>
          </div>
          <div className="grid w-full auto-cols-[480px] grid-flow-col items-start justify-start gap-[36px] overflow-x-auto">
            {result?.charts?.map((chart, index) => {
              if (chart.chart_type === "BAR") {
                return (
                  <div key={chart.chart_id || index} className="w-[480px]">
                    <ColumnChartComponent
                      data={chart.data_points}
                      title={chart.title}
                      xAxisTitle={chart.x_axis || chart.xaxis}
                      yAxisTitle={chart.y_axis || chart.yaxis}
                    />
                  </div>
                );
              }
              if (chart.chart_type === "LINE") {
                return (
                  <div key={chart.chart_id || index} className="w-[480px]">
                    <LineChartComponent
                      data={chart.data_points}
                      title={chart.title}
                      xAxisTitle={chart.x_axis || chart.xaxis}
                      yAxisTitle={chart.y_axis || chart.yaxis}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        {/* 하단 영역 */}
        <IndividualResponses
          data={data}
          page={page}
          setPage={setPage}
          onPanelClick={handlePanelClick}
          searchId={isLibrary ? String(libraryId) : search_id || ""}
          question={isLibrary ? libraryData?.library_name || "" : question}
        />
      </div>
    </div>
  );
}
