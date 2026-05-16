import { Home, Play, BarChart3, Coins, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'test', icon: Play, label: '테스트' },
    { id: 'score', icon: BarChart3, label: '성적표' },
    { id: 'coin', icon: Coins, label: '코인' },
    { id: 'profile', icon: User, label: '프로필' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-[56px] flex items-center justify-around px-2 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1"
          >
            <Icon
              size={24}
              className={isActive ? 'text-red-600' : 'text-gray-600'}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={`text-[10px] ${isActive ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
