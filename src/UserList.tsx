import apiToken from "./apiToken";
import {useQuery} from 'react-query'
import {Col, Container, Spinner, Row} from "react-bootstrap";
import AnnualFeeButton from "./AnnualFeeButton";

import styles from './UserList.module.css';

interface Props {
    userToken: string;
}

export default function UserList(props: Props) {
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
                <Container>
                    <Row sm={12} lg={12}>
                        <Col sm={1} lg={1} className={[styles.hdr, 'd-sm-none', 'd-md-block'].join(' ')}>ID</Col>
                        <Col sm={4} lg={4} className={[styles.hdr, 'd-sm-block'].join(' ')}>Name</Col>
                        <Col sm={4} lg={4} className={[styles.hdr, 'd-none', 'd-sm-block'].join(' ')}>Email</Col>
                        <Col sm={2} lg={1} className={[styles.hdr, 'd-sm-block'].join(' ')}>Scout?</Col>
                        <Col sm={2} lg={1} className={[styles.hdr, 'd-sm-block'].join(' ')}>Annual Fee?</Col>
                    </Row>
                    {data.users.map((u: any) => (
                            <Row key={u.user_id} sm={12} lg={12}>
                                <Col sm={1} lg={1} className={[styles.textRight, 'd-sm-none', 'd-md-block'].join(' ')}>{u?.user_id}</Col>
                                <Col sm={4} lg={4} className={[styles.textLeft, 'd-sm-block'].join(' ')}>{u?.last_name}, {u?.first_name}</Col>
                                <Col sm={4} lg={4} className={[styles.textLeft, 'd-none', 'd-sm-block'].join(' ')}>{u?.email}</Col>
                                <Col sm={2} lg={1} className={[styles.textCenter, 'd-sm-block'].join(' ')}>{u?.scout ? '✅' : '❌'}</Col>
                                <Col sm={2} lg={1} className={[styles.textCenter, 'd-sm-block'].join(' ')}><AnnualFeeButton user={u}/></Col>
                            </Row>
                        )
                    )}
                </Container>
            </>
        );
    }

}