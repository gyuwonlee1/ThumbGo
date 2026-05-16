import { TrendingUp, Target, Award, Calendar } from 'lucide-react';

export function ScoreTab() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">내 성적표</h2>
      </div>

      {/* Grade Card */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-2">현재 등급</p>
              <p className="text-5xl font-bold mb-1">A</p>
              <p className="text-sm opacity-90">상위 15%</p>
            </div>
            <div className="bg-white/20 rounded-full p-4">
              <Award size={40} />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-90">다음 등급까지</span>
              <span className="font-semibold">24표</span>
            </div>
            <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[68%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mt-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">통계</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} className="text-red-600" />
              <p className="text-xs text-gray-600">적중률</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">87%</p>
            <p className="text-xs text-green-600 mt-1">+5% 증가</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-blue-600" />
              <p className="text-xs text-gray-600">신뢰도</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">92점</p>
            <p className="text-xs text-green-600 mt-1">안정적</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-purple-600" />
              <p className="text-xs text-gray-600">누적 응답</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">234</p>
            <p className="text-xs text-gray-500 mt-1">이번 달</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} className="text-yellow-600" />
              <p className="text-xs text-gray-600">평균 응답시간</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">6.2초</p>
            <p className="text-xs text-gray-500 mt-1">정상 범위</p>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="px-4 mt-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">주간 적중률</h3>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-end justify-between h-32 gap-2">
            {[75, 82, 88, 85, 90, 87, 92].map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-red-600 rounded-t" style={{ height: `${value}%` }}></div>
                <span className="text-xs text-gray-600">
                  {['월', '화', '수', '목', '금', '토', '일'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="px-4 mt-6 mb-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">카테고리별 응답 분포</h3>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          {[
            { category: '게임', count: 45, color: 'bg-blue-600' },
            { category: '뷰티', count: 32, color: 'bg-pink-600' },
            { category: '푸드', count: 28, color: 'bg-orange-600' },
            { category: 'IT·테크', count: 24, color: 'bg-purple-600' },
            { category: '엔터·예능', count: 18, color: 'bg-red-600' },
          ].map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{item.category}</span>
                <span className="text-sm font-semibold text-gray-900">{item.count}개</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${(item.count / 45) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">달성한 업적</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: '🔥', title: '연속 출석', desc: '7일' },
            { emoji: '🎯', title: '정확한 눈', desc: '적중률 90%+' },
            { emoji: '⚡', title: '빠른 응답', desc: '100회 달성' },
          ].map((badge, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{badge.emoji}</div>
              <p className="text-xs font-semibold text-gray-900 mb-1">{badge.title}</p>
              <p className="text-[10px] text-gray-600">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
