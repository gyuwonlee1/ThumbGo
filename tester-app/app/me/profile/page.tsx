"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Shield,
  X,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ViewerCategories } from "@/lib/schemas";
import { useAuth } from "@/lib/auth-context";
import { getMyProfile, saveProfile } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Profile = {
  nickname: string;
  gender: "M" | "F" | "UNDISCLOSED";
  birthYear: number;
  categories: string[];
};

type ModalType = "profile" | "categories" | null;

export default function ProfilePage() {
  const router = useRouter();
  const { signOut } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [saving, setSaving] = useState(false);

  // 모달 편집용 임시 상태
  const [editNickname, setEditNickname] = useState("");
  const [editGender, setEditGender] = useState<Profile["gender"]>("UNDISCLOSED");
  const [editBirthYear, setEditBirthYear] = useState(2000);
  const [editCategories, setEditCategories] = useState<string[]>([]);

  useEffect(() => {
    void getMyProfile().then((p) => {
      if (p) setProfile(p);
    });
  }, []);

  const openProfileModal = () => {
    if (!profile) return;
    setEditNickname(profile.nickname);
    setEditGender(profile.gender);
    setEditBirthYear(profile.birthYear);
    setModal("profile");
  };

  const openCategoryModal = () => {
    if (!profile) return;
    setEditCategories([...profile.categories]);
    setModal("categories");
  };

  const saveProfileEdit = async () => {
    if (!profile) return;
    setSaving(true);
    await saveProfile({
      nickname: editNickname,
      gender: editGender,
      birthYear: editBirthYear,
      categories: profile.categories,
    });
    setProfile((p) => p ? { ...p, nickname: editNickname, gender: editGender, birthYear: editBirthYear } : p);
    setSaving(false);
    setModal(null);
  };

  const saveCategoryEdit = async () => {
    if (!profile) return;
    setSaving(true);
    await saveProfile({
      nickname: profile.nickname,
      gender: profile.gender,
      birthYear: profile.birthYear,
      categories: editCategories,
    });
    setProfile((p) => p ? { ...p, categories: editCategories } : p);
    setSaving(false);
    setModal(null);
  };

  const toggleCategory = (cat: string) => {
    setEditCategories((prev) => {
      if (prev.includes(cat)) return prev.filter((c) => c !== cat);
      if (prev.length >= 5) return prev;
      return [...prev, cat];
    });
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const genderLabel = (g: Profile["gender"]) =>
    g === "M" ? "남" : g === "F" ? "여" : "응답 안 함";

  return (
    <AppShell>
      <PageHeader subtitle="내 정보와 앱 설정" title="프로필" />

      {/* 사용자 카드 */}
      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-700 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-white/20 text-2xl font-black">
              썸
            </div>
            <div className="min-w-0">
              <p className="truncate text-xl font-black">
                {profile?.nickname ?? "—"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-white/20 px-2 py-1">
                  {profile?.birthYear
                    ? `${new Date().getFullYear() - profile.birthYear}세`
                    : "—"}
                </span>
                <span className="rounded bg-white/20 px-2 py-1">
                  {profile ? genderLabel(profile.gender) : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 시청 성향 */}
      <section className="px-4 pt-6">
        <h2 className="mb-3 text-sm font-bold text-gray-500">시청 성향</h2>
        <div className="rounded-xl bg-gray-50 p-4">
          {profile?.categories.length ? (
            <div className="flex flex-wrap gap-2">
              {profile.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                >
                  {cat}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">카테고리를 설정해주세요.</p>
          )}
        </div>
      </section>

      {/* 설정 메뉴 */}
      <section className="px-4 pt-6">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {[
            { icon: Shield, label: "프로필 수정", action: openProfileModal },
            { icon: Bell, label: "관심 카테고리 재설정", action: openCategoryModal },
            { icon: HelpCircle, label: "문의하기", action: undefined },
            { icon: Shield, label: "개인정보 처리방침", action: undefined },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="flex min-h-14 w-full items-center justify-between px-4 text-left hover:bg-gray-50"
                type="button"
                onClick={item.action}
              >
                <span className="flex items-center gap-3 text-sm font-bold text-gray-900">
                  <Icon aria-hidden className="size-5 text-gray-500" />
                  {item.label}
                </span>
                <ChevronRight aria-hidden className="size-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </section>

      {/* 로그아웃 */}
      <section className="px-4 py-6 text-center">
        <button
          className="inline-flex items-center justify-center gap-2 py-3 text-sm font-bold text-red-600"
          type="button"
          onClick={() => void handleLogout()}
        >
          <LogOut aria-hidden className="size-4" />
          로그아웃
        </button>
        <p className="mt-3 text-xs text-gray-400">썸네일고수 v1.0.0</p>
      </section>

      {/* ── 프로필 수정 모달 ── */}
      {modal === "profile" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="w-full max-w-md rounded-t-2xl bg-white px-4 pb-safe pt-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-gray-950">프로필 수정</h2>
              <button type="button" onClick={() => setModal(null)}>
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            <label className="block text-sm font-bold text-gray-800">
              닉네임
              <input
                className="mt-2 min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-red-500"
                maxLength={20}
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
              />
            </label>

            <label className="mt-4 block text-sm font-bold text-gray-800">
              생년
              <input
                className="mt-2 min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-red-500"
                inputMode="numeric"
                value={editBirthYear}
                onChange={(e) => setEditBirthYear(Number(e.target.value || 0))}
              />
            </label>

            <div className="mt-4">
              <p className="text-sm font-bold text-gray-800">성별</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[["남", "M"], ["여", "F"], ["응답 안 함", "UNDISCLOSED"]].map(([label, value]) => (
                  <button
                    key={value}
                    type="button"
                    className={cn(
                      "min-h-11 rounded-xl border text-sm font-bold",
                      editGender === value
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-gray-200 text-gray-700"
                    )}
                    onClick={() => setEditGender(value as Profile["gender"])}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pb-4">
              <Button
                className="w-full"
                disabled={saving || editNickname.length < 2}
                onClick={() => void saveProfileEdit()}
              >
                {saving ? "저장 중..." : "저장"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── 카테고리 재설정 모달 ── */}
      {modal === "categories" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="w-full max-w-md rounded-t-2xl bg-white px-4 pb-safe pt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-black text-gray-950">관심 카테고리</h2>
              <button type="button" onClick={() => setModal(null)}>
                <X className="size-5 text-gray-500" />
              </button>
            </div>
            <p className="mb-5 text-sm text-gray-500">3~5개를 선택해주세요.</p>

            <div className="flex flex-wrap gap-2">
              {ViewerCategories.map((cat) => {
                const selected = editCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-bold",
                      selected
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    )}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-gray-400">
              {editCategories.length}/5 선택됨
            </p>

            <div className="mt-6 pb-4">
              <Button
                className="w-full"
                disabled={saving || editCategories.length < 3}
                onClick={() => void saveCategoryEdit()}
              >
                {saving ? "저장 중..." : "저장"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
