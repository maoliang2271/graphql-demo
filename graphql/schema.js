import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import {info, infos} from './info'
import {student, students} from './student'

import mutationFields from './mutation'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      infos,
      info,
      student,
      students
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutationFields
  })
})
