import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import UserTable from "./UserTable";
import apiToken from "./apiToken";
import {Suspense} from "react";
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
import {ttTok} from "./cookies";
import UserList from "./UserList";
export default function LoginForm(props: any) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    // const [token, setToken] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);

    console.log(`Cookies: ${JSON.stringify(cookies)}`);
    if (cookies[ttTok]) {
        return (
            <Suspense fallback={'Loading...'}>
                <UserList userToken={cookies[ttTok]}/>
            </Suspense>
        );
    }
    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        {errMsg ? `Error: ${errMsg}` : null}
                    </div>
                </Col>
            </Row>
            <Form onSubmit={event => {
                event.preventDefault();
                setErrMsg('');
                const req = new Request('https://shakertroop15.trooptrack.com/api/v1/tokens',
                    {
                        method: "POST",
                        redirect: 'follow',
                        headers: new Headers({
                            'Accept': 'application/json',
                            'X-Partner-Token': apiToken,
                            'X-Username': user,
                            'X-User-Password': pass,
                        }),
                    });
                fetch(req)
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            setErrMsg(`${res.status}: ${res.statusText}`);
                            return Promise.reject(res);
                        }
                    })
                    .then(data => {
                        console.log(JSON.stringify(data));
                        if (data?.users?.length) {
                            const tok = data.users[0]?.token;
                            const dt = new Date();
                            dt.setDate(dt.getDate() + 1);
                            setCookie(ttTok, tok, {path: '/', expires: dt});
                            console.log(`Set ${ttTok} to ${tok}`);
                        }
                    })
                    .catch(reason => {
                            console.error(`Caught error: ${JSON.stringify(reason)}`);
                            removeCookie(ttTok);
                        }
                    );
            }}>
                <Row xxl={6}>
                    <Col>
                        <Form.Group className={'mb-3'}>
                            <Form.Label>Login</Form.Label>
                            <Form.Control type={'text'} placeholder={'TroopTrack Login'} name={'ttlogin'}
                                          onBlur={e => setUser(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row xxl={6}>
                    <Form.Group className={'mb-3'}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={'password'} placeholder={'TroopTrack Password'} name={'ttpassword'}
                                      onBlur={e => setPass(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row xxl={6}>
                    <Form.Group className={'mb-3'}>
                        <Button type={'submit'}>Login</Button>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    );
}