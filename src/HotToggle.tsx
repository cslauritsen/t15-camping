import {ReactNode, useState} from "react";
import {Button, Modal, Spinner} from "react-bootstrap";
import {getBaseUrl} from "./baseUrl";

interface Props {
    userId: number;
    name: string;
    value: boolean;
    trueNode?: ReactNode;
    falseNode?: ReactNode;
};


export function HotToggle(props: Props) {
    const [state, setState] = useState(props.value);
    const [show, setShow] = useState(false);
    const [inFlight, setInFlight] = useState(false);
    const [message, setMessage] = useState('');

    const toggle = (nm: string, value: boolean) => {
        let ret = false;
        fetch(
            getBaseUrl() + `/user/${props.userId}/custom?${encodeURIComponent(props.name)}=${encodeURIComponent(!state)}`,
            {
                method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                headers: new Headers({
                    'Accept': 'application/json',
                }),
            }
        ).then(res => {
            setInFlight(false);
            if (res.ok) {
                return Promise.resolve();
            }
            return Promise.reject(res);
        // }).then(data => {
        }).catch((res) => {
            console.log(`Toggle failed: ${JSON.stringify(res)}`);
            setInFlight(false);
            setShow(true);
            setMessage(`Toggle of ${props.name} failed: ${JSON.stringify(res)}`);
        });
        return ret;
    };

    return (
        <>
            <Button size={'lg'} variant={'link'}
                    onClick={() => {
                        toggle(props.name, !state);
                        setState(s => !s);
                    }}
                    style={{textDecoration: 'none'}}
            >
                {state ? (props?.trueNode ?? <>✅</>) : props?.falseNode ?? <>❌</>}
            </Button>

            <Modal show={inFlight || show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Toggle Status</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={e => setShow(false)} disabled={inFlight}>
                        {inFlight ? <Spinner animation={'border'}/> : 'OK'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}