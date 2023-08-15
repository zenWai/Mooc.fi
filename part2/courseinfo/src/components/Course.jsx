const Header = ({courseName}) => {
    return <h2>{courseName}</h2>;
}

const Part = ({part}) => {
    return <p>{part.name} {part.exercises}</p>;
}

const Parts = ({parts}) => {
    const totalExercises = parts.reduce((sum, part) => {
        return sum+part.exercises;
    },0)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <p style={{fontWeight: 'bold'}}>total of {totalExercises} exercises</p>
        </div>
    );
}
const Course = (props) => {
    return (
        <div>
            {props.courses.map(course => (
                <div key={course.id}>
                    <Header courseName={course.name}/>
                    <Parts parts={course.parts}/>
                </div>
            ))}
        </div>
    );
}
export default Course;