import {ReactNode, useState} from "react";
import {Button, Modal, Spinner} from "react-bootstrap";
import {getBaseUrl} from "./baseUrl";
import {useMutation} from "react-query";

interface Props {
    userId: number;
    name: string;
    value: boolean;
    trueNode?: ReactNode;
    falseNode?: ReactNode;
    onChange?: () => void;
}

export function HotToggle(props: Props) {
    const [state, setState] = useState(props.value);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const mutation = useMutation(
        (vars: any) => fetch(
            getBaseUrl() + `/user/${vars.userId}/custom?${encodeURIComponent(vars.name)}=${encodeURIComponent(vars.newState)}`,
            {
                method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                headers: new Headers({
                    'Accept': 'application/json',
                }),
            })
            .then(res => {
                if (res.ok) {
                    return Promise.resolve();
                }
                return Promise.reject(res);
            }),
        {
            onSuccess: (data, variables) => {
                console.log(`mutation onSuccess`);
                setState(variables.newState);
            },
            onError: (error, variables) => {
                console.log(`mutation onError`);
                const resp = error as Response;
                setShow(true);
                if (resp?.status === 404) {
                    setMessage(`No such user (userId: ${variables?.userId})`);
                } else if (resp?.status === 400) {
                    setMessage(`Bad request`);
                } else {
                    setMessage(`Toggle Failed: ${resp?.status}`);
                }
            },
        }
    );

    return (
        <>
            <Button size={'lg'} variant={'link'}
                    style={{textDecoration: 'none'}}
                    onClick={() => {
                        mutation.mutate({name: props.name, newState: !state, userId: props.userId});
                        props?.onChange?.();
                    } }
            >
                {mutation.isLoading ? <Spinner animation={'border'}/> :
                    (state ? (props?.trueNode ?? <>✅</>) : props?.falseNode ?? <>❌</>)
                }
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Toggle Status {mutation.isError ? 'Failed' : 'Successful'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)} disabled={mutation.isLoading}>
                        {mutation.isLoading ? <Spinner animation={'border'}/> : 'OK'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}