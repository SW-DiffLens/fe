import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLibraryById } from "@/api/library";
import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import Button from "@/components/button";
import ColumnChartComponent from "@/components/dashboard/column-chart";
import DonutChartComponent from "@/components/dashboard/donut-chart";
import IndividualResponses from "@/components/dashboard/individual-responses";
import MapChartComponent from "@/components/dashboard/map-chart";
import type { DashboardPanel } from "@/types/dashboard_panel";
import { aggregateRegionDistribution } from "@/utils/region-parser";

export default function LibraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([
    "gender",
    "ageGroup",
  ]);
  const [isChartSelectorOpen, setIsChartSelectorOpen] = useState(false);

  const { data: libraryData, isLoading } = useQuery({
    queryKey: ["library", id],
    queryFn: async () => {
      if (!id) throw new Error("Library ID is required");
      const response = await getLibraryById(Number(id));
      if (response.is_success) {
        return response.result;
      }
      throw new Error("Failed to fetch library");
    },
    enabled: !!id,
  });

  // 패널 데이터를 페이지네이션하여 IndividualResponses에 전달
  const getPaginatedPanelData = (): DashboardPanel | undefined => {
    if (!libraryData?.panels) return undefined;

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedPanels = libraryData.panels.slice(startIndex, endIndex);

    return {
      keys: ["gender"],
      values: paginatedPanels.map((panel) => ({
        respondent_id: panel.panel_id,
        gender: panel.gender,
        age: String(panel.age),
        residence: panel.residence || "-",
        personal_income: "-",
        concordance_rate: "-",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any,
      page_info: {
        offset: (page - 1) * 10,
        limit: 10,
        current_page: page,
        current_page_count: paginatedPanels.length,
        total_page_count: Math.ceil(libraryData.panels.length / 10),
        total_count: libraryData.panels.length,
        has_next: endIndex < libraryData.panels.length,
        has_previous: page > 1,
      },
    };
  };

  const handlePanelClick = (panelId: string) => {
    navigate(`/panel/${panelId}`, {
      state: {
        question: libraryData?.library_name || "",
        concordanceRate: "-",
      },
    });
  };

  // 데이터 분석 및 차트 데이터 생성
  const getChartData = () => {
    if (!libraryData?.panels) return null;

    const panels = libraryData.panels;

    // 1. 성별 분포
    const genderDistribution = panels.reduce(
      (acc, panel) => {
        const gender =
          panel.gender === "MALE"
            ? "남성"
            : panel.gender === "FEMALE"
              ? "여성"
              : "기타";
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // 2. 연령대 분포
    const ageGroupDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.age_group) {
          acc[panel.age_group] = (acc[panel.age_group] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 3. 연령 분포 (5세 단위)
    const ageRangeDistribution = panels.reduce(
      (acc, panel) => {
        const ageRange = `${Math.floor(panel.age / 5) * 5}-${Math.floor(panel.age / 5) * 5 + 4}세`;
        acc[ageRange] = (acc[ageRange] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // 4. 지역 분포 (profile_summary에서 추출)
    const regionChartData = aggregateRegionDistribution(panels);

    // 5. 혼인 상태 분포
    const maritalStatusDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.marital_status) {
          acc[panel.marital_status] = (acc[panel.marital_status] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 6. 직업 분포 (상위 10개)
    const occupationDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.occupation) {
          // 괄호 앞부분만 추출
          const occupation = panel.occupation.split("(")[0].trim();
          acc[occupation] = (acc[occupation] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 7. 자녀 수 분포
    const childrenCountDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.children_count !== null) {
          const count = `${panel.children_count}명`;
          acc[count] = (acc[count] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 객체를 배열로 변환하고 정렬
    const toChartData = (
      distribution: Record<string, number>,
      limit?: number
    ) => {
      const sorted = Object.entries(distribution)
        .map(([category, value]) => ({ category, value }))
        .sort((a, b) => b.value - a.value);

      if (limit && sorted.length > limit) {
        const top = sorted.slice(0, limit);
        const othersValue = sorted
          .slice(limit)
          .reduce((sum, item) => sum + item.value, 0);
        if (othersValue > 0) {
          top.push({ category: "기타", value: othersValue });
        }
        return top;
      }

      return sorted;
    };

    const toColumnData = (
      distribution: Record<string, number>,
      limit?: number
    ) => {
      return toChartData(distribution, limit).map((item) => ({
        label: item.category,
        value: item.value,
      }));
    };

    return {
      gender: toChartData(genderDistribution),
      ageGroup: toChartData(ageGroupDistribution),
      ageRange: toColumnData(ageRangeDistribution),
      region: regionChartData,
      maritalStatus: toChartData(maritalStatusDistribution),
      occupation: toColumnData(occupationDistribution, 10),
      childrenCount: toColumnData(childrenCountDistribution),
    };
  };

  const chartData = getChartData();

  // 선택 가능한 차트 목록
  const availableCharts = [
    {
      id: "gender",
      label: "성별 분포",
      available: chartData?.gender && chartData.gender.length > 0,
    },
    {
      id: "ageGroup",
      label: "연령대 분포",
      available: chartData?.ageGroup && chartData.ageGroup.length > 0,
    },
    {
      id: "ageRange",
      label: "연령 분포",
      available: chartData?.ageRange && chartData.ageRange.length > 0,
    },
    {
      id: "region",
      label: "지역 분포",
      available: chartData?.region && chartData.region.length > 0,
    },
    {
      id: "maritalStatus",
      label: "혼인 상태 분포",
      available: chartData?.maritalStatus && chartData.maritalStatus.length > 0,
    },
    {
      id: "occupation",
      label: "직업 분포",
      available: chartData?.occupation && chartData.occupation.length > 0,
    },
    {
      id: "childrenCount",
      label: "자녀 수 분포",
      available: chartData?.childrenCount && chartData.childrenCount.length > 0,
    },
  ].filter((chart) => chart.available);

  const toggleChart = (chartId: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chartId)
        ? prev.filter((id) => id !== chartId)
        : [...prev, chartId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!libraryData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">라이브러리를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 pt-[40px] pb-[80px]">
      <div className="flex w-full max-w-[1280px] flex-col gap-[40px]">
        {/* 뒤로가기 버튼 */}
        <div className="flex w-full items-center justify-start">
          <Button
            variant="icon"
            size="small"
            onClick={() => navigate("/home/library")}
          >
            <ChevronLeftIcon color="white" width={20} height={20} />
            <span>목록으로</span>
          </Button>
        </div>

        {/* 상단 영역 - 라이브러리 정보 */}
        <div className="flex w-full flex-col items-start justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="w-full text-start text-gray-950 text-h4">
            {libraryData.library_name}
          </div>
          <div className="flex w-full flex-wrap items-center justify-start gap-[12px]">
            {libraryData.tags?.map((tag, index) => {
              const colorClass =
                index % 3 === 0
                  ? "text-primary-700 bg-primary-100"
                  : index % 3 === 1
                    ? "text-secondary-700 bg-secondary-100"
                    : "text-tertiary-700 bg-tertiary-100";

              return (
                <div
                  key={`${tag}-${index}`}
                  className={`text-body3 ${colorClass} rounded-lg px-[20px] py-[8px]`}
                >
                  {tag}
                </div>
              );
            })}
          </div>
          <div className="w-full text-center text-caption text-gray-700">
            패널 수: {libraryData.panel_count}명 / 생성일:{" "}
            {new Date(libraryData.created_at).toLocaleDateString("ko-KR")} /
            수정일:{" "}
            {new Date(libraryData.updated_at).toLocaleDateString("ko-KR")}
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="flex w-full flex-col items-start justify-center gap-[32px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="flex w-full items-center justify-between">
            <div className="text-gray-950 text-h4">패널 분석</div>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setIsChartSelectorOpen(!isChartSelectorOpen)}
            >
              {isChartSelectorOpen ? "차트 선택 닫기" : "더 많은 분석 보기"}
            </Button>
          </div>

          {/* 차트 선택 UI */}
          {isChartSelectorOpen && (
            <div className="flex w-full flex-wrap items-center justify-start gap-[12px] rounded-lg bg-white/30 px-[24px] py-[20px]">
              {availableCharts.map((chart) => (
                <label
                  key={chart.id}
                  className="flex cursor-pointer items-center gap-[8px] rounded-lg bg-white px-[16px] py-[10px] transition-colors hover:bg-primary-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedCharts.includes(chart.id)}
                    onChange={() => toggleChart(chart.id)}
                    className="h-4 w-4 cursor-pointer accent-primary-700"
                  />
                  <span className="text-body3 text-gray-900">
                    {chart.label}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* 동적 차트 렌더링 */}
          <div className="grid w-full grid-cols-2 gap-[32px]">
            {selectedCharts.includes("gender") &&
              chartData?.gender &&
              chartData.gender.length > 0 && (
                <div className="flex min-h-[450px] items-start justify-center">
                  <DonutChartComponent
                    data={chartData.gender}
                    title="성별 분포"
                    reasoning="패널의 성별 분포를 보여줍니다."
                  />
                </div>
              )}
            {selectedCharts.includes("ageGroup") &&
              chartData?.ageGroup &&
              chartData.ageGroup.length > 0 && (
                <div className="flex min-h-[450px] items-start justify-center">
                  <DonutChartComponent
                    data={chartData.ageGroup}
                    title="연령대 분포"
                    reasoning="패널의 연령대별 분포를 보여줍니다."
                  />
                </div>
              )}
            {selectedCharts.includes("ageRange") &&
              chartData?.ageRange &&
              chartData.ageRange.length > 0 && (
                <div className="flex min-h-[450px] items-start justify-center">
                  <ColumnChartComponent
                    data={chartData.ageRange}
                    title="연령 분포"
                    reasoning="패널의 세부 연령 분포를 5세 단위로 보여줍니다."
                  />
                </div>
              )}
            {selectedCharts.includes("region") &&
              chartData?.region &&
              chartData.region.length > 0 && (
                <div className="flex min-h-[500px] items-start justify-center">
                  <MapChartComponent
                    data={chartData.region}
                    title="지역 분포"
                    reasoning="패널의 거주 지역 분포를 지도로 보여줍니다."
                  />
                </div>
              )}
            {selectedCharts.includes("maritalStatus") &&
              chartData?.maritalStatus &&
              chartData.maritalStatus.length > 0 && (
                <div className="flex min-h-[450px] items-start justify-center">
                  <DonutChartComponent
                    data={chartData.maritalStatus}
                    title="혼인 상태 분포"
                    reasoning="패널의 혼인 상태 분포를 보여줍니다."
                  />
                </div>
              )}
            {selectedCharts.includes("occupation") &&
              chartData?.occupation &&
              chartData.occupation.length > 0 && (
                <div className="flex min-h-[450px] items-start justify-center">
                  <ColumnChartComponent
                    data={chartData.occupation}
                    title="직업 분포 (상위 10개)"
                    reasoning="패널의 직업 분포를 보여줍니다."
                  />
                </div>
              )}
            {selectedCharts.includes("childrenCount") &&
              chartData?.childrenCount &&
              chartData.childrenCount.length > 0 && (
                <div className="flex min-h-[450px] items-start justify-center">
                  <ColumnChartComponent
                    data={chartData.childrenCount}
                    title="자녀 수 분포"
                    reasoning="패널의 자녀 수 분포를 보여줍니다."
                  />
                </div>
              )}
          </div>
        </div>

        {/* 하단 영역 - 개별 응답자 테이블 */}
        <IndividualResponses
          data={getPaginatedPanelData()}
          page={page}
          setPage={setPage}
          onPanelClick={handlePanelClick}
          searchId={String(id)}
          question={libraryData.library_name}
          isLibrary={true}
        />
      </div>
    </div>
  );
}
