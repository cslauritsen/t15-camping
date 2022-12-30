import {Col, Container, Row, Spinner} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import React, {useMemo, useState} from "react";

import styles from './UserList.module.css';
import {HotToggle} from "./HotToggle";
import {CampoutSelect} from "./CampoutSelect";
import {useEvent, useUserList} from "./api";

import {AttendedBadge} from "./AttendedBadge";
import {User} from "./User";
import {useCookies} from "react-cookie";
import {ttTok} from "./cookies";
import {List} from "./List";

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
    const {isLoading, isError, error, data} = useUserList();
    const users = useMemo(() => {
        return data?.users?.sort(userCmp) ?? [];
    }, [data?.users]);

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
            <Accordion>

                <Accordion.Item eventKey={'0'}>
                    <Accordion.Header>Scouts</Accordion.Header>
                    <Accordion.Body>
                        <List
                              scouts
                              users={users}
                              filter={u => !!u?.scout && !!u?.active}
                              update={() => setRevision(ps => ps + 1)}
                        />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey={'1'}>
                    <Accordion.Header>Adults</Accordion.Header>
                    <Accordion.Body>
                        <List
                              users={users}
                              filter={u => !u?.scout && !!u?.active}
                              update={() => setRevision(ps => ps + 1)}
                        />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey={'2'}>
                    <Accordion.Header>Inactive Scouts</Accordion.Header>
                    <Accordion.Body>
                        <List
                              scouts
                              users={users}
                              filter={u => !!u?.scout && !u?.active}
                              update={() => setRevision(ps => ps + 1)}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={'3'}>
                    <Accordion.Header>Inactive Adults</Accordion.Header>
                    <Accordion.Body>
                        <List
                              users={users}
                              filter={u => !u?.scout && !u?.active}
                              update={() => setRevision(ps => ps + 1)}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}