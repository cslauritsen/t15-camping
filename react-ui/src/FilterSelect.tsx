import {Form} from "react-bootstrap";
import {Filter} from "./Filter";

interface Props {
    onSelect?: (v: Filter) => void;
}
export function FilterSelect(props: Props) {
    return (
                <Form>
                    <Form.Select onChange={e => props?.onSelect?.(e.currentTarget.value as Filter)} >
                        <option key={'any'} value={'any'}>Any</option>
                        <option key={'n'} value={'n'}>No</option>
                        <option key={'y'} value={'y'}>Yes</option>
                    </Form.Select>
                </Form>
    );
}