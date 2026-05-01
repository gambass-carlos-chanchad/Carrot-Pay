import React, { useRef, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  MoreVertical,
  Wifi,
  Signal,
  BatteryFull,
  ChevronRight,
} from "lucide-react";

/* ---------- Benefit Modal ---------- */
function BenefitModal({ onClose }) {
  return (
    <div
      className="absolute inset-0 z-[80] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop: #000000 @ 44% opacity */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.44)" }}
      />

      {/* Sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[330px] max-h-[720px] overflow-y-auto scrollbar-hide rounded-[24px] bg-white shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] anim-modal-in"
      >
        {/* === Section 1: Hero with carrot pin === */}
        <div className="px-6 pt-7 pb-6 flex flex-col items-center text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-[12px] font-bold">
            단골당근
          </span>
          <h2 className="mt-3 text-gray-900 text-[20px] font-extrabold tracking-tight">
            오늘 우리동네 단골가게 혜택은?
          </h2>
          <p className="mt-2 text-gray-400 text-[12px] leading-[1.5]">
            우리동네 단골가게에 등록된
            <br />
            다양한 혜택들을 지금 확인해보세요
          </p>

          {/* 3D carrot pin (CSS) */}
          <div className="relative my-6 h-[180px] w-[140px] anim-float-soft">
            {/* leaf */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
              <div
                className="w-[40px] h-[40px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #4ade80, #15803d 70%)",
                  boxShadow:
                    "inset -4px -6px 8px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)",
                }}
              />
              <div
                className="w-[34px] h-[34px] rounded-full -mt-6 ml-3"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #4ade80, #166534 75%)",
                  boxShadow:
                    "inset -4px -6px 8px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)",
                }}
              />
            </div>
            {/* carrot pin body (teardrop) */}
            <div
              className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[120px] h-[140px]"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #fb923c, #ea580c 70%, #c2410c)",
                borderRadius: "50% 50% 50% 50% / 45% 45% 60% 60%",
                clipPath:
                  "polygon(50% 100%, 0% 50%, 8% 25%, 30% 8%, 50% 0%, 70% 8%, 92% 25%, 100% 50%)",
                boxShadow:
                  "inset -8px -12px 20px rgba(0,0,0,0.25), 0 16px 28px -6px rgba(234,88,12,0.45)",
              }}
            >
              {/* inner white hole */}
              <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[28px] h-[28px] rounded-full bg-white shadow-[inset_2px_4px_6px_rgba(0,0,0,0.18)]" />
            </div>
          </div>

          {/* Shake CTA pill */}
          <button className="px-5 py-2.5 rounded-full bg-orange-400 text-white text-[13px] font-bold active:scale-95 transition-transform shadow-[0_4px_10px_-2px_rgba(251,146,60,0.5)]">
            당근을 흔들어 확인해보세요
          </button>
        </div>

        {/* === Divider === */}
        <div className="h-px bg-gray-100 mx-6" />

        {/* === Section 2: Franchise discounts === */}
        <div className="px-6 pt-6 pb-5 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-[12px] font-bold">
            단골당근
          </span>
          <h2 className="mt-3 text-gray-900 text-[18px] font-extrabold tracking-tight">
            우리동네 단골 가맹점 혜택은?
          </h2>
          <p className="mt-2 text-gray-400 text-[12px] leading-[1.5]">
            우리동네 단골가게에 등록된
            <br />
            다양한 혜택들을 지금 확인해보세요
          </p>

          {/* Cards horizontal scroll */}
          <div className="mt-5 -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2.5 w-max pb-2">
              <FranchiseCard
                logo={
                  <span className="text-[#00a3e0] text-[26px] font-black leading-none tracking-tight">
                    GS<span className="align-top text-[18px]">25</span>
                  </span>
                }
                name="GS25"
                discount="3%"
              />
              <FranchiseCard
                logo={
                  <div className="flex flex-col items-center">
                    <span className="text-black text-[10px] font-black leading-none">
                      ▮
                    </span>
                    <span className="text-black text-[18px] font-black leading-none -mt-0.5">
                      MGC
                    </span>
                  </div>
                }
                name="메가MGC커피"
                discount="5%"
              />
              <FranchiseCard
                logo={
                  <div className="w-[44px] h-[44px] rounded-full bg-[#0a2b5e] flex flex-col items-center justify-center text-white">
                    <span className="text-[5px] font-bold tracking-[0.05em]">
                      PARIS BAGUETTE
                    </span>
                    <span className="text-[16px] font-black italic leading-none">
                      B
                    </span>
                  </div>
                }
                name="파리바게트"
                discount="4.5%"
              />
              <FranchiseCard
                logo={
                  <div className="w-[44px] h-[44px] rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-[7px] font-black tracking-tight leading-none text-center">
                      COMPOSE
                      <br />
                      COFFEE
                    </span>
                  </div>
                }
                name="컴포즈커피"
                discount="4%"
              />
            </div>
          </div>

          {/* Primary CTA */}
          <button className="mt-5 w-full h-[48px] rounded-xl bg-orange-500 text-white text-[14px] font-bold active:scale-[0.98] transition-transform shadow-[0_6px_14px_-4px_rgba(249,115,22,0.55)]">
            더 많은 가맹점 혜택 확인하기
          </button>

          {/* Dismiss link */}
          <button
            onClick={onClose}
            className="mt-4 text-gray-400 text-[12px] active:scale-95 transition-transform"
          >
            하루 동안 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
}

