import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  MoreVertical,
  Wifi,
  Signal,
  BatteryFull,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

/* ---------- Benefit Modal ---------- */
const FRANCHISES = [
  { name: "GS25",        discount: "3%",   logo: "/icons/franchise-gs25.png" },
  { name: "메가MGC커피", discount: "5%",   logo: "/icons/franchise-mega.png" },
  { name: "파리바게트",  discount: "4.5%", logo: "/icons/franchise-paris.png" },
  { name: "컴포즈커피",  discount: "4%",   logo: "/icons/franchise-compose.png" },
];

/* ---------- Benefit Tab data ---------- */
const BENEFIT_CATEGORIES = ["편의점", "카페/디저트", "음식점", "쇼핑/면세", "PC방"];

const STORES_BY_CATEGORY = {
  "편의점": [
    { name: "GS25 군자점", distance: "120m", reviews: 432, discount: "10%", coupons: 1, bg: "bg-[#0061BD]", emoji: "🏪", tag: "단골 가맹점" },
    { name: "CU 군자역점", distance: "180m", reviews: 358, discount: "5%", coupons: 0, bg: "bg-[#5C2C0C]", emoji: "🍙" },
    { name: "세븐일레븐 광진점", distance: "220m", reviews: 287, discount: "5%", coupons: 1, bg: "bg-gradient-to-br from-emerald-500 to-amber-500", emoji: "7️⃣" },
    { name: "이마트24 능동점", distance: "340m", reviews: 198, discount: "7%", coupons: 0, bg: "bg-[#FFCB05]", emoji: "🛒" },
    { name: "미니스톱", distance: "410m", reviews: 142, discount: "5%", coupons: 0, bg: "bg-gradient-to-br from-blue-600 to-amber-400", emoji: "🥤" },
  ],
  "카페/디저트": [
    { name: "책방고즈넉", distance: "82m", reviews: 756, discount: "10%", coupons: 0, tag: "단골 가맹점", img: "/icons/store-bookcafe.png" },
    { name: "로프커피", distance: "207m", reviews: 918, discount: "5%", coupons: 0, img: "/icons/store-lop.png" },
    { name: "연필", distance: "251m", reviews: 689, discount: "7%", coupons: 2, img: "/icons/store-pencil.png" },
    { name: "짐스하이드어웨이", distance: "274m", reviews: 211, discount: "10%", coupons: 2, img: "/icons/store-jims.png" },
    { name: "체리커피", distance: "382m", reviews: 2410, discount: "10%", coupons: 2, img: "/icons/store-cherry.png" },
  ],
  "음식점": [
    { name: "황금돼지국밥", distance: "95m", reviews: 1240, discount: "8%", coupons: 1, bg: "bg-gradient-to-br from-amber-700 to-orange-900", emoji: "🍲", tag: "단골 가맹점" },
    { name: "토속촌삼계탕", distance: "180m", reviews: 856, discount: "10%", coupons: 0, bg: "bg-gradient-to-br from-yellow-100 to-amber-300", emoji: "🍗" },
    { name: "광진김밥", distance: "210m", reviews: 432, discount: "5%", coupons: 2, bg: "bg-gradient-to-br from-lime-200 to-emerald-400", emoji: "🍙" },
    { name: "이태원분식", distance: "320m", reviews: 678, discount: "7%", coupons: 1, bg: "bg-gradient-to-br from-red-500 to-rose-700", emoji: "🌮" },
    { name: "정원의식탁", distance: "450m", reviews: 234, discount: "10%", coupons: 0, bg: "bg-gradient-to-br from-emerald-300 to-teal-600", emoji: "🥗" },
  ],
  "쇼핑/면세": [
    { name: "스타일난다", distance: "180m", reviews: 567, discount: "15%", coupons: 1, bg: "bg-gradient-to-br from-pink-200 to-pink-500", emoji: "👗" },
    { name: "올리브영 군자역점", distance: "240m", reviews: 1820, discount: "10%", coupons: 2, bg: "bg-[#7AC242]", emoji: "💄", tag: "단골 가맹점" },
    { name: "에이블리 팝업", distance: "320m", reviews: 234, discount: "20%", coupons: 1, bg: "bg-gradient-to-br from-violet-300 to-fuchsia-500", emoji: "👜" },
    { name: "유니클로", distance: "510m", reviews: 1093, discount: "5%", coupons: 0, bg: "bg-[#E60012]", emoji: "👕" },
    { name: "다이소 광진점", distance: "620m", reviews: 2410, discount: "5%", coupons: 1, bg: "bg-[#1E5BA8]", emoji: "🛍️" },
  ],
  "PC방": [
    { name: "PC온누리", distance: "130m", reviews: 423, discount: "10%", coupons: 0, bg: "bg-gradient-to-br from-indigo-500 to-purple-800", emoji: "🎮" },
    { name: "프리미엄PC카페", distance: "270m", reviews: 312, discount: "8%", coupons: 1, bg: "bg-gradient-to-br from-slate-700 to-slate-900", emoji: "🖥️", tag: "단골 가맹점" },
    { name: "스타크래프트존", distance: "410m", reviews: 198, discount: "5%", coupons: 0, bg: "bg-gradient-to-br from-blue-500 to-cyan-700", emoji: "⌨️" },
    { name: "게이밍라운지", distance: "520m", reviews: 145, discount: "12%", coupons: 1, bg: "bg-gradient-to-br from-red-500 to-pink-700", emoji: "🕹️" },
    { name: "PC아일랜드", distance: "680m", reviews: 87, discount: "7%", coupons: 0, bg: "bg-gradient-to-br from-emerald-500 to-teal-800", emoji: "🎧" },
  ],
};

// 이달의 혜택 — vertical card-style benefit posters
const MONTHLY_BENEFITS = [
  { src: "/icons/monthly-daangn.png", alt: "당근페이 결제 시 당근머니 적립" },
  { src: "/icons/monthly-gs25.png", alt: "GS25 유어스 음료 156종 30% 캐시백" },
  { src: "/icons/monthly-cu.png", alt: "CU 매일매일 더블혜택 최대 10%" },
  { src: "/icons/monthly-seven.png", alt: "세븐일레븐 매장 현장결제시 간식 할인쿠폰" },
];

// 만보기 is rendered specially (with progress timeline) — these are the rest
const EASY_BENEFITS = [
  { img: "/icons/challenge-star.png", title: "단골 가게 만들기", sub: "우리동네 단골가게 만들기" },
  { img: "/icons/benefit-coffee.png", title: "동네 분좋카 알아보기", sub: "동네 카페 방문하고 적립하기" },
  { img: "/icons/benefit-burger.png", title: "동네 맛집 알아보기", sub: "동네 맛집 방문하고 적립하기" },
  { img: "/icons/benefit-hand-coin.png", title: "매일 모으기", sub: "누구나 당근머니 받기" },
  { img: "/icons/benefit-calendar.png", title: "출석체크", sub: "출석체크하고 당근머니 받기" },
];

