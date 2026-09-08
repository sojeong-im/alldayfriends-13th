import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  User, 
  Compass, 
  Smile, 
  CalendarCheck, 
  Check, 
  AlertCircle,
  Eye,
  X,
  Share2,
  Download
} from 'lucide-react';
import { 
  THEMES, 
  THEME_LEVELS, 
  PLAY_POSITIONS, 
  FIRST_MEETING_STYLES, 
  DAYS, 
  TIMES, 
  PARTICIPATION_FREQUENCIES, 
  APPLY_REASONS, 
  CHECKLIST_ITEMS 
} from './data/formQuestions';
import CrewPassCard from './components/CrewPassCard';
import posterImg from './assets/poster.jpg';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showMobilePass, setShowMobilePass] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);

  // 폼 상태
  const [formData, setFormData] = useState({
    // Step 1. 프로필
    name: '',
    gender: '',
    age: '',
    school: '',
    major: '',
    grade: '',
    subwayStation: '',
    phone: '',

    // Step 2. 취향 테마
    theme: '',
    themeLevel: 3,
    themeWish: '',

    // Step 3. 소셜 & 성향
    positions: [],
    firstMeeting: '',
    wantedFriends: '',
    reasons: [],
    customReason: '',

    // Step 4. 일정 & 서약
    availableSlots: {},
    frequency: '',
    mustDoAction: '',
    agreedItems: {},
  });

  // 입력 핸들러
  const handleTextChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => {
      const list = prev[field] || [];
      return {
        ...prev,
        [field]: list.includes(item)
          ? list.filter((i) => i !== item)
          : [...list, item],
      };
    });
  };

  const toggleSlot = (day, time) => {
    const key = `${day}_${time}`;
    setFormData((prev) => ({
      ...prev,
      availableSlots: {
        ...prev.availableSlots,
        [key]: !prev.availableSlots[key],
      },
    }));
  };

  const toggleChecklist = (id) => {
    setFormData((prev) => ({
      ...prev,
      agreedItems: {
        ...prev.agreedItems,
        [id]: !prev.agreedItems[id],
      },
    }));
  };

  const handleAllAgree = () => {
    const allChecked = CHECKLIST_ITEMS.every((item) => formData.agreedItems[item.id]);
    const updated = {};
    CHECKLIST_ITEMS.forEach((item) => {
      updated[item.id] = !allChecked;
    });
    setFormData((prev) => ({ ...prev, agreedItems: updated }));
  };

  // 진행도 계산
  const calculateProgress = () => {
    let score = 0;
    if (formData.name) score += 1;
    if (formData.gender && formData.age) score += 1;
    if (formData.school) score += 1;
    if (formData.subwayStation) score += 1;
    if (formData.phone) score += 1;
    if (formData.theme) score += 2;
    if (formData.themeWish) score += 1;
    if (formData.positions.length > 0) score += 1;
    if (formData.firstMeeting) score += 1;
    if (Object.values(formData.availableSlots).some(Boolean)) score += 1;
    if (formData.frequency) score += 1;
    if (CHECKLIST_ITEMS.every((i) => formData.agreedItems[i.id])) score += 2;
    return Math.min(100, Math.round((score / 14) * 100));
  };

  const progress = calculateProgress();

  // 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    const allAgreed = CHECKLIST_ITEMS.every((item) => formData.agreedItems[item.id]);
    if (!allAgreed) {
      alert('지원 전 확인사항 5개 항목에 모두 동의해주세요!');
      return;
    }

    setIsSubmitted(true);
    // 콘페티 팡팡
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const steps = [
    { num: 1, title: '기본 프로필', icon: User, desc: '이름, 학교, 거주지' },
    { num: 2, title: '취향 & 테마', icon: Compass, desc: '5대 테마 & 관심도' },
    { num: 3, title: '소셜 & 성향', icon: Smile, desc: '노는 방식 & 목적' },
    { num: 4, title: '일정 & 확인', icon: CalendarCheck, desc: '시간대 & 규칙 동의' },
  ];

  return (
    <div className="min-h-screen paper-grid py-6 sm:py-10 px-4 sm:px-6 relative selection:bg-[#1854F2] selection:text-white">
      {/* 배경 장식 스티커들 */}
      <div className="fixed top-12 left-6 w-16 h-7 tape-pink rotate-[-12deg] pointer-events-none hidden lg:block opacity-75" />
      <div className="fixed bottom-16 right-8 w-20 h-8 tape-yellow rotate-[14deg] pointer-events-none hidden lg:block opacity-75" />

      {/* 헤더 바 */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-[#1E293B] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1854F2] text-white flex items-center justify-center font-black font-marker text-xl shadow-md rotate-[-3deg]">
              13
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-marker text-xl sm:text-2xl text-[#1854F2] tracking-wider uppercase">
                  ALL DAY FRIENDS
                </span>
                <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  신청 폼
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                청춘의 주말과 여가를 채우는 13기 소모임 신청
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPosterModal(true)}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              13기 포스터 보기
            </button>
            <div className="text-right pl-3 border-l border-slate-200 hidden sm:block">
              <span className="text-[11px] font-bold text-slate-400 uppercase">티켓 완성도</span>
              <div className="text-sm font-black text-[#1854F2]">{progress}%</div>
            </div>
          </div>
        </div>

        {/* 상단 스텝 프로그레스 바 */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl border-2 transition text-left cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#1854F2] shadow-sm'
                    : isDone
                    ? 'bg-blue-50/70 border-blue-200 text-slate-700'
                    : 'bg-white/60 border-slate-200 text-slate-400 hover:bg-white'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? 'bg-[#1854F2] text-white'
                      : isDone
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <div className="hidden md:block truncate">
                  <div className={`text-xs font-bold ${isActive ? 'text-[#1854F2]' : 'text-slate-700'}`}>
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{step.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </header>

      {/* 메인 콘텐츠 영역: 폼(좌) + 실시간 크루 패스(우) */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 좌측 폼 본문 */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#1E293B] shadow-sm relative">
          <form onSubmit={handleSubmit}>
            {/* STEP 1. 기본 프로필 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1854F2] text-xs font-black mb-2">
                    STEP 1 of 4
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    먼저, 당신에 대해 알려주세요! ✨
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    동아리 운영 및 조 편성을 위한 기본 정보입니다.
                  </p>
                </div>

                {/* Q1. 이름 / 성별 / 나이 */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">1</span>
                    이름 / 성별 / 나이를 알려주세요.
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="이름 (예: 홍길동)"
                      value={formData.name}
                      onChange={(e) => handleTextChange('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                      required
                    />
                    <div className="flex rounded-2xl border-2 border-slate-200 overflow-hidden bg-slate-50 p-1">
                      {['남성', '여성'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleTextChange('gender', g)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            formData.gender === g
                              ? 'bg-[#1854F2] text-white shadow-xs'
                              : 'text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="나이 (예: 24)"
                      value={formData.age}
                      onChange={(e) => handleTextChange('age', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                      min="19"
                      max="35"
                    />
                  </div>
                </div>

                {/* Q2. 학교 / 학과 / 학년 */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">2</span>
                    현재 다니고 있는 학교와 학과를 알려주세요.
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="학교 (예: 중앙대)"
                      value={formData.school}
                      onChange={(e) => handleTextChange('school', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                      required
                    />
                    <input
                      type="text"
                      placeholder="학과 (예: 경영학과)"
                      value={formData.major}
                      onChange={(e) => handleTextChange('major', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                    />
                    <select
                      value={formData.grade}
                      onChange={(e) => handleTextChange('grade', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium bg-white"
                    >
                      <option value="">학년 선택</option>
                      <option value="1학년">1학년</option>
                      <option value="2학년">2학년</option>
                      <option value="3학년">3학년</option>
                      <option value="4학년">4학년</option>
                      <option value="휴학/졸업예정">휴학 / 졸업예정</option>
                      <option value="대학원생/기타">대학원생 / 기타</option>
                    </select>
                  </div>
                </div>

                {/* Q3. 거주지 / 주요 활동 지역 (가까운 지하철역) */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">3</span>
                    현재 거주하거나 주로 생활하는 지역은 어디인가요?
                    <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    가까운 지하철역 기준으로 작성해주세요. (예: 신촌역 / 사당역 / 건대입구역)
                  </p>
                  <input
                    type="text"
                    placeholder="가까운 지하철역 (예: 신촌역)"
                    value={formData.subwayStation}
                    onChange={(e) => handleTextChange('subwayStation', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                    required
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['신촌역', '홍대입구역', '혜화역', '사당역', '건대입구역', '강남역', '잠실역'].map((station) => (
                      <button
                        key={station}
                        type="button"
                        onClick={() => handleTextChange('subwayStation', station)}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                      >
                        +{station}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q4. 연락처 */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">4</span>
                    연락 가능한 연락처를 입력해주세요.
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="예) 010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => handleTextChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium font-mono"
                    required
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3.5 rounded-2xl bg-[#1854F2] hover:bg-blue-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    다음: 테마 선택하기
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2. 취향 & 테마 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1854F2] text-xs font-black mb-2">
                    STEP 2 of 4
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    올데프에서 어떤 취향을 나누고 싶나요? 🎨
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    포스터에 소개된 5대 테마 중 가장 끌리는 1개를 선택해주세요.
                  </p>
                </div>

                {/* Q5. 테마 선택 (1개 선택) */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">5</span>
                    가장 들어가고 싶은 테마를 선택해주세요.
                    <span className="text-rose-500">* (1개 선택)</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {THEMES.map((theme) => {
                      const isSelected = formData.theme === theme.id;
                      return (
                        <div
                          key={theme.id}
                          onClick={() => handleTextChange('theme', theme.id)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white shadow-md scale-[1.01]'
                              : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          {/* 마스킹 테이프 라벨 */}
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-md ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {theme.badge}
                            </span>
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                                isSelected
                                  ? 'border-white bg-white text-slate-900'
                                  : 'border-slate-300'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </span>
                          </div>

                          <div className="mt-2.5">
                            <h4 className="text-lg font-black font-marker tracking-wide">
                              {theme.enTitle}
                            </h4>
                            <div className={`text-xs font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                              {theme.title}
                            </div>
                            <p className={`text-xs mt-1.5 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                              {theme.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Q6. 선택한 테마, 나는 어느 정도인가요? (뉴비 ~ 고인물) */}
                <div className="space-y-3 pt-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">6</span>
                    선택한 테마, 나는 어느 정도인가요?
                    <span className="text-rose-500">*</span>
                  </label>

                  <div className="space-y-2">
                    {THEME_LEVELS.map((item) => {
                      const isSelected = formData.themeLevel === item.level;
                      return (
                        <div
                          key={item.level}
                          onClick={() => handleTextChange('themeLevel', item.level)}
                          className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition ${
                            isSelected
                              ? 'border-[#1854F2] bg-blue-50/80 text-blue-900 font-extrabold shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{item.emoji}</span>
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-[#1854F2] bg-[#1854F2]' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Q7. 해보고 싶은 활동 서술 */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">7</span>
                    선택한 테마에서 요즘 가장 해보고 싶은 활동은 무엇인가요?
                  </label>
                  <p className="text-xs text-slate-500">
                    자유롭게 적어주세요. (예: 야구 원정 직관 / 성수 팝업 투어 / 밤새 보드게임)
                  </p>
                  <textarea
                    rows={3}
                    placeholder="예) 성수 디저트 카페 도장깨기 하고 날씨 좋을 때 한강에서 돗자리 펴고 수다 떨고 싶어요!"
                    value={formData.themeWish}
                    onChange={(e) => handleTextChange('themeWish', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                  />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-sm flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전으로
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3.5 rounded-2xl bg-[#1854F2] hover:bg-blue-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    다음: 나의 모임 성향
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3. 소셜 & 성향 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1854F2] text-xs font-black mb-2">
                    STEP 3 of 4
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    친구들과 함께할 때의 나는? 🤝
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    서로 케미가 잘 맞는 최적의 조 편성을 위한 질문들입니다.
                  </p>
                </div>

                {/* Q8. 놀 때 포지션 (복수 선택) */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">8</span>
                    친구들과 놀 때 나는 어떤 포지션에 가까운가요?
                    <span className="text-blue-600 text-xs font-semibold">(복수 선택 가능)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PLAY_POSITIONS.map((pos) => {
                      const isSelected = formData.positions.includes(pos);
                      return (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => toggleArrayItem('positions', pos)}
                          className={`p-3 rounded-2xl border-2 text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{pos}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Q9. 새로운 모임에 처음 갔을 때 (단일 선택) */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">9</span>
                    새로운 모임에 처음 갔을 때 나는?
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {FIRST_MEETING_STYLES.map((style) => {
                      const isSelected = formData.firstMeeting === style;
                      return (
                        <div
                          key={style}
                          onClick={() => handleTextChange('firstMeeting', style)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                            isSelected
                              ? 'border-[#1854F2] bg-blue-50/80 text-blue-900 font-extrabold'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium text-sm'
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{style}</span>
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#1854F2] bg-[#1854F2]' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Q10. 올데프에서 어떤 친구를 만나고 싶나요? */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">10</span>
                    올데프에서 어떤 친구를 만나고 싶나요?
                  </label>
                  <p className="text-xs text-slate-500">
                    예) 갑자기 야구 보러 가자고 해도 같이 갈 수 있는 친구 / 취향 공유할 수 있는 친구
                  </p>
                  <input
                    type="text"
                    placeholder="만나고 싶은 크루의 스타일을 자유롭게 적어주세요!"
                    value={formData.wantedFriends}
                    onChange={(e) => handleTextChange('wantedFriends', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                  />
                </div>

                {/* Q13. 지원 이유 (복수 선택 + 기타) */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">13</span>
                    올데프에 지원하게 된 이유는 무엇인가요?
                    <span className="text-blue-600 text-xs font-semibold">(복수 선택 가능)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {APPLY_REASONS.map((reason) => {
                      const isSelected = formData.reasons.includes(reason);
                      return (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => toggleArrayItem('reasons', reason)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {reason}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    placeholder="기타 사유가 있다면 적어주세요 (선택)"
                    value={formData.customReason}
                    onChange={(e) => handleTextChange('customReason', e.target.value)}
                    className="w-full mt-2 px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs transition font-medium"
                  />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-sm flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전으로
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3.5 rounded-2xl bg-[#1854F2] hover:bg-blue-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    다음: 일정 & 필수 서약
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4. 일정 & 약속 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1854F2] text-xs font-black mb-2">
                    STEP 4 of 4
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    마지막 단계! 일정과 안내사항 확인 🗓️
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    활동 가능한 시간표를 탭하고, 지원 전 확인사항을 체크해주세요.
                  </p>
                </div>

                {/* Q11. 활동 가능 요일과 시간대 매트릭스 그리드 */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">11</span>
                    활동 가능한 요일과 시간대를 모두 선택해주세요.
                    <span className="text-blue-600 text-xs font-semibold">(중복 선택 가능)</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    해당하는 요일의 낮/저녁 칸을 가볍게 탭해주세요.
                  </p>

                  <div className="border-2 border-slate-900 rounded-2xl overflow-hidden bg-slate-50 shadow-xs">
                    <div className="grid grid-cols-8 text-center bg-slate-900 text-white text-xs font-bold py-2">
                      <div className="text-slate-400">시간</div>
                      {DAYS.map((day) => (
                        <div key={day} className={day === '토' ? 'text-blue-300' : day === '일' ? 'text-rose-300' : ''}>
                          {day}
                        </div>
                      ))}
                    </div>

                    {TIMES.map((time) => (
                      <div key={time} className="grid grid-cols-8 border-t border-slate-200">
                        <div className="py-3 px-1 text-center font-bold text-xs bg-slate-100 text-slate-600 flex items-center justify-center">
                          {time}
                        </div>
                        {DAYS.map((day) => {
                          const isChecked = !!formData.availableSlots[`${day}_${time}`];
                          return (
                            <button
                              key={`${day}_${time}`}
                              type="button"
                              onClick={() => toggleSlot(day, time)}
                              className={`py-3 flex items-center justify-center border-l border-slate-200 transition cursor-pointer ${
                                isChecked
                                  ? 'bg-[#1854F2] text-white font-black'
                                  : 'bg-white hover:bg-blue-50 text-slate-400'
                              }`}
                            >
                              {isChecked ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-[10px]">+</span>}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q12. 한 달 참여 빈도 */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">12</span>
                    한 달에 어느 정도 활동 참여가 가능한가요?
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PARTICIPATION_FREQUENCIES.map((freq) => {
                      const isSelected = formData.frequency === freq;
                      return (
                        <div
                          key={freq}
                          onClick={() => handleTextChange('frequency', freq)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                            isSelected
                              ? 'border-[#1854F2] bg-blue-50/80 text-blue-900 font-extrabold'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium text-xs sm:text-sm'
                          }`}
                        >
                          <span>{freq}</span>
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#1854F2] bg-[#1854F2]' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Q14. 올데프에서 꼭 해보고 싶은 것 하나 */}
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1854F2] text-white flex items-center justify-center text-xs">14</span>
                    올데프에서 꼭 해보고 싶은 것 하나를 적어주세요.
                  </label>
                  <p className="text-xs text-slate-500">
                    거창하지 않아도 좋아요. 같이 해보고 싶은 활동을 자유롭게 적어주세요.
                  </p>
                  <textarea
                    rows={2}
                    placeholder="예) 한강 피크닉에서 라면 먹기, 조원들이랑 야구장에서 목청껏 응원하기!"
                    value={formData.mustDoAction}
                    onChange={(e) => handleTextChange('mustDoAction', e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-sm transition font-medium"
                  />
                </div>

                {/* 지원 전 확인해주세요 (체크리스트) */}
                <div className="pt-4 bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-300/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-800" />
                      <h4 className="text-sm sm:text-base font-black text-amber-950">
                        지원 전 확인해주세요
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={handleAllAgree}
                      className="text-xs font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      모두 동의하기
                    </button>
                  </div>

                  <p className="text-xs text-amber-800">
                    아래 내용을 모두 확인한 후 체크해주세요.
                  </p>

                  <div className="space-y-2.5">
                    {CHECKLIST_ITEMS.map((item) => {
                      const isChecked = !!formData.agreedItems[item.id];
                      return (
                        <label
                          key={item.id}
                          className="flex items-start gap-3 cursor-pointer group select-none"
                        >
                          <div
                            onClick={() => toggleChecklist(item.id)}
                            className={`w-5 h-5 mt-0.5 rounded-lg border-2 flex items-center justify-center shrink-0 transition ${
                              isChecked
                                ? 'bg-[#1854F2] border-[#1854F2] text-white'
                                : 'bg-white border-amber-400 group-hover:border-amber-600'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span
                            onClick={() => toggleChecklist(item.id)}
                            className={`text-xs sm:text-sm font-medium leading-tight ${
                              isChecked ? 'text-amber-950 font-bold' : 'text-amber-900'
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 최종 제출 버튼 */}
                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-sm flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전으로
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1854F2] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-black text-base flex items-center gap-2 shadow-lg hover:shadow-xl transition transform active:scale-95 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    올데프 13기 지원서 제출하기
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* 우측 데스크탑 실시간 크루 패스 프리뷰 (Sticky) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              실시간 완성되는 13기 크루 패스
            </span>
            <span className="text-xs font-bold text-[#1854F2] bg-blue-50 px-2 py-0.5 rounded-md">
              LIVE PREVIEW
            </span>
          </div>

          <CrewPassCard formData={formData} />

          <p className="text-[11px] text-center text-slate-400 font-medium">
            작성하는 답변에 따라 당신만의 올데프 13기 패스가 실시간으로 커스텀됩니다! ✨
          </p>
        </div>
      </main>

      {/* 모바일 하단 플로팅 패스 보기 버튼 */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <button
          onClick={() => setShowMobilePass(true)}
          className="w-full py-3.5 px-4 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center justify-between border border-slate-700 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold">내 13기 크루 패스 보기</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-300">{progress}% 완료</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* 모바일 크루 패스 바텀시트 모달 */}
      {showMobilePass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#FAF7F0] w-full max-w-md rounded-3xl p-5 border-2 border-slate-900 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-marker text-lg text-slate-900">MY 13TH PASS</span>
              <button
                onClick={() => setShowMobilePass(false)}
                className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <CrewPassCard formData={formData} />
          </div>
        </div>
      )}

      {/* 13기 포스터 보기 모달 */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden border-2 border-slate-900 shadow-2xl relative">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-marker tracking-wide text-sm">ALL DAY FRIENDS 13TH POSTER</span>
              <button
                onClick={() => setShowPosterModal(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 bg-slate-100 flex justify-center max-h-[75vh] overflow-y-auto">
              <img src={posterImg} alt="올데프 13기 포스터" className="rounded-2xl max-w-full object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* 최종 제출 완료 모달 */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] max-w-lg w-full rounded-3xl p-6 sm:p-8 border-3 border-[#1854F2] shadow-2xl text-center space-y-5 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-[#1854F2] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="font-marker text-sm text-[#1854F2] uppercase tracking-wider">APPLICATION COMPLETE</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                지원서가 성공적으로 접수되었습니다! 🎉
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                {formData.name || '지원자'}님의 올데프 13기 크루 패스가 발급되었습니다.<br />
                서류 검토 후 입력해주신 연락처({formData.phone || '휴대폰 번호'})로 안내드릴 예정입니다.
              </p>
            </div>

            <div className="text-left">
              <CrewPassCard formData={formData} isModal={true} />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert('크루 패스를 캡처하여 보관해주세요! 📸');
                }}
                className="flex-1 py-3.5 rounded-2xl bg-white border-2 border-slate-900 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-slate-50 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                패스 캡처 저장
              </button>
              <button
                onClick={() => setIsSubmitted(false)}
                className="flex-1 py-3.5 rounded-2xl bg-[#1854F2] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-blue-700 transition cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
