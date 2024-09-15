import {ReactNode, useState} from "react";
import {Button, Modal, Spinner} from "react-bootstrap";
import {getBaseUrl} from "./baseUrl";
import {useMutation} from "react-query";
import {useQueryClient} from 'react-query'


interface Props {
    userId: number;
    name: string;
    value: boolean;
    trueNode?: ReactNode;
    falseNode?: ReactNode;
    onChange?: () => void;
}

const mutationFn = (vars: any) => fetch(
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
        if (!res.ok) {
            return Promise.reject(res);
        }
        return res.json();
    });

export function HotToggle(props: Props) {
    const [state, setState] = useState(props.value);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn,
        {
            onSuccess: (data, variables) => {
                setState(variables.newState);
                queryClient.setQueryData(['user', variables.userId], data);
                console.log(`mutation onSuccess, updated user ${variables.userId} to ${JSON.stringify(data)}`);
            },
            onError: (error, variables) => {
                console.error(`mutation onError: ${error}`);
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
                        const newState = !state;
                        mutation.mutate({name: props.name, newState: newState, userId: props.userId});
                        if (mutation.isSuccess) {
                            setState(newState);
                            props?.onChange?.();
                        }
                    }}
            >
                <State mutation={mutation} state={state} trueNode={props?.trueNode} falseNode={props?.falseNode} />

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
                        <State state={state} mutation={mutation}/>
                        {/*{mutation.isLoading ? <Spinner animation={'border'}/> : 'OK'}*/}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function State({mutation, state, trueNode, falseNode, ...rest}: any) {
    if (mutation?.isError) {
        return <>{'Error!'}</>
    }

    if (mutation?.isLoading) {
        return <Spinner animation={'border'}/>
    }

    if (state) {
        return (trueNode ?? <>✅</>)
    }

    return falseNode ?? <>❌</>;

}