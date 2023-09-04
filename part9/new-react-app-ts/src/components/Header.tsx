import {ReactElement} from "react";
import {HeaderProps} from "../types/types";

const Header = (props: HeaderProps): ReactElement | null => {
    return <h1>{props.courseName}</h1>;
};

export default Header;