import {ReactElement} from 'react';
import {ContentProps} from '../types/types';
import {Part} from './Part';

const Content = (props: ContentProps): ReactElement | null => {
    return (
        <div>
            {props.courseParts.map((part, index) => (
                <Part key={index} part={part}/>
            ))}
        </div>
    );
};

export default Content;