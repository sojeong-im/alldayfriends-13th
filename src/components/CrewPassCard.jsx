import React from 'react';
import { Sparkles, Ticket, Heart, Compass, Star, Calendar } from 'lucide-react';
import { THEMES, THEME_LEVELS } from '../data/formQuestions';

export default function CrewPassCard({ formData, isModal = false }) {
  const selectedTheme = THEMES.find((t) => t.id === formData.theme) || null;
  const currentLevel = THEME_LEVELS.find((l) => l.level === formData.themeLevel) || null;

  return (
    <div className={`relative bg-white rounded-3xl polaroid-shadow border-2 border-[#1E293B] overflow-hidden transition-all duration-300 ${isModal ? 'max-w-md w-full mx-auto' : ''}`}>
      {/* 탑 마스킹 테이프 장식 */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-yellow rotate-[-2deg] z-20 flex items-center justify-center opacity-90 shadow-sm">
        <span className="text-[10px] font-bold text-amber-900 tracking-wider">ALL DAY CREW</span>
      </div>

      {/* 티켓 상단 헤더 */}
      <div 
        className="p-5 text-white relative transition-colors duration-300"
        style={{
          backgroundColor: selectedTheme ? selectedTheme.accentHex : '#1854F2'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Ticket className="w-5 h-5 text-white/90" />
            <span className="font-marker tracking-wider text-xs uppercase text-white/90">Official Member Pass</span>
          </div>
          <span className="bg-black/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs font-outfit">
            VOL. 13
          </span>
        </div>

        <div className="mt-3">
          <h2 className="text-2xl font-black tracking-tight font-outfit uppercase drop-shadow-xs flex items-center gap-2">
            ALL DAY FRIENDS
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </h2>
          <p className="text-xs text-white/80 font-medium mt-0.5">
            청춘들의 다채로운 일상과 취향을 잇는 동아리
          </p>
        </div>

        {/* 톱니바퀴 티켓 구분선 */}
        <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-3 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-white rounded-full translate-y-1.5" />
          ))}
        </div>
      </div>

      {/* 티켓 본문 */}
      <div className="p-6 pt-7 space-y-5 bg-[#FCFAF7]">
        {/* 지원자 기본 인포 */}
        <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-4">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Applicant</div>
            <div className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
              {formData.name || '예비 13기 크루'}
              {formData.gender && (
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded-md text-slate-600">
                  {formData.gender} {formData.age ? `· ${formData.age}세` : ''}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
              <span>{formData.school || '대학/학과 미입력'}</span>
              {formData.major && <span>/ {formData.major}</span>}
              {formData.grade && <span>({formData.grade})</span>}
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-center p-1 relative rotate-2">
            <span className="text-[9px] font-bold text-amber-700 leading-none">활동권역</span>
            <span className="text-xs font-black text-amber-900 mt-1 truncate max-w-full px-1">
              {formData.subwayStation ? formData.subwayStation.replace('역', '') + '역' : '서울'}
            </span>
          </div>
        </div>

        {/* 선택 테마 카드 */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            1순위 희망 테마
          </div>
          {selectedTheme ? (
            <div className="p-3.5 rounded-2xl border-2 border-slate-900 bg-white shadow-xs relative overflow-hidden">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {selectedTheme.badge}
                  </span>
                  <div className="font-marker text-lg text-slate-900 mt-1 tracking-wide">
                    {selectedTheme.enTitle}
                  </div>
                </div>
                {currentLevel && (
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xl">
                    {currentLevel.emoji} {currentLevel.label.split(' ')[0]}
                  </span>
                )}
              </div>
              {formData.themeWish && (
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-xl border border-slate-100 italic">
                  "{formData.themeWish}"
                </p>
              )}
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl border-2 border-dashed border-slate-300 text-center text-xs text-slate-400">
              테마를 선택하면 패스에 취향이 채워집니다 🎨
            </div>
          )}
        </div>

        {/* 플레이 성향 태그 */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            나의 모임 포지션 & 성향
          </div>
          <div className="flex flex-wrap gap-1.5">
            {formData.positions && formData.positions.length > 0 ? (
              formData.positions.map((pos) => (
                <span 
                  key={pos}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                >
                  #{pos}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">성향 태그 선택 대기 중...</span>
            )}
          </div>
        </div>

        {/* 활동 요일/시간 요약 */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#1854F2]" />
            활동 가능 시간대
          </div>
          <div className="text-slate-700 font-medium">
            {formData.availableSlots && Object.keys(formData.availableSlots).length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(formData.availableSlots)
                  .filter(([_, active]) => active)
                  .map(([slot]) => {
                    const [day, time] = slot.split('_');
                    return (
                      <span key={slot} className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[11px] font-bold text-[#1854F2]">
                        {day} {time}
                      </span>
                    );
                  })}
              </div>
            ) : (
              <span className="text-slate-400">선택된 시간대가 없습니다.</span>
            )}
          </div>
        </div>

        {/* 바코드 & 시리얼 넘버 */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5 h-8">
              {[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 1, 3, 2, 4, 1, 5, 2].map((w, idx) => (
                <div 
                  key={idx} 
                  className="h-full bg-slate-800" 
                  style={{ width: `${w * 1.5}px` }} 
                />
              ))}
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-400 mt-1">
              ADF-2026-13TH-PASS
            </span>
          </div>

          <div className="text-right">
            <div className="w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-xs rotate-[-8deg] bg-amber-200">
              OK!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
