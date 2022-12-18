import {ttTok} from "./cookies";
import {useCookies} from "react-cookie";

export const useUserListApi = () => {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    return () => fetch(new Request(`${window.location.protocol}//${window.location.hostname}:8080/users`,
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
            } else if (res.status === 401) {
                removeCookie(ttTok);
                return Promise.reject("Unauthorized, login again");
            } else {
                return Promise.reject(res.statusText);
            }
        })
        .catch(reason => {
            removeCookie(ttTok);
            console.error(`UserList error: ${reason} ${JSON.stringify(reason)}`);
        });
};
