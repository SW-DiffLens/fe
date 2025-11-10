import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiClient from "@/api/client";
import BeerIcon from "@/assets/icons/ic_beer";
import BriefcaseIcon from "@/assets/icons/ic_briefcase";
import BusinessIcon from "@/assets/icons/ic_business";
import CarIcon from "@/assets/icons/ic_car";
import CartIcon from "@/assets/icons/ic_cart";
import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import CommentIcon from "@/assets/icons/ic_comment";
import DevicesIcon from "@/assets/icons/ic_devices";
import GymIcon from "@/assets/icons/ic_gym";
import HomeIcon from "@/assets/icons/ic_home";
import MapPinIcon from "@/assets/icons/ic_mappin";
import MobileIcon from "@/assets/icons/ic_mobile";
import SmokeIcon from "@/assets/icons/ic_smoke";
import TagIcon from "@/assets/icons/ic_tag";
import TreeIcon from "@/assets/icons/ic_tree";
import TvIcon from "@/assets/icons/ic_tv";
import UserIcon from "@/assets/icons/ic_user";
import Chip from "@/components/chip";
import PercentageBar from "@/components/panel/percentage-bar";
import SurveyContainer from "@/components/panel/survey-container";
import TextWithIcon from "@/components/panel/text-with-icon";

// 아이콘 매핑 (변경되지 않는 상수이므로 컴포넌트 외부에 유지)
const categoryIcons: Record<string, React.ReactNode> = {
  라이프스타일: <HomeIcon width={20} height={20} />,
  건강생활: <GymIcon width={20} height={20} />,
  소비습관: <CartIcon width={20} height={20} />,
  디지털인식: <MobileIcon width={20} height={20} />,
  환경의식: <TreeIcon width={20} height={20} />,
};

