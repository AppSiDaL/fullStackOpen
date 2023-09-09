import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

const queryClient = new QueryClient()
import { BlogsContextProvider } from './hooks/BlogsContext'
import { UserContextProvider } from './hooks/UserContext'
import { NotificationContextProvider } from './hooks/NotificationContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <UserContextProvider>
      <BlogsContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BlogsContextProvider>
    </UserContextProvider>
  </NotificationContextProvider>
  ,
)
