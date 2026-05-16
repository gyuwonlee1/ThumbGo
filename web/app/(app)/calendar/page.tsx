"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Clock, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CHANNELS = ["전체", "게임왕 채널", "뷰티 by 소연", "테크리뷰 마스터", "맛있는 하루"];

const EVENTS = [
  { date: "2026-05-18", type: "upload", title: "롤 시즌 리뷰", channel: "게임왕 채널" },
  { date: "2026-05-19", type: "deadline", title: "가을 메이크업 썸네일 마감", channel: "뷰티 by 소연" },
  { date: "2026-05-20", type: "completed", title: "간장게장 레시피 테스트 완료", channel: "맛있는 하루" },
  { date: "2026-05-21", type: "upload", title: "M4 맥북 프로 리뷰", channel: "테크리뷰 마스터" },
  { date: "2026-05-22", type: "deadline", title: "게임 TOP10 썸네일 마감", channel: "게임왕 채널" },
  { date: "2026-05-25", type: "upload", title: "부산 여행 브이로그", channel: "뷰티 by 소연" },
  { date: "2026-05-27", type: "completed", title: "테크 썸네일 A/B 완료", channel: "테크리뷰 마스터" },
  { date: "2026-05-29", type: "upload", title: "삼겹살 완벽 굽기", channel: "맛있는 하루" },
  { date: "2026-05-30", type: "deadline", title: "6월 기획 썸네일 마감", channel: "게임왕 채널" },
];

const EVENT_CONFIG = {
  upload: { color: "bg-blue-500", label: "업로드 예정", icon: Upload },
  deadline: { color: "bg-amber-500", label: "테스트 마감", icon: Clock },
  completed: { color: "bg-emerald-500", label: "테스트 완료", icon: CheckCircle2 },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [selectedChannel, setSelectedChannel] = useState("전체");
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-05-16");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const filteredEvents = EVENTS.filter(
    (e) => selectedChannel === "전체" || e.channel === selectedChannel
  );

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return filteredEvents.filter((e) => e.date === dateStr);
  };

  const selectedEvents = selectedDate ? filteredEvents.filter((e) => e.date === selectedDate) : [];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const MONTH_LABELS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex flex-col min-h-full">
      <Header title="일정 캘린더" description="월간 업로드 & 테스트 일정" />
      <main className="flex-1 p-6">
        <div className="flex gap-6">
          {/* Calendar */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button onClick={prevMonth} className="h-8 w-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h2 className="text-base font-bold text-slate-900">
                  {year}년 {MONTH_LABELS[month]}
                </h2>
                <button onClick={nextMonth} className="h-8 w-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              {/* Channel Filter */}
              <div className="flex gap-2">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full font-medium transition-all",
                      selectedChannel === ch
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    )}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mb-3">
              {Object.entries(EVENT_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <div className={`h-2.5 w-2.5 rounded-full ${config.color}`} />
                  {config.label}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <Card>
              <CardContent className="p-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAY_LABELS.map((d, i) => (
                    <div key={d} className={cn(
                      "text-center text-xs font-semibold py-2",
                      i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-slate-400"
                    )}>
                      {d}
                    </div>
                  ))}
                </div>
                {/* Days */}
                <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-xl overflow-hidden">
                  {/* Empty cells */}
                  {[...Array(firstDay)].map((_, i) => (
                    <div key={`empty-${i}`} className="bg-slate-50 min-h-[80px]" />
                  ))}
                  {/* Day cells */}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const dayEvents = getEventsForDate(day);
                    const isToday = dateStr === "2026-05-16";
                    const isSelected = dateStr === selectedDate;
                    const isWeekend = (firstDay + i) % 7 === 0 || (firstDay + i) % 7 === 6;

                    return (
                      <div
                        key={day}
                        className={cn(
                          "bg-white min-h-[80px] p-2 cursor-pointer transition-colors",
                          isSelected ? "bg-indigo-50" : "hover:bg-slate-50",
                        )}
                        onClick={() => setSelectedDate(dateStr)}
                      >
                        <div className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold mb-1",
                          isToday ? "bg-indigo-600 text-white" :
                            isWeekend ? "text-slate-400" : "text-slate-700"
                        )}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map((ev, j) => {
                            const cfg = EVENT_CONFIG[ev.type as keyof typeof EVENT_CONFIG];
                            return (
                              <div key={j} className={`text-[9px] px-1.5 py-0.5 rounded ${cfg.color} text-white truncate`}>
                                {ev.title}
                              </div>
                            );
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-[9px] text-slate-400 pl-1">+{dayEvents.length - 2}건</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="w-72 shrink-0 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  {selectedDate ? `${selectedDate.split("-")[2]}일 일정` : "날짜를 선택하세요"}
                </h3>
                {selectedEvents.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">이 날짜에 일정이 없습니다.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedEvents.map((ev, i) => {
                      const cfg = EVENT_CONFIG[ev.type as keyof typeof EVENT_CONFIG];
                      const Icon = cfg.icon;
                      return (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                          <div className={`h-7 w-7 rounded-lg ${cfg.color} flex items-center justify-center shrink-0`}>
                            <Icon className="h-3.5 w-3.5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-900">{ev.title}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{ev.channel}</p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${cfg.color} text-white font-medium mt-1 inline-block`}>
                              {cfg.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Monthly Summary */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-slate-700 mb-3">5월 요약</p>
                <div className="space-y-2.5">
                  {Object.entries(EVENT_CONFIG).map(([key, cfg]) => {
                    const count = filteredEvents.filter((e) => e.type === key).length;
                    const Icon = cfg.icon;
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <div className={`h-6 w-6 rounded-lg ${cfg.color} flex items-center justify-center shrink-0`}>
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs text-slate-600 flex-1">{cfg.label}</span>
                        <span className="text-sm font-bold text-slate-900">{count}건</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
