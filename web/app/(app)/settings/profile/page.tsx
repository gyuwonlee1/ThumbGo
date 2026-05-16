"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Key, Bell } from "lucide-react";

export default function ProfileSettingsPage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    testComplete: true,
    deadline: true,
    uploadSchedule: false,
    lowCredit: true,
  });

  const toggleNotif = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="프로필 설정" description="계정 정보 및 환경 설정" />
      <main className="flex-1 p-6 space-y-6">
        <div className="max-w-2xl space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-5">
                <div className="relative">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="프로필" className="h-16 w-16 rounded-2xl object-cover" />
                  ) : (
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                      김
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
                  >
                    <Camera className="h-3 w-3" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">김민준</p>
                  <p className="text-xs text-slate-400">minjun@abc.agency</p>
                  <Badge variant="warning" className="mt-1 text-[10px]">Owner</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="이름" defaultValue="김민준" />
                <Input label="에이전시명" defaultValue="ABC 크리에이터즈" />
              </div>
              <Input label="이메일" type="email" defaultValue="minjun@abc.agency" disabled hint="이메일 변경은 고객센터에 문의하세요." />
              <Button>변경사항 저장</Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-4 w-4 text-slate-600" />
                보안
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="현재 비밀번호" type="password" placeholder="••••••••" />
              <Input label="새 비밀번호" type="password" placeholder="8자 이상" />
              <Input label="새 비밀번호 확인" type="password" placeholder="••••••••" />
              <Button variant="outline">비밀번호 변경</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-slate-600" />
                알림 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {([
                { key: "testComplete",    label: "테스트 완료 알림", desc: "테스트가 자동 종료되면 이메일로 알림" },
                { key: "deadline",        label: "마감 임박 알림",   desc: "테스트 마감 2시간 전 알림" },
                { key: "uploadSchedule",  label: "업로드 일정 알림", desc: "예정 업로드일 24시간 전 알림" },
                { key: "lowCredit",       label: "크레딧 부족 알림", desc: "남은 크레딧이 5개 이하일 때 알림" },
              ] as const).map((notif) => (
                <div key={notif.key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{notif.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{notif.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleNotif(notif.key)}
                    className={`h-6 w-11 rounded-full transition-colors ${notifications[notif.key] ? "bg-indigo-600" : "bg-slate-200"}`}
                  >
                    <div className={`h-5 w-5 rounded-full bg-white shadow-sm mt-0.5 transition-transform ${notifications[notif.key] ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">위험 영역</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-100">
                <div>
                  <p className="text-sm font-medium text-red-700">에이전시 계정 탈퇴</p>
                  <p className="text-xs text-red-400">모든 채널·테스트 데이터가 삭제됩니다.</p>
                </div>
                <Button variant="destructive" size="sm">탈퇴하기</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
