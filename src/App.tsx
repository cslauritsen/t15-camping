import React from 'react';
import './App.css';
import LoginForm from "./LoginForm";
import {Button, Container, Row, Col} from "react-bootstrap";
import {Navigation} from './Navigation'
import {ttTok} from "./cookies";

import {useQueryErrorResetBoundary} from "react-query";
import {ErrorBoundary} from "react-error-boundary";
import {useCookies} from "react-cookie";

function App() {
    const {reset} = useQueryErrorResetBoundary();
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    return (
        <>
            <Navigation/>
            <ErrorBoundary
                onReset={reset}
                fallbackRender={({resetErrorBoundary}) => (
                    <main style={{position: "relative", top: "100px"}}>
                        <Container>
                            <Row>
                                <Col>
                                    There was an error!
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={() => {
                                        removeCookie(ttTok);
                                        resetErrorBoundary();
                                    }}>Logout</Button>
                                </Col>
                            </Row>
                        </Container>
                    </main>
                )}
            >
                <div className="App">
                    <LoginForm/>
                </div>
            </ErrorBoundary>
        </>
    )
        ;
}

export default App;
