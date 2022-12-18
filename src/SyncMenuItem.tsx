import {ttTok} from "./cookies";
import {useState} from "react";
import {Button, Modal, Spinner} from "react-bootstrap";
import {useCookies} from "react-cookie";

export function SyncMenuItem(props: any) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    const [syncing, setSyncing] = useState(false);
    const synch = () => {
        console.log(`synch start`);
        setSyncing(true);
        setMessage('Sychronization in progress...');
        const req = new Request(`${window.location.protocol}//${window.location.hostname}:8080/users/sync`,
            {
                method: "POST",
                redirect: 'follow',
                credentials: 'include',
            });
        fetch(req)
            .then(res => {
                if (res.ok) {
                    setShow(true);
                    setMessage('Synchronization finished OK');
                    return res.json();
                } else if (res.status === 401) {
                    removeCookie(ttTok);
                    setMessage('Synchronization failed: Unauthorized');
                    return Promise.reject('Synchronization failed: Unauthorized');
                } else {
                    setMessage(`Synchronization failed.`);
                    return Promise.reject(res);
                }
            })
            .then(data => {
                setSyncing(false);
                console.log(`Sync OK: ${data.success}:  ${data.message}`);
                setMessage(`Synchronization ${data.success ? "OK" : 'Failed'}: ${data.message}`);
            })
            .catch(reason => {
                    setSyncing(false);
                    console.error(`Synchronize caught error: ${reason} ${JSON.stringify(reason)}`);
                    setMessage(`Synchronization failed: ${reason}`);
                }
            );
    };

    return (
        <>
            <div onClick={synch}>Synchronize</div>
            <Modal show={syncing || show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Synchronization Status</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={e => setShow(false)} disabled={syncing}>
                        {syncing ? <Spinner animation={'border'}/> : 'OK'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}