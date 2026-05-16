import { ChevronRight, Settings, Bell, HelpCircle, Shield, LogOut, Star } from 'lucide-react';

export function ProfileTab() {
  const menuItems = [
    { icon: Settings, label: '프로필 수정', badge: null },
    { icon: Star, label: '관심 카테고리 설정', badge: null },
    { icon: Bell, label: '알림 설정', badge: null },
    { icon: HelpCircle, label: '도움말', badge: null },
    { icon: Shield, label: '개인정보 처리방침', badge: null },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">프로필</h2>
      </div>

      {/* Profile Card */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              테
            </div>
            <div>
              <p className="text-xl font-bold mb-1">테스터123</p>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-2 py-1 rounded text-xs">등급 A</span>
                <span className="text-sm opacity-90">87% 적중률</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">234</p>
              <p className="text-xs opacity-90">응답 수</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">5일</p>
              <p className="text-xs opacity-90">연속 출석</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-1">12</p>
              <p className="text-xs opacity-90">초대 친구</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">계정 정보</h3>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">성별</span>
            <span className="text-sm font-medium text-gray-900">남성</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">연령대</span>
            <span className="text-sm font-medium text-gray-900">20대</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">가입일</span>
            <span className="text-sm font-medium text-gray-900">2026.03.15</span>
          </div>
        </div>
      </div>

      {/* Watching Preferences */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">시청 성향</h3>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2">자주 보는 카테고리</p>
            <div className="flex flex-wrap gap-2">
              {['게임', '뷰티', 'IT·테크', '푸드', '엔터·예능'].map((cat) => (
                <span key={cat} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-600">일일 시청 시간</span>
              <span className="text-xs font-medium text-gray-900">2시간 이상</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">주 사용 기기</span>
              <span className="text-xs font-medium text-gray-900">모바일</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Referral Code */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-900">내 추천 코드</p>
            <button className="text-xs text-red-600 font-semibold">복사</button>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">THUMB2024</p>
          <p className="text-xs text-gray-600">
            친구가 가입하면 나도 친구도 500 코인 적립!
          </p>
        </div>
      </div>

      {/* Version & Logout */}
      <div className="px-4 mt-6 mb-4">
        <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-red-600 font-medium">
          <LogOut size={18} />
          로그아웃
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          ThumbGo v1.0.0
        </p>
      </div>
    </div>
  );
}