const BIG_BENEFITS = [
  { img: "/icons/benefit-coupon.png", title: "추천 쿠폰", sub: "지금 진행중 쿠폰 받기" },
  { img: "/icons/benefit-percent.png", title: "매장 결제 적립", sub: "보너스 포인트 뽑기" },
  { img: "/icons/benefit-gift.png", title: "혜택 좋은 가맹점", sub: "최대 7% 적립 받기" },
];

/* ---------- Settlement (정산) carousel data ---------- */
const SETTLEMENTS = [
  {
    avatars: [
      { emoji: "😀", bg: "bg-blue-400" },
      { emoji: "😎", bg: "bg-yellow-300" },
      { emoji: "🤓", bg: "bg-purple-400" },
      { emoji: "🤩", bg: "bg-orange-400" },
    ],
    title: "삐엠, 감바스 까블로스 찬차드,...",
    date: "요청일 2025.03.07 (금) 21:23",
    amount: "22,500 원",
  },
  {
    avatars: [
      { emoji: "🥑", bg: "bg-green-400" },
      { emoji: "🍕", bg: "bg-red-300" },
    ],
    title: "동네 점심 모임 회비",
    date: "요청일 2025.03.05 (수) 12:40",
    amount: "8,200 원",
  },
  {
    avatars: [
      { emoji: "🐱", bg: "bg-gray-300" },
      { emoji: "🐶", bg: "bg-amber-300" },
      { emoji: "🦊", bg: "bg-orange-300" },
    ],
    title: "강아지 산책 모임 회비",
    date: "요청일 2025.02.28 (금) 19:10",
    amount: "5,000 원",
  },
  {
    avatars: [
      { emoji: "☕", bg: "bg-amber-400" },
      { emoji: "🍰", bg: "bg-pink-300" },
    ],
    title: "성수동 카페 더치페이",
    date: "요청일 2025.02.20 (목) 15:32",
    amount: "12,400 원",
  },
  {
    avatars: [
      { emoji: "🎂", bg: "bg-pink-400" },
      { emoji: "🎈", bg: "bg-sky-300" },
      { emoji: "🎁", bg: "bg-red-400" },
      { emoji: "🎊", bg: "bg-violet-400" },
    ],
    title: "다영이 생일파티 회비",
    date: "요청일 2025.02.14 (금) 20:00",
    amount: "38,000 원",
  },
];

/* ---------- 통합내역 (transactions) carousel data — 5 pages × 3 rows ---------- */
const TX_PAGES = [
  [
    {
      kind: "netflix",
      title: "Netflix·Netflix Subscript...",
      date: "2025.03.07 22:37",
      amount: "-13,500 원",
      color: "text-white",
    },
    {
      kind: "carrot",
      title: "받기 | 임기창(임*창)",
      date: "2025.02.24 23:52",
      amount: "+7,500 원",
      color: "text-orange-400",
    },
    {
      kind: "emoji",
      emoji: "😎",
      bg: "bg-purple-500",
      title: "송금 | 당근페이머니 → 최다영(최*영)",
      date: "2025.02.24 23:52",
      amount: "-29,756 원",
      color: "text-white",
    },
  ],
  [
    {
      kind: "emoji",
      emoji: "🍔",
      bg: "bg-yellow-400",
      title: "결제 | 버거킹 합정점",
      date: "2025.02.21 19:42",
      amount: "-14,800 원",
      color: "text-white",
    },
    {
      kind: "carrot",
      title: "받기 | 김도윤(김*윤)",
      date: "2025.02.20 13:05",
      amount: "+12,000 원",
      color: "text-orange-400",
    },
    {
      kind: "emoji",
      emoji: "🚇",
      bg: "bg-sky-500",
      title: "결제 | 서울교통공사",
      date: "2025.02.19 08:21",
      amount: "-2,800 원",
      color: "text-white",
    },
  ],
  [
    {
      kind: "emoji",
      emoji: "☕",
      bg: "bg-amber-500",
      title: "결제 | 메가MGC커피 망원점",
      date: "2025.02.18 10:14",
      amount: "-3,500 원",
      color: "text-white",
    },
    {
      kind: "emoji",
      emoji: "🛒",
      bg: "bg-green-500",
      title: "결제 | GS25 합정역점",
      date: "2025.02.17 21:30",
      amount: "-8,720 원",
      color: "text-white",
    },
    {
      kind: "carrot",
      title: "받기 | 박지원(박*원)",
      date: "2025.02.16 17:48",
      amount: "+25,000 원",
      color: "text-orange-400",
    },
  ],
  [
    {
      kind: "emoji",
      emoji: "🎬",
      bg: "bg-red-500",
      title: "결제 | CGV 홍대점",
      date: "2025.02.14 20:11",
      amount: "-13,000 원",
      color: "text-white",
    },
    {
      kind: "emoji",
      emoji: "🍜",
      bg: "bg-rose-400",
      title: "송금 | 당근페이머니 → 이수연(이*연)",
      date: "2025.02.13 19:55",
      amount: "-9,200 원",
      color: "text-white",
    },
    {
      kind: "emoji",
      emoji: "📚",
      bg: "bg-indigo-400",
      title: "결제 | 교보문고 광화문점",
      date: "2025.02.12 15:32",
      amount: "-22,400 원",
      color: "text-white",
    },
  ],
  [
    {
      kind: "carrot",
      title: "받기 | 정태경(정*경)",
      date: "2025.02.10 11:20",
      amount: "+15,500 원",
      color: "text-orange-400",
    },
    {
      kind: "emoji",
      emoji: "💊",
      bg: "bg-emerald-400",
      title: "결제 | 온누리약국 망원점",
      date: "2025.02.09 18:00",
      amount: "-6,800 원",
      color: "text-white",
    },
    {
      kind: "emoji",
      emoji: "🥬",
      bg: "bg-lime-500",
      title: "결제 | 이마트 합정점",
      date: "2025.02.08 12:42",
      amount: "-42,310 원",
      color: "text-white",
    },
  ],
];

