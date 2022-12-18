import apiToken from "./apiToken";
import {useQuery} from 'react-query'
import {Col, Container, Spinner, Row, Form} from "react-bootstrap";
import AnnualFeeButton from "./AnnualFeeButton";

import styles from './UserList.module.css';
import {useMemo} from "react";
import {Checkbox} from "./Checkbox";
import {useCookies} from "react-cookie";
import {ttTok} from "./cookies";
import {HotToggle} from "./HotToggle";
import {User} from "./User";

interface Props {
    userToken: string;
}

export default function UserList(props: Props) {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    const {isLoading, isError, error, data} = useQuery('allUsers', () =>
        fetch(new Request(`${window.location.protocol}//${window.location.hostname}:8080/users`,
            {
                method: "GET",
                redirect: 'follow',
                credentials: 'include',
                headers: new Headers({
                    'Accept': 'application/json',
                }),
            })).then(res => {
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
            })
    );

    const scouts = useMemo(() => data?.users?.filter((u: any) => !!u?.scout), [data]);
    const adults = useMemo(() => data?.users?.filter((u: any) => !u?.scout), [data]);

    // scouts.forEach((u: User) => console.log(`Scout: ${JSON.stringify(u)}`));

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
                <Cntr title={'Scouts'} list={scouts}/>
                <Cntr title={'Adults'} list={adults}/>
            </>
        );
    }
}

function Cntr({title, list}: any) {
    return (
        <>
            <h2>{title}</h2>
            <Container>
                <Row xs={8} lg={12}>
                    <Col xs={0} lg={1}
                         className={[styles.hdr, styles.textRight, 'd-none', 'd-sm-none', 'd-md-block'].join(' ')}>ID</Col>
                    <Col xs={4} lg={4} className={[styles.hdr, styles.textLeft, 'd-sm-block'].join(' ')}>Name</Col>
                    <Col xs={0} lg={4}
                         className={[styles.hdr, styles.textLeft, 'd-none', 'd-md-block'].join(' ')}>Email</Col>
                    {/*<Col xs={2} lg={1} className={[styles.hdr, styles.textLeft, 'd-sm-block'].join(' ')}>Scout?</Col>*/}
                    <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>Annual Fee?</Col>
                    <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>Active?</Col>
                </Row>
                {list.map((u: any) => (
                        <Row key={u.user_id} xs={8} lg={12}>
                            <Col xs={0} lg={1}
                                 className={[styles.textRight, 'd-none', 'd-sm-none', 'd-md-block'].join(' ')}>{u?.user_id}</Col>
                            <Col xs={4} lg={4}
                                 className={[styles.textLeft, 'd-sm-block'].join(' ')}>{u?.last_name}, {u?.first_name}</Col>
                            <Col xs={0} lg={4}
                                 className={[styles.textLeft, 'd-none', 'd-md-block'].join(' ')}>{u?.email}</Col>
                            {/*<Col xs={2} lg={1} className={[styles.textCenter, 'd-sm-block'].join(' ')}>{u?.scout ? '✅' : '❌'}</Col>*/}
                            <Col xs={2} lg={1} className={[styles.textCenter, 'd-sm-block'].join(' ')}>
                                { u.scout ? <HotToggle userId={u.user_id} name={'annualFee'} value={!!u?.annual_fee} /> : null }
                            </Col>
                            <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>
                                {/*<Checkbox checked={!!u.active} onChange={(checked: boolean) => u.active = checked}/>*/}
                                <HotToggle userId={u.user_id} name={'active'} value={!!u?.active} />
                            </Col>
                        </Row>
                    )
                )}
            </Container>
        </>
    );
}