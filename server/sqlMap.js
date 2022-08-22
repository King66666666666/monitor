const sqlMap = {
  // 全部
  whole:{
    getAllBehavior:'select * from behavior',
    getAllError:'select * from error',
    getAllPerformance:'select * from performance',
    getAllUsers:'select * from user',
  },
  // 根据时间查询
  // timeList:{
  //   getAllBehavior:'select * from behavior where time=?',
  //   getAllError:'select * from error where time=?',
  //   getAllPerformance:'select * from performance where time=?',
  // },
  // 根据数量查询前十个
  // numList:{
  //   getAllBehavior:'select * from behavior where time=?',
  //   getAllError:'select * from error where time=?',
  //   getAllPerformance:'select * from performance where time=?',
  // }
}

module.exports = sqlMap
