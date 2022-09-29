# citbooks-booklist-fore-end接口文档

中国科技资料进出口总公司线上书展前端接口文档

## 登录

输入账户和密码后获取后端传来的UUID

请求类型：GET

接口地址：`/api/login`

请求参数：

```
account："DJDX"  // 账户
password:123000  // 密码
```

响应参数：

```json
{
    success：1，// 接口状态码 1成功 0失败
    msg:"登录成功"， // 失败则提示 账号或密码错误
    UUID:2333333333 // 根据账户&密码生成的唯一标识
}
```

## 二级分类

利用UUID查询出用户所属单位 返回对应的二级分类

请求类型：GET

接口地址：`/api/secondaryTree`

请求参数：

```json
UUID:2333333333
```

响应参数：

```json
{
  success:1,
  msg:"请求成功",
  data:[
    {
      title: "计算机", // 一级目录标题
      key: "computer", // 唯一标识
      children: [ // 二级目录
        {
          title: "编程语言",  // 二级目录标题
          key: "computer-programming", // 唯一标识 注意二级目录因涉及到提交操作命名时务必携带”-“关键字
        },
        {
          title: "系统开发",
          key: "computer-systemDeveLopment",
        },
        {
          title: "编程算法",
          key: "computer-algorithm",
        },
      ],
    },
    // ...
  ]
}
```

## 图书列表

根据二级目录的关键字，查询出关键字下图书列表，ALL为全部 即默认

请求类型：GET

接口地址：`/api/list`

请求参数：

```json
UUID:2333333333
key："ALL" // 默认 返回全部
pages：1 // 页数
length：10 // 每页长度
```

响应参数：

```json
{
  	success:1,
  	msg:"请求成功",
    length：500 // 列表总长度 用于计算分页器
    data:[
       {
        imgUrl:
          "https://th.bing.com/th/id/OIP.Lcl1VNhLUc9uljUtX9yPLwHaK0?w=128&h=186&c=7&r=0&o=5&pid=1.7", // 书封面 可采取base64形式减缓服务器压力
        title: "JavaScript高级程序设计（第4版）", // 书名
        author: "Matt Frisbie", // 作者
        press: "人民邮电出版社", // 出版社
        isbn: "1119366445", // isbn
        clcNo: "A10", // 中图分类号
        binding: "XX装帧", // 装帧
        pages: 931, //页数
        monetary: "人民币", //币制
        price: 80, // 价格
      },
      // ...
    ]
}
```

## 图书详情

利用ISBN查询图书详情

请求类型：GET

接口地址：`/api/details`

请求参数：

```json
UUID:"2333333333",
isbn：1119366445
```

响应参数：

```json
{
  	success:1,
  	msg:"请求成功",
    data:       {
        imgUrl:
          "https://th.bing.com/th/id/OIP.Lcl1VNhLUc9uljUtX9yPLwHaK0?w=128&h=186&c=7&r=0&o=5&pid=1.7", // 书封面 可采取base64形式减缓服务器压力
        title: "JavaScript高级程序设计（第4版）", // 书名
        author: "Matt Frisbie", // 作者
        press: "人民邮电出版社", // 出版社
        isbn: "1119366445", // isbn
        clcNo: "A10", // 中图分类号
        binding: "XX装帧", // 装帧
        pages: 931, //页数
        monetary: "人民币", //币制
        price: 80, // 价格
        Introduction:"xxxxxxxxxxxxxxxxx" // 简介 可以为富文本
        award:"该书在2020年获得xx奖" //获奖信息 可以为富文本
      },
}
```

## 聚合搜索

通过书名或作者或ISBN或出版社检索出列表

请求类型：GET

接口地址：`/api/search`

请求参数：

```
UUID:"2333333333",
keyword："算法导论" // 检索关键字
pages：1 // 页数
length：10 // 每页长度
```

响应参数：

```json
{
  	success:1,
  	msg:"请求成功",
    length：500 // 列表总长度 用于计算分页器
    data:[
       {
        imgUrl:
          "https://th.bing.com/th/id/OIP.Lcl1VNhLUc9uljUtX9yPLwHaK0?w=128&h=186&c=7&r=0&o=5&pid=1.7", // 书封面 可采取base64形式减缓服务器压力
        title: "JavaScript高级程序设计（第4版）", // 书名
        author: "Matt Frisbie", // 作者
        press: "人民邮电出版社", // 出版社
        isbn: "1119366445", // isbn
        clcNo: "A10", // 中图分类号
        binding: "XX装帧", // 装帧
        pages: 931, //页数
        monetary: "人民币", //币制
        price: 80, // 价格
      },
      // ...
    ]
}
```



## 提交书单

向后端提交个人信息&isbn集合

请求类型：PSOT

请求参数：

```json
UUID:2333333333 //UUID 可以通过uuid计算出组织/学校
name："王花花" // 姓名 
StudentId:15700123330504 // 学号
departments："数字媒体" // 院系
class：1802 // 班级
```

响应参数：

```json
{
	success:1,
	msg:"提交成功",
}
```