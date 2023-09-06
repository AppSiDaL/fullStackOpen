import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      dispatch({
        type: "CHANGE",
        payload: { message: `${newAnecdote.content} was added`, type: "success" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAN" });
      }, 5000);
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError:(error)=>{
      dispatch({
        type: "CHANGE",
        payload: { message: `Error ${error}`, type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAN" });
      }, 5000);
    }
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
