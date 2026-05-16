import { ArrowUpRight, ArrowDownRight, Gift, Users } from 'lucide-react';

export function CoinTab() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">코인</h2>
      </div>

      {/* Balance Card */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">보유 코인</p>
          <p className="text-5xl font-bold mb-1">3,450</p>
          <p className="text-sm opacity-90">≈ 3,450원</p>

          <button className="w-full bg-white text-orange-600 rounded-xl py-3 font-semibold mt-6 active:scale-[0.98] transition-transform">
            출금하기
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mt-6 grid grid-cols-3 gap-3">
        <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
          <p className="text-lg font-bold text-green-700">+125</p>
          <p className="text-xs text-green-600 mt-1">오늘</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
          <p className="text-lg font-bold text-blue-700">+680</p>
          <p className="text-xs text-blue-600 mt-1">이번 주</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100">
          <p className="text-lg font-bold text-purple-700">+2,340</p>
          <p className="text-xs text-purple-600 mt-1">이번 달</p>
        </div>
      </div>

      {/* Withdraw Options */}
      <div className="px-4 mt-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">출금 옵션</h3>
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <ArrowUpRight size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">계좌 이체</p>
                <p className="text-xs text-gray-600">수수료 100원</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">5,000원~</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Gift size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">기프티콘</p>
                <p className="text-xs text-gray-600">편의점, 카페</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">5,000원~</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 rounded-full p-2">
                <Users size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">포인트 전환</p>
                <p className="text-xs text-gray-600">카카오페이, 네이버페이</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">5,000원~</div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4 mt-6 mb-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">적립 내역</h3>
        <div className="bg-gray-50 rounded-xl divide-y divide-gray-200">
          {[
            { type: 'earn', title: '테스트 응답', amount: '+5', date: '오늘 14:32', icon: ArrowDownRight, color: 'text-green-600', bg: 'bg-green-50' },
            { type: 'earn', title: '적중 보너스', amount: '+10', date: '오늘 14:25', icon: ArrowDownRight, color: 'text-green-600', bg: 'bg-green-50' },
            { type: 'earn', title: '테스트 응답', amount: '+5', date: '오늘 14:18', icon: ArrowDownRight, color: 'text-green-600', bg: 'bg-green-50' },
            { type: 'earn', title: '출석 보상', amount: '+20', date: '오늘 09:15', icon: ArrowDownRight, color: 'text-green-600', bg: 'bg-green-50' },
            { type: 'earn', title: '테스트 응답', amount: '+5', date: '어제 21:45', icon: ArrowDownRight, color: 'text-green-600', bg: 'bg-green-50' },
            { type: 'earn', title: '적중 보너스', amount: '+10', date: '어제 21:30', icon: ArrowDownRight, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((transaction, idx) => {
            const Icon = transaction.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`${transaction.bg} rounded-full p-2`}>
                    <Icon size={16} className={transaction.color} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.title}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${transaction.color}`}>
                  {transaction.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Notice */}
      <div className="px-4 mb-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-xs text-blue-900 font-medium mb-2">📌 출금 안내</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• 5,000 코인부터 출금 가능합니다</li>
            <li>• 출금 신청 후 영업일 기준 3일 내 처리됩니다</li>
            <li>• 신뢰도 등급에 따라 일일 출금 한도가 적용됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
