import {useState} from "react";
import {Button} from 'react-bootstrap';

export function Checkbox(props: any) {
    const [checked, setChecked] = useState(!!props?.checked);

    return (
        <>
            <Button size={'lg'} variant={'link'}
                    onClick={() => {
                        setChecked(s => !s);
                        props?.onChange?.(checked);
                    }}
                    style={{textDecoration: 'none'}}
            >
                {checked ? '✅' : '❌'}
            </Button>
        </>
    )
}