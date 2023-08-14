import {useState} from 'react'

const Button = ({text, handleClick}) => {
    return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}

const Statistics = (props) => {
    return (
        props.all ?
            <table>
                <tbody>
                <StatisticLine text='good' value={props.good}/>
                <StatisticLine text='neutral' value={props.neutral}/>
                <StatisticLine text='bad' value={props.bad}/>
                <StatisticLine text='all' value={props.all}/>
                <StatisticLine text='average' value={props.average}/>
                <StatisticLine text='positive' value={`${props.positive} %`}/>
                </tbody>
            </table>
            :
            <p>No feedback given</p>
    );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(prevGood => prevGood + 1);
    }
    const handleNeutral = () => {
        setNeutral(prevNeutral => prevNeutral + 1);
    }
    const handleBad = () => {
        setBad(prevBad => prevBad + 1);
    }
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100;
    return (
        <div>
            <h1>give feedback</h1>
            <p>
                <Button text={'good'} handleClick={handleGood}/>
                <Button text={'neutral'} handleClick={handleNeutral}/>
                <Button text={'bad'} handleClick={handleBad}/>
            </p>
            <h2>statistics</h2>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                positive={positive}
            />
        </div>
    );
}

export default App
