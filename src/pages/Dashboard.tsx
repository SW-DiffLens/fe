import PieChart from "@/assets/temp/pie_chart.png";
import BarChart from "@/assets/temp/bar_chart.png";
import LineChart from "@/assets/temp/line_chart.png";
import ChartCaption from "@/assets/temp/chart_caption.png";
import MyPageIcon from "@/assets/icons/ic_mypage";
import PlusIcon from "@/assets/icons/ic_plus";
import SearchBar from "@/components/search-bar";
import Pagenation from "@/components/dashboard/pagenation";

import type { DashboardResult } from "@/types/dashboard_result";
import type { DashboardPanel } from "@/types/dashboard_panel";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import apiClient from "@/api/client";

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
    <div className="flex flex-col items-center justify-start min-h-screen pt-[40px] px-[80px] pb-[80px] gap-[40px]">
      {/* 상단 영역 */}
      <div className="w-full grid grid-cols-[54%_1fr] items-stretch gap-[20px]">
        {/* 왼쪽 */}
        <div className="flex flex-col items-start justify-between w-full bg-opacity-500 rounded-2xl py-[32px] px-[40px] h-full">
          <div className="w-full flex flex-col items-center justify-center gap-[48px]">
            <div className="text-h4 text-gray-950 w-full text-start">
              {question}
            </div>
            <img
              src={PieChart}
              alt="Pie Chart"
              className="w-[190px] h-[190px]"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-[16px]">
            <img src={ChartCaption} alt="Chart Caption" className="w-full" />
            <div className="w-full text-center text-caption text-gray-700">
              표본 수: {result.summary.total_respondents}명 / 데이터 수집일:{" "}
              {result.summary.data_capture_date} / 신뢰도:{" "}
              {result.summary.confidence_level || "-"}%
            </div>
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex flex-col items-start justify-center w-full gap-[28px] h-full">
          <div className="w-full flex flex-col items-start justify-center bg-opacity-500 rounded-2xl py-[32px] px-[40px] gap-[16px]">
            <div className="text-h5 text-gray-950 w-full text-start">
              검색 결과 내 재검색
            </div>
            <SearchBar
              placeholder={question}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center bg-opacity-500 rounded-2xl py-[32px] px-[40px] gap-[16px]">
            <div className="text-h5 text-gray-950 w-full text-start">
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
                    className={`text-body3 ${colorClass} w-full text-start rounded-lg py-[8px] px-[20px]`}
                  >
                    {filter.key}: {filter.display_value}
                  </div>
                );
              }
            )}
            <div className="w-full flex items-center justify-center gap-[8px] py-[12px] px-[20px] bg-gray-200 rounded-lg text-body3 text-gray-950 cursor-pointer">
              <PlusIcon color="black" width={20} height={21} />
              조건 추가
            </div>
          </div>
        </div>
      </div>
      {/* 중간 영역 */}
      <div className="flex flex-col items-start justify-center gap-[20px] w-full bg-opacity-500 rounded-2xl py-[32px] px-[40px]">
        <div className="text-h4 text-gray-950 w-full text-start">
          상세 분석 및 교차 탐색
        </div>
        <div className="flex items-center justify-start w-full gap-[20px] border-b-[0.5px] border-gray-500">
          <div
            className={`text-body5 ${
              mode === "profile"
                ? "text-tertiary-500 border-b border-tertiary-500"
                : "text-gray-700"
            } py-[5px] cursor-pointer`}
            onClick={() => handleMode("profile")}
          >
            응답자 전체 프로필
          </div>
          <div
            className={`text-body5 ${
              mode === "history"
                ? "text-tertiary-500 border-b border-tertiary-500"
                : "text-gray-700"
            } py-[5px] cursor-pointer`}
            onClick={() => handleMode("history")}
          >
            교차 분석 도구
          </div>
        </div>
        <div className="grid grid-cols-[480px_480px_1fr] items-center justify-center w-full gap-[36px]">
          <img src={BarChart} alt="Bar Chart" className="w-[480px] h-[300px]" />
          <img
            src={LineChart}
            alt="Line Chart"
            className="w-[480px] h-[300px]"
          />
          {/* <div className="font-medium text-xl text-tertiary-500 tracking-[-0.03em] cursor-pointer text-center w-full h-full rounded-lg flex items-center justify-center border border-dashed border-tertiary-500">
            +<br />
            정보 추가
          </div> */}
        </div>
      </div>
      {/* 하단 영역 */}
      <div className="w-full flex flex-col items-center justify-center gap-[20px] bg-opacity-500 rounded-2xl py-[32px] px-[40px]">
        <div className="text-h4 text-gray-950 w-full text-start">
          개별 응답 데이터
        </div>
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="text-subtitle1 text-black bg-primary-200 h-[48px] border border-gray-300">
              <th className="px-[12px] w-[220px]">응답자ID</th>
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
                className="text-body4 text-gray-950 bg-white h-[48px] border border-gray-300"
                onClick={() =>
                  handlePanelClick(item.respondent_id, item.concordance_rate)
                }
              >
                <td className="px-[12px] align-middle">
                  <div className="flex items-center justify-center gap-[8px]">
                    <MyPageIcon width={32} height={32} />
                    <div className="text-subtitle2 text-primary-900">
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
