import mongoose from 'mongoose'

const Student = mongoose.model('Student')

import studentData from '../data/student'

export const saveStudent = async (ctx, next) => {
  const opts = ctx.request.body
  
  const student = new Student(opts)
  const saveStudent = await student.save()

  if (saveStudent) {
    ctx.body = {
      success: true,
      data: saveStudent
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

export const fetchStudent = async (ctx, next) => {
  const students = studentData

  if (students.length) {
    ctx.body = {
      success: true,
      data: students
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}