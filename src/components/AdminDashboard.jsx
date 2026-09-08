import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Lock, 
  KeyRound, 
  Users, 
  Download, 
  RefreshCw, 
  Search, 
  Filter, 
  ArrowLeft, 
  LogOut, 
  Trash2, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  X,
  AlertCircle
} from 'lucide-react';
import { THEMES } from '../data/formQuestions';
import CrewPassCard from './CrewPassCard';

const ADMIN_PASSWORD = '00347';

export default function AdminDashboard({ onGoHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adf_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // 지원서 목록 상태
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // 검색 및 필터 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemeFilter, setSelectedThemeFilter] = useState('ALL');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState('ALL');

  // 상세 보기 모달
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // 인증 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adf_admin_auth', 'true');
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adf_admin_auth');
  };

  // Firestore에서 지원서 실시간 구독
  const fetchApplicants = () => {
    setLoading(true);
    setFetchError(null);

    try {
      const q = query(collection(db, 'applications_13th'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          setApplicants(list);
          setLoading(false);
        },
        (err) => {
          console.error('Firestore 읽기 오류:', err);
          setFetchError(err.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('Firestore 연결 에러:', err);
      setFetchError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = fetchApplicants();
      return () => {
        if (typeof unsubscribe === 'function') unsubscribe();
      };
    }
  }, [isAuthenticated]);

  // 지원서 삭제
  const handleDelete = async (id, name) => {
    if (window.confirm(`정말로 [${name || '이 지원자'}] 님의 지원서를 삭제하시겠습니까?`)) {
      try {
        await deleteDoc(doc(db, 'applications_13th', id));
        if (selectedApplicant?.id === id) {
          setSelectedApplicant(null);
        }
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다: ' + err.message);
      }
    }
  };

  // CSV 내보내기
  const exportToCSV = () => {
    if (applicants.length === 0) {
      alert('내보낼 지원자 데이터가 없습니다.');
      return;
    }

    const headers = [
      '접수일시',
      '이름',
      '성별',
      '나이',
      '학교',
      '학과',
      '학년',
      '활동지역',
      '연락처',
      '1순위테마',
      '테마레벨',
      '하고싶은활동',
      '모임포지션',
      '첫모임스타일',
      '만나고싶은친구',
      '지원이유',
      '활동빈도',
      '올데프버킷리스트'
    ];

    const rows = applicants.map((a) => {
      const date = a.createdAt?.toDate 
        ? a.createdAt.toDate().toLocaleString('ko-KR')
        : (a.createdAt || '미기록');
      const positions = Array.isArray(a.positions) ? a.positions.join(', ') : '';
      const reasons = Array.isArray(a.reasons) ? a.reasons.join(', ') : '';

      return [
        `"${date}"`,
        `"${a.name || ''}"`,
        `"${a.gender || ''}"`,
        `"${a.age || ''}"`,
        `"${a.school || ''}"`,
        `"${a.major || ''}"`,
        `"${a.grade || ''}"`,
        `"${a.subwayStation || ''}"`,
        `"${a.phone || ''}"`,
        `"${a.theme || ''}"`,
        `"${a.themeLevel || ''}"`,
        `"${(a.themeWish || '').replace(/"/g, '""')}"`,
        `"${positions}"`,
        `"${a.firstMeeting || ''}"`,
        `"${(a.wantedFriends || '').replace(/"/g, '""')}"`,
        `"${reasons}"`,
        `"${a.frequency || ''}"`,
        `"${(a.mustDoAction || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `올데프_13기_지원자명단_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 필터링 적용
  const filteredApplicants = applicants.filter((a) => {
    // 텍스트 검색 (이름, 학교, 역, 연락처)
    const matchSearch = searchQuery.trim() === '' || 
      (a.name && a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.school && a.school.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.subwayStation && a.subwayStation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.phone && a.phone.includes(searchQuery));

    // 테마 필터
    const matchTheme = selectedThemeFilter === 'ALL' || a.theme === selectedThemeFilter;

    // 성별 필터
    const matchGender = selectedGenderFilter === 'ALL' || a.gender === selectedGenderFilter;

    return matchSearch && matchTheme && matchGender;
  });

  // 통계 계산
  const totalCount = applicants.length;
  const maleCount = applicants.filter(a => a.gender === '남').length;
  const femaleCount = applicants.filter(a => a.gender === '여').length;

  // 1. 비밀번호 입력 화면
  if (!isAuthenticated) {
    return (
      <div className="max-w-md w-full mx-auto my-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900 polaroid-shadow text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="font-marker text-xs text-[#1854F2] uppercase tracking-wider">RESTRICTED AREA</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">13기 관리자 로그인</h2>
            <p className="text-xs text-slate-500 mt-1">비밀번호 5자리를 입력해주세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="비밀번호를 입력하세요"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
                className={`w-full px-4 py-3.5 rounded-2xl border-2 text-center tracking-widest text-lg font-mono focus:outline-none transition ${
                  authError 
                    ? 'border-rose-500 bg-rose-50 text-rose-900 animate-shake' 
                    : 'border-slate-200 focus:border-slate-900 bg-slate-50'
                }`}
                autoFocus
              />
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {authError && (
              <p className="text-xs font-bold text-rose-600 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                비밀번호가 일치하지 않습니다.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-sm shadow-md transition cursor-pointer active:scale-98"
            >
              대시보드 접속하기
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onGoHome}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              메인 화면으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 관리자 대시보드 본문 화면
  return (
    <div className="max-w-6xl w-full mx-auto space-y-6 pb-16 animate-in fade-in duration-200">
      {/* 상단 네비게이션 & 액션바 */}
      <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="메인 홈으로"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-marker text-base sm:text-lg text-[#1854F2]">
                ALL DAY FRIENDS 13TH
              </span>
              <span className="bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              실시간 지원자 현황 및 데이터 관리 대시보드
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={fetchApplicants}
            className="px-3.5 py-2 rounded-xl border-2 border-slate-200 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="새로고침"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            새로고침
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            엑셀(CSV) 다운로드
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            로그아웃
          </button>
        </div>
      </div>

      {/* 실시간 요약 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">총 지원자</span>
          <div className="text-2xl sm:text-3xl font-black text-[#1854F2] mt-1 flex items-baseline gap-1">
            {totalCount}
            <span className="text-xs font-bold text-slate-500">명</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">성별 비율</span>
          <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-1.5 flex items-center gap-2">
            <span className="text-blue-600 font-black">남 {maleCount}</span>
            <span className="text-slate-300">/</span>
            <span className="text-rose-600 font-black">여 {femaleCount}</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">선택 테마 수</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-1 flex items-baseline gap-1">
            {THEMES.length}
            <span className="text-xs font-bold text-slate-500">개 테마</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">DB 연결 상태</span>
          <div className="text-sm sm:text-base font-extrabold text-emerald-600 mt-2 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            FIRESTORE LIVE
          </div>
        </div>
      </div>

      {/* Firestore 에러 배너 (권한 미설정 시 안내) */}
      {fetchError && (
        <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl text-xs text-rose-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Firestore 읽기 권한 확인이 필요합니다.</p>
            <p className="text-rose-700">
              Firebase 콘솔 → Firestore Database → 규칙(Rules) 탭에서 <code className="bg-rose-200/60 px-1 py-0.5 rounded font-mono">allow read: if true;</code>가 허용되어 있는지 확인해주세요.
            </p>
          </div>
        </div>
      )}

      {/* 검색창 및 필터 바 */}
      <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="이름, 대학교, 지하철역, 연락처 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">성별:</span>
            {['ALL', '남', '여'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenderFilter(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedGenderFilter === g
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {g === 'ALL' ? '전체' : g}
              </button>
            ))}
          </div>
        </div>

        {/* 테마 필터 칩 */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            테마:
          </span>
          <button
            onClick={() => setSelectedThemeFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
              selectedThemeFilter === 'ALL'
                ? 'bg-[#1854F2] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체
          </button>
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedThemeFilter(theme.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedThemeFilter === theme.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {theme.title}
            </button>
          ))}
        </div>
      </div>

      {/* 지원자 목록 테이블 / 카드 뷰 */}
      <div className="bg-white rounded-3xl border-2 border-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              지원자 목록
            </h3>
            <span className="text-xs font-bold text-slate-400">
              ({filteredApplicants.length}명 표시 중)
            </span>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400">
            데이터를 불러오는 중입니다...
          </div>
        ) : filteredApplicants.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-400">
              {applicants.length === 0 
                ? '아직 접수된 지원서가 없습니다.' 
                : '검색 및 필터 조건과 일치하는 지원자가 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider">
                  <th className="py-3 px-4">지원자</th>
                  <th className="py-3 px-4">학교 / 학과</th>
                  <th className="py-3 px-4">활동역</th>
                  <th className="py-3 px-4">연락처</th>
                  <th className="py-3 px-4">1순위 테마</th>
                  <th className="py-3 px-4">접수일시</th>
                  <th className="py-3 px-4 text-center">상세 / 관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredApplicants.map((applicant) => {
                  const themeObj = THEMES.find((t) => t.id === applicant.theme);
                  const dateStr = applicant.createdAt?.toDate 
                    ? applicant.createdAt.toDate().toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : '방금 전';

                  return (
                    <tr 
                      key={applicant.id}
                      className="hover:bg-blue-50/40 transition cursor-pointer group"
                      onClick={() => setSelectedApplicant(applicant)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          {applicant.name || '무명'}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            applicant.gender === '남' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {applicant.gender || '-'} {applicant.age ? `${applicant.age}세` : ''}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        <div>{applicant.school || '-'}</div>
                        <div className="text-[11px] text-slate-400">{applicant.major || ''} {applicant.grade ? `(${applicant.grade})` : ''}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {applicant.subwayStation || '-'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                        {applicant.phone || '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        {themeObj ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shadow-2xs" style={{ backgroundColor: themeObj.accentHex }}>
                            {themeObj.title}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">{applicant.theme || '-'}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-400 font-medium whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedApplicant(applicant)}
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1854F2] transition cursor-pointer"
                            title="상세 보기"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(applicant.id, applicant.name)}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 지원자 상세 정보 팝업 모달 */}
      {selectedApplicant && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedApplicant(null)}
        >
          <div 
            className="bg-white max-w-2xl w-full rounded-3xl border-2 border-slate-900 shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 상단 헤더 */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-marker text-sm tracking-wide text-amber-400">APPLICANT PROFILE</span>
                <span className="text-xs text-slate-300">
                  {selectedApplicant.name} 지원서
                </span>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto bg-[#FAF7F0]">
              {/* 크루 패스 프리뷰 */}
              <div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
                  생성된 13기 크루 패스 카드
                </span>
                <CrewPassCard formData={selectedApplicant} isModal={true} />
              </div>

              {/* 14개 문항 상세 답변 목록 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 space-y-4">
                <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-2">
                  전체 설문 상세 응답 내역
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-bold block text-[10px]">연락처 (클릭 시 복사)</span>
                    <span 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedApplicant.phone || '');
                        alert('연락처가 복사되었습니다: ' + selectedApplicant.phone);
                      }}
                      className="font-bold text-slate-900 font-mono cursor-pointer hover:underline text-sm"
                    >
                      📞 {selectedApplicant.phone || '-'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-bold block text-[10px]">활동 희망 지역</span>
                    <span className="font-bold text-slate-900 text-sm">
                      📍 {selectedApplicant.subwayStation || '-'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-bold block text-[10px]">월 참여 빈도</span>
                    <span className="font-bold text-slate-900">
                      🗓️ {selectedApplicant.frequency || '-'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-bold block text-[10px]">첫 모임에서의 성향</span>
                    <span className="font-bold text-slate-900">
                      🤝 {selectedApplicant.firstMeeting || '-'}
                    </span>
                  </div>
                </div>

                {/* 만나고 싶은 친구 */}
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <span className="text-slate-400 font-bold block text-[10px]">만나고 싶은 친구</span>
                  <p className="font-medium text-slate-800">
                    {selectedApplicant.wantedFriends || '(미입력)'}
                  </p>
                </div>

                {/* 올데프에서 꼭 해보고 싶은 것 */}
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <span className="text-slate-400 font-bold block text-[10px]">올데프에서 꼭 해보고 싶은 것</span>
                  <p className="font-medium text-slate-800">
                    {selectedApplicant.mustDoAction || '(미입력)'}
                  </p>
                </div>

                {/* 지원 이유 */}
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
                  <span className="text-slate-400 font-bold block text-[10px]">동아리 지원 이유</span>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(selectedApplicant.reasons) && selectedApplicant.reasons.length > 0 ? (
                      selectedApplicant.reasons.map((r) => (
                        <span key={r} className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px]">
                          ✓ {r}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">(미입력)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 모달 하단 버튼 */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedApplicant.id, selectedApplicant.name)}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                지원서 삭제
              </button>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