export default function Panel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [panelData, setPanelData] = useState<Record<string, unknown> | null>(
    null
  );
  const location = useLocation();
  const { question = "", concordanceRate = 0 } = (location.state as {
    question?: string;
    concordanceRate?: number;
  }) || { question: "", concordanceRate: 0 };
  const [panelSummary, setPanelSummary] = useState<string | null>(null);
  const [mode, setMode] = useState("profile");

  const handleMode = (mode: string) => {
    setMode(mode);
  };

  // panelData를 기반으로 계산된 값들
  const panelProfile = useMemo(() => {
    if (!panelData) return null;

    const job = String(panelData["직업"] || "").split(" (")[0];

    return {
      panelId: `패널 ${panelData["panel_id"] || id || ""}`,
      age: panelData["나이"] ? `${panelData["나이"]}세` : "",
      gender: String(panelData["성별"] || ""),
      job,
      department: String(panelData["직무"] || ""),
      address: String(panelData["거주지역"] || ""),
      marriageStatus: String(panelData["결혼여부"] || ""),
      numberOfChildren: panelData["자녀수"] ? `${panelData["자녀수"]}명` : "",
      familySize: String(panelData["가족수"] || ""),
      education: String(panelData["최종학력"] || ""),
      personalIncome: String(panelData["개인소득"] || ""),
      familyIncome: String(panelData["가구소득"] || ""),
    };
  }, [panelData, id]);

  const basicInfoList = useMemo(() => {
    if (!panelProfile) return [];

    return [
      { title: "나이", value: panelProfile.age },
      { title: "성별", value: panelProfile.gender },
      { title: "직업", value: panelProfile.job },
      { title: "부서", value: panelProfile.department },
      { title: "거주지역", value: panelProfile.address },
      { title: "결혼상태", value: panelProfile.marriageStatus },
      { title: "자녀수", value: panelProfile.numberOfChildren },
      { title: "가족수", value: panelProfile.familySize },
      { title: "학력", value: panelProfile.education },
      { title: "개인소득", value: panelProfile.personalIncome },
      { title: "가구소득", value: panelProfile.familyIncome },
    ];
  }, [panelProfile]);

  const digitalDeviceInfo = useMemo(() => {
    if (!panelData) return [];

    const items = [];
    const phoneBrand = String(panelData["휴대폰브랜드"] || "");
    const phoneModel = String(panelData["휴대폰모델"] || "");

    if (phoneBrand) {
      items.push({
        text: `휴대폰: ${phoneBrand}`,
        icon: <MobileIcon width={20} height={20} />,
      });
    }
    if (phoneModel) {
      items.push({
        text: `모델: ${phoneModel}`,
        icon: <TagIcon width={20} height={20} />,
      });
    }
    return items;
  }, [panelData]);

  const vehicleInfo = useMemo(() => {
    if (!panelData) return [];

    const items = [];
    const vehicleOwnership = String(panelData["차량보유"] || "");
    const vehicleBrand = String(panelData["차량브랜드"] || "");
    const vehicleModel = String(panelData["차량모델"] || "");

    if (vehicleOwnership) {
      items.push({
        text: `차량 보유: ${vehicleOwnership}`,
        icon: <CarIcon width={20} height={20} />,
      });
    }
    if (vehicleBrand) {
      items.push({
        text: `브랜드: ${vehicleBrand}`,
        icon: <TagIcon width={20} height={20} />,
      });
    }
    if (vehicleModel) {
      items.push({
        text: `모델: ${vehicleModel}`,
        icon: <TagIcon width={20} height={20} />,
      });
    }
    return items;
  }, [panelData]);

  const hashTags = useMemo(() => {
    if (!panelData) return [];

    const tags = [];
    const ageGroup = panelData["연령대"] ? `#${panelData["연령대"]}` : null;
    const gender = panelData["성별"] ? `#${panelData["성별"]}` : null;
    const job = String(panelData["직업"] || "").split(" (")[0];
    const jobTag = job ? `#${job}` : null;
    const department = panelData["직무"] ? `#${panelData["직무"]}` : null;
    const address = String(panelData["거주지역"] || "");
    const addressParts = address.split(" ");
    const marriageStatus = panelData["결혼여부"]
      ? `#${panelData["결혼여부"]}`
      : null;

    if (ageGroup) tags.push(ageGroup);
    if (gender) tags.push(gender);
    if (jobTag) tags.push(jobTag);
    if (department) tags.push(department);
    if (addressParts[0]) tags.push(`#${addressParts[0]}`);
    if (addressParts[1]) tags.push(`#${addressParts[1]}`);
    if (marriageStatus) tags.push(marriageStatus);

    return tags;
  }, [panelData]);

  const ownedProducts = useMemo(() => {
    if (!panelData || !panelData["보유전자제품"]) return [];
    const products = panelData["보유전자제품"];
    return Array.isArray(products) ? products : [];
  }, [panelData]);

  const lifestyleData = useMemo(() => {
    if (!panelData) return [];

    const items = [];

    const smokingExperience = panelData["흡연경험"];
    if (Array.isArray(smokingExperience) && smokingExperience.length > 0) {
      items.push({
        title: "흡연 경험",
        chips: smokingExperience.map(
          (item: string) => String(item).split(" (")[0]
        ),
        icon: <SmokeIcon width={20} height={20} />,
      });
    }

    const cigaretteBrands = panelData["담배브랜드"];
    if (Array.isArray(cigaretteBrands) && cigaretteBrands.length > 0) {
      items.push({
        title: "담배 브랜드",
        chips: cigaretteBrands.map((item: unknown) => String(item)),
        icon: <TagIcon width={20} height={20} />,
      });
    }

    const eCigarette = panelData["전자담배"];
    if (Array.isArray(eCigarette) && eCigarette.length > 0) {
      items.push({
        title: "전자 담배",
        chips: eCigarette.map((item: unknown) => String(item)),
        icon: <SmokeIcon width={20} height={20} />,
      });
    }

    const alcoholExperience = panelData["음주경험"];
    if (Array.isArray(alcoholExperience) && alcoholExperience.length > 0) {
      items.push({
        title: "음주 경험",
        chips: alcoholExperience.map((item: unknown) => String(item)),
        icon: <BeerIcon width={20} height={20} />,
      });
    }

    return items;
  }, [panelData]);

  useEffect(() => {
    const fetchPanelData = async () => {
      const response = await apiClient.get(`/panels/${id}`);
      const attributes = response.data.result.panel_detail.attributes;

      // key가 "raw_data"인 항목 찾기
      const rawDataAttr = attributes.find(
        (attr: { key: string; value: string }) => attr.key === "raw_data"
      );

      if (rawDataAttr?.value) {
        try {
          // JSON 문자열 파싱
          const parsedData = JSON.parse(rawDataAttr.value);
          setPanelData(parsedData);
          console.log(parsedData);
          setPanelSummary(response.data.result.panel_detail.summary);
        } catch (error) {
          // JSON 파싱 실패 시 원본 문자열 저장
          console.error("JSON 파싱 실패:", error);
          setPanelData(rawDataAttr.value);
        }
      } else {
        setPanelData(null);
      }
    };
    fetchPanelData();
  }, [id]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-[80px] pt-[30px] pb-[183px]">
      {/* 이전 페이지로 이동 버튼 */}
      <div className="mb-[58px] flex w-full items-center justify-start">
        <button
          className="flex items-center justify-center gap-[8px] text-black text-h5"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon color="black" width={24} height={24} />
          {question}
        </button>
      </div>
      {/* 패널 프로필 영역 */}
      <div className="mb-[49px] flex w-full flex-col items-start justify-center gap-[32px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
        {/* 패널 정보 */}
        <div className="flex w-full items-start justify-between gap-[16px]">
          <div className="flex items-center justify-start gap-[16px]">
            <div
              className="flex items-center justify-center rounded-xl px-[16px] py-[16px]"
              style={{
                background:
                  "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
              }}
            >
              <UserIcon width={48} height={48} />
            </div>
            <div className="flex flex-col items-start justify-start gap-[8px]">
              <div className="text-h3 text-primary-900">
                {panelProfile?.panelId || "패널 정보 로딩 중..."}
              </div>
              <div className="flex items-center justify-start gap-[16px]">
                <TextWithIcon
                  icon={<UserIcon width={20} height={20} color="#616161" />}
                  text={`${panelProfile?.age || ""} ${
                    panelProfile?.gender || ""
                  }`}
                />
                <TextWithIcon
                  icon={
                    <BriefcaseIcon width={20} height={20} color="#616161" />
                  }
                  text={panelProfile?.job || ""}
                />
                <TextWithIcon
                  icon={<BusinessIcon width={20} height={20} color="#616161" />}
                  text={panelProfile?.department || ""}
                />
                <TextWithIcon
                  icon={<MapPinIcon width={20} height={20} color="#616161" />}
                  text={panelProfile?.address || ""}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[12px] px-[12px] py-[8px]">
            <div className="text-caption text-primary-700">{question}</div>
            <div className="flex items-center justify-start gap-[4px]">
              <div className="text-black text-subtitle2">
                {concordanceRate}%
              </div>
              <PercentageBar percentage={concordanceRate} />
            </div>
          </div>
        </div>
        {/* 해시 태그 */}
        <div className="flex items-center justify-start gap-[16px]">
          {hashTags.map((tag) => (
            <Chip key={tag} variant="filled" chipType="text">
              {tag}
            </Chip>
          ))}
        </div>
        {/* 패널 프로필 요약 */}
        <div className="flex w-full flex-col items-center justify-start gap-[4px] rounded-xl border border-white bg-gray-50 px-[16px] py-[12px]">
          <div className="flex w-full items-center justify-start gap-[8px] text-gray-950 text-h6">
            <CommentIcon width={24} height={24} />
            패널 프로필 요약
          </div>
          <div className="w-full px-[32px] text-start text-body3 text-gray-900">
            {panelSummary}
          </div>
        </div>
      </div>
      {/* 상세 프로필 영역 */}
      <div className="flex w-full flex-col items-start justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
        {/* 헤더 */}
        <div className="flex w-full items-center justify-start gap-[20px] border-gray-500 border-b-[0.5px]">
          <div
            className={`text-body5 ${
              mode === "profile"
                ? "border-tertiary-500 border-b text-tertiary-500"
                : "text-gray-700"
            } cursor-pointer py-[5px]`}
            onClick={() => handleMode("profile")}
          >
            상세 프로필
          </div>
          {panelData &&
          "설문응답" in panelData &&
          panelData.설문응답 &&
          typeof panelData.설문응답 === "object" &&
          Object.keys(panelData.설문응답).length > 0 ? (
            <div
              className={`text-body5 ${
                mode === "history"
                  ? "border-tertiary-500 border-b text-tertiary-500"
                  : "text-gray-700"
              } cursor-pointer py-[5px]`}
              onClick={() => handleMode("history")}
            >
              참여이력
            </div>
          ) : null}
        </div>
        {mode === "profile" ? (
          <div className="grid w-full grid-cols-2 items-start justify-start gap-[20px]">
            {/* 기본 정보 */}
            <SurveyContainer
              type="list"
              title="기본 정보"
              icon={<UserIcon width={20} height={20} />}
              data={basicInfoList}
            />
            {/* 상세 정보 */}
            <div className="flex w-full flex-col items-start justify-center gap-[32px]">
              {/* 디지털 기기 */}
              <SurveyContainer
                type="icon-list"
                title="디지털 기기"
                icon={<DevicesIcon width={20} height={20} />}
                data={digitalDeviceInfo}
              />
              {/* 차량 정보 */}
              <SurveyContainer
                type="icon-list"
                title="차량 정보"
                icon={<CarIcon width={20} height={20} />}
                data={vehicleInfo}
              />
              {/* 보유 전자제품 */}
              <SurveyContainer
                type="chip"
                title="보유 전자제품"
                icon={<TvIcon width={20} height={20} />}
                data={ownedProducts}
              />
              {/* 생활 습관 */}
              <SurveyContainer
                type="chip"
                title="생활 습관"
                icon={<HomeIcon width={20} height={20} />}
                data={lifestyleData}
              />
            </div>
          </div>
        ) : panelData &&
          "설문응답" in panelData &&
          panelData.설문응답 &&
          typeof panelData.설문응답 === "object" &&
          Object.keys(panelData.설문응답).length > 0 ? (
          <div className="flex w-full flex-col items-start justify-start gap-[20px]">
            {Object.entries(panelData.설문응답 as Record<string, unknown>).map(
              ([category, surveyData]) => (
                <SurveyContainer
                  key={category}
                  icon={
                    categoryIcons[category] || (
                      <HomeIcon width={20} height={20} />
                    )
                  }
                  title={category}
                  data={surveyData as string[] | Record<string, string>}
                />
              )
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
