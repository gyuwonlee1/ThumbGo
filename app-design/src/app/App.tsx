import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { TestTab } from './components/TestTab';
import { ScoreTab } from './components/ScoreTab';
import { CoinTab } from './components/CoinTab';
import { ProfileTab } from './components/ProfileTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleStartTest = () => {
    setActiveTab('test');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onStartTest={handleStartTest} />;
      case 'test':
        return <TestTab />;
      case 'score':
        return <ScoreTab />;
      case 'coin':
        return <CoinTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <HomeTab onStartTest={handleStartTest} />;
    }
  };

  return (
    <div className="size-full bg-white overflow-auto">
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}