const config = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')

// 链接数据库
const db = mysql.createPool(config.mysql)

const jsonWrite = function (res,ret){
  if(typeof ret === "undefined"){
    res.json({
      code:'1',
      msg:'失败'
    })
  }else {
    res.json(ret)
  }
}

router.get('/behaviors',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  const sql = $sql.whole.getAllBehavior
  db.query(sql,(err,result)=>{
    if(err){
      return console.log(err)
    }
    jsonWrite(res,result)
  })
})

router.get('/users',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  const sql = $sql.whole.getAllUsers
  db.query(sql,(err,result)=>{
    if(err){
      return console.log(err)
    }
    jsonWrite(res,result)
  })
})
router.get('/errors',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  const sql = $sql.whole.getAllError
  db.query(sql,(err,result)=>{
    if(err){
      return console.log(err)
    }
    jsonWrite(res,result)
  })
})
router.get('/performance',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  const sql = $sql.whole.getAllPerformance
  db.query(sql,(err,result)=>{
    if(err){
      return console.log(err)
    }
    jsonWrite(res,result)
  })
})

module.exports = router
