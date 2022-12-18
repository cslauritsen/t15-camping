import {Suspense, useState} from "react";
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {useCookies} from 'react-cookie';
import {ttTok} from "./cookies";
import UserList from "./UserList";
import styles from './LoginForm.module.css';

export default function LoginForm(props: any) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    // const [token, setToken] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    const [ isSubmitting, setSubmitting ] = useState(false);

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
                    <div className={styles.errMsg}>
                        {errMsg ? `Error: ${errMsg}` : null}
                    </div>
                </Col>
            </Row>
            <Form onSubmit={event => {
                setSubmitting(true);
                event.preventDefault();
                setErrMsg('');
                const req = new Request(`${window.location.protocol}//${window.location.hostname}:8080/user/login`,
                    {
                        method: "POST",
                        redirect: 'follow',
                        credentials: 'include',
                        headers: new Headers({
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            },
                        ),
                        body: `login=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`,
                    });
                fetch(req)
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        } else if (res.status === 401) {
                            setErrMsg(`Unauthorized, try logging in again`);
                            removeCookie(ttTok);
                            setSubmitting(false);
                            return Promise.reject(res);
                        } else {
                            setErrMsg(`${res.status}: ${res.statusText}`);
                            return Promise.reject(res);
                        }
                    })
                    .then(data => {
                        console.log(JSON.stringify(data));
                        if (data?.users?.length) {
                            console.log(`logged in`);
                            const tok = data.users[0]?.token;
                            const dt = new Date();
                            dt.setDate(dt.getDate() + 1);
                            setCookie(ttTok, tok, {path: '/', expires: dt});
                            console.log(`Set ${ttTok} to ${tok}`);
                        }
                        setSubmitting(false);
                    })
                    .catch(reason => {
                            setErrMsg(`Login failed ${reason}`);
                            setSubmitting(false);
                            console.error(`Caught error: ${reason}`);
                            removeCookie(ttTok);
                        }
                    );
            }}>
                <Row xxl={6}>
                    <Col>
                        <Form.Group className={'mb-3'}>
                            <Form.Label>Login</Form.Label>
                            <Form.Control type={'text'}
                                          placeholder={'TroopTrack Login'}
                                          name={'ttlogin'}
                                          onChange={e => setUser(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row xxl={6}>
                    <Form.Group className={'mb-3'}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={'password'}
                                      placeholder={'TroopTrack Password'}
                                      name={'ttpassword'}
                                      onChange={e => setPass(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row xxl={6}>
                    <Form.Group className={'mb-3'}>
                        <Button type={'submit'}>{ isSubmitting ? <Spinner animation={'border'} size={'sm'} /> : 'Login'}</Button>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    );
}