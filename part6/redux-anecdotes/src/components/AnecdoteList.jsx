import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "ALL") {
      return anecdotes;
    } else {
      const newAnec = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
      return newAnec;
    }
  });
  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();
  const handleVoteFor = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(
      setNotification(
        {
          message: `You Voted ${anecdote.content}`,
          type: "vote",
        },
        500
      )
    );
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteFor(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
