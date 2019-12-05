
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt
} from 'graphql';

import studentData from '../data/student'

// 定义response
const outputType = new GraphQLObjectType({
  name: 'output',
  fields: () => ({
    id: { 
      type: GraphQLString
    },
    success: {
      type: GraphQLBoolean
    },
  })
});

// 入参
const inputType = new GraphQLInputObjectType({
  name: 'input',
  fields: () => ({
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
    }
  })
});

const mutation = {
    // 删除
    delOne: {
      type: outputType,
      description: 'del',
      args: {
        id: { type: GraphQLString }
      },
      resolve: (value, args) => {
        console.log(args.id)
        let index = studentData.findIndex(item => item._id == args.id)
        studentData.splice(index, 1)
        return {
          id: args.id,
          success: true
        }
      }
    },
    // 修改
    editOne: {
      type: outputType,
      description: 'edit',
      args: {
        listObj: { type: inputType }
      },
      resolve: (value, args) => {
        console.log(args.listObj)
        let index = studentData.findIndex(item => item._id == args.listObj._id)
        let success = false
        if (index > -1) {
          studentData[index] = {
            ...studentData[index],
            ...args.listObj
          }
          success = true
        }
        return {
          id: args.listObj._id,
          success
        }
      }
    },
    // 增加
    addOne: {
      type: outputType,
      description: 'add',
      args: {
        listObj: { type: inputType }
      },
      resolve: (value, args) => {
        console.log(args.listObj)
        studentData.push(args.listObj)
        return {
          id: args.listObj._id,
          success: true
        }
      }
    }
}

export default mutation