import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import CommentIcon from "@/assets/icons/ic_comment";
import UserIcon from "@/assets/icons/ic_user";
import BriefcaseIcon from "@/assets/icons/ic_briefcase";
import BusinessIcon from "@/assets/icons/ic_business";
import MapPinIcon from "@/assets/icons/ic_mappin";
import MobileIcon from "@/assets/icons/ic_mobile";
import TextWithIcon from "@/components/panel/text-with-icon";
import TagIcon from "@/assets/icons/ic_tag";
import CarIcon from "@/assets/icons/ic_car";
import HomeIcon from "@/assets/icons/ic_home";
import GymIcon from "@/assets/icons/ic_gym";
import CartIcon from "@/assets/icons/ic_cart";
import TreeIcon from "@/assets/icons/ic_tree";
import TvIcon from "@/assets/icons/ic_tv";
import DevicesIcon from "@/assets/icons/ic_devices";
import SmokeIcon from "@/assets/icons/ic_smoke";
import BeerIcon from "@/assets/icons/ic_beer";
import PercentageBar from "@/components/panel/percentage-bar";
import Chip from "@/components/chip";
import SurveyContainer from "@/components/panel/survey-container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { panelData } from "@/components/panel/panel-data";

// 데이터 가져오기
const data = panelData[0];

// 패널 프로필
const panelProfile = {
  panelId: `패널 ${data.panel_id}`,
  age: `${data.나이}세`,
  gender: data.성별,
  job: data.직업.split(" (")[0], // "전문직 (의사, 간호사...)" -> "전문직"
  department: data.직무,
  address: data.거주지역,
  marriageStatus: data.결혼여부,
  numberOfChildren: `${data.자녀수}명`,
  familySize: data.가족수,
  education: data.최종학력,
  personalIncome: data.개인소득,
  familyIncome: data.가구소득,
};

