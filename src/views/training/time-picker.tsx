"use client";

import type * as React from "react";
import { Clock } from "lucide-react";

import { Input } from "@/components/ui/input";

interface TimePickerProps {
  time: string;
  setTime: (time: string) => void;
}

export function TimePicker({ time, setTime }: TimePickerProps) {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <div className="relative">
      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="pl-10"
      />
    </div>
  );
}
