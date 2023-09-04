import {CoursePart} from '../types/types';
import {ReactElement} from "react";
import {assertNever} from "../helpers/helpers";

export const Part = ({part}: { part: CoursePart }): ReactElement | null => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>Group projects: {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                    <p>Background material: {part.backgroundMaterial}</p>
                </div>
            );
        default:
            return assertNever(part);
    }
};