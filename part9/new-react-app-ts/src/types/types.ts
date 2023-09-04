export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    kind: string;
}

interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

export type HeaderProps = {
    courseName: string;
};

export type ContentProps = {
    courseParts: CoursePart[];
};

export type TotalProps = {
    courseParts: CoursePart[];
};