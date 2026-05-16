import type { ThumbnailOption } from "@/lib/types";
import { cn } from "@/lib/utils";

type ThumbnailCardProps = {
  thumbnail: ThumbnailOption;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export function ThumbnailCard({
  thumbnail,
  onSelect,
  disabled
}: ThumbnailCardProps) {
  return (
    <button
      className={cn(
        "group w-full rounded-xl text-left transition active:scale-[0.985]",
        disabled && "pointer-events-none opacity-70"
      )}
      disabled={disabled}
      onClick={onSelect}
      type="button"
    >
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          alt="테스트용 유튜브 썸네일"
          className="h-full w-full object-cover transition duration-200 group-active:scale-[1.02]"
          src={thumbnail.imageUrl}
        />
      </div>
      <div className="mt-3 flex gap-3 px-0.5">
        <div className="mt-0.5 size-9 shrink-0 rounded-full bg-gradient-to-br from-red-500 to-gray-900" />
        <div className="min-w-0">
          <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug text-gray-950">
            {thumbnail.title}
          </h2>
          <p className="mt-1 truncate text-xs text-gray-500">
            {thumbnail.channel}
          </p>
          <p className="mt-0.5 truncate text-xs text-gray-500">
            {thumbnail.meta}
          </p>
        </div>
      </div>
    </button>
  );
}
