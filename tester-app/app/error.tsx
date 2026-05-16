"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-xl font-bold text-gray-950">화면을 불러오지 못했어요</h1>
      <p className="mt-2 text-sm leading-6 text-gray-600">
        잠시 뒤 다시 시도해주세요. 입력한 응답은 저장되지 않았습니다.
      </p>
      <Button className="mt-6 w-full" onClick={reset}>
        <RotateCcw aria-hidden className="mr-2 size-4" />
        다시 시도
      </Button>
    </div>
  );
}
