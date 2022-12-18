import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

export function SyncStatusModal(props: any) {
    const [show, setShow] = useState(false);

    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Synchronization Status</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={e => setShow(false)}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}