function FranchiseCard({ logo, name, discount }) {
  return (
    <div className="shrink-0 w-[88px] rounded-[14px] bg-gray-100 flex flex-col overflow-hidden">
      <div className="bg-white rounded-[14px] m-1.5 mb-0 p-2 flex flex-col items-center gap-2">
        <div className="w-[44px] h-[44px] rounded-[10px] bg-white flex items-center justify-center">
          {logo}
        </div>
        <div className="text-[11px] font-semibold text-gray-700 leading-tight">
          {name}
        </div>
        <div className="text-[#00a3e0] text-[13px] font-extrabold leading-none">
          {discount} <span className="font-bold">할인</span>
        </div>
      </div>
      {/* Barcode footer */}
      <div className="h-[28px] flex items-center justify-center">
        <div className="flex items-center gap-[1.5px]">
          {[1, 2, 1, 2, 3, 1, 2, 1, 2, 1].map((w, i) => (
            <div
              key={i}
              style={{ width: `${w}px` }}
              className="h-[14px] bg-gray-400 rounded-[1px]"
            />
          ))}
        </div>
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
  const scrollRef = useRef(null);

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

        .anim-float            { animation: floaty 4.2s ease-in-out infinite; }
        .anim-float-soft       { animation: floaty-soft 3.0s ease-in-out infinite; }
        .anim-float-soft-late  { animation: floaty-soft 3.4s ease-in-out infinite 0.6s; }
        .anim-pop              { animation: pop-in 360ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .anim-modal-in         { animation: modal-in 280ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
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
              <div className="flex items-center gap-1">
                <img
                  src="/icons/brand-orange.png"
                  alt="당근페이"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-white text-[20px] font-bold tracking-tight">
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

          {/* === Daangn Money White Card === */}
          <div className="mx-4 mt-2 rounded-2xl bg-white px-5 pt-4 pb-4 relative">
            {/* Pagination dots */}
            <div className="absolute top-3 right-4 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            </div>

            {/* Money row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <img
                  src="/icons/brand-orange.png"
                  alt=""
                  className="w-[18px] h-[18px] object-contain"
                />
                <span className="text-[14px] font-semibold text-gray-800">
                  당근머니
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-bold text-gray-900 tracking-tight">
                  50,000
                  <span className="text-[15px] font-semibold ml-0.5">원</span>
                </span>
                <button className="active:scale-90 transition-transform">
                  <MoreVertical className="w-[14px] h-[14px] text-gray-500" />
                </button>
              </div>
            </div>

            {/* Barcode + QR */}
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
                      className={`h-full ${isBlack ? "bg-black" : "bg-white"}`}
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

            {/* Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="h-[40px] rounded-lg bg-gray-100 text-[14px] font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition-all duration-150">
                충전
              </button>
              <button className="h-[40px] rounded-lg bg-gray-100 text-[14px] font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition-all duration-150">
                송금
              </button>
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
              <span className="text-white text-[15px] font-bold">
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
              <span className="text-white text-[15px] font-bold">
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

            <button className="mt-3 w-full flex items-center gap-3 active:scale-[0.98] transition-transform duration-150">
              {/* Stacked avatars */}
              <div className="relative w-12 h-12 shrink-0">
                <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-[14px] ring-2 ring-neutral-900">
                  😀
                </div>
                <div className="absolute right-0 top-0 w-7 h-7 rounded-full bg-yellow-300 flex items-center justify-center text-[14px] ring-2 ring-neutral-900">
                  😎
                </div>
                <div className="absolute left-0 bottom-0 w-7 h-7 rounded-full bg-purple-400 flex items-center justify-center text-[14px] ring-2 ring-neutral-900">
                  🤓
                </div>
                <div className="absolute right-0 bottom-0 w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center text-[14px] ring-2 ring-neutral-900">
                  🤩
                </div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-white text-[13px] font-semibold truncate">
                  삐엠, 감바스 까블로스 찬차드,...
                </div>
                <div className="text-neutral-500 text-[11px] mt-0.5">
                  요청일 2025.03.07 (금) 21:23
                </div>
              </div>
              <div className="text-white text-[13px] font-bold whitespace-nowrap">
                22,500 원
              </div>
            </button>

            <PaginationDots count={5} active={0} className="mt-3" />
          </div>

          {/* === 통합내역 === */}
          <div className="mx-4 mt-4 rounded-2xl bg-neutral-900/60 px-4 py-4">
            <div className="text-white text-[15px] font-bold mb-1">통합내역</div>

            <TxRow
              avatar={
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                  <span className="text-red-600 text-[18px] font-black leading-none">
                    N
                  </span>
                </div>
              }
              title="Netflix·Netflix Subscript..."
              date="2025.03.07 22:37"
              amount="-13,500 원"
              amountColor="text-white"
            />
            <TxRow
              avatar={
                <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-[16px]">
                  🥕
                </div>
              }
              title="받기 | 임기창(임*창)"
              date="2025.02.24 23:52"
              amount="+7,500 원"
              amountColor="text-orange-400"
            />
            <TxRow
              avatar={
                <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-[16px]">
                  😎
                </div>
              }
              title="송금 | 당근페이머니 → 최다영(최*영)"
              date="2025.02.24 23:52"
              amount="-29,756 원"
              amountColor="text-white"
            />

            <PaginationDots count={5} active={0} className="mt-2" />
          </div>

          <div className="text-center text-neutral-600 text-[11px] mt-4 pb-4">
            당근페이 © 2026
          </div>
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
        opacity: active ? 1 : 0.55,
        filter: active
          ? "brightness(0) invert(1)"
          : "grayscale(1) brightness(1.4)",
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
          opacity: active ? 1 : 0.7,
          filter: active ? "brightness(1.4)" : "none",
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

function TxRow({ avatar, title, date, amount, amountColor = "text-white" }) {
  return (
    <button className="w-full flex items-center gap-3 py-2.5 active:scale-[0.98] transition-transform duration-150">
      <div className="shrink-0">{avatar}</div>
      <div className="flex-1 min-w-0 text-left">
        <div className="text-white text-[13px] font-medium truncate">
          {title}
        </div>
        <div className="text-neutral-500 text-[11px] mt-0.5">{date}</div>
      </div>
      <div
        className={`${amountColor} text-[13px] font-bold whitespace-nowrap`}
      >
        {amount}
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
