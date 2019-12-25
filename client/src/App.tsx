import React, { useMemo } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'

const App: React.FC = () => {
  const client = useMemo(
    () => new ApolloClient({ uri: 'http://localhost:4000' }),
    []
  )

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div>
          <h2>
            My first Apollo app{' '}
            <span role="img" aria-label="Rocket">
              🚀
            </span>
          </h2>
          <Books />
        </div>
      </ApolloProvider>
    </div>
  )
}

const Books: React.FC = () => {
  const booksQuery = useMemo(
    () => gql`
      {
        books {
          title
          author
        }
      }
    `,
    []
  )

  const { loading, error, data } = useQuery(booksQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.books.map(
    (data: { title: string; author: string }, index: number) => (
      <div key={data.title}>
        <h3>book{index + 1}</h3>
        <p>title:{data.title}</p>
        <p>author:{data.author}</p>
      </div>
    )
  )
}

export default App
