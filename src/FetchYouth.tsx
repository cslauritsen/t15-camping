import apiToken from "./apiToken";
import {useQuery} from 'react-query'

interface Props {
    userToken: string;
}


export default function FetchYouth(props: Props) {
    const usersReq = new Request('https://shakertroop15.trooptrack.com/api/v1/users',
        {
            method: "GET",
            redirect: 'follow',
            headers: new Headers({
                'Accept': 'application/json',
                'X-Partner-Token': apiToken,
                'X-User-Token': props?.userToken,
            }),
        });
    const {isLoading, error, data} = useQuery('youthData', () =>
        // curl -X GET
        // --header 'Accept: application/json'
        // --header 'X-Partner-Token: xxxx'
        // --header 'X-User-Token: xxxx'
        //
        fetch(usersReq).then(res =>
            res.json()
        )
    );

    console.log(`data is ${JSON.stringify(data)}`);
    return (
        <pre>
            {JSON.stringify(data)}
        </pre>

    )

}