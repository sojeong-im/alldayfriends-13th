import React, { useState } from 'react';
import { Camera, Heart, ArrowRight, X, ZoomIn, Layers } from 'lucide-react';

// 이미지 import
import picnicImg from '../assets/gallery/activity-picnic.jpg';
import hammerImg from '../assets/gallery/activity-hammer.jpg';
import boardgameImg from '../assets/gallery/activity-boardgame.jpg';
import shootingImg from '../assets/gallery/activity-shooting.jpg';
import dartImg from '../assets/gallery/activity-dart.jpg';
import posterImg from '../assets/poster.jpg';
import cafeImg from '../assets/gallery/activity-cafe.jpg';
import braceletImg from '../assets/gallery/activity-bracelet.jpg';
import jengaImg from '../assets/gallery/activity-jenga.jpg';
import bowlingImg from '../assets/gallery/activity-bowling.jpg';
import dartPlayImg from '../assets/gallery/activity-dart-play.jpg';
import graffitiCafeImg from '../assets/gallery/activity-graffiti-cafe.jpg';
import popupGoodsImg from '../assets/gallery/activity-popup-goods.jpg';
import manuscriptImg from '../assets/gallery/activity-manuscript.jpg';
import photoBoothImg from '../assets/gallery/activity-photo-booth.jpg';
import picnicVerticalImg from '../assets/gallery/activity-picnic-vertical.jpg';
import clueBoardgameImg from '../assets/gallery/activity-clue-boardgame.jpg';
import knittingImg from '../assets/gallery/activity-knitting.jpg';
import bangGameImg from '../assets/gallery/activity-bang-game.jpg';
import cakeCardImg from '../assets/gallery/activity-cake-card.jpg';
import dinnerPartyImg from '../assets/gallery/activity-dinner-party.jpg';
import sunsetImg from '../assets/gallery/activity-sunset.jpg';
import lpExhibitionImg from '../assets/gallery/activity-lp-exhibition.jpg';
import chimaekImg from '../assets/gallery/activity-chimaek.jpg';
import cafeFeastImg from '../assets/gallery/activity-cafe-feast.jpg';
import wreathCraftImg from '../assets/gallery/activity-wreath-craft.jpg';
import exhibitionPostcardImg from '../assets/gallery/activity-exhibition-postcard.jpg';
import seoulLightImg from '../assets/gallery/activity-seoul-light.jpg';
import sharedKitchenImg from '../assets/gallery/activity-shared-kitchen.jpg';