function BenefitModal({ onClose }) {
  // phase: 'shake' (carrot wiggling) → 'list' (franchise cards)
  const [phase, setPhase] = useState("shake");
  // replayKey forces the carrot wiggle CSS animation to restart on remount
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (phase !== "shake") return;
    const t = setTimeout(() => setPhase("list"), 3000);
    return () => clearTimeout(t);
  }, [phase, replayKey]);

  const replay = () => {
    setPhase("shake");
    setReplayKey((k) => k + 1);
  };

  return (
    <div
      className="absolute inset-0 z-[80] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.44)" }}
      />

      {/* Sheet — Daangn modal spec: 24px corner radius, ~88% width, breathing room above/below */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[312px] h-[460px] rounded-[20px] bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] anim-modal-in overflow-hidden"
      >
        {/* === Phase 1: Carrot Shake === */}
        <div
          className={`absolute inset-0 px-6 pt-8 pb-6 flex flex-col items-center text-center transition-opacity duration-700 ${
            phase === "shake"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="inline-flex items-center h-[22px] px-2.5 rounded-full bg-[#FF7E36] text-white text-[11px] font-semibold">
            단골당근
          </span>
          <h2 className="mt-3 text-[#212124] text-[18px] font-bold leading-[1.35]">
            오늘 우리동네 단골가게 혜택은?
          </h2>
          <p className="mt-2 text-[#868B94] text-[13px] leading-[1.5] font-medium">
            우리동네 단골가게에 등록된
            <br />
            다양한 혜택들을 지금 확인해보세요
          </p>

          {/* Carrot pin — pivot at bottom, wiggles ±30deg for ~2.8s */}
          <div className="relative my-5 h-[170px] w-[140px] flex items-end justify-center">
            <img
              key={replayKey}
              src="/icons/modal-carrot.png"
              alt=""
              className="anim-carrot-wiggle h-[170px] w-auto object-contain select-none"
              draggable={false}
              style={{ filter: "drop-shadow(0 12px 18px rgba(234,88,12,0.25))" }}
            />
          </div>

          {/* Shake CTA pill */}
          <button className="h-[40px] px-5 rounded-full bg-[#FF7E36] text-white text-[13px] font-semibold active:scale-95 transition-transform shadow-[0_6px_14px_-4px_rgba(255,126,54,0.45)]">
            당근을 흔들어 확인해보세요
          </button>

          <button
            onClick={onClose}
            className="mt-auto pt-4 text-[#868B94] text-[13px] font-medium active:scale-95 transition-transform"
          >
            하루 동안 보지 않기
          </button>
        </div>

        {/* === Phase 2: Franchise Discounts === */}
        <div
          className={`absolute inset-0 px-6 pt-8 pb-6 flex flex-col text-center transition-opacity duration-700 ${
            phase === "list"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="inline-flex self-center items-center h-[22px] px-2.5 rounded-full bg-[#FF7E36] text-white text-[11px] font-semibold">
            단골당근
          </span>
          <h2 className="mt-3 text-[#212124] text-[18px] font-bold leading-[1.35]">
            우리동네 단골 가맹점 혜택은?
          </h2>
          <p className="mt-2 text-[#868B94] text-[13px] leading-[1.5] font-medium">
            우리동네 단골가게에 등록된
            <br />
            다양한 혜택들을 지금 확인해보세요
          </p>

          {/* Cards — slide in from right with stagger */}
          <div className="mt-5 -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2.5 w-max pb-2">
              {FRANCHISES.map((f, i) => (
                <div
                  key={f.name}
                  className={`transition-all duration-500 ease-out ${
                    phase === "list"
                      ? "translate-x-0 opacity-100"
                      : "translate-x-12 opacity-0"
                  }`}
                  style={{
                    transitionDelay:
                      phase === "list" ? `${100 + i * 100}ms` : "0ms",
                  }}
                >
                  <FranchiseCard
                    logoSrc={f.logo}
                    name={f.name}
                    discount={f.discount}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Primary CTA — Daangn primary button spec (h52, r12, 15/700) */}
          <button className="mt-auto w-full h-[52px] rounded-[12px] bg-[#FF7E36] text-white text-[16px] font-bold active:scale-[0.98] transition-transform shadow-[0_8px_18px_-6px_rgba(255,126,54,0.55)]">
            더 많은 가맹점 혜택 확인하기
          </button>

          <button
            onClick={onClose}
            className="mt-3 text-[#868B94] text-[13px] font-medium active:scale-95 transition-transform"
          >
            하루 동안 보지 않기
          </button>
        </div>

        {/* Replay (test) — visible while modal is open */}
        <button
          onClick={replay}
          className="absolute bottom-2 right-2 px-2 py-[3px] text-[10px] font-medium text-[#868B94] border border-[#E9EBEE] rounded-md bg-white/85 hover:bg-gray-50 active:scale-95 transition"
        >
          다시 보기
        </button>
      </div>
    </div>
  );
}

function FranchiseCard({ logoSrc, name, discount }) {
  return (
    <div className="shrink-0 w-[108px] h-[168px] rounded-[14px] bg-[#F4F5F7] flex flex-col overflow-hidden">
      <div className="flex-1 bg-white rounded-[12px] m-1.5 mb-0 px-2 pt-3 pb-3 flex flex-col items-center justify-start gap-1.5">
        <img
          src={logoSrc}
          alt={name}
          className="w-[52px] h-[52px] object-contain shrink-0"
          draggable={false}
        />
        <div className="text-[12px] font-semibold text-[#212124] leading-[1.2] mt-0.5 whitespace-nowrap">
          {name}
        </div>
        <div className="text-[#0085F2] text-[13px] font-bold leading-none whitespace-nowrap">
          {discount} 할인
        </div>
      </div>
      {/* Barcode footer (provided icon) */}
      <div className="h-[28px] flex items-center justify-center shrink-0">
        <img
          src="/icons/barcode-icon.png"
          alt=""
          className="h-[16px] w-auto opacity-90"
          draggable={false}
        />
      </div>
    </div>
  );
}

/**
 * 당근페이(Daangn Pay) 메인 화면 — 다크모드
 * 마이크로 인터랙션 강화 버전
 *
 *  - useState 기반 GNB 활성 탭 / 스크롤 블러 상태
 *  - 모든 인터랙션 요소: active:scale-* + transition
 *  - 3D 아이콘 floating keyframe 애니메이션
 *  - 헤더 sticky + scroll 시 backdrop-blur
 *  - 외부 라이브러리 0개 (Lucide 아이콘만 사용)
 */
export default function DaangnPayApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [cardPage, setCardPage] = useState(0);
  const [settlementPage, setSettlementPage] = useState(0);
  const [txPage, setTxPage] = useState(0);
  const scrollRef = useRef(null);
  const cardCarouselRef = useRef(null);
  const settlementCarouselRef = useRef(null);
  const txCarouselRef = useRef(null);

  const handlePageScroll = (setter) => (e) => {
    const w = e.currentTarget.clientWidth;
    if (!w) return;
    setter(Math.round(e.currentTarget.scrollLeft / w));
  };

  // Reset all horizontal carousels to page 0 on mount (defends against
  // browser scroll-position restoration after reload)
  useEffect(() => {
    [cardCarouselRef, settlementCarouselRef, txCarouselRef].forEach((r) => {
      if (r.current) r.current.scrollLeft = 0;
    });
  }, []);

  const handleScroll = (e) => {
    setScrolled(e.currentTarget.scrollTop > 6);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex items-center justify-center p-6 font-sans">
      {/* === Inline keyframes + scrollbar hide === */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }

        @keyframes floaty {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes floaty-soft {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes pop-in {
          0%   { transform: scale(0);   opacity: 0; }
          70%  { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes modal-in {
          0%   { transform: scale(0.92) translateY(8px); opacity: 0; }
          100% { transform: scale(1) translateY(0);     opacity: 1; }
        }
        @keyframes carrot-wiggle {
          0%   { transform: rotate(0deg); }
          12%  { transform: rotate(-30deg); }
          28%  { transform: rotate(30deg); }
          44%  { transform: rotate(-30deg); }
          60%  { transform: rotate(30deg); }
          76%  { transform: rotate(-22deg); }
          90%  { transform: rotate(15deg); }
          100% { transform: rotate(0deg); }
        }

        .anim-float            { animation: floaty 4.2s ease-in-out infinite; }
        .anim-float-soft       { animation: floaty-soft 3.0s ease-in-out infinite; }
        .anim-float-soft-late  { animation: floaty-soft 3.4s ease-in-out infinite 0.6s; }
        .anim-pop              { animation: pop-in 360ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .anim-modal-in         { animation: modal-in 280ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .anim-carrot-wiggle    { animation: carrot-wiggle 2.8s ease-in-out both; transform-origin: bottom center; }
      `}</style>

      {/* === iPhone Frame === */}
      <div className="relative w-[390px] h-[844px] rounded-[48px] border-[8px] border-gray-800 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[60] w-[110px] h-[34px] bg-black rounded-full pointer-events-none" />

        {/* === Status Bar (frame chrome, always solid) === */}
        <div className="absolute top-0 inset-x-0 h-[44px] z-50 flex items-center justify-between px-7 pt-2 text-white bg-black">
          <span className="text-[15px] font-semibold tracking-tight">21:12</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-[15px] h-[15px]" strokeWidth={2.5} />
            <Wifi className="w-[15px] h-[15px]" strokeWidth={2.5} />
            <BatteryFull className="w-[20px] h-[20px]" strokeWidth={2} />
          </div>
        </div>

        {/* === Scroll Container (header is sticky inside) === */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute top-[44px] bottom-[80px] inset-x-0 overflow-y-auto overflow-x-hidden scrollbar-hide bg-black"
        >
          {/* Sticky Header */}
          <header
            className={`sticky top-0 z-40 transition-all duration-300 ${
              scrolled
                ? "backdrop-blur-md bg-black/70 border-b border-white/5"
                : "bg-black border-b border-transparent"
            }`}
          >
            <div className="h-[52px] flex items-center justify-between px-5">
              <div className="flex items-center gap-1.5">
                <img
                  src="/icons/brand-orange.png"
                  alt="당근페이"
                  className="w-[23px] h-[23px] object-contain block"
                />
                {/* 시각 중앙 정렬: line-height/height 통일 + ascender 보정 */}
                <span
                  className="text-white text-[22px] font-extrabold tracking-tight block"
                  style={{
                    lineHeight: "26px",
                    height: "26px",
                    transform: "translateY(-2px)",
                  }}
                >
                  pay
                </span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <IconButton>
                  <Menu className="w-6 h-6" strokeWidth={2} />
                </IconButton>
                <IconButton>
                  <Search className="w-6 h-6" strokeWidth={2} />
                </IconButton>
                <IconButton className="relative">
                  <Bell className="w-6 h-6" strokeWidth={2} />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
                </IconButton>
              </div>
            </div>
          </header>

          {activeTab === "benefit" && <BenefitPage />}

          {activeTab !== "home" && activeTab !== "benefit" && (
            <div className="px-6 pt-12 pb-6 text-center text-neutral-500 text-[13px]">
              준비 중인 화면이에요
            </div>
          )}

          {activeTab === "home" && (
          <>
          {/* === Top Cards Carousel (당근머니 / KB / 현대) === */}
          <div className="mx-4 mt-2 relative">
            {/* Shared pagination dots — overlay on top-right of visible card */}
            <div className="absolute top-3 right-4 z-10 flex gap-1 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                    i === cardPage ? "bg-[#212124]" : "bg-[#D1D5DB]"
                  }`}
                />
              ))}
            </div>

            <div
              ref={cardCarouselRef}
              onScroll={handlePageScroll(setCardPage)}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth rounded-[16px]"
            >
              {/* Page 1: 당근머니 */}
              <div className="min-w-full shrink-0 snap-start bg-white px-5 pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img
                      src="/icons/brand-orange.png"
                      alt=""
                      className="w-[18px] h-[18px] object-contain"
                    />
                    <span className="text-[14px] font-semibold text-[#212124]">
                      당근머니
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mr-12">
                    <span className="text-[18px] font-bold text-[#212124] tracking-tight">
                      50,000
                      <span className="text-[15px] font-semibold ml-0.5">
                        원
                      </span>
                    </span>
                    <button className="active:scale-90 transition-transform">
                      <MoreVertical className="w-[14px] h-[14px] text-[#868B94]" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-[64px] flex items-center gap-[2px] overflow-hidden">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const widths = [1, 2, 1, 3, 2, 1, 1, 2, 3, 1];
                      const w = widths[i % widths.length];
                      const isBlack = i % 2 === 0 || i % 5 === 0;
                      return (
                        <div
                          key={i}
                          style={{ width: `${w}px` }}
                          className={`h-full ${
                            isBlack ? "bg-black" : "bg-white"
                          }`}
                        />
                      );
                    })}
                  </div>
                  <img
                    src="/icons/qr.png"
                    alt="QR"
                    className="w-[64px] h-[64px] object-contain"
                  />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button className="h-[40px] rounded-[10px] bg-[#F4F5F7] text-[14px] font-semibold text-[#212124] hover:bg-[#E9EBEE] active:bg-[#D1D5DB] active:scale-95 transition-all duration-150">
                    충전
                  </button>
                  <button className="h-[40px] rounded-[10px] bg-[#F4F5F7] text-[14px] font-semibold text-[#212124] hover:bg-[#E9EBEE] active:bg-[#D1D5DB] active:scale-95 transition-all duration-150">
                    송금
                  </button>
                </div>
              </div>

              {/* Page 2: 국민 0000 (KB) */}
              <div className="min-w-full shrink-0 snap-start bg-white px-5 pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[22px] h-[22px] rounded-[6px] bg-[#7E6E5A] flex items-center justify-center">
                      <span className="text-[#FFC107] text-[12px] font-black leading-none">
                        ✱b
                      </span>
                    </div>
                    <span className="text-[15px] font-bold text-[#212124] tracking-tight">
                      국민 0000
                    </span>
                  </div>
                  <button className="active:scale-90 transition-transform mr-12">
                    <MoreVertical className="w-[14px] h-[14px] text-[#868B94]" />
                  </button>
                </div>
                <div className="h-[64px] flex items-center">
                  <span className="text-[#9CA3AF] text-[28px] font-medium tracking-tight">
                    잔액보기
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button className="h-[40px] rounded-[10px] bg-[#F4F5F7] text-[14px] font-semibold text-[#212124] hover:bg-[#E9EBEE] active:bg-[#D1D5DB] active:scale-95 transition-all duration-150">
                    입금
                  </button>
                  <button className="h-[40px] rounded-[10px] bg-[#F4F5F7] text-[14px] font-semibold text-[#212124] hover:bg-[#E9EBEE] active:bg-[#D1D5DB] active:scale-95 transition-all duration-150">
                    송금
                  </button>
                </div>
              </div>

              {/* Page 3: 현대 0000 (Hyundai Card) */}
              <div className="min-w-full shrink-0 snap-start bg-white px-5 pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[22px] h-[22px] rounded-[6px] bg-[#1A1A1A] flex items-center justify-center">
                      <span className="text-white text-[10px] font-black leading-none">
                        H
                      </span>
                    </div>
                    <span className="text-[15px] font-bold text-[#212124] tracking-tight">
                      현대 0000
                    </span>
                  </div>
                  <button className="active:scale-90 transition-transform mr-12">
                    <MoreVertical className="w-[14px] h-[14px] text-[#868B94]" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-[64px] flex items-center gap-[2px] overflow-hidden">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const widths = [1, 2, 1, 3, 2, 1, 1, 2, 3, 1];
                      const w = widths[(i + 3) % widths.length];
                      const isBlack = i % 2 === 0 || i % 5 === 0;
                      return (
                        <div
                          key={i}
                          style={{ width: `${w}px` }}
                          className={`h-full ${
                            isBlack ? "bg-black" : "bg-white"
                          }`}
                        />
                      );
                    })}
                  </div>
                  <img
                    src="/icons/qr.png"
                    alt="QR"
                    className="w-[64px] h-[64px] object-contain"
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button className="h-[40px] rounded-[10px] bg-[#F4F5F7] text-[13px] font-semibold text-[#212124] hover:bg-[#E9EBEE] active:bg-[#D1D5DB] active:scale-95 transition-all duration-150">
                    카드 사용 금액
                  </button>
                  <button className="h-[40px] rounded-[10px] bg-[#F4F5F7] text-[13px] font-semibold text-[#212124] hover:bg-[#E9EBEE] active:bg-[#D1D5DB] active:scale-95 transition-all duration-150">
                    최근 거래 내역
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* === Quick Pill Menu (horizontal scroll) === */}
          <div className="mt-3 px-4 overflow-x-auto scrollbar-hide">
            <div className="flex flex-nowrap gap-2 w-max">
              <PillButton icon="/icons/pill-money.png" label="송금·충전" />
              <PillButton icon="/icons/pill-card.png" label="결제" />
              <PillButton icon="/icons/pill-dutch.png" label="더치페이" />
              <PillButton icon="/icons/pill-receipt.png" label="결제 내역" />
              <PillButton icon="/icons/pill-flag.png" label="이번 주 챌린지" />
            </div>
          </div>

          {/* === Orange Benefit Banner (clickable) === */}
          <button
            type="button"
            onClick={() => setShowBenefitModal(true)}
            className="block w-[calc(100%-32px)] mx-4 mt-3 text-left active:scale-[0.98] transition-transform duration-150"
          >
            <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-amber-400 via-orange-500 to-orange-500 shadow-[0_8px_24px_-8px_rgba(251,146,60,0.6)]">
              <div className="px-5 pt-4 pb-3 relative min-h-[120px]">
                <div className="text-white text-[13px] font-bold">
                  쓸수록 쌓이는 혜택
                </div>
                <div className="text-white/85 text-[11px] mt-0.5">
                  최근 받은 현장결제 혜택
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <img
                    src="/icons/brand-white.png"
                    alt=""
                    className="w-[18px] h-[18px] object-contain"
                  />
                  <span className="text-white text-[26px] font-extrabold tracking-tight">
                    5,130 <span className="text-[20px] font-bold">원</span>
                  </span>
                </div>

                {/* 3D coffee + coins illustration (floating) — moved up to avoid crop */}
                <img
                  src="/icons/coffee-coins.png"
                  alt=""
                  aria-hidden
                  className="anim-float absolute right-1 -top-3 w-[140px] h-[140px] object-contain pointer-events-none select-none"
                  style={{
                    filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
                  }}
                />
              </div>

              {/* CTA inside banner */}
              <div className="mx-3 mb-3 rounded-xl bg-black/30 backdrop-blur-sm px-4 h-[40px] flex items-center justify-between">
                <span className="text-white text-[13px] font-semibold">
                  지금 흔들 수 있는
                </span>
                <span className="flex items-center gap-1 text-white text-[13px] font-bold">
                  🥕 당근 <span className="text-white">3개</span>
                </span>
              </div>
            </div>
          </button>

          {/* === This Week Challenge === */}
          <div className="mx-4 mt-4 rounded-2xl bg-neutral-900/60 px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-[16px] font-bold">
                이번 주 챌린지
              </span>
              <button className="flex items-center gap-0.5 text-neutral-400 text-[12px] active:scale-95 active:text-neutral-200 transition-all duration-150">
                더보기 <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <ChallengeRow
              img="/icons/challenge-shoe.png"
              imgClass="anim-float-soft"
              title="우리 동네 2만보 걷기"
              sub="도전목표 7,642 / 20,000"
              right="7,642 걸음"
            />
            <ChallengeRow
              img="/icons/challenge-star.png"
              imgClass="anim-float-soft-late"
              title="우리 동네 맛집 3번 가기"
              sub="맛집 방문 2/3"
              right="2회 방문"
            />
          </div>

          {/* === 진행 중인 정산 === */}
          <div className="mx-4 mt-4 rounded-2xl bg-neutral-900/60 px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-[16px] font-bold">
                진행 중인 정산
              </span>
              <div className="flex items-center gap-1 bg-neutral-800/80 rounded-full p-0.5">
                <button className="px-2.5 py-1 rounded-full bg-neutral-700 text-white text-[11px] font-semibold active:scale-95 transition-transform">
                  정산 받을 돈
                </button>
                <button className="px-2.5 py-1 rounded-full text-neutral-400 text-[11px] font-semibold active:scale-95 transition-transform">
                  정산 보낼 돈
                </button>
              </div>
            </div>

            {/* Swipeable settlements */}
            <div
              ref={settlementCarouselRef}
              onScroll={handlePageScroll(setSettlementPage)}
              className="mt-3 -mx-4 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
              {SETTLEMENTS.map((s, i) => (
                <div
                  key={i}
                  className="min-w-full shrink-0 snap-start px-4"
                >
                  <SettlementRow s={s} />
                </div>
              ))}
            </div>

            <PaginationDots
              count={SETTLEMENTS.length}
              active={settlementPage}
              className="mt-3"
            />
          </div>

          {/* === 통합내역 === */}
          <div className="mx-4 mt-4 rounded-2xl bg-neutral-900/60 px-4 py-4">
            <div className="text-white text-[16px] font-bold mb-1">통합내역</div>

            {/* Swipeable transaction pages */}
            <div
              ref={txCarouselRef}
              onScroll={handlePageScroll(setTxPage)}
              className="-mx-4 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
              {TX_PAGES.map((page, p) => (
                <div
                  key={p}
                  className="min-w-full shrink-0 snap-start px-4"
                >
                  {page.map((tx, i) => (
                    <TxRow key={i} tx={tx} />
                  ))}
                </div>
              ))}
            </div>

            <PaginationDots
              count={TX_PAGES.length}
              active={txPage}
              className="mt-2"
            />
          </div>

          <div className="text-center text-neutral-600 text-[11px] mt-4 pb-4">
            당근페이 © 2026
          </div>
          </>
          )}
        </div>

        {/* === Bottom GNB === */}
        <div className="absolute bottom-0 inset-x-0 h-[80px] bg-black z-50 border-t border-neutral-900">
          <div className="absolute -top-px inset-x-6 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
          <div className="grid grid-cols-5 h-[58px] pt-2">
            <NavItem
              id="home"
              label="홈"
              active={activeTab === "home"}
              onSelect={setActiveTab}
              icon={<NavImg src="/icons/nav-home.png" active={activeTab === "home"} />}
            />
            <NavItemImage
              id="benefit"
              src="/icons/gnb-benefit.png"
              active={activeTab === "benefit"}
              onSelect={setActiveTab}
            />
            <NavItem
              id="send"
              label="송금"
              active={activeTab === "send"}
              onSelect={setActiveTab}
              icon={<NavImg src="/icons/nav-send.png" active={activeTab === "send"} />}
            />
            <NavItem
              id="pay"
              label="결제"
              active={activeTab === "pay"}
              onSelect={setActiveTab}
              icon={<NavImg src="/icons/nav-pay.png" active={activeTab === "pay"} />}
            />
            <NavItem
              id="me"
              label="나의 당근"
              active={activeTab === "me"}
              onSelect={setActiveTab}
              icon={<NavImg src="/icons/nav-me.png" active={activeTab === "me"} />}
            />
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] rounded-full bg-white" />
        </div>

        {/* === Benefit Modal === */}
        {showBenefitModal && (
          <BenefitModal onClose={() => setShowBenefitModal(false)} />
        )}
      </div>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function IconButton({ children, className = "" }) {
  return (
    <button
      className={`active:scale-90 transition-transform duration-150 ${className}`}
    >
      {children}
    </button>
  );
}

