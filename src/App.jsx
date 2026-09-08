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
  Download,
  Camera
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
import ActivityGallery from './components/ActivityGallery';
import posterImg from './assets/poster.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState('form'); // 'form' | 'gallery'
  const [currentStep, setCurrentStep] = useState(1);
  const [showMobilePass, setShowMobilePass] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);

  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    school: '',
    major: '',
    grade: '',
    subwayStation: '',
    phone: '',
    theme: '',
    themeLevel: 3,
    themeWish: '',
    positions: [],
    firstMeeting: '',
    wantedFriends: '',
    reasons: [],
    customReason: '',
    availableSlots: {},
    frequency: '',
    mustDoAction: '',
    agreedItems: {},
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const allAgreed = CHECKLIST_ITEMS.every((item) => formData.agreedItems[item.id]);
    if (!allAgreed) {
      alert('지원 전 확인사항 5개 항목에 모두 동의해주세요!');
      return;
    }

    setIsSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const steps = [
    { num: 1, title: '프로필' },
    { num: 2, title: '취향·테마' },
    { num: 3, title: '성향' },
    { num: 4, title: '일정·확인' },
  ];

  return (
    <div className="min-h-screen paper-grid py-6 sm:py-8 px-4 sm:px-6 relative selection:bg-[#1854F2] selection:text-white">
      {/* 장식 테이프 */}
      <div className="fixed top-12 left-6 w-16 h-7 tape-pink rotate-[-12deg] pointer-events-none hidden lg:block opacity-75" />
      <div className="fixed bottom-16 right-8 w-20 h-8 tape-yellow rotate-[14deg] pointer-events-none hidden lg:block opacity-75" />

      {/* 헤더 바: 글자 수 대폭 축소, 깔끔한 타이포그래피 */}
      <header className="max-w-5xl mx-auto mb-6 space-y-3">
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border-2 border-slate-900 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1854F2] text-white flex items-center justify-center font-black font-marker text-lg shadow-sm rotate-[-2deg]">
              13
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-marker text-lg sm:text-xl text-[#1854F2] tracking-wider uppercase">
                  ALL DAY FRIENDS
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                  13기
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPosterModal(true)}
              className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              포스터
            </button>
            <div className="text-right pl-2 border-l border-slate-200 hidden sm:block">
              <span className="text-xs font-black text-[#1854F2]">{progress}%</span>
            </div>
          </div>
        </div>

        {/* 2대 메인 네비게이션 버튼: 글자 군더더기 없이 심플하게 */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setCurrentTab('form')}
            className={`py-3 px-4 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
              currentTab === 'form'
                ? 'bg-[#1854F2] border-[#1854F2] text-white shadow-sm'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>📝 13기 신청하기</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentTab('gallery')}
            className={`py-3 px-4 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
              currentTab === 'gallery'
                ? 'bg-rose-500 border-rose-600 text-white shadow-sm'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>📸 활동 사진첩 (29)</span>
          </button>
        </div>

        {/* 폼 탭일 때 스텝 프로그레스 바: 심플한 칩 형태 */}
        {currentTab === 'form' && (
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {steps.map((step) => {
              const isActive = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`py-2 px-1 rounded-xl border-2 transition text-center text-xs font-bold cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#1854F2] text-[#1854F2] shadow-xs'
                      : isDone
                      ? 'bg-blue-50 border-blue-200 text-slate-700'
                      : 'bg-white/60 border-slate-200 text-slate-400 hover:bg-white'
                  }`}
                >
                  {isDone ? `✓ ${step.title}` : `${step.num}. ${step.title}`}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* 탭 콘텐츠 */}
      {currentTab === 'gallery' ? (
        <main className="max-w-5xl mx-auto">
          <ActivityGallery onGoToForm={() => setCurrentTab('form')} />
        </main>
      ) : (
        /* 메인 폼 */
        <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 좌측 폼 본문 */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#1E293B] shadow-sm relative">
            <form onSubmit={handleSubmit}>
              {/* STEP 1. 기본 프로필 */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      STEP 1. 기본 프로필
                    </h3>
                  </div>

                  {/* Q1. 이름 / 성별 / 나이 */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      1. 이름 / 성별 / 나이 <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="이름"
                        value={formData.name}
                        onChange={(e) => handleTextChange('name', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                        required
                      />
                      <div className="flex rounded-xl border-2 border-slate-200 overflow-hidden bg-slate-50 p-0.5">
                        {['남', '여'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => handleTextChange('gender', g)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                              formData.gender === g
                                ? 'bg-[#1854F2] text-white'
                                : 'text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        placeholder="나이"
                        value={formData.age}
                        onChange={(e) => handleTextChange('age', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                        min="19"
                        max="35"
                      />
                    </div>
                  </div>

                  {/* Q2. 학교 / 학과 / 학년 */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      2. 학교 / 학과 / 학년 <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="학교"
                        value={formData.school}
                        onChange={(e) => handleTextChange('school', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                        required
                      />
                      <input
                        type="text"
                        placeholder="학과"
                        value={formData.major}
                        onChange={(e) => handleTextChange('major', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                      />
                      <select
                        value={formData.grade}
                        onChange={(e) => handleTextChange('grade', e.target.value)}
                        className="w-full px-2 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium bg-white"
                      >
                        <option value="">학년</option>
                        <option value="1학년">1학년</option>
                        <option value="2학년">2학년</option>
                        <option value="3학년">3학년</option>
                        <option value="4학년">4학년</option>
                        <option value="휴학/졸업예정">휴학/졸업</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>
                  </div>

                  {/* Q3. 활동 지역 */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      3. 거주 및 활동 지역 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="가까운 지하철역 (예: 신촌역, 사당역, 건대입구역)"
                      value={formData.subwayStation}
                      onChange={(e) => handleTextChange('subwayStation', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                      required
                    />
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['신촌역', '홍대입구역', '혜화역', '사당역', '건대입구역', '강남역', '잠실역'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleTextChange('subwayStation', st)}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                        >
                          +{st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q4. 연락처 */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      4. 연락처 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => handleTextChange('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium font-mono"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-[#1854F2] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
                    >
                      다음: 테마 선택
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2. 취향 & 테마 */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      STEP 2. 희망 테마
                    </h3>
                  </div>

                  {/* Q5. 테마 선택 */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      5. 들어가고 싶은 테마 <span className="text-rose-500">* (1개)</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {THEMES.map((theme) => {
                        const isSelected = formData.theme === theme.id;
                        return (
                          <div
                            key={theme.id}
                            onClick={() => handleTextChange('theme', theme.id)}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition ${
                              isSelected
                                ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-marker text-sm">{theme.enTitle}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className={`text-xs font-semibold mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                              {theme.title} ({theme.desc})
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Q6. 테마 레벨 */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      6. 테마 관심도 <span className="text-rose-500">*</span>
                    </label>
                    <div className="space-y-1.5">
                      {THEME_LEVELS.map((item) => {
                        const isSelected = formData.themeLevel === item.level;
                        return (
                          <div
                            key={item.level}
                            onClick={() => handleTextChange('themeLevel', item.level)}
                            className={`flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition text-xs ${
                              isSelected
                                ? 'border-[#1854F2] bg-blue-50 text-blue-900 font-bold'
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span>{item.emoji} {item.label}</span>
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#1854F2] bg-[#1854F2]' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Q7. 해보고 싶은 활동 */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      7. 해보고 싶은 활동
                    </label>
                    <input
                      type="text"
                      placeholder="예: 야구 직관, 성수 팝업 투어, 밤새 보드게임"
                      value={formData.themeWish}
                      onChange={(e) => handleTextChange('themeWish', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-xs transition cursor-pointer"
                    >
                      이전
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-[#1854F2] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
                    >
                      다음: 성향
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3. 성향 & 모임 */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      STEP 3. 나의 성향
                    </h3>
                  </div>

                  {/* Q8. 포지션 (복수 선택) */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      8. 놀 때 나의 포지션 <span className="text-blue-600 text-xs font-normal">(복수 선택)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PLAY_POSITIONS.map((pos) => {
                        const isSelected = formData.positions.includes(pos);
                        return (
                          <button
                            key={pos}
                            type="button"
                            onClick={() => toggleArrayItem('positions', pos)}
                            className={`p-2.5 rounded-xl border-2 text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="truncate">{pos}</span>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Q9. 첫 모임 스타일 */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      9. 첫 모임에서의 나 <span className="text-rose-500">*</span>
                    </label>
                    <div className="space-y-1.5">
                      {FIRST_MEETING_STYLES.map((style) => {
                        const isSelected = formData.firstMeeting === style;
                        return (
                          <div
                            key={style}
                            onClick={() => handleTextChange('firstMeeting', style)}
                            className={`p-2.5 rounded-xl border-2 cursor-pointer transition flex items-center justify-between text-xs ${
                              isSelected
                                ? 'border-[#1854F2] bg-blue-50 text-blue-900 font-bold'
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span>{style}</span>
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#1854F2] bg-[#1854F2]' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Q10. 만나고 싶은 친구 */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      10. 만나고 싶은 친구
                    </label>
                    <input
                      type="text"
                      placeholder="예: 같이 맛집 가고 취향 공유할 수 있는 친구"
                      value={formData.wantedFriends}
                      onChange={(e) => handleTextChange('wantedFriends', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                    />
                  </div>

                  {/* Q13. 지원 이유 */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      13. 지원 이유 <span className="text-blue-600 text-xs font-normal">(복수 선택)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {APPLY_REASONS.map((r) => {
                        const isSelected = formData.reasons.includes(r);
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => toggleArrayItem('reasons', r)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-slate-900 border-amber-500'
                                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '} {r}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-xs transition cursor-pointer"
                    >
                      이전
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-2.5 rounded-xl bg-[#1854F2] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
                    >
                      다음: 일정 & 확인
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4. 일정 & 약속 */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      STEP 4. 활동 일정 & 확인
                    </h3>
                  </div>

                  {/* Q11. 활동 가능 요일과 시간대 매트릭스 그리드 */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      11. 활동 가능 시간대 <span className="text-blue-600 text-xs font-normal">(중복 선택)</span>
                    </label>

                    <div className="border-2 border-slate-900 rounded-xl overflow-hidden bg-slate-50">
                      <div className="grid grid-cols-8 text-center bg-slate-900 text-white text-[11px] font-bold py-1.5">
                        <div className="text-slate-400">시간</div>
                        {DAYS.map((d) => (
                          <div key={d} className={d === '토' ? 'text-blue-300' : d === '일' ? 'text-rose-300' : ''}>
                            {d}
                          </div>
                        ))}
                      </div>

                      {TIMES.map((time) => (
                        <div key={time} className="grid grid-cols-8 border-t border-slate-200">
                          <div className="py-2.5 px-1 text-center font-bold text-[11px] bg-slate-100 text-slate-600 flex items-center justify-center">
                            {time}
                          </div>
                          {DAYS.map((day) => {
                            const isChecked = !!formData.availableSlots[`${day}_${time}`];
                            return (
                              <button
                                key={`${day}_${time}`}
                                type="button"
                                onClick={() => toggleSlot(day, time)}
                                className={`py-2.5 flex items-center justify-center border-l border-slate-200 transition cursor-pointer ${
                                  isChecked
                                    ? 'bg-[#1854F2] text-white font-black'
                                    : 'bg-white hover:bg-blue-50 text-slate-400'
                                }`}
                              >
                                {isChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px]">+</span>}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Q12. 한 달 참여 빈도 */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      12. 월 활동 참여 빈도 <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PARTICIPATION_FREQUENCIES.map((freq) => {
                        const isSelected = formData.frequency === freq;
                        return (
                          <div
                            key={freq}
                            onClick={() => handleTextChange('frequency', freq)}
                            className={`p-2.5 rounded-xl border-2 cursor-pointer transition flex items-center justify-between text-xs ${
                              isSelected
                                ? 'border-[#1854F2] bg-blue-50 text-blue-900 font-bold'
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span className="truncate">{freq}</span>
                            <span className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${isSelected ? 'border-[#1854F2] bg-[#1854F2]' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Q14. 꼭 해보고 싶은 것 */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      14. 올데프에서 꼭 해보고 싶은 것
                    </label>
                    <input
                      type="text"
                      placeholder="예: 한강 피크닉, 야구장 응원, 전시회 투어"
                      value={formData.mustDoAction}
                      onChange={(e) => handleTextChange('mustDoAction', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1854F2] focus:outline-none text-xs sm:text-sm font-medium"
                    />
                  </div>

                  {/* 지원 전 확인사항 */}
                  <div className="pt-2 bg-amber-50/70 p-3.5 rounded-2xl border-2 border-amber-300/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-800" />
                        <h4 className="text-xs sm:text-sm font-black text-amber-950">
                          지원 전 확인사항
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleAllAgree}
                        className="text-[11px] font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition cursor-pointer"
                      >
                        모두 동의
                      </button>
                    </div>

                    <div className="space-y-2">
                      {CHECKLIST_ITEMS.map((item) => {
                        const isChecked = !!formData.agreedItems[item.id];
                        return (
                          <label
                            key={item.id}
                            className="flex items-start gap-2 cursor-pointer group select-none"
                          >
                            <div
                              onClick={() => toggleChecklist(item.id)}
                              className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                                isChecked
                                  ? 'bg-[#1854F2] border-[#1854F2] text-white'
                                  : 'bg-white border-amber-400'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              onClick={() => toggleChecklist(item.id)}
                              className={`text-xs leading-tight ${
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

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-xs transition cursor-pointer"
                    >
                      이전
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1854F2] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      13기 지원서 제출하기
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* 우측 실시간 크루 패스 프리뷰 (데스크탑) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-8 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                내 13기 크루 패스
              </span>
              <span className="text-[10px] font-bold text-[#1854F2] bg-blue-50 px-2 py-0.5 rounded">
                LIVE
              </span>
            </div>

            <CrewPassCard formData={formData} />
          </div>
        </main>
      )}

      {/* 모바일 하단 플로팅 패스 보기 버튼 */}
      {currentTab === 'form' && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
          <button
            onClick={() => setShowMobilePass(true)}
            className="w-full py-3 px-4 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center justify-between border border-slate-700 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-bold">내 크루 패스 보기</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono font-bold text-amber-300">{progress}%</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* 모바일 크루 패스 바텀시트 모달 */}
      {showMobilePass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#FAF7F0] w-full max-w-md rounded-3xl p-4 border-2 border-slate-900 max-h-[90vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-marker text-base text-slate-900">MY 13TH PASS</span>
              <button
                onClick={() => setShowMobilePass(false)}
                className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
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
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-marker text-xs">ALL DAY FRIENDS 13TH</span>
              <button
                onClick={() => setShowPosterModal(false)}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
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
          <div className="bg-[#FAF7F0] max-w-lg w-full rounded-3xl p-5 sm:p-7 border-3 border-[#1854F2] shadow-2xl text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-[#1854F2] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="font-marker text-xs text-[#1854F2] uppercase tracking-wider">COMPLETE</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                지원서 접수 완료! 🎉
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                서류 검토 후 연락처({formData.phone})로 개별 안내드립니다.
              </p>
            </div>

            <div className="text-left">
              <CrewPassCard formData={formData} isModal={true} />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert('크루 패스를 캡처하여 보관해주세요! 📸')}
                className="flex-1 py-3 rounded-xl bg-white border-2 border-slate-900 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-1 hover:bg-slate-50 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                패스 캡처 저장
              </button>
              <button
                onClick={() => setIsSubmitted(false)}
                className="flex-1 py-3 rounded-xl bg-[#1854F2] text-white font-extrabold text-xs flex items-center justify-center gap-1 hover:bg-blue-700 transition cursor-pointer"
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
