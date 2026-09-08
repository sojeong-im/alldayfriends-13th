import React, { useState } from 'react';
import { Sparkles, Camera, Heart, ArrowRight, X, ZoomIn, Layers } from 'lucide-react';

// 1차 이미지
import picnicImg from '../assets/gallery/activity-picnic.jpg';
import hammerImg from '../assets/gallery/activity-hammer.jpg';
import boardgameImg from '../assets/gallery/activity-boardgame.jpg';
import shootingImg from '../assets/gallery/activity-shooting.jpg';
import dartImg from '../assets/gallery/activity-dart.jpg';
import posterImg from '../assets/poster.jpg';

// 2차 이미지
import cafeImg from '../assets/gallery/activity-cafe.jpg';
import braceletImg from '../assets/gallery/activity-bracelet.jpg';
import jengaImg from '../assets/gallery/activity-jenga.jpg';
import bowlingImg from '../assets/gallery/activity-bowling.jpg';
import dartPlayImg from '../assets/gallery/activity-dart-play.jpg';

// 3차 이미지
import graffitiCafeImg from '../assets/gallery/activity-graffiti-cafe.jpg';
import popupGoodsImg from '../assets/gallery/activity-popup-goods.jpg';
import manuscriptImg from '../assets/gallery/activity-manuscript.jpg';
import photoBoothImg from '../assets/gallery/activity-photo-booth.jpg';
import picnicVerticalImg from '../assets/gallery/activity-picnic-vertical.jpg';

// 4차 이미지
import clueBoardgameImg from '../assets/gallery/activity-clue-boardgame.jpg';
import knittingImg from '../assets/gallery/activity-knitting.jpg';
import bangGameImg from '../assets/gallery/activity-bang-game.jpg';
import cakeCardImg from '../assets/gallery/activity-cake-card.jpg';
import dinnerPartyImg from '../assets/gallery/activity-dinner-party.jpg';

// 5차 이미지
import sunsetImg from '../assets/gallery/activity-sunset.jpg';
import lpExhibitionImg from '../assets/gallery/activity-lp-exhibition.jpg';
import chimaekImg from '../assets/gallery/activity-chimaek.jpg';
import cafeFeastImg from '../assets/gallery/activity-cafe-feast.jpg';
import wreathCraftImg from '../assets/gallery/activity-wreath-craft.jpg';

// 6차 신규 이미지
import exhibitionPostcardImg from '../assets/gallery/activity-exhibition-postcard.jpg';
import seoulLightImg from '../assets/gallery/activity-seoul-light.jpg';
import sharedKitchenImg from '../assets/gallery/activity-shared-kitchen.jpg';

