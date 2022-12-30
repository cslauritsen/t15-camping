import {Invitee} from "./Event";
import {Button} from "react-bootstrap";
import {ReactNode} from "react";

interface Props {
    invitee?: Invitee;
    trueNode?: ReactNode;
    falseNode?: ReactNode;
}
export function AttendedBadge(props: Props) {
    if (!props?.invitee) {
        return <>?</>;
    }
    const trueNode = props?.trueNode ?? <>{'✅'}</>;
    const falseNode = props?.falseNode ?? <>{'❌'}</>;
    return (
        <>
            <Button
                disabled={true}
                variant={'link'}
                size={'lg'}
                style={{textDecoration: 'none'}}>{
                props?.invitee?.attended === "yes"
                ? trueNode
                : falseNode
            }</Button>
        </>
    );
}