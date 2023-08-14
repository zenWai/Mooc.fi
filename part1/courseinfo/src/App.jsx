const Header = (props) => {
    return (
        <h1>{props.courseName}</h1>
    );
}

const Content = (props) => {
    return (
            props.courseParts.map(part => (
                <p key={part.name}>
                    {part.name} {part.exercises}
                </p>
            ))
    );
}

const Total = (props) => {
    const counter = props.courseTotalExercises.reduce((count, part) => count+part.exercises, 0);
    return(
            <p>Number of exercises {counter}</p>
    );
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {name: 'Fundamentals of React', exercises: 10},
            {name: 'Using props to pass data', exercises: 7},
            {name: 'State of a component', exercises: 14}
        ]
    }

    return (
        <div>
            <Header courseName={course.name}/>
            <Content courseParts={course.parts}/>
            <Total courseTotalExercises={course.parts}/>
        </div>
    );
}

export default App