function PillButton({ icon, label }) {
  return (
    <button className="shrink-0 flex items-center gap-1.5 h-[34px] pl-1.5 pr-3.5 rounded-full bg-neutral-800 text-white text-[12px] font-semibold whitespace-nowrap active:scale-95 active:bg-neutral-700 transition-all duration-150">
      <img src={icon} alt="" className="w-[18px] h-[18px] object-contain" />
      {label}
    </button>
  );
}

function NavImg({ src, active }) {
  return (
    <img
      src={src}
      alt=""
      className="w-[22px] h-[22px] object-contain transition-all duration-300"
      style={{
        opacity: active ? 1 : 0.85,
        filter: active
          ? "brightness(0) invert(1)"
          : "brightness(0) invert(0.72)",
      }}
    />
  );
}

function NavItemImage({ id, src, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(id)}
      className="relative flex items-center justify-center active:scale-90 transition-all duration-200"
    >
      {active && (
        <span
          key={id}
          className="anim-pop absolute top-[-4px] w-[6px] h-[6px] rounded-full bg-orange-500 z-10"
        />
      )}
      <img
        src={src}
        alt=""
        className="h-[44px] w-auto object-contain transition-all duration-300"
        style={{
          opacity: active ? 1 : 0.85,
          filter: active
            ? "brightness(1.4)"
            : "grayscale(1) brightness(0.85)",
        }}
      />
    </button>
  );
}

