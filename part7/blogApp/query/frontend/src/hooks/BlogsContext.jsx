import { createContext, useReducer } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'APPEND':
    return state=state.concat(action.payload)
  default:
    return state
  }
}

const BlogsContext = createContext()

export const BlogsContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])

  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch] }>
      {props.children}
    </BlogsContext.Provider>
  )
}

export default BlogsContext