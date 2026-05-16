import { useState, useEffect } from 'react';
import { ThumbnailCard } from './ThumbnailCard';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

const mockTests = [
  {
    id: 1,
    question: '어떤 썸네일이 더 클릭하고 싶나요?',
    thumbnails: [
      {
        id: 'a1',
        url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
        title: '새로운 영상',
        channel: '테스트 채널',
      },
      {
        id: 'a2',
        url: 'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?w=800&h=450&fit=crop',
        title: '새로운 영상',
        channel: '테스트 채널',
      },
    ],
  },
  {
    id: 2,
    question: '어떤 썸네일이 더 클릭하고 싶나요?',
    thumbnails: [
      {
        id: 'b1',
        url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=450&fit=crop',
        title: '새로운 영상',
        channel: '테스트 채널',
      },
      {
        id: 'b2',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
        title: '새로운 영상',
        channel: '테스트 채널',
      },
    ],
  },
  {
    id: 3,
    question: '어떤 썸네일이 더 클릭하고 싶나요?',
    thumbnails: [
      {
        id: 'c1',
        url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
        title: '새로운 영상',
        channel: '테스트 채널',
      },
      {
        id: 'c2',
        url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=450&fit=crop',
        title: '새로운 영상',
        channel: '테스트 채널',
      },
    ],
  },
];

export function TestTab() {
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentTestIndex]);

  const handleThumbnailClick = (thumbnailId: string) => {
    const responseTime = Date.now() - startTime;
    const coins = 5;

    setEarnedCoins(coins);
    setShowReward(true);

    // Confetti effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF0000', '#FFD700', '#FF6B6B'],
    });

    setTimeout(() => {
      setShowReward(false);

      if (currentTestIndex < mockTests.length - 1) {
        setCurrentTestIndex(currentTestIndex + 1);
      } else {
        setCurrentTestIndex(0);
      }
    }, 1500);
  };

  const currentTest = mockTests[currentTestIndex];

  if (!currentTest) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pb-20">
        <div className="text-center px-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            오늘의 테스트를 모두 완료했어요! 🎉
          </p>
          <p className="text-sm text-gray-600">
            새로운 테스트는 약 2시간 후에 도착해요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">테스트 진행</h2>
            <p className="text-xs text-gray-500 mt-1">
              {currentTestIndex + 1} / {mockTests.length}
            </p>
          </div>
          <div className="bg-red-50 px-3 py-2 rounded-lg">
            <p className="text-xs text-gray-600">누적 적립</p>
            <p className="text-base font-bold text-red-600">+{currentTestIndex * 5} 코인</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pt-2">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentTestIndex + 1) / mockTests.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="px-4 mt-6">
        <h3 className="text-base font-semibold text-gray-900 text-center mb-6">
          {currentTest.question}
        </h3>
      </div>

      {/* Thumbnails Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTest.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="px-4 grid grid-cols-1 gap-6"
        >
          {currentTest.thumbnails.map((thumbnail) => (
            <ThumbnailCard
              key={thumbnail.id}
              imageUrl={thumbnail.url}
              title={thumbnail.title}
              channel={thumbnail.channel}
              onClick={() => handleThumbnailClick(thumbnail.id)}
              variant="large"
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Reward Toast */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Sparkles size={40} className="text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                +{earnedCoins} 코인
              </p>
              <p className="text-sm text-gray-600">적립 완료!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <div className="px-4 mt-8">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-xs text-blue-900 font-medium mb-1">💡 팁</p>
          <p className="text-xs text-blue-800">
            실제로 유튜브에서 보고 싶은 영상을 선택해주세요.
            적중률이 높을수록 더 많은 보너스를 받을 수 있어요!
          </p>
        </div>
      </div>
    </div>
  );
}