function NavItem({ id, label, icon, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`relative flex flex-col items-center justify-center gap-1 active:scale-90 transition-all duration-200 ${
        active ? "text-white" : "text-neutral-500"
      }`}
    >
      {/* Orange indicator dot, pops in on activation */}
      {active && (
        <span
          key={id}
          className="anim-pop absolute top-[-4px] w-[6px] h-[6px] rounded-full bg-orange-500"
        />
      )}
      <span className="transition-colors duration-300">{icon}</span>
      <span className="text-[10px] font-medium transition-colors duration-300">
        {label}
      </span>
    </button>
  );
}

function TxAvatar({ tx }) {
  if (tx.kind === "netflix") {
    return (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
        <span className="text-red-600 text-[18px] font-black leading-none">
          N
        </span>
      </div>
    );
  }
  if (tx.kind === "carrot") {
    return (
      <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-[16px]">
        🥕
      </div>
    );
  }
  return (
    <div
      className={`w-9 h-9 rounded-full ${tx.bg} flex items-center justify-center text-[16px]`}
    >
      {tx.emoji}
    </div>
  );
}

function TxRow({ tx }) {
  return (
    <button className="w-full flex items-center gap-3 py-2.5 active:scale-[0.98] transition-transform duration-150">
      <div className="shrink-0">
        <TxAvatar tx={tx} />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="text-white text-[13px] font-medium truncate">
          {tx.title}
        </div>
        <div className="text-neutral-500 text-[11px] mt-0.5">{tx.date}</div>
      </div>
      <div
        className={`${tx.color} text-[13px] font-bold whitespace-nowrap`}
      >
        {tx.amount}
      </div>
    </button>
  );
}

