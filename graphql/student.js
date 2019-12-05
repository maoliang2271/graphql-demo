import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  GraphQLInt
} from 'graphql';

import studentData from '../data/student'
import infoData from '../data/info'

import mongoose from 'mongoose'

import {InfoType} from './info'

const Student = mongoose.model('Student')

let StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    info: {
      type: InfoType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLID) // 参数不为空
        }
      },
      resolve (root, params, options) {
        return infoData.find(item => item._id == params.id)
      }
    }
  }
})

export const student = {
  type: StudentType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID) // 参数不为空
    }
  },
  resolve (root, params, options) {
    return studentData.find(item => item._id == params.id)
    // return Student.find().populate({
    //   path: 'student',
    //   select: 'name sex age'
    // }).exec()
  }
}

export const students = {
  type: new GraphQLList(StudentType),
  args: {},
  resolve (root, params, options) {
    return studentData
    // return Student.find().populate({
    //   path: 'student',
    //   select: 'name sex age'
    // }).exec()
  }
}
