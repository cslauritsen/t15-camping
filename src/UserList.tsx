import {Col, Container, Row, Spinner} from "react-bootstrap";
import React, {useMemo, useState} from "react";

import styles from './UserList.module.css';
import {HotToggle} from "./HotToggle";
import {CampoutSelect} from "./CampoutSelect";
import {useEvent, useUserList} from "./api";

import {AttendedBadge} from "./AttendedBadge";
import {User} from "./User";
import {useCookies} from "react-cookie";
import {ttTok} from "./cookies";

interface Props {
    userToken: string;
}

const userCmp = (a: User | undefined, b: User | undefined) => {
    return a?.last_name?.localeCompare(b?.last_name ?? '')
        || a?.first_name?.localeCompare(b?.first_name ?? '') || 0;
};
export default function UserList(props: Props) {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    const [revision, setRevision] = useState(0);
    const {isLoading, isError, error, data} = useUserList(revision);
    const scouts = useMemo(() => data?.users?.filter(u => !!u?.scout)?.filter(u => !!u?.active)?.sort(userCmp), [data?.users, revision]);
    const inactiveScouts = useMemo(() => data?.users?.filter(u => !!u?.scout)?.filter(u => !u?.active)?.sort(userCmp), [data?.users, revision]);
    const inactiveAdults = useMemo(() => data?.users?.filter(u => !u?.scout)?.filter(u => !u?.active)?.sort(userCmp), [data?.users, revision]);
    const adults = useMemo(() => data?.users?.filter(u => !u?.scout).sort(userCmp), [data?.users, revision]);
    // const bScouts = useMemo(() => data?.users?.filter(u => !!u?.scout).filter(u => u?.gender === 'M').sort(userCmp), [data?.users]);
    // const nScouts = useMemo(() => data?.users?.filter(u => !!u?.scout).filter(u => !u?.gender).sort(userCmp), [data?.users]);

    console.log(`UserList revision: ${revision}`);

    if (isError) {
        if (error?.code === 401) {
            console.log(`Unauthorized, removing cookie`);
            removeCookie(ttTok);
        }
    }

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
                <Cntr title={'Scouts'} list={scouts} scouts update={() => setRevision(ps => ++ps)}/>
                <Cntr title={'Adults'} list={adults} update={() => setRevision(ps => ++ps)}/>
                <Cntr title={'Inactive Scouts'} list={inactiveScouts} update={() => setRevision(ps => ++ps)}/>
                <Cntr title={'Inactive Adults'} list={inactiveAdults} update={() => setRevision(ps => ++ps)}/>
            </>
        );
    }
}

interface CntrProps {
    title: string;
    list: any;
    scouts?: boolean;
    update?: () => void;
}

function Cntr({title, list, scouts, update}: CntrProps) {
    const [eventId, setEventId] = useState<number | undefined>();
    const campout = useEvent(eventId ?? 0);
    let striped = 0;
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
                    {scouts ?
                        <>
                            <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>Annual
                                Fee?</Col>
                            <Col>
                                <CampoutSelect
                                    start={'2022-08-01'}
                                    end={'2023-07-31'}
                                    onSelect={(e, eid) => setEventId(eid)}
                                />
                            </Col>
                        </>
                        : null}
                    <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>Active?</Col>
                </Row>
                {list.map((u: any) => (
                        <Row key={u.user_id} xs={8} lg={12}
                             style={++striped % 2 ? {backgroundColor: '#ddd'} : {backgroundColor: '#fff'}}>
                            <Col xs={0} lg={1}
                                 className={[styles.textRight, 'd-none', 'd-sm-none', 'd-md-block'].join(' ')}>{u?.user_id}</Col>
                            <Col xs={4} lg={4}
                                 className={[styles.textLeft, 'd-sm-block'].join(' ')}>{u?.last_name}, {u?.first_name}</Col>
                            <Col xs={0} lg={4}
                                 className={[styles.textLeft, 'd-none', 'd-md-block'].join(' ')}>{u?.email}</Col>
                            {scouts ?
                                <>
                                    <Col xs={2} lg={1} className={[styles.textCenter, 'd-sm-block'].join(' ')}>
                                        <HotToggle
                                            userId={u.user_id}
                                            name={'annualFee'}
                                            value={!!u?.annual_fee}
                                            onChange={update}
                                        />
                                    </Col>
                                    <Col>
                                        {campout?.isLoading && eventId ? <Spinner animation={'border'}/> : null}
                                        {campout?.isError
                                            ? (campout.error.code === 404 ? 'N/A' : 'Error')
                                            : <AttendedBadge invitee={
                                                campout?.data
                                                    ?.invitees
                                                    ?.find(i => i.user_id == u.user_id)}/>
                                        }
                                    </Col>

                                </>
                                : null}
                            <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>
                                <HotToggle userId={u.user_id} name={'active'} value={!!u?.active}/>
                            </Col>
                        </Row>
                    )
                )}
            </Container>
        </>
    );
}