function SettlementRow({ s }) {
  const a = s.avatars;
  return (
    <button className="w-full flex items-center gap-3 active:scale-[0.98] transition-transform duration-150">
      {/* Stacked avatars (1–4 supported) */}
      <div className="relative w-12 h-12 shrink-0">
        {a[0] && (
          <div
            className={`absolute left-0 top-0 w-7 h-7 rounded-full ${a[0].bg} flex items-center justify-center text-[14px] ring-2 ring-neutral-900`}
          >
            {a[0].emoji}
          </div>
        )}
        {a[1] && (
          <div
            className={`absolute right-0 top-0 w-7 h-7 rounded-full ${a[1].bg} flex items-center justify-center text-[14px] ring-2 ring-neutral-900`}
          >
            {a[1].emoji}
          </div>
        )}
        {a[2] && (
          <div
            className={`absolute left-0 bottom-0 w-7 h-7 rounded-full ${a[2].bg} flex items-center justify-center text-[14px] ring-2 ring-neutral-900`}
          >
            {a[2].emoji}
          </div>
        )}
        {a[3] && (
          <div
            className={`absolute right-0 bottom-0 w-7 h-7 rounded-full ${a[3].bg} flex items-center justify-center text-[14px] ring-2 ring-neutral-900`}
          >
            {a[3].emoji}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="text-white text-[13px] font-semibold truncate">
          {s.title}
        </div>
        <div className="text-neutral-500 text-[11px] mt-0.5">{s.date}</div>
      </div>
      <div className="text-white text-[13px] font-bold whitespace-nowrap">
        {s.amount}
      </div>
    </button>
  );
}

function PaginationDots({ count = 5, active = 0, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full transition-all duration-200 ${
            i === active
              ? "w-1.5 h-1.5 bg-neutral-400"
              : "w-1 h-1 bg-neutral-700"
          }`}
        />
      ))}
    </div>
  );
}

function ChallengeRow({ img, imgClass, title, sub, right }) {
  return (
    <button className="mt-3 w-full flex items-center gap-3 active:scale-[0.98] transition-transform duration-150">
      {/* No grid wrapper — icon scales up to former grid size (~48px) */}
      <img
        src={img}
        alt=""
        className={`w-12 h-12 object-contain shrink-0 ${imgClass}`}
      />
      <div className="flex-1 text-left">
        <div className="text-white text-[14px] font-semibold">{title}</div>
        <div className="text-neutral-500 text-[11px] mt-0.5">{sub}</div>
      </div>
      <div className="text-white text-[13px] font-bold">{right}</div>
    </button>
  );
}

/* ---------- Benefit Page (혜택 탭) ---------- */
function BenefitPage() {
  const [activeCat, setActiveCat] = useState("카페/디저트");
  const stores = STORES_BY_CATEGORY[activeCat] || [];

  return (
    <>
      {/* Location header */}
      <div className="px-4 mt-3">
        <button className="flex items-center gap-1.5 text-orange-500 text-[14px] font-bold active:scale-95 transition-transform">
          광진구 군자동
          <img
            src="/icons/location-target.png"
            alt=""
            aria-hidden
            className="w-[16px] h-[16px] object-contain"
            draggable={false}
          />
        </button>
        <div className="flex items-center justify-between mt-1.5">
          <h1 className="text-white text-[20px] font-extrabold tracking-tight">
            여기서 이용할 수 있어요
          </h1>
          <button className="flex items-center gap-0.5 text-neutral-400 text-[12px] active:text-neutral-200 transition-colors">
            전체 가맹점 <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="mt-3 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap gap-2 w-max">
          {BENEFIT_CATEGORIES.map((c) => {
            const active = c === activeCat;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`shrink-0 h-[32px] px-3.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 ${
                  active
                    ? "bg-[#FF7E36] text-white"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Store list — content varies by selected category */}
      <div className="px-4 mt-3 space-y-2.5">
        {stores.map((s) => (
          <BenefitStoreRow key={s.name} s={s} />
        ))}
      </div>

      {/* 지도로 보기 — show provided asset at its natural aspect ratio */}
      <button className="mx-4 mt-3 w-[calc(100%-32px)] block rounded-[14px] overflow-hidden active:scale-[0.99] transition-transform">
        <img
          src="/icons/btn-map-view.png"
          alt="지도로 보기"
          className="block w-full h-auto"
          draggable={false}
        />
      </button>

      {/* Orange benefit banner — same visual as home */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative bg-gradient-to-r from-amber-400 via-orange-500 to-orange-500 shadow-[0_8px_24px_-8px_rgba(251,146,60,0.6)]">
        <div className="px-5 pt-4 pb-3 relative min-h-[112px]">
          <div className="text-white text-[13px] font-bold">쓸수록 쌓이는 혜택</div>
          <div className="text-white/85 text-[11px] mt-0.5">최근 받은 현장결제 혜택</div>
          <div className="mt-1 flex items-center gap-1">
            <img src="/icons/brand-white.png" alt="" className="w-[18px] h-[18px] object-contain" />
            <span className="text-white text-[26px] font-extrabold tracking-tight">
              5,130 <span className="text-[20px] font-bold">원</span>
            </span>
          </div>
          <img
            src="/icons/coffee-coins.png"
            alt=""
            aria-hidden
            className="anim-float absolute right-1 -top-3 w-[130px] h-[130px] object-contain pointer-events-none select-none"
            style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}
          />
        </div>
        <div className="mx-3 mb-3 rounded-xl bg-black/30 backdrop-blur-sm px-4 h-[36px] flex items-center justify-between">
          <span className="text-white text-[12px] font-semibold">지금 흔들 수 있는</span>
          <span className="text-white text-[12px] font-bold">🥕 당근 3개</span>
        </div>
      </div>

      {/* 우리 동네 단골가게에요 */}
      <div className="mx-4 mt-4 rounded-2xl bg-neutral-900/60 px-4 py-4">
        <div className="text-white text-[16px] font-bold">우리 동네 단골가게에요</div>
        <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto scrollbar-hide px-1 pb-1">
          {MONTHLY_BENEFITS.map((m) => (
            <button
              key={m.src}
              className="shrink-0 w-[88px] rounded-[12px] overflow-hidden active:scale-[0.97] transition-transform"
            >
              <img
                src={m.src}
                alt={m.alt}
                className="block w-full h-auto"
                draggable={false}
              />
            </button>
          ))}
        </div>
        <button className="mt-4 w-full flex items-center justify-between text-neutral-300 text-[12px] active:scale-[0.98] transition-transform">
          <span>추가 혜택받고 싶은 단골가게</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Section title — same spec as "우리 동네 단골가게에요" */}
      <div className="px-4 mt-5">
        <h2 className="text-white text-[16px] font-bold tracking-tight">
          우리 동네에서 쌓는 당근머니
        </h2>
      </div>

      {/* 쉽게 얻는 혜택 */}
      <div className="mx-4 mt-3 rounded-2xl bg-neutral-900/60 px-4 py-4">
        <span className="text-white text-[16px] font-bold">쉽게 얻는 혜택</span>

        {/* 만보기 — special expanded card with progress timeline */}
        <button className="mt-3 w-full flex items-center gap-3 active:scale-[0.98] transition-transform duration-150">
          <img
            src="/icons/challenge-shoe.png"
            alt=""
            className="w-10 h-10 object-contain shrink-0"
          />
          <div className="flex-1 min-w-0 text-left">
            <div className="text-white text-[14px] font-semibold">만보기</div>
            <div className="text-neutral-500 text-[11px] mt-0.5 truncate">
              우리동네 걷고 당근머니 받기
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-500 shrink-0" />
        </button>

        {/* Walking progress timeline — matches Frame 269 spec */}
        <div className="mt-4 px-2">
          <div className="relative h-9">
            {/* Dashed connector line — passes behind the nodes */}
            <div
              className="absolute left-4 right-4 top-[22px] border-t border-dashed"
              style={{ borderColor: "#3F3F46" }}
            />

            {/* Nodes row */}
            <div className="relative flex items-end justify-between">
              {/* (1) Active — orange circle with carrot pin pointer above */}
              <div className="relative flex flex-col items-center">
                {/* Down-pointing orange marker */}
                <div
                  className="w-0 h-0 mb-1"
                  style={{
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "7px solid #FF7E36",
                  }}
                />
                <div
                  className="w-7 h-7 rounded-full bg-[#FF7E36] flex items-center justify-center"
                  style={{
                    boxShadow:
                      "0 0 0 3px rgba(255,126,54,0.18), 0 4px 8px -2px rgba(255,126,54,0.5)",
                  }}
                >
                  <img
                    src="/icons/brand-white.png"
                    alt=""
                    aria-hidden
                    className="w-[14px] h-[14px] object-contain"
                  />
                </div>
              </div>

              {/* (2) Check circle */}
              <TimelineCheck />

              {/* (3) X2 pill */}
              <TimelinePill label="X2" />

              {/* (4) Check circle */}
              <TimelineCheck />

              {/* (5) X3 pill */}
              <TimelinePill label="X3" />
            </div>
          </div>

          {/* Labels */}
          <div className="mt-3 flex justify-between items-baseline">
            <span className="text-neutral-500 text-[11px]">
              우리 동네 걷기 전
            </span>
            <span className="text-[12px]">
              <span className="text-[#FF7E36] font-extrabold">0</span>
              <span className="text-neutral-400 font-semibold">/20,000보</span>
            </span>
          </div>
        </div>

        {/* Other easy benefits */}
        <div className="mt-3 divide-y divide-neutral-800/80">
          {EASY_BENEFITS.map((b) => (
            <BenefitListRow key={b.title} b={b} />
          ))}
        </div>
        <button className="w-full mt-2 pt-3 flex items-center justify-center gap-1 text-neutral-400 text-[12px] active:text-white transition-colors">
          더 보기 <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* 크게 얻는 혜택 */}
      <div className="mx-4 mt-4 rounded-2xl bg-neutral-900/60 px-4 py-4 mb-2">
        <span className="text-white text-[16px] font-bold">크게 얻는 혜택</span>
        <div className="mt-3 divide-y divide-neutral-800/80">
          {BIG_BENEFITS.map((b) => (
            <BenefitListRow key={b.title} b={b} />
          ))}
        </div>
      </div>
    </>
  );
}

