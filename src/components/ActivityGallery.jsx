import React, { useState } from 'react';
import { Sparkles, Camera, Heart, ArrowRight, X, ZoomIn } from 'lucide-react';
import picnicImg from '../assets/gallery/activity-picnic.jpg';
import hammerImg from '../assets/gallery/activity-hammer.jpg';
import boardgameImg from '../assets/gallery/activity-boardgame.jpg';
import shootingImg from '../assets/gallery/activity-shooting.jpg';
import dartImg from '../assets/gallery/activity-dart.jpg';
import posterImg from '../assets/poster.jpg';

export default function ActivityGallery({ onGoToForm }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    {
      id: 1,
      img: picnicImg,
      title: '햇살 가득 한강 피크닉 & 과자 파티',
      tape: 'tape-yellow',
      tapeText: 'WEEKEND PICNIC',
      rotate: 'rotate-[-2deg]',
      tag: '야외 피크닉 🧺',
      desc: '돗자리 펴고 과자 잔뜩 펼쳐놓고 끝없는 수다와 힐링 타임! 꿀조합 크루들과 찰칵 ✌️',
    },
    {
      id: 2,
      img: hammerImg,
      title: '스트레스 싹 날리는 오락실 해머 파워 대결!',
      tape: 'tape-pink',
      tapeText: 'GAME ZONE',
      rotate: 'rotate-[3deg]',
      tag: '오락실 대전 🔨',
      desc: '토르 망치 들고 풀스윙! 과연 오늘 최고 점수를 기록한 크루는 누구였을까요? ⚡',
    },
    {
      id: 3,
      img: boardgameImg,
      title: '없는 게 없는 보드게임 카페 정복기',
      tape: 'tape-green',
      tapeText: 'BOARD GAME',
      rotate: 'rotate-[-1deg]',
      tag: '보드게임 성지 🎲',
      desc: '할리갈리, 펭귄트랩, 다빈치코드, 클루까지! 한번 시작하면 시간 가는 줄 모르는 승부욕 🔥',
    },
    {
      id: 4,
      img: shootingImg,
      title: '스나이퍼 빙의! 이색 실내 사격 액티비티',
      tape: 'tape-blue',
      tapeText: 'TARGET ON',
      rotate: 'rotate-[2deg]',
      tag: '사격 번개 🎯',
      desc: '진지한 눈빛으로 표적지 조준! 평소 못 해본 이색 액티비티도 마음 맞는 크루들과 함께라면 꿀잼!',
    },
    {
      id: 5,
      img: dartImg,
      title: '환호성 폭발하는 불꽃의 다트 매치',
      tape: 'tape-yellow',
      tapeText: 'BULLSEYE!',
      rotate: 'rotate-[-3deg]',
      tag: '전자 다트 🎯',
      desc: '마지막 1발에 걸린 디저트 쏘기 내기! 뒤에서 숨죽이고 지켜보다가 들어가는 순간 다같이 환호!',
    },
    {
      id: 6,
      img: posterImg,
      title: 'ALL DAY FRIENDS 13기 공식 포스터',
      tape: 'tape-pink',
      tapeText: 'OFFICIAL POSTER',
      rotate: 'rotate-[1deg]',
      tag: '13기 모집중 💫',
      desc: '게임, 팝업&전시, 카페&맛집, 영화&책, 야구! 5가지 테마로 꽉 채운 13기에서 함께해요.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* 갤러리 상단 인트로 배너 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900 shadow-sm relative overflow-hidden">
        {/* 데코 마스킹 테이프 */}
        <div className="absolute -top-3 left-10 w-32 h-7 tape-yellow rotate-[-3deg] flex items-center justify-center">
          <span className="text-[10px] font-black text-amber-900">MEMORIES</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-black mb-2">
              <Camera className="w-3.5 h-3.5" />
              올데프 크루들의 생생한 일상
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              우리는 주말과 공강을 이렇게 놀아요! 📸
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              한강 돗자리 피크닉부터 오락실 배틀, 보드게임 밤샘, 이색 사격 & 다트까지!<br />
              취향 맞는 대학생 크루들이 모여 만든 진짜 꿀잼 순간들을 모아봤어요.
            </p>
          </div>

          <button
            onClick={onGoToForm}
            className="px-6 py-3.5 rounded-2xl bg-[#1854F2] hover:bg-blue-700 text-white font-black text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer shrink-0"
          >
            <span>나도 함께하기 (지원하기)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 스크랩북 폴라로이드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className={`group bg-white p-4 pb-6 rounded-3xl polaroid-shadow border-2 border-slate-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer relative ${photo.rotate}`}
          >
            {/* 상단 마스킹 테이프 */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 ${photo.tape} flex items-center justify-center z-10 shadow-xs`}>
              <span className="text-[9px] font-black tracking-wider text-slate-800 uppercase">
                {photo.tapeText}
              </span>
            </div>

            {/* 사진 영역 */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative mt-2 border border-slate-200">
              <img
                src={photo.img}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  사진 크게 보기
                </span>
              </div>
            </div>

            {/* 사진 캡션 (다꾸 폴라로이드 감성) */}
            <div className="mt-4 px-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {photo.tag}
                </span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {photo.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 CTA 박스 */}
      <div className="bg-gradient-to-r from-blue-50 via-amber-50 to-rose-50 rounded-3xl p-8 border-2 border-slate-900 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#1854F2] text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          13기에서는 당신과 함께 더 많은 추억을 만들고 싶어요! 🎈
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
          망설이지 말고 지금 바로 지원서를 작성해보세요.<br />
          답변을 채우는 동안 당신만의 크루 패스가 실시간으로 완성됩니다.
        </p>
        <div className="pt-2">
          <button
            onClick={onGoToForm}
            className="px-8 py-4 rounded-2xl bg-[#1854F2] hover:bg-blue-700 text-white font-black text-base shadow-lg hover:shadow-xl transition transform active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span>지금 13기 동아리 신청하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 사진 상세 보기 라이트박스 모달 */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden border-2 border-slate-900 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-marker tracking-wide text-sm">{selectedPhoto.title}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-slate-100 flex justify-center max-h-[70vh] overflow-hidden">
              <img
                src={selectedPhoto.img}
                alt={selectedPhoto.title}
                className="max-h-full max-w-full object-contain rounded-2xl"
              />
            </div>
            <div className="p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                  {selectedPhoto.tag}
                </span>
                <p className="text-xs text-slate-600 mt-1">{selectedPhoto.desc}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  onGoToForm();
                }}
                className="px-4 py-2.5 rounded-xl bg-[#1854F2] text-white text-xs font-black shrink-0 hover:bg-blue-700 transition cursor-pointer"
              >
                신청하러 가기 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
