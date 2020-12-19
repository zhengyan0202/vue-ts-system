// 引入mockjs
import Mock from 'mockjs';
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 100; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}

//表格数据
const getTableData =  function() {
  let tableData:any[] = [];

  for (let i = 0; i < 15; i++) {
    let tableItem = {
        name: Random.cname(),
        date: Random.date('yyyy-MM-dd'),
        number: Random.integer(0, 1000),
        address: Random.county(true)
    }
    tableData.push(tableItem)
  }

  return {
    tableData: tableData
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'get', produceNewsData);
Mock.mock('/table/index', 'get', getTableData);


export default Mock;