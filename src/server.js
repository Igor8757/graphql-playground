import { GraphQLServer } from 'graphql-yoga'

// Types
const typeDefs = `
    type Query {
        class: String!
        armor: Int!
        damage: Float
        hp: Float!
        alive: Boolean
        skill: Skill!
        getClass(class: String!): String!

    }

    type Skill {
        name: String!
        damage: Int!
        effect: String!
    }
`

const resolvers = {
    Query: {
        class() {
            return 'Warrior'
        },
        armor() {
            return 5
        },
        damage() {
            return 2
        },
        skill() {
            return {
                name: 'Bash',
                damage: 5,
                effect: 'Stun'
            }
        },
        getClass(parent, args, ctx, info) {
            if(args.class) {
                return `Found class ${args.class} !`
            } else {
                return 'No class found'
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up !! ')
})

