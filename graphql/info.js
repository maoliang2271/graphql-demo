import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType
} from 'graphql';

import mongoose from 'mongoose'
const Info = mongoose.model('Info')

import infoData from '../data/info'

// 定义Info的数据类型
export let InfoType = new GraphQLObjectType({
  name: 'Info',
  fields: {
    _id: {
      type: GraphQLID
    },
    height: {
      type: GraphQLString
    },
    weight: {
      type: GraphQLString
    },
    hobby: {
      type: new GraphQLList(GraphQLString)
    }
  }
})

// 批量查询
export const infos = {
  type: new GraphQLList(InfoType),
  args: {},
  resolve (root, params, options) {
    return infoData
    // return Info.find({}).exec()
  }
}

// 根据id查询单条info数据
export const info = {
  type: InfoType,
  description: '根据id查询个人信息',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID) // 参数不为空
    }
  },
  resolve (root, params, options) {
    return infoData.find(item => item._id == params.id)
    // return Info.findOne({
    //   _id: params.id
    // }).exec()
  }
}
