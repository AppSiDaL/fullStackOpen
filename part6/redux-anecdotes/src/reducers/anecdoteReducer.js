import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload.id;
      console.log(action.payload)
      const anecdote = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteAnecdote = anecdote => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(voteFor(modifiedAnecdote))
  }
}

export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
