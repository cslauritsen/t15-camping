import {useQuery} from 'react-query'
import {Col, Container, Row, Spinner} from "react-bootstrap";

import styles from './UserList.module.css';
import {useMemo} from "react";
import {HotToggle} from "./HotToggle";
import {useUserListApi} from "./api";

interface Props {
    userToken: string;
}

export default function UserList(props: Props) {
    const getUsersApi = useUserListApi();
    const {isLoading, isError, error, data} = useQuery('allUsers', getUsersApi);
    const scouts = useMemo(() => data?.users?.filter((u: any) => !!u?.scout), [data]);
    const adults = useMemo(() => data?.users?.filter((u: any) => !u?.scout), [data]);

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
                <Cntr title={'Scouts'} list={scouts} scouts/>
                <Cntr title={'Adults'} list={adults}/>
            </>
        );
    }
}

interface CntrProps {
    title: string;
    list: any;
    scouts?: boolean;
}

function Cntr({title, list, scouts}: CntrProps) {
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
                    {scouts ?
                        <Col xs={2} lg={1} className={[styles.hdr, styles.Center, 'd-sm-block'].join(' ')}>Annual
                            Fee?</Col>
                        : null}
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
                            {scouts ?
                                <Col xs={2} lg={1} className={[styles.textCenter, 'd-sm-block'].join(' ')}>
                                    {u.scout ?
                                        <HotToggle userId={u.user_id} name={'annualFee'} value={!!u?.annual_fee}/> : null}
                                </Col>
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