function BenefitStoreRow({ s }) {
  return (
    <button className="w-full flex items-center gap-3 active:scale-[0.98] transition-transform duration-150">
      <div className="w-[60px] h-[60px] rounded-[12px] shrink-0 relative overflow-hidden bg-neutral-800">
        {s.img ? (
          <img
            src={s.img}
            alt={s.name}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div
            className={`absolute inset-0 ${s.bg} flex items-center justify-center text-[26px]`}
          >
            <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              {s.emoji}
            </span>
          </div>
        )}
        {s.tag && (
          <span className="absolute top-1 left-1 px-1 py-0.5 rounded-[4px] bg-black/55 text-white text-[8px] font-semibold whitespace-nowrap">
            {s.tag}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="text-white text-[16px] font-bold truncate">
          {s.name}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-neutral-300 text-[12px]">
            {s.distance} · 리뷰수 {s.reviews.toLocaleString()}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span className="px-1.5 py-0.5 rounded-[4px] bg-emerald-900/60 text-emerald-300 text-[10px] font-bold">
            {s.discount} 할인
          </span>
          <span className="px-1.5 py-0.5 rounded-[4px] bg-neutral-800 text-neutral-300 text-[10px] font-bold">
            쿠폰 {s.coupons}
          </span>
        </div>
      </div>
    </button>
  );
}

function TimelineCheck() {
  return (
    <div className="relative w-6 h-6 mb-[2px] rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
      <svg
        viewBox="0 0 12 12"
        className="w-3 h-3 text-neutral-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="2.5,6.5 5,9 9.5,3.5" />
      </svg>
    </div>
  );
}

function TimelinePill({ label }) {
  return (
    <div className="px-2.5 h-6 mb-[2px] rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
      <span className="text-neutral-300 text-[11px] font-bold leading-none">
        {label}
      </span>
    </div>
  );
}

function BrandLogo({ brand }) {
  const wrap =
    "w-[52px] h-[52px] rounded-[14px] flex items-center justify-center overflow-hidden";

  if (brand.kind === "image") {
    return (
      <div className={`${wrap} bg-white`}>
        <img
          src={brand.img}
          alt={brand.name}
          className="w-[44px] h-[44px] object-contain"
          draggable={false}
        />
      </div>
    );
  }

  if (brand.kind === "naver") {
    return (
      <div className={`${wrap} bg-[#03C75A]`}>
        <span className="text-white text-[16px] font-black tracking-tight leading-none flex items-baseline">
          N<span className="text-white text-[10px] font-bold ml-0.5">pay</span>
        </span>
      </div>
    );
  }

  if (brand.kind === "cu") {
    return (
      <div className={`${wrap} bg-white border border-neutral-200`}>
        <span className="leading-none">
          <span className="text-[#7E2F2F] text-[18px] font-black italic">C</span>
          <span className="text-[#3C5994] text-[18px] font-black italic">U</span>
        </span>
      </div>
    );
  }

  if (brand.kind === "seven") {
    return (
      <div className={`${wrap} bg-white relative border border-neutral-200`}>
        {/* 7-Eleven stripes pattern */}
        <div className="absolute inset-0 flex flex-col">
          <div className="h-1/3 bg-[#EE5A24]" />
          <div className="h-1/3 bg-white" />
          <div className="h-1/3 bg-[#1E823C]" />
        </div>
        <span className="relative text-[#D4202C] text-[16px] font-black italic leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
          7
        </span>
      </div>
    );
  }

  return <div className={`${wrap} bg-neutral-700`} />;
}

function BenefitListRow({ b }) {
  return (
    <button className="w-full flex items-center gap-3 py-3 active:scale-[0.98] transition-transform duration-150">
      <div className="w-10 h-10 flex items-center justify-center shrink-0">
        {b.img ? (
          <img
            src={b.img}
            alt=""
            className="w-10 h-10 object-contain"
            draggable={false}
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-[18px]">
            {b.emoji}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-white text-[14px] font-bold tracking-tight">
            {b.title}
          </span>
          {b.tag && (
            <span className="px-1.5 py-0.5 rounded-[4px] bg-orange-500/20 text-orange-400 text-[10px] font-bold">
              {b.tag}
            </span>
          )}
        </div>
        <div className="text-neutral-400 text-[12px] mt-0.5 truncate">
          {b.sub}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-neutral-500 shrink-0" />
    </button>
  );
}
