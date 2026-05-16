import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-xl font-bold text-gray-950">없는 화면이에요</h1>
      <p className="mt-2 text-sm text-gray-600">
        요청한 페이지를 찾을 수 없습니다.
      </p>
      <Link
        className="mt-6 flex min-h-11 w-full items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white shadow-sm shadow-red-200 active:scale-[0.98]"
        href="/"
      >
          <Home aria-hidden className="mr-2 size-4" />
          홈으로 가기
      </Link>
    </div>
  );
}
