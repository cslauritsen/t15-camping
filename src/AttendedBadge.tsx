import {Invitee} from "./Event";
import {Button} from "react-bootstrap";

interface Props {
    invitee?: Invitee;
}
export function AttendedBadge({invitee}: Props) {
    if (!invitee) {
        return <>?</>;
    }
    return (
        <>
            <Button disabled={true} variant={'link'} size={'lg'}
                    style={{textDecoration: 'none'}}>{invitee.attended === "yes" ? '✅' : '❌'}</Button>
        </>
    );
}