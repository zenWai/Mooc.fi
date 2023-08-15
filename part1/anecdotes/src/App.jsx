import {useState} from 'react'

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
];

const MostVotedAnecdote = (props) => {
    const maxVotes = Math.max(...props.votes);
    const topIndices = props.votes.reduce((indices, currVote, currIndex) => {
        if (currVote === maxVotes) indices.push(currIndex)
        return indices;
    }, []);
    const hasVotes = maxVotes > 0;
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            {hasVotes ? (
                    <>
                        {topIndices.map(idx => (
                            <div key={idx}>
                                <p>{anecdotes[idx]}</p>
                            </div>
                        ))}
                        <p>has {maxVotes} votes</p>
                    </>
                ) : (
                    <p>No votes yet!</p>
                )}
        </div>
    )
}

const App = () => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const handleNext = () => {
        setSelected(prevSelected => {
            let random;
            do {
                random = getRandomInt(anecdotes.length)
                console.log(random);
            } while (random === prevSelected)
            return random;
        })
    }

    const handleVote = () => {
        const votesArrHelper = [...votes];
        votesArrHelper[selected] += 1;
        setVotes(votesArrHelper);
    }

    function getRandomInt(arrLength) {
        return Math.floor(Math.random() * arrLength);
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <p>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleNext}>next anecdote</button>
            </p>
            <MostVotedAnecdote votes={votes}/>
        </div>
    )
}

export default App
