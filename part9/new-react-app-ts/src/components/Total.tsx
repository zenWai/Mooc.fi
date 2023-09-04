import {ReactElement} from "react";
import {TotalProps} from "../types/types";

const Total = (props: TotalProps): ReactElement | null => {
    return (
        <p>
            Number of exercises{" "}
            {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    );
};

export default Total;