export default function ActivityGallery({ onGoToForm }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: '전체' },
    { id: 'POPUP', label: '팝업·전시' },
    { id: 'CAFE', label: '카페·맛집' },
    { id: 'GAME', label: '보드게임' },
    { id: 'BOOK', label: '힐링·감성' },
    { id: 'ACTIVITY', label: '액티비티' },
  ];

  // 불필요한 장문 텍스트 완전히 삭제! 핵심 키워드 1줄만 남김
  const photos = [
    { id: 1, category: 'POPUP', img: seoulLightImg, title: '광화문 서울라이트 야경 ✨', tape: 'tape-pink', tapeText: 'LIGHT FEST' },
    { id: 2, category: 'POPUP', img: exhibitionPostcardImg, title: '일월오봉도 전시 엽서 굿즈 🖼️', tape: 'tape-yellow', tapeText: 'MUSEUM' },
    { id: 3, category: 'CAFE', img: sharedKitchenImg, title: '공유주방 쿡방 홈파티 🍳', tape: 'tape-green', tapeText: 'COOKING' },
    { id: 4, category: 'CAFE', img: chimaekImg, title: '시원한 치맥 파티 🍗', tape: 'tape-blue', tapeText: 'CHIMAEK' },
    { id: 5, category: 'CAFE', img: cafeFeastImg, title: '디저트 & 음료 한상 🍇', tape: 'tape-yellow', tapeText: 'SWEETS' },
    { id: 6, category: 'POPUP', img: wreathCraftImg, title: '핸드메이드 미니 리스 🎀', tape: 'tape-pink', tapeText: 'HANDMADE' },
    { id: 7, category: 'POPUP', img: lpExhibitionImg, title: 'LP & 향수 셀렉숍 🎶', tape: 'tape-green', tapeText: 'VIBES' },
    { id: 8, category: 'BOOK', img: sunsetImg, title: '황금빛 노을 산책 🌅', tape: 'tape-blue', tapeText: 'SUNSET' },
    { id: 9, category: 'GAME', img: clueBoardgameImg, title: '잔디밭 클루 보드게임 🎲', tape: 'tape-yellow', tapeText: 'CLUE' },
    { id: 10, category: 'CAFE', img: cakeCardImg, title: '딸기 케이크 & 카드게임 🍰', tape: 'tape-pink', tapeText: 'CAFE' },
    { id: 11, category: 'POPUP', img: knittingImg, title: '코바늘 뜨개질 공방 🧶', tape: 'tape-green', tapeText: 'KNITTING' },
    { id: 12, category: 'CAFE', img: dinnerPartyImg, title: '모듬 회 & 라면 뒤풀이 🍣', tape: 'tape-blue', tapeText: 'DINNER' },
    { id: 13, category: 'GAME', img: bangGameImg, title: '서부 카드게임 뱅! 🃏', tape: 'tape-yellow', tapeText: 'BANG' },
    { id: 14, category: 'POPUP', img: photoBoothImg, title: '팝업 영수증 사진기 📸', tape: 'tape-pink', tapeText: 'PHOTO' },
    { id: 15, category: 'POPUP', img: popupGoodsImg, title: '팝업 브랜드 굿즈 인증 ✨', tape: 'tape-green', tapeText: 'GOODS' },
    { id: 16, category: 'POPUP', img: braceletImg, title: '우정 하트 팔찌 공방 💍', tape: 'tape-blue', tapeText: 'RING' },
    { id: 17, category: 'BOOK', img: manuscriptImg, title: '돗자리 원고지 북토크 📖', tape: 'tape-yellow', tapeText: 'ESSAY' },
    { id: 18, category: 'CAFE', img: cafeImg, title: '감성 카페 디저트 투어 ☕', tape: 'tape-pink', tapeText: 'CAFE' },
    { id: 19, category: 'CAFE', img: graffitiCafeImg, title: '힙한 그래피티 카페 🎨', tape: 'tape-green', tapeText: 'STREET' },
    { id: 20, category: 'CAFE', img: picnicImg, title: '한강 피크닉 & 과자 파티 🧺', tape: 'tape-blue', tapeText: 'PICNIC' },
    { id: 21, category: 'CAFE', img: picnicVerticalImg, title: '다이어리 & 피크닉 🎈', tape: 'tape-yellow', tapeText: 'CHILL' },
    { id: 22, category: 'GAME', img: jengaImg, title: '젠가 타워 와르르 🧱', tape: 'tape-pink', tapeText: 'JENGA' },
    { id: 23, category: 'GAME', img: hammerImg, title: '오락실 해머 대결 🔨', tape: 'tape-green', tapeText: 'ARCADE' },
    { id: 24, category: 'GAME', img: boardgameImg, title: '보드게임 카페 정복기 🎲', tape: 'tape-blue', tapeText: 'GAME' },
    { id: 25, category: 'ACTIVITY', img: bowlingImg, title: '신나는 락볼링 대결 🎳', tape: 'tape-yellow', tapeText: 'BOWLING' },
    { id: 26, category: 'ACTIVITY', img: shootingImg, title: '실내 사격 액티비티 🎯', tape: 'tape-pink', tapeText: 'TARGET' },
    { id: 27, category: 'ACTIVITY', img: dartPlayImg, title: '전자 다트 집중 모드 🎯', tape: 'tape-green', tapeText: 'DART' },
    { id: 28, category: 'ACTIVITY', img: dartImg, title: '불꽃의 다트 매치 🎯', tape: 'tape-blue', tapeText: 'MATCH' },
    { id: 29, category: 'ALL', img: posterImg, title: '13기 공식 포스터 💫', tape: 'tape-pink', tapeText: 'POSTER' },
  ];

  const filteredPhotos = selectedCategory === 'ALL' 
    ? photos 
    : photos.filter((p) => p.category === selectedCategory || p.category === 'ALL');

  return (
    <div className="space-y-6">
      {/* 갤러리 상단: 불필요한 설명문 전부 삭제, 필터와 신청 버튼만 깔끔하게 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={onGoToForm}
          className="px-4 py-2 rounded-xl bg-[#1854F2] hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0"
        >
          <span>13기 신청하기</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 스크랩북 폴라로이드 그리드: 사진이 돋보이고 텍스트는 1줄만! */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className={`group bg-white p-2.5 sm:p-3 pb-3 sm:pb-4 rounded-2xl polaroid-shadow border-2 border-slate-900 transition-all duration-200 hover:scale-[1.03] hover:shadow-lg cursor-pointer relative`}
          >
            {/* 상단 미니 마스킹 테이프 */}
            <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 ${photo.tape} flex items-center justify-center z-10 shadow-xs`}>
              <span className="text-[8px] font-black tracking-wider text-slate-800 uppercase">
                {photo.tapeText}
              </span>
            </div>

            {/* 사진 영역 */}
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative mt-1 border border-slate-200">
              <img
                src={photo.img}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/95 text-slate-900 px-2.5 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" />
                  보기
                </span>
              </div>
            </div>

            {/* 사진 하단: 1줄 제목만 깔끔하게 */}
            <div className="mt-2 text-center px-1">
              <h3 className="text-xs font-extrabold text-slate-900 truncate">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 사진 상세 보기 라이트박스 모달 */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white max-w-xl w-full rounded-3xl overflow-hidden border-2 border-slate-900 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-marker tracking-wide text-xs sm:text-sm truncate pr-2">{selectedPhoto.title}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3 bg-slate-100 flex justify-center max-h-[70vh] overflow-hidden">
              <img
                src={selectedPhoto.img}
                alt={selectedPhoto.title}
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-800 truncate">{selectedPhoto.title}</span>
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  onGoToForm();
                }}
                className="px-4 py-2 rounded-xl bg-[#1854F2] text-white text-xs font-black shrink-0 hover:bg-blue-700 transition cursor-pointer"
              >
                13기 신청하기 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
