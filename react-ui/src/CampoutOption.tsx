import {Event} from "./Event";
import {useMemo} from "react";

interface Props {
    event: Event;
}

export function CampoutOption({event}: Props) {
    const dtStr = useMemo<string>(() => {
            const epochal = parseInt(event.activity_at);
            const dt = new Date(epochal * 1000);
            console.log(`event ${event.event_id} : ${dt} ${epochal}`);
            const dtStr = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
            return dtStr;
        }
        , [event]);

    return (
        <option value={event.event_id}>{dtStr} - {event.title}  ({event.event_id})</option>
    );
}