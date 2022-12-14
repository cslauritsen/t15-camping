import apiToken from "./apiToken";
import {useQuery} from 'react-query'
import {Container, Spinner, Table} from "react-bootstrap";
import {Suspense} from "react";
import AnnualFeeButton from "./AnnualFeeButton";

interface Props {
    userToken: string;
}

export default function UserTable(props: Props) {
    const {isLoading, isError, error, data} = useQuery('allUsers', () =>
        fetch(new Request('https://shakertroop15.trooptrack.com/api/v1/users',
            {
                method: "GET",
                redirect: 'follow',
                headers: new Headers({
                    'Accept': 'application/json',
                    'X-Partner-Token': apiToken,
                    'X-User-Token': props?.userToken,
                }),
            })).then(res =>
            res.json()
        )
    );

    if (isLoading) {
        return <Spinner animation={'grow'}/>;
    } else if (isError) {
        return (
            <>
                <pre> {JSON.stringify(error)} </pre>
            </>
        );
    } else {
        return (
            <>
                <h2>Users</h2>
                <Table striped>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                        <th>Youth</th>
                        <th>Annual Fee?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.users.map((u: any) => (
                            <tr key={u.user_id}>
                                <td>{u?.user_id}</td>
                                <td>{u?.first_name}</td>
                                <td>{u?.last_name}</td>
                                <td>{u?.email}</td>
                                <td>{u?.scout ? '✅' : '❌'}</td>
                                <td><AnnualFeeButton user={u}/></td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
            </>
        );
    }

}