export default function ActivityGallery({ onGoToForm }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: '전체 모아보기', icon: '✨' },
    { id: 'POPUP', label: '팝업 & 전시 & 야경', icon: '🛍️' },
    { id: 'CAFE', label: '카페 & 맛집 & 쿡방', icon: '☕' },
    { id: 'GAME', label: '보드게임 & 추리', icon: '🎲' },
    { id: 'BOOK', label: '노을 & 영화책 & 힐링', icon: '🌅' },
    { id: 'ACTIVITY', label: '스포츠 & 이색체험', icon: '🎳' },
  ];

  const photos = [
    // 1. 광화문 서울라이트 미디어파사드 축제
    {
      id: 1,
      category: 'POPUP',
      img: seoulLightImg,
      title: '화려한 빛의 축제! 광화문 서울라이트 야경 투어 ✨',
      tape: 'tape-pink',
      tapeText: 'SEOUL LIGHT',
      rotate: 'rotate-[-2deg]',
      tag: '전시 & 축제 🌃',
      desc: '겨울밤 광화문을 수놓은 미디어파사드와 빛의 조형물! 크루들과 함께 걸으며 낭만 충전.',
    },

    // 2. 전시회 일월오봉도 엽서 굿즈
    {
      id: 2,
      category: 'POPUP',
      img: exhibitionPostcardImg,
      title: '전시회 관람 후 모은 일월오봉도 감성 엽서 & 굿즈',
      tape: 'tape-yellow',
      tapeText: 'MUSEUM GOODS',
      rotate: 'rotate-[2deg]',
      tag: '전시 & 굿즈 🖼️',
      desc: '웅장한 한국 전통 미학 일월오봉도 아트워크! 다같이 마음에 드는 굿즈 골라 인증샷 찰칵.',
    },

    // 3. 감성 공유주방 쿡방 & 홈파티
    {
      id: 3,
      category: 'CAFE',
      img: sharedKitchenImg,
      title: '감성 공유주방에서 다같이 요리하는 쿡방 홈파티 🍳',
      tape: 'tape-green',
      tapeText: 'COOKING PARTY',
      rotate: 'rotate-[-1deg]',
      tag: '공유주방 & 요리 🧑‍🍳',
      desc: '재료 손질부터 보글보글 끓이기까지! 정성스레 만든 맛있는 음식으로 잊지 못할 저녁 식사.',
    },

    // 4. 치맥 파티
    {
      id: 4,
      category: 'CAFE',
      img: chimaekImg,
      title: '바삭한 치킨에 시원한 잔 부딪히며 다같이 짠! 🍗',
      tape: 'tape-blue',
      tapeText: 'CHIMAEK TIME',
      rotate: 'rotate-[2deg]',
      tag: '맛집 & 먹방 🍻',
      desc: '양념치킨 & 어니언치킨에 시원한 음료로 다같이 건배! 스트레스 싹 풀리는 뒤풀이.',
    },

    // 5. 카페 한상 가득 디저트
    {
      id: 5,
      category: 'CAFE',
      img: cafeFeastImg,
      title: '샤인머스캣부터 라떼아트까지! 비주얼 디저트 한상',
      tape: 'tape-yellow',
      tapeText: 'CAFE FEAST',
      rotate: 'rotate-[-2deg]',
      tag: '감성 카페 🍇',
      desc: '신선한 샤인머스캣, 티라미수 아인슈페너, 레몬 에이드, 아이스크림 소르베까지 완벽한 당 충전!',
    },

    // 6. 핸드메이드 미니 리스 공방
    {
      id: 6,
      category: 'POPUP',
      img: wreathCraftImg,
      title: '크루들이 손수 완성한 미니 크리스마스 리스 키링 🎀',
      tape: 'tape-pink',
      tapeText: 'HANDMADE WREATH',
      rotate: 'rotate-[3deg]',
      tag: '공방 클래스 🎄',
      desc: '포근한 털실과 진주, 리본으로 정성껏 뜬 귀여운 리스 키링! 서로 선물하며 감동 만배.',
    },

    // 7. LP & 감성 전시 공간
    {
      id: 7,
      category: 'POPUP',
      img: lpExhibitionImg,
      title: 'GOOD VIBES! 감성 LP판과 향수 셀렉숍 투어',
      tape: 'tape-green',
      tapeText: 'LP & SCENT',
      rotate: 'rotate-[-1deg]',
      tag: '전시 & 소품샵 🎶',
      desc: '아늑한 조명 아래서 LP 음악 감상하고 취향 저격 향수 시향해보는 감성 가득 데이트 코스.',
    },

    // 8. 황금빛 노을 방파제 산책
    {
      id: 8,
      category: 'BOOK',
      img: sunsetImg,
      title: '황금빛 붉은 노을 보며 도란도란 걷는 저녁 산책 🌅',
      tape: 'tape-blue',
      tapeText: 'GOLDEN HOUR',
      rotate: 'rotate-[1deg]',
      tag: '노을 힐링 ☁️',
      desc: '하늘이 붉게 물드는 골든 아워, 계단에 서서 바라본 숨 멎을 듯 아름다운 일몰 뷰.',
    },

    // 9. 야외 잔디밭 클루 보드게임 (포스터 메인 컷)
    {
      id: 9,
      category: 'GAME',
      img: clueBoardgameImg,
      title: '돗자리 펴고 잔디밭에서 즐기는 추리 보드게임 CLUE!',
      tape: 'tape-yellow',
      tapeText: 'GAME HERO',
      rotate: 'rotate-[-2deg]',
      tag: '보드게임 🎲',
      desc: '포스터 메인 장식컷! 시원한 바람 맞으며 머리 맞대고 단서 추리하는 꿀잼 순간.',
    },

    // 10. 디저트 케이크 & 카드게임
    {
      id: 10,
      category: 'CAFE',
      img: cakeCardImg,
      title: '달콤한 딸기 초코 케이크와 함께하는 카드 대결',
      tape: 'tape-pink',
      tapeText: 'SWEET & PLAY',
      rotate: 'rotate-[2deg]',
      tag: '카페 & 디저트 🍰',
      desc: '꾸덕한 케이크와 따뜻한 커피 한 잔, 그리고 손에 땀을 쥐는 카드 한판!',
    },

    // 11. 코바늘 뜨개질
    {
      id: 11,
      category: 'POPUP',
      img: knittingImg,
      title: '도란도란 모여 뜨는 코바늘 뜨개질 힐링 타임',
      tape: 'tape-green',
      tapeText: 'HANDMADE CROCHET',
      rotate: 'rotate-[-1deg]',
      tag: '공방 클래스 🧶',
      desc: '색색의 털실과 코바늘로 나만의 귀여운 소품 만들기! 시간 가는 줄 모르는 집중 모드.',
    },

    // 12. 모듬 회 & 라면 뒤풀이
    {
      id: 12,
      category: 'CAFE',
      img: dinnerPartyImg,
      title: '신선한 모듬 회와 얼큰한 전골 라면 파티!',
      tape: 'tape-blue',
      tapeText: 'DINNER FEAST',
      rotate: 'rotate-[3deg]',
      tag: '맛집 & 먹방 🍣',
      desc: '활동 끝나고 다같이 모여 맛있는 회와 따끈한 국물로 완벽한 하루 마무리!',
    },

    // 13. 뱅(BANG!) 서부극 카드게임
    {
      id: 13,
      category: 'GAME',
      img: bangGameImg,
      title: '서부 총잡이들의 치열한 심리전! 뱅(BANG!)',
      tape: 'tape-yellow',
      tapeText: 'WILD WEST BANG',
      rotate: 'rotate-[-2deg]',
      tag: '카드 보드게임 🃏',
      desc: '보안관은 누구인가? 음료수 잔 채워놓고 서로 의심하며 웃음 터지는 심리 대결.',
    },

    // 14. 팝업 포토부스
    {
      id: 14,
      category: 'POPUP',
      img: photoBoothImg,
      title: '감성 팝업스토어 영수증 포토부스 인증샷!',
      tape: 'tape-pink',
      tapeText: 'POP-UP BOOTH',
      rotate: 'rotate-[1deg]',
      tag: '팝업 & 전시 🛍️',
      desc: '"나랑 셀카 찍자!" 성수 소품샵 & 팝업에서 귀여운 캐릭터와 함께 찰칵 📸',
    },

    // 15. 팝업 굿즈
    {
      id: 15,
      category: 'POPUP',
      img: popupGoodsImg,
      title: '핫플 팝업 굿즈 득템! 크루 단체 인증',
      tape: 'tape-green',
      tapeText: 'ENLUMIO GOODS',
      rotate: 'rotate-[-1deg]',
      tag: '전시 & 굿즈 ✨',
      desc: '웨이팅 뚫고 함께 구경한 트렌디 팝업 브랜드 굿즈! 다같이 모여서 인증샷 완성.',
    },

    // 16. 우정 팔찌 공방
    {
      id: 16,
      category: 'POPUP',
      img: braceletImg,
      title: '세상에 하나뿐인 크루 우정 팔찌 & 링 공방',
      tape: 'tape-blue',
      tapeText: 'FRIENDSHIP RING',
      rotate: 'rotate-[2deg]',
      tag: '공방 클래스 💍',
      desc: '다같이 손 모아 만든 반짝이는 은빛 하트 팔찌! 소중한 사람들과 특별한 추억 만들기.',
    },

    // 17. 원고지 북토크
    {
      id: 17,
      category: 'BOOK',
      img: manuscriptImg,
      title: '돗자리 펴고 원고지 글쓰기 & 낭만 북토크',
      tape: 'tape-yellow',
      tapeText: 'BOOK & ESSAY',
      rotate: 'rotate-[-2deg]',
      tag: '영화 & 책 📖',
      desc: '감성 미니 라디오 켜두고 바람 쐬며 적어보는 나만의 원고지와 소소한 생각 나눔.',
    },

    // 18. 카페 디저트 투어
    {
      id: 18,
      category: 'CAFE',
      img: cafeImg,
      title: '비주얼 폭발! 감성 카페 디저트 & 음료 투어',
      tape: 'tape-pink',
      tapeText: 'CAFE & SWEETS',
      rotate: 'rotate-[1deg]',
      tag: '카페 & 맛집 ☕',
      desc: '크림 듬뿍 아인슈페너와 티라미수, 모히토까지! 달콤한 디저트와 함께하는 힐링 수다 타임.',
    },

    // 19. 그래피티 카페
    {
      id: 19,
      category: 'CAFE',
      img: graffitiCafeImg,
      title: '힙한 그래피티 아트 카페에서 끝없는 토크',
      tape: 'tape-green',
      tapeText: 'HIP VIBES',
      rotate: 'rotate-[-1deg]',
      tag: '힙플레이스 🎨',
      desc: '감각적인 그래피티 벽화 앞에서 따뜻한 음료 한잔과 함께 이야기꽃 피우기!',
    },

    // 20. 한강 피크닉 1
    {
      id: 20,
      category: 'CAFE',
      img: picnicImg,
      title: '햇살 가득 한강 피크닉 & 과자 파티',
      tape: 'tape-blue',
      tapeText: 'WEEKEND PICNIC',
      rotate: 'rotate-[2deg]',
      tag: '야외 피크닉 🧺',
      desc: '돗자리 펴고 과자 잔뜩 펼쳐놓고 끝없는 수다와 힐링 타임! 꿀조합 크루들과 찰칵 ✌️',
    },

    // 21. 한강 피크닉 2 (세로)
    {
      id: 21,
      category: 'CAFE',
      img: picnicVerticalImg,
      title: '다이어리 꾸미기와 간식 털기 낭만',
      tape: 'tape-yellow',
      tapeText: 'CHILL TIME',
      rotate: 'rotate-[-2deg]',
      tag: '감성 피크닉 🎈',
      desc: '얼렁뚱땅 다이어리 구경하고 과자 탑 쌓으며 보내는 완벽한 주말 오후.',
    },

    // 22. 젠가 게임
    {
      id: 22,
      category: 'GAME',
      img: jengaImg,
      title: '심장 쫄깃! 젠가 타워 와르르 무너지는 순간',
      tape: 'tape-pink',
      tapeText: 'JENGA TOWER',
      rotate: 'rotate-[1deg]',
      tag: '보드게임 🧱',
      desc: '숨소리마저 죽이고 한 조각씩 빼다가 와르르! 벌칙 음료 마시기 걸고 펼쳐진 심리전.',
    },

    // 23. 오락실 해머
    {
      id: 23,
      category: 'GAME',
      img: hammerImg,
      title: '스트레스 싹 날리는 오락실 해머 파워 대결!',
      tape: 'tape-green',
      tapeText: 'GAME ZONE',
      rotate: 'rotate-[-2deg]',
      tag: '오락실 대전 🔨',
      desc: '토르 망치 들고 풀스윙! 과연 오늘 최고 점수를 기록한 크루는 누구였을까요? ⚡',
    },

    // 24. 보드게임 진열장
    {
      id: 24,
      category: 'GAME',
      img: boardgameImg,
      title: '없는 게 없는 보드게임 카페 정복기',
      tape: 'tape-blue',
      tapeText: 'BOARD GAME',
      rotate: 'rotate-[2deg]',
      tag: '보드게임 성지 🎲',
      desc: '할리갈리, 펭귄트랩, 다빈치코드, 클루까지! 한번 시작하면 시간 가는 줄 모르는 승부욕 🔥',
    },

    // 25. 락볼링
    {
      id: 25,
      category: 'ACTIVITY',
      img: bowlingImg,
      title: '스트라이크의 쾌감! 신나는 락볼링 대결',
      tape: 'tape-yellow',
      tapeText: 'STRIKE PANG',
      rotate: 'rotate-[-1deg]',
      tag: '볼링 번개 🎳',
      desc: '핀이 시원하게 넘어갈 때의 짜릿함! 팀 나눠서 점수 내기하고 하이파이브 나누기.',
    },

    // 26. 사격 번개
    {
      id: 26,
      category: 'ACTIVITY',
      img: shootingImg,
      title: '스나이퍼 빙의! 이색 실내 사격 액티비티',
      tape: 'tape-pink',
      tapeText: 'TARGET ON',
      rotate: 'rotate-[3deg]',
      tag: '사격 번개 🎯',
      desc: '진지한 눈빛으로 표적지 조준! 평소 못 해본 이색 액티비티도 마음 맞는 크루들과 함께라면 꿀잼!',
    },

    // 27. 다트 집중
    {
      id: 27,
      category: 'ACTIVITY',
      img: dartPlayImg,
      title: '신중하게 조준! 전자 다트 풀집중 모드',
      tape: 'tape-green',
      tapeText: 'DART MATCH',
      rotate: 'rotate-[-2deg]',
      tag: '다트 게임 🎯',
      desc: '과녁 정중앙을 향해 던지는 집중의 순간! 크루들의 응원 속에 짜릿한 득점.',
    },

    // 28. 다트 환호
    {
      id: 28,
      category: 'ACTIVITY',
      img: dartImg,
      title: '환호성 폭발하는 불꽃의 다트 매치',
      tape: 'tape-blue',
      tapeText: 'BULLSEYE!',
      rotate: 'rotate-[1deg]',
      tag: '전자 다트 🎯',
      desc: '마지막 1발에 걸린 디저트 쏘기 내기! 뒤에서 숨죽이고 지켜보다가 들어가는 순간 다같이 환호!',
    },

    // 29. 공식 포스터
    {
      id: 29,
      category: 'ALL',
      img: posterImg,
      title: 'ALL DAY FRIENDS 13기 공식 포스터',
      tape: 'tape-yellow',
      tapeText: 'OFFICIAL POSTER',
      rotate: 'rotate-[-1deg]',
      tag: '13기 모집중 💫',
      desc: '게임, 팝업&전시, 카페&맛집, 영화&책, 야구! 5가지 테마로 꽉 채운 13기에서 함께해요.',
    },
  ];

  const filteredPhotos = selectedCategory === 'ALL' 
    ? photos 
    : photos.filter((p) => p.category === selectedCategory || p.category === 'ALL');

  return (
    <div className="space-y-8">
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
              올데프 크루들의 생생한 활동 아카이브 ({photos.length}장의 리얼 추억)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              우리는 주말과 공강을 이렇게 놀아요! 📸
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              광화문 서울라이트 야경 투어부터 박물관 굿즈, 감성 공유주방 쿡방 파티, 노을 산책, 치맥,<br />
              카페 디저트 투어, 잔디밭 추리 보드게임까지! 청춘들의 리얼한 일상을 만나보세요.
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

        {/* 카테고리 필터 칩 */}
        <div className="mt-6 pt-5 border-t border-dashed border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            테마별 필터:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs scale-[1.03]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 스크랩북 폴라로이드 그리드 (총 29장) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredPhotos.map((photo) => (
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
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  크게 보기
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
