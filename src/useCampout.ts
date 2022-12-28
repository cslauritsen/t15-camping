import {useEvent} from "./api";

export function useCampout(eventId: number) {
    useEvent(eventId);
}