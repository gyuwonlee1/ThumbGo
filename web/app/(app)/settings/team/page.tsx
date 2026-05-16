"use client";

import { useState } from "react";
import { UserPlus, Mail, Shield, MoreVertical, Crown } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

const ROLES = {
  OWNER: { label: "Owner", color: "bg-amber-100 text-amber-700", icon: Crown },
  ADMIN: { label: "Admin", color: "bg-purple-100 text-purple-700", icon: Shield },
  EDITOR: { label: "Editor", color: "bg-blue-100 text-blue-700", icon: null },
  VIEWER: { label: "Viewer", color: "bg-slate-100 text-slate-600", icon: null },
};

const MEMBERS = [
  { id: "1", name: "김민준", email: "minjun@abc.agency", role: "OWNER", avatar: "김", joinedAt: "2025-12-01" },
  { id: "2", name: "이소연", email: "soyeon@abc.agency", role: "ADMIN", avatar: "이", joinedAt: "2025-12-15" },
  { id: "3", name: "박현우", email: "hyunwoo@abc.agency", role: "EDITOR", avatar: "박", joinedAt: "2026-01-10" },
  { id: "4", name: "최지영", email: "jiyeong@abc.agency", role: "VIEWER", avatar: "최", joinedAt: "2026-02-20" },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  OWNER: ["모든 채널 관리", "테스트 등록 · 삭제", "결제 · 플랜 변경", "멤버 초대 · 삭제", "모든 결과 조회"],
  ADMIN: ["모든 채널 관리", "테스트 등록 · 삭제", "멤버 초대", "모든 결과 조회"],
  EDITOR: ["채널 조회", "테스트 등록", "결과 조회", "인사이트 조회"],
  VIEWER: ["채널 조회", "완료된 테스트 결과 조회"],
};

export default function TeamSettingsPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("EDITOR");

  return (
    <div className="flex flex-col min-h-full">
      <Header title="팀 관리" description="멤버 초대 및 권한 설정" />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Member List */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">팀 멤버 ({MEMBERS.length}명)</h2>
              <Button size="sm" onClick={() => setInviteOpen(true)}>
                <UserPlus className="h-4 w-4" />
                멤버 초대
              </Button>
            </div>
            <Card>
              <div className="divide-y divide-slate-100">
                {MEMBERS.map((member) => {
                  const roleConfig = ROLES[member.role as keyof typeof ROLES];
                  return (
                    <div key={member.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleConfig.color}`}>
                          {roleConfig.label}
                        </span>
                        <span className="text-xs text-slate-400">{member.joinedAt} 가입</span>
                        {member.role !== "OWNER" && (
                          <button className="h-7 w-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Pending Invites */}
            <h2 className="text-sm font-semibold text-slate-700">대기 중인 초대</h2>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 py-2">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">designer@abc.agency</p>
                    <p className="text-xs text-slate-400">초대일: 2026-05-14 · Editor 권한</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="warning" className="text-[10px]">대기 중</Badge>
                    <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
                      취소
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Role Guide */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">권한 안내</h2>
            <div className="space-y-3">
              {Object.entries(ROLES).map(([role, config]) => (
                <Card key={role}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {ROLE_PERMISSIONS[role].map((perm) => (
                        <li key={perm} className="text-xs text-slate-500 flex items-center gap-1.5">
                          <div className="h-1 w-1 rounded-full bg-slate-300 shrink-0" />
                          {perm}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Invite Modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>팀 멤버 초대</DialogTitle>
          </DialogHeader>
          <div className="px-6 py-2 space-y-4">
            <Input
              label="이메일 주소"
              type="email"
              placeholder="teammate@agency.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">권한</label>
              <div className="grid grid-cols-2 gap-2">
                {["ADMIN", "EDITOR", "VIEWER"].map((role) => {
                  const cfg = ROLES[role as keyof typeof ROLES];
                  return (
                    <button
                      key={role}
                      onClick={() => setInviteRole(role)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        inviteRole === role ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {ROLE_PERMISSIONS[role].slice(0, 2).join(", ")}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button onClick={() => { setInviteOpen(false); setInviteEmail(""); }}>
              <Mail className="h-4 w-4" />
              초대 이메일 발송
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
