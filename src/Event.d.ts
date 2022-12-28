export interface Event {
    event_id: number;
    title: string;
    event_type: string;
    activity_at: string;
    end_at: string;
    location: string;
    color: string;
    text_color: stringj;
    payment_required_to_rsvp: boolean;

    adult_fee?: number;
    dues?: number;
    camping_nights?: number;
    hiking_miles?: number;
    service_hours?: number;
    canoeing_miles?: number;
}

export interface EventsResponse {
    events: Event[];
}

export interface ApiError {
    message?: string;
    code?: number;
}

export interface Invitee {
    event_tracker_id?: number;
    user_id?: number;
    name?: string;
    number_of_adult_guests?: number;
    number_of_youth_guests?: number;
    rsvp_status?: string;
    attended?: string;
}

export interface EventResponse {
    event: Event;
    invitees: Invitee[];
    family: Invitee[];
}