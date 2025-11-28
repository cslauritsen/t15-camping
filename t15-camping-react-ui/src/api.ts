import {getBaseUrl} from "./baseUrl";
import {ApiError, EventResponse, EventsResponse} from "./Event";
import {useQuery, useQueryClient} from "react-query";
import {User, UsersResponse} from "./User";
import {useCookies} from "react-cookie";
import {ttTok} from "./cookies";
import {formatDate} from "./dates";

const fetchUsers = (): Promise<UsersResponse> => {
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

export function useUserList() {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    const queryClient = useQueryClient();
    return useQuery<UsersResponse, ApiError>(['useUserList'], fetchUsers,
        {
            onError: err => {
                if (err.code === 401) {
                    removeCookie(ttTok);
                }
            },
            onSuccess: (data: UsersResponse) => {
                data?.users?.forEach((u) => {
                    queryClient.setQueryData(['user', u.user_id], u);
                });
            },
        }
    );
}


const fetchUser = (userId: number): Promise<User> => {
    const url = `${getBaseUrl()}/user/${userId}`;
    if (userId === 0 || userId) {
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
                    return Promise.reject({code: res.status, message: `User fetch failed`} as ApiError);
                }
            })
            .then(data => data as User);
    }
    return Promise.reject({code: 404, message: 'Invalid event ID'});
};

export function useUser(userId: number) {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    return useQuery<User, ApiError>(['user', userId], () => fetchUser(userId),
        {
            onError: err => {
                if (err.code === 401) {
                    removeCookie(ttTok);
                }
            }
        }
    );
}

function fetchEvents(start: Date, end?: Date): Promise<EventsResponse> {
    if (!end) {
        end = new Date(start);
        end.setFullYear(end.getFullYear() + 1);
    }
    const url = `${getBaseUrl()}/events?start=${formatDate(start)}&end=${formatDate(end)}`;
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
}

export function useEventList(start: Date, end?: Date) {
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
