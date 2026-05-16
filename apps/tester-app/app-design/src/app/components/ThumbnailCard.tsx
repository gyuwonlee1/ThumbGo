import { motion } from 'motion/react';

interface ThumbnailCardProps {
  imageUrl: string;
  title: string;
  channel: string;
  onClick: () => void;
  variant?: 'default' | 'large';
}

export function ThumbnailCard({
  imageUrl,
  title,
  channel,
  onClick,
  variant = 'default'
}: ThumbnailCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="mt-3 px-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600">
          {channel}
        </p>
      </div>
    </motion.div>
  );
}
