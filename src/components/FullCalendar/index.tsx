import { EventSourceInput } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";

type CalendarProps = {
  initialEvents: EventSourceInput;
  handleSelectEvent: (id: string) => void;
};

export default function Calendar({
  initialEvents,
  handleSelectEvent,
}: CalendarProps) {
  const onClick = (data: EventImpl) => {
    handleSelectEvent(data.id);
  };
  return (
    <div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
          ]}
          height={750}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          initialView="dayGridMonth"
          eventClick={(info) => onClick(info.event)}
          nowIndicator={true}
          selectable={true}
          selectMirror={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5, 6],
            startTime: "7:30",
            endTime: "17:30",
          }}
          locale="pt-br"
          timeZone="America/Recife"
          initialEvents={initialEvents}
        />
      </div>
    </div>
  );
}