// 기본 정보
const basicInfoList = [
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

// 디지털 기기
const digitalDeviceInfo = [
  {
    text: `휴대폰: ${data.휴대폰브랜드}`,
    icon: <MobileIcon width={20} height={20} />,
  },
  {
    text: `모델: ${data.휴대폰모델}`,
    icon: <TagIcon width={20} height={20} />,
  },
];

// 차량 정보
const vehicleInfo = [
  {
    text: `차량 보유: ${data.차량보유}`,
    icon: <CarIcon width={20} height={20} />,
  },
  {
    text: `브랜드: ${data.차량브랜드}`,
    icon: <TagIcon width={20} height={20} />,
  },
  {
    text: `모델: ${data.차량모델}`,
    icon: <TagIcon width={20} height={20} />,
  },
];

// 해시태그 생성
const hashTags = [
  `#${data.연령대}`,
  `#${data.성별}`,
  `#${data.직업.split(" (")[0]}`, // "전문직 (의사, 간호사...)" -> "전문직"
  `#${data.직무}`,
  `#${data.거주지역.split(" ")[0]}`, // "경기 화성시" -> "경기"
  `#${data.거주지역.split(" ")[1]}`, // "경기 화성시" -> "화성시"
  `#${data.결혼여부}`,
];

// 보유 전자제품
const ownedProducts = data.보유전자제품;

// 생활 습관
const lifestyleData = [
  {
    title: "흡연 경험",
    chips: data.흡연경험.map((item) => item.split(" (")[0]),
    icon: <SmokeIcon width={20} height={20} />,
  },
  {
    title: "담배 브랜드",
    chips: data.담배브랜드,
    icon: <TagIcon width={20} height={20} />,
  },
  {
    title: "전자 담배",
    chips: data.전자담배,
    icon: <SmokeIcon width={20} height={20} />,
  },
  {
    title: "음주 경험",
    chips: data.음주경험,
    icon: <BeerIcon width={20} height={20} />,
  },
];

// 아이콘 매핑
const categoryIcons: Record<string, React.ReactNode> = {
  라이프스타일: <HomeIcon width={20} height={20} />,
  건강생활: <GymIcon width={20} height={20} />,
  소비습관: <CartIcon width={20} height={20} />,
  디지털인식: <MobileIcon width={20} height={20} />,
  환경의식: <TreeIcon width={20} height={20} />,
};

export default function Panel() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("profile");

  const handleMode = (mode: string) => {
    setMode(mode);
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-[30px] px-[80px] pb-[183px]">
      {/* 이전 페이지로 이동 버튼 */}
      <div className="flex items-center justify-start w-full mb-[58px]">
        <button
          className="flex items-center justify-center gap-[8px] text-h5 text-black"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon color="black" width={24} height={24} />
          40대 기혼 여성 100명
        </button>
      </div>
      {/* 패널 프로필 영역 */}
      <div className="w-full flex flex-col items-start justify-center py-[32px] px-[40px] gap-[32px] bg-opacity-500 rounded-2xl mb-[49px]">
        {/* 패널 정보 */}
        <div className="flex items-start justify-between w-full gap-[16px]">
          <div className="flex items-center justify-start gap-[16px]">
            <div
              className="flex items-center justify-center px-[16px] py-[16px] rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
              }}
            >
              <UserIcon width={48} height={48} />
            </div>
            <div className="flex flex-col items-start justify-start gap-[8px]">
              <div className="text-h3 text-primary-900">
                {panelProfile.panelId}
              </div>
              <div className="flex items-center justify-start gap-[16px]">
                <TextWithIcon
                  icon={<UserIcon width={20} height={20} color="#616161" />}
                  text={`${panelProfile.age} ${panelProfile.gender}`}
                />
                <TextWithIcon
                  icon={
                    <BriefcaseIcon width={20} height={20} color="#616161" />
                  }
                  text={panelProfile.job}
                />
                <TextWithIcon
                  icon={<BusinessIcon width={20} height={20} color="#616161" />}
                  text={panelProfile.department}
                />
                <TextWithIcon
                  icon={<MapPinIcon width={20} height={20} color="#616161" />}
                  text={panelProfile.address}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-[8px] px-[12px] gap-[12px]">
            <div className="text-caption text-primary-700">
              40대 기혼 여성 100명
            </div>
            <div className="flex items-center justify-start gap-[4px]">
              <div className="text-subtitle2 text-black">91.23%</div>
              <PercentageBar percentage={91.23} />
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
        <div className="flex flex-col items-center justify-start w-full gap-[4px] py-[12px] px-[16px] bg-gray-50 rounded-xl border border-white">
          <div className="flex items-center justify-start w-full gap-[8px] text-h6 text-gray-950">
            <CommentIcon width={24} height={24} />
            패널 프로필 요약
          </div>
          <div className="px-[32px] w-full text-body3 text-gray-900 text-start">
            40세 경기 화성시에 거주하는 기혼 여성으로, 1명의 자녀를 둔 전문직
            종사자입니다.
            <br />
            대학교를 졸업했으며, 개인소득은 월 500~599만원, 가구소득은 월
            700~799만원 수준입니다.
            <br />
            기아 레이 차량을 보유하고 있으며, TV·공기청정기·커피머신 등 다양한
            전자제품을 사용하는 중산층 가정의 직장인입니다.
          </div>
        </div>
      </div>
      {/* 상세 프로필 영역 */}
      <div className="w-full flex flex-col items-start justify-center py-[32px] px-[40px] gap-[20px] bg-opacity-500 rounded-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-start w-full gap-[20px] border-b-[0.5px] border-gray-500">
          <div
            className={`text-body5 ${
              mode === "profile"
                ? "text-tertiary-500 border-b border-tertiary-500"
                : "text-gray-700"
            } py-[5px] cursor-pointer`}
            onClick={() => handleMode("profile")}
          >
            상세 프로필
          </div>
          {"설문응답" in data &&
          data.설문응답 &&
          Object.keys(data.설문응답).length > 0 ? (
            <div
              className={`text-body5 ${
                mode === "history"
                  ? "text-tertiary-500 border-b border-tertiary-500"
                  : "text-gray-700"
              } py-[5px] cursor-pointer`}
              onClick={() => handleMode("history")}
            >
              참여이력
            </div>
          ) : null}
        </div>
        {mode === "profile" ? (
          <div className="grid grid-cols-2 items-start justify-start w-full gap-[20px]">
            {/* 기본 정보 */}
            <SurveyContainer
              type="list"
              title="기본 정보"
              icon={<UserIcon width={20} height={20} />}
              data={basicInfoList}
            />
            {/* 상세 정보 */}
            <div className="flex flex-col items-start justify-center w-full gap-[32px]">
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
        ) : "설문응답" in data &&
          data.설문응답 &&
          Object.keys(data.설문응답).length > 0 ? (
          <div className="flex flex-col items-start justify-start w-full gap-[20px]">
            {Object.entries(data.설문응답).map(([category, surveyData]) => (
              <SurveyContainer
                key={category}
                icon={
                  categoryIcons[category] || <HomeIcon width={20} height={20} />
                }
                title={category}
                data={surveyData}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
