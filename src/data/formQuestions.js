export const THEMES = [
  {
    id: 'game',
    title: '게임',
    enTitle: 'GAME!',
    badge: '🎮 게임',
    color: 'emerald',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentHex: '#059669',
    desc: '보드게임, 오락실, 파티게임',
    tapeClass: 'tape-green',
  },
  {
    id: 'popup',
    title: '팝업 & 전시',
    enTitle: 'POP-UP & EXHIBITION',
    badge: '🛍️ 팝업',
    color: 'rose',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
    accentHex: '#E11D48',
    desc: '성수 팝업, 핫플 전시, 공방',
    tapeClass: 'tape-pink',
  },
  {
    id: 'cafe',
    title: '카페 & 맛집',
    enTitle: 'CAFE & FOOD',
    badge: '☕ 카페',
    color: 'amber',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
    accentHex: '#D97706',
    desc: '디저트 카페, 맛집 탐방',
    tapeClass: 'tape-yellow',
  },
  {
    id: 'movie',
    title: '영화 & 책',
    enTitle: 'MOVIE & BOOK',
    badge: '🎬 영화책',
    color: 'indigo',
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    accentHex: '#4F46E5',
    desc: '영화 관람, 인생 책 나눔',
    tapeClass: 'tape-blue',
  },
  {
    id: 'baseball',
    title: '야구',
    enTitle: 'BASEBALL!!',
    badge: '⚾ 야구',
    color: 'red',
    tagColor: 'bg-red-100 text-red-800 border-red-300',
    accentHex: '#DC2626',
    desc: '야구장 직관, 치맥 응원',
    tapeClass: 'tape-pink',
  },
];

export const THEME_LEVELS = [
  { level: 1, label: '이제 막 관심이 생긴 뉴비', emoji: '🌱' },
  { level: 2, label: '가끔 즐기는 편', emoji: '☕' },
  { level: 3, label: '꽤 자주 찾아다니는 편', emoji: '🔥' },
  { level: 4, label: '주변에서도 내가 좋아하는 걸 다 알고 있음', emoji: '⚡' },
  { level: 5, label: '나도 조장 가능할 정도의 고인물', emoji: '👑' },
];

export const PLAY_POSITIONS = [
  '일단 따라가면 잘 노는 편',
  '먼저 "뭐 할래?" 하고 제안하는 편',
  '맛집이나 핫플 찾아오는 편',
  '일정이나 예약을 챙기는 편',
  '사진을 많이 찍는 편',
  '분위기를 띄우는 편',
  '처음엔 조용하지만 친해지면 달라지는 편',
];

export const FIRST_MEETING_STYLES = [
  '먼저 여기저기 말을 걸어보는 편',
  '누가 말 걸어주면 금방 친해지는 편',
  '처음에는 조용히 분위기를 보는 편',
  '한두 명과 친해지면 금방 편해지는 편',
];

export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const TIMES = ['낮', '저녁'];

export const PARTICIPATION_FREQUENCIES = [
  '월 1회 정도',
  '월 2회 정도',
  '월 3회 이상',
  '시간만 맞으면 번개까지 자주 가능',
];

export const APPLY_REASONS = [
  '새로운 친구를 만들고 싶어서',
  '취향 맞는 친구를 만나고 싶어서',
  '평소 못 해본 활동을 해보고 싶어서',
  '학교 밖 다양한 사람들을 만나보고 싶어서',
  '주말이나 공강을 더 재밌게 보내고 싶어서',
  '모집글을 보고 그냥 재밌어 보여서',
];

export const CHECKLIST_ITEMS = [
  { id: 'rule1', text: '격주 1회 조별 활동 + 월 1회 연합 활동으로 진행됩니다.' },
  { id: 'rule2', text: '입회비는 10,000원이며, 활동별 비용은 1/N로 정산됩니다.' },
  { id: 'rule3', text: '가입 후 첫 1개월은 선택한 테마를 중심으로 활동합니다.' },
  { id: 'rule4', text: '서울 전 지역에서 활동이 진행될 수 있습니다.' },
  { id: 'rule5', text: '정치·종교·상업·포교 목적의 참여는 제한됩니다.' },
];
