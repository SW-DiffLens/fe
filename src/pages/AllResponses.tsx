import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import MyPageIcon from "@/assets/icons/ic_mypage";
import Pagenation from "@/components/dashboard/pagenation";
import type { DashboardPanel } from "@/types/dashboard_panel";

export default function AllResponses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardPanel>();
  const [page, setPage] = useState(1);

  const { search_id, question } = location.state as {
    search_id: string;
    question: string;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/search/${search_id}/each-responses`,
          {
            params: {
              page,
              size: 20,
            },
          }
        );
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-[40px] px-[80px] pt-[40px] pb-[80px]">
      {/* 상단 헤더 */}
      <div className="flex w-full items-center justify-start gap-[16px]">
        <button
          type="button"
          onClick={handleGoBack}
          className="flex cursor-pointer items-center justify-center rounded-lg p-[8px] hover:bg-gray-100"
        >
          <ChevronLeftIcon width={24} height={24} />
        </button>
        <div className="text-gray-950 text-h5">개별 응답 데이터 전체보기</div>
      </div>

      {/* 검색 질문 */}
      <div className="w-full rounded-2xl bg-opacity-500 px-[40px] py-[24px]">
        <div className="text-body3 text-gray-700">검색 질문</div>
        <div className="mt-[8px] text-gray-950 text-h5">{question}</div>
      </div>

      {/* 데이터 테이블 */}
      <div className="flex w-full flex-col items-center justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
        <div className="flex w-full items-center justify-between">
          <div className="text-gray-950 text-h5">
            전체 응답 데이터 ({data?.page_info?.total_count || 0}명)
          </div>
        </div>
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="h-12 border border-gray-300 bg-primary-200 text-black text-subtitle1">
              <th className="w-[220px] px-3">응답자ID</th>
              <th className="px-3">성별</th>
              <th className="px-3">나이</th>
              <th className="px-3">거주지</th>
              <th className="px-3">월소득</th>
              <th className="px-3">일치율</th>
            </tr>
          </thead>
          <tbody>
            {data?.values.map((item) => (
              <tr
                key={item.respondent_id}
                className="h-12 cursor-pointer border border-gray-300 bg-white text-body4 text-gray-950 hover:bg-gray-50"
                onClick={() =>
                  handlePanelClick(item.respondent_id, item.concordance_rate)
                }
              >
                <td className="px-3 align-middle">
                  <div className="flex items-center justify-center gap-[8px]">
                    <MyPageIcon width={32} height={32} />
                    <div className="text-primary-900 text-subtitle2">
                      {item.respondent_id}
                    </div>
                  </div>
                </td>
                <td className="px-3">{item.gender}</td>
                <td className="px-3">{item.age}</td>
                <td className="px-3">{item.residence}</td>
                <td className="px-3">{item.personal_income}</td>
                <td className="px-3">{item.concordance_rate}%</td>
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
