"use client";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP HH:mm", { locale: es })
          ) : (
            <span>Seleccionar fecha y hora</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              const newDate = new Date(selectedDate);
              if (date) {
                newDate.setHours(date.getHours());
                newDate.setMinutes(date.getMinutes());
              }
              setDate(newDate);
            }
          }}
          locale={es}
          initialFocus
        />
        <div className="border-t border-border p-3 flex gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm">Hora:</span>
            <Select
              value={date ? date.getHours().toString() : "0"}
              onValueChange={(value) => {
                if (date) {
                  const newDate = new Date(date);
                  newDate.setHours(Number.parseInt(value));
                  setDate(newDate);
                }
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Hora" />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">Minuto:</span>
            <Select
              value={date ? date.getMinutes().toString() : "0"}
              onValueChange={(value) => {
                if (date) {
                  const newDate = new Date(date);
                  newDate.setMinutes(Number.parseInt(value));
                  setDate(newDate);
                }
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Minuto" />
              </SelectTrigger>
              <SelectContent>
                {minuteOptions.map((minute) => (
                  <SelectItem key={minute} value={minute.toString()}>
                    {minute.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
