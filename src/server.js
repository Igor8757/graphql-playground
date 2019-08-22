import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

let heroes = []

// Types
const typeDefs = `
    type Query {
        heroes(query: String): [Hero!]!
        skills(query: String): [Skill!]!
    }

    type Mutation {
        createHero(class: String!, armor: Int!, hp: Float!): Hero!
    }

    type Hero {
        id: ID!
        class: String!
        armor: Int!
        damage: Float
        hp: Float!
        alive: Boolean
        skills: [Skill]
        items: [String]
        getClass(class: String): String
    }

    type Skill {
        name: String!
        damage: Int!
        effect: String!
        skillOwner: Hero!
    }
`

const resolvers = {
    Query: {
        heroes() {
            return ['dfdf']
        }
    },
    Mutation: {
        createHero(parent, args, ctx, info) {
            const classTaken = heroes.some((hero) => hero.class === args.class)
            if (classTaken) {
                throw new Error('class taken !!')
            }
            const hero = {
                id: uuidv4(),
                class: args.class,
                armor: args.armor,
                hp: args.hp
            }
            heroes.push(hero)
            return hero
        }
    },
    Hero: {
        items() {
            return ['Sword','Shield','Potion']
        },
        getClass(parent, args, ctx, info) {
            if(args.class) {
                return `Found class ${args.class} !`
            } else {
                return 'No class found'
            }
        }
    },
    Skill: {
        skillOwner(parent, args, ctx, info) {
            return heroes.find((hero) => {
                return hero.id === parent.skillOwner
            })
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

