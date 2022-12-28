import {getBaseUrl} from "./baseUrl";
import {ApiError, EventResponse, EventsResponse} from "./Event";
import {useQuery} from "react-query";
import {UsersResponse} from "./User";
import {useCookies} from "react-cookie";
import {ttTok} from "./cookies";

export const fetchUsers = (): Promise<UsersResponse> => {
    return fetch(new Request(`${getBaseUrl()}/users`,
        {
            method: "GET",
            redirect: 'follow',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
            }),
        }))
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            if (res.status === 401)
                return Promise.reject({code: res.status, message: 'Unauthorized, try logout and log back in'});
            else {
                return Promise.reject({code: res.status, message: 'User list fetch failed'});
            }
        })
        .then(data => data as UsersResponse);
};

export function useUserList(revision: number) {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    return useQuery<UsersResponse, ApiError>(['useUserList', revision], fetchUsers,
        {
            onError: err => {
                if (err.code === 401) {
                    removeCookie(ttTok);
                }
            }
        }
    );
}

const fetchEvents = (start: string, end: string | undefined): Promise<EventsResponse> => {
    let url = `${getBaseUrl()}/events?start=${start}`;
    url = end ? url + `&end=${end}` : url;
    return fetch(new Request(url,
        {
            method: "GET",
            redirect: 'follow',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
            }),
        }))
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject({code: res.status, message: `Event list fetch failed`} as ApiError);
            }
        })
        .then(data => data as EventsResponse);
};

export function useEventList(start: string, end: string | undefined) {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    return useQuery<EventsResponse, ApiError>(['eventList', start, end], () => fetchEvents(start, end),
        {
            onError: err => {
                if (err.code === 401) {
                    removeCookie(ttTok);
                }
            }
        }
    );
}

const fetchEvent = (eventId: number): Promise<EventResponse> => {
    const url = `${getBaseUrl()}/events/${eventId}`;
    if (eventId) {
        return fetch(new Request(url,
            {
                method: "GET",
                redirect: 'follow',
                credentials: 'include',
                headers: new Headers({
                    'Accept': 'application/json',
                }),
            }))
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject({code: res.status, message: `Event list fetch failed`} as ApiError);
                }
            })
            .then(data => data as EventResponse);
    }
    return Promise.reject({code: 404, message: 'Invalid event ID'});
};

export function useEvent(eventId: number) {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    return useQuery<EventResponse, ApiError>(['event', eventId], () => fetchEvent(eventId),
        {
            onError: err => {
                if (err.code === 401) {
                    removeCookie(ttTok);
                }
            }
        }
    );
}






