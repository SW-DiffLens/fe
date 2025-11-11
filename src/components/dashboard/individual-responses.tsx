import MyPageIcon from "@/assets/icons/ic_mypage";
import Pagenation from "@/components/dashboard/pagenation";
import type { DashboardPanel } from "@/types/dashboard_panel";

interface IndividualResponsesProps {
  data: DashboardPanel | undefined;
  page: number;
  setPage: (page: number) => void;
  onPanelClick: (panelId: string, concordanceRate: string) => void;
}

export default function IndividualResponses({
  data,
  page,
  setPage,
  onPanelClick,
}: IndividualResponsesProps) {
  return (
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
                onPanelClick(item.respondent_id, item.concordance_rate)
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
  );
}
