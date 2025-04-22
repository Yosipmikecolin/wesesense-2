"use client";

import { useState } from "react";
import EventForm from "./components/EventForm";
import EventTable, { EventType } from "./components/EventTable";
import Statistics from "./components/Statistics";

const ViewCreationEvents = () => {
  const [event, setEvent] = useState<EventType | null>(null);
  
  const onEvent = (data: EventType) => {
    setEvent(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Sistema de gestión de eventos e incidencias
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8">
        <div className="space-y-8">
          <EventForm event={event} />
          <Statistics />
        </div>
        <EventTable onEvent={onEvent} />
      </div>
    </div>
  );
};

export default ViewCreationEvents;
