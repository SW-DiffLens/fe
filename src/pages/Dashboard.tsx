import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import MyPageIcon from "@/assets/icons/ic_mypage";
import PlusIcon from "@/assets/icons/ic_plus";
import BarChart from "@/assets/temp/bar_chart.png";
import ChartCaption from "@/assets/temp/chart_caption.png";
import LineChart from "@/assets/temp/line_chart.png";
import PieChart from "@/assets/temp/pie_chart.png";
import Pagenation from "@/components/dashboard/pagenation";
import SearchBar from "@/components/search-bar";
import type { DashboardPanel } from "@/types/dashboard_panel";
import type { DashboardResult } from "@/types/dashboard_result";

// const data = [
//   {
//     id: "w100010279508856",
//     gender: "남성",
//     age: 22,
//     address: "서울",
//     income: "250만원",
//     matchingRate: "98.12%",
//   },
//   {
//     id: "w100010279508856",
//     gender: "남성",
//     age: 22,
//     address: "서울",
//     income: "250만원",
//     matchingRate: "98.12%",
//   },
//   {
//     id: "w100010279508856",
//     gender: "남성",
//     age: 22,
//     address: "서울",
//     income: "250만원",
//     matchingRate: "98.12%",
//   },
//   {
//     id: "w100010279508856",
//     gender: "남성",
//     age: 22,
//     address: "서울",
//     income: "250만원",
//     matchingRate: "98.12%",
//   },
//   {
//     id: "w100010279508856",
//     gender: "남성",
//     age: 22,
//     address: "서울",
//     income: "250만원",
//     matchingRate: "98.12%",
//   },
// ];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [mode, setMode] = useState("profile");
  const [data, setData] = useState<DashboardPanel>();
  const [page, setPage] = useState(1);

  const { result, search_id, question } = location.state as DashboardResult;

  const handleMode = (mode: string) => {
    setMode(mode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/search/${search_id}/each-responses`,
          {
            params: {
              page,
              size: 5,
            },
          }
        );
        // result가 배열인지 확인하고, 아니면 빈 배열로 설정
        const resultData = response.data.result;
        setData(resultData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setData(undefined);
      }
    };
    fetchData();
  }, [search_id, page]);

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
    <div className="flex min-h-screen flex-col items-center justify-start gap-[40px] px-[80px] pt-[40px] pb-[80px]">
      {/* 상단 영역 */}
      <div className="grid w-full grid-cols-[54%_1fr] items-stretch gap-[20px]">
        {/* 왼쪽 */}
        <div className="flex h-full w-full flex-col items-start justify-between rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="flex w-full flex-col items-center justify-center gap-[48px]">
            <div className="w-full text-start text-gray-950 text-h4">
              {question}
            </div>
            <img
              src={PieChart}
              alt="Pie Chart"
              className="h-[190px] w-[190px]"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-[16px]">
            <img src={ChartCaption} alt="Chart Caption" className="w-full" />
            <div className="w-full text-center text-caption text-gray-700">
              표본 수: {result.summary.total_respondents}명 / 데이터 수집일:{" "}
              {result.summary.data_capture_date} / 신뢰도:{" "}
              {result.summary.confidence_level || "-"}%
            </div>
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex h-full w-full flex-col items-start justify-center gap-[28px]">
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
          <div className="flex w-full flex-col items-start justify-center gap-[16px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
            <div className="w-full text-start text-gray-950 text-h5">
              검색 조건 및 필터
            </div>
            {result.applied_filters_summary?.map(
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
            <div className="flex w-full cursor-pointer items-center justify-center gap-[8px] rounded-lg bg-gray-200 px-[20px] py-[12px] text-body3 text-gray-950">
              <PlusIcon color="black" width={20} height={21} />
              조건 추가
            </div>
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
        <div className="grid w-full grid-cols-[480px_480px_1fr] items-center justify-center gap-[36px]">
          <img src={BarChart} alt="Bar Chart" className="h-[300px] w-[480px]" />
          <img
            src={LineChart}
            alt="Line Chart"
            className="h-[300px] w-[480px]"
          />
          {/* <div className="font-medium text-xl text-tertiary-500 tracking-[-0.03em] cursor-pointer text-center w-full h-full rounded-lg flex items-center justify-center border border-dashed border-tertiary-500">
            +<br />
            정보 추가
          </div> */}
        </div>
      </div>
      {/* 하단 영역 */}
      <div className="flex w-full flex-col items-center justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
        <div className="w-full text-start text-gray-950 text-h4">
          개별 응답 데이터
        </div>
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="h-[48px] border border-gray-300 bg-primary-200 text-black text-subtitle1">
              <th className="w-[220px] px-[12px]">응답자ID</th>
              <th className="px-[12px]">성별</th>
              <th className="px-[12px]">나이</th>
              <th className="px-[12px]">거주지</th>
              <th className="px-[12px]">월소득</th>
              <th className="px-[12px]">일치율</th>
            </tr>
          </thead>
          <tbody>
            {data?.values.map((item) => (
              <tr
                key={item.respondent_id}
                className="h-[48px] border border-gray-300 bg-white text-body4 text-gray-950"
                onClick={() =>
                  handlePanelClick(item.respondent_id, item.concordance_rate)
                }
              >
                <td className="px-[12px] align-middle">
                  <div className="flex items-center justify-center gap-[8px]">
                    <MyPageIcon width={32} height={32} />
                    <div className="text-primary-900 text-subtitle2">
                      {item.respondent_id}
                    </div>
                  </div>
                </td>
                <td className="px-[12px]">{item.gender}</td>
                <td className="px-[12px]">{item.age}</td>
                <td className="px-[12px]">{item.residence}</td>
                <td className="px-[12px]">{item.personal_income}</td>
                <td className="px-[12px]">{item.concordance_rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagenation
          page={page}
          setPage={setPage}
          totalPages={data?.page_info?.total_page_count || 1}
          hasNext={data?.page_info?.has_next || false}
        />
      </div>
    </div>
  );
}
