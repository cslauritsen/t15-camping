import {Form} from "react-bootstrap";
import {Calendar2Month, CalendarCheck} from 'react-bootstrap-icons';
import {useState} from "react";

interface User {
    scout: boolean;
    first_name: string;
    last_name: string;
    user_id: number;
    email: string;
}

interface Props {
    user?: User;
}

export default function AnnualFeeButton({user}: Props) {
    const [ annualFee, setAnnualFee ] = useState(false);
    const clickHandler = () => {
        setAnnualFee( s => !s);
    };
    if (user?.scout) {
        return (
            // <Form>
            //     <Form.Check type={"switch"}/>
            // </Form>
            <>
                { annualFee ?
                <Calendar2Month onClick={clickHandler} style={{
                    // color: annualFee ? 'red' : 'green',
                    fontSize: '2rem',
                }} />
                    :
               <CalendarCheck onClick={clickHandler} style={{
                   // color: annualFee ? 'green' : 'red',
                   fontSize: '2rem'
               }} />                }
            </>
        );
    }
    return null;
}