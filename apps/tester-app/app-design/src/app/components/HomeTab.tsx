import { Sparkles, Gift, TrendingUp } from 'lucide-react';

interface HomeTabProps {
  onStartTest: () => void;
}

export function HomeTab({ onStartTest }: HomeTabProps) {
  return (
    <div className="pb-20 bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">ThumbGo</h1>
          <div className="flex items-center gap-2">
            <Gift size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Coin Balance Card */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">보유 코인</p>
            <p className="text-4xl font-bold">3,450</p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <Sparkles size={32} />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <p className="opacity-80">오늘 적립</p>
            <p className="font-semibold">+125 코인</p>
          </div>
          <div className="h-8 w-px bg-white/30"></div>
          <div>
            <p className="opacity-80">신뢰도</p>
            <p className="font-semibold">등급 A (87%)</p>
          </div>
        </div>
      </div>

      {/* Today's Tests */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">오늘의 테스트</h2>
          <span className="text-sm text-red-600 font-medium">12개 대기 중</span>
        </div>

        <button
          onClick={onStartTest}
          className="w-full bg-red-600 text-white rounded-xl py-4 font-semibold text-base shadow-md active:scale-[0.98] transition-transform"
        >
          테스트 시작하기
        </button>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mt-6 grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">47</p>
          <p className="text-xs text-gray-600">오늘 응답</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">82%</p>
          <p className="text-xs text-gray-600">적중률</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">234</p>
          <p className="text-xs text-gray-600">누적 응답</p>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="px-4 mt-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">출석 보상</h3>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                연속 출석 5일째! 🔥
              </p>
              <p className="text-xs text-gray-600">
                2일 더 출석하면 +500 코인 보너스
              </p>
            </div>
            <div className="bg-yellow-400 rounded-full px-3 py-1">
              <span className="text-sm font-bold text-gray-900">5/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Friends */}
      <div className="px-4 mt-6">
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">
              친구 초대하고 500 코인 받기
            </p>
            <p className="text-xs text-gray-600">
              추천 코드: THUMB2024
            </p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            공유
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="px-4 mt-6 mb-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">최근 활동</h3>
        <div className="space-y-2">
          {[
            { action: '테스트 응답', coins: '+5', time: '2분 전' },
            { action: '적중 보너스', coins: '+10', time: '15분 전' },
            { action: '출석 보상', coins: '+20', time: '1시간 전' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
              <span className="text-sm font-semibold text-green-600">
                {item.coins}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
