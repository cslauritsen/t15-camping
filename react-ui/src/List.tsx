import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import {useEvent} from "./api";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import styles from "./UserList.module.css";
import {CampoutSelect} from "./CampoutSelect";
import {HotToggle} from "./HotToggle";
import {AttendedBadge} from "./AttendedBadge";
import {User} from "./User";
import {CalendarCheckFill, CalendarXFill, HandThumbsDownFill, HandThumbsUpFill} from "react-bootstrap-icons";
import {FilterSelect} from "./FilterSelect";
import {Filter} from "./Filter";

interface Props {
    users: User[];
    title?: string;
    filter: (u: User) => boolean;
    scouts?: boolean;
    update?: () => void;
}

function findLastAug1() {
    let millis = new Date().getTime()
    const AUGUST = 7
    let d = new Date(millis)
    console.debug(`Starting date: ${d}`)
    while(! (d.getDate() === 1 && d.getMonth() === AUGUST)) {
        millis -= 86400000
        d = new Date(millis)
        console.debug(`new date: ${d}`)
    }
    return d
}

function formatDate(d: Date) {
    const month = d.getMonth() + 1
    const day = d.getDate()
    const dayPrefix = day < 10 ? '0' : ''
    const monthPrefix = month < 10 ? '0' : ''

    return `${d.getFullYear()}-${monthPrefix}${d.getMonth() + 1}-${dayPrefix}${d.getDate()}`
}

const rotateFilter = (previous: Filter) => {
    switch (previous) {
        case "any":
            return 'y';
        case "y":
            return 'n';
        case "n":
            return 'any';
    }
};

export function List(props: Props) {
    const [eventId, setEventId] = useState<number | undefined>();
    const [annualFeeFilter, setAnnualFeeFilter] = useState<Filter>('any');
    const [eventFilter, setEventFilter] = useState<Filter>('any');
    const campout = useEvent(eventId ?? 0);
    const feeFilterFn = useCallback((u: User) => {
        switch (annualFeeFilter) {
            case 'y':
                return !!u?.annual_fee;
            case 'n':
                return !u?.annual_fee;
            default:
                return true;
        }
    }, [
        annualFeeFilter,
        props?.users
    ]);
    const eventFilterFn = useCallback(
        (u: User) => {
            const invitee = campout?.data?.invitees?.find(i => i.user_id == u.user_id);
            if (invitee) {
                const attended = invitee.attended === "yes";
                // console.log(`${u.last_name}, ${u.first_name} attended ${campout?.data?.event?.title}(${eventId})? ${attended}`);
                switch (eventFilter) {
                    case 'y':
                        return attended;
                    case 'n':
                        return !attended;
                    default:
                        return true;
                }
            }
            return eventFilter === 'any';
        }
        , [
            eventFilter,
            campout,
            eventId,
            props?.users
        ])
    ;
    const list = useMemo(() => props?.users
        ?.filter(props.filter)
        ?.filter(feeFilterFn)
        ?.filter(eventFilterFn), [
        eventFilter,
        campout,
        eventId,
        props?.users,
        props?.filter,
        annualFeeFilter
    ]);

    let striped = 0;
    const startDate = findLastAug1()
    const JULY = 6
    const endDate = new Date(startDate.getFullYear() + 1, JULY, 31)
    return (
        <>
            { props?.title ? <h2>{props?.title}</h2> : null }
            <Container>
                <Row xs={8} lg={12}>
                    <Col xs={0} lg={1}
                         className={[styles.hdr, styles.textRight, 'd-none', 'd-sm-none', 'd-md-block'].join(' ')}>ID</Col>
                    <Col xs={4} lg={4} className={[styles.hdr, styles.textLeft, 'd-sm-block'].join(' ')}>Name</Col>
                    <Col xs={0} lg={4}
                         className={[styles.hdr, styles.textLeft, 'd-none', 'd-md-block'].join(' ')}>Email</Col>
                    {props?.scouts ?
                        <>
                            <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>
                                <a onClick={() => setAnnualFeeFilter(pv => rotateFilter(pv))}>Annual
                                    Fee={annualFeeFilter}</a>
                                <FilterSelect onSelect={v => setAnnualFeeFilter(v)} />
                            </Col>
                            <Col>
                                <CampoutSelect
                                    start={formatDate(startDate)}
                                    end={formatDate(endDate)}
                                    onSelect={(e, eid) => setEventId(eid)}
                                />
                                <FilterSelect onSelect={v => setEventFilter(v)} />
                                {/*<a onClick={() => setEventFilter(pv => rotateFilter(pv))}>Status={eventFilter}</a>*/}
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
                            {props?.scouts ?
                                <>
                                    <Col xs={2} lg={1} className={[styles.textCenter, 'd-sm-block'].join(' ')}>
                                        <HotToggle
                                            userId={u.user_id}
                                            name={'annualFee'}
                                            trueNode={<CalendarCheckFill style={{color: 'green'}}/>}
                                            falseNode={<CalendarXFill style={{color: 'red'}}/>}
                                            value={!!u?.annual_fee}
                                            onChange={props?.update}
                                        />
                                    </Col>
                                    <Col>
                                        {campout?.isLoading && eventId ? <Spinner animation={'border'}/> : null}
                                        {campout?.isError
                                            ? (campout.error.code === 404 ? 'N/A' : 'Error')
                                            : <AttendedBadge
                                                trueNode={<CalendarCheckFill style={{color: 'green'}}/>}
                                                falseNode={<CalendarXFill style={{color: 'red'}}/>}
                                                invitee={
                                                    campout?.data
                                                        ?.invitees
                                                        ?.find(i => i.user_id == u.user_id)}/>
                                        }
                                    </Col>

                                </>
                                : null}
                            <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>
                                <HotToggle
                                    userId={u.user_id}
                                    name={'active'}
                                    value={!!u?.active}
                                    onChange={props?.update}
                                    trueNode={<HandThumbsUpFill style={{color: 'green'}}/>}
                                    falseNode={<HandThumbsDownFill style={{color: 'red'}}/>}
                                />
                            </Col>
                        </Row>
                    )
                )}
            </Container>
        </>
    );
}