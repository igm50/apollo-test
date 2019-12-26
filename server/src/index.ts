import { books } from './books'
import { typeDefs } from './typeDefs'
const { ApolloServer } = require('apollo-server')

const resolvers = {
  Query: {
    books: books
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then((conf: { url: string }) => {
  console.log(`🚀 Server ready at ${conf.url}`)
})
