import React, { Component } from 'react'

class Index extends Component {
  constructor() {
    super()
    this.state = {
      comments: [
        { id: '1', name: 'jack', content: '沙发' },
        { id: '2', name: 'rose', content: '凳子' },
        { id: '3', name: 'kim', content: '快来呀' }
      ],
      // 评论人
      userName:'',
      // 评论内容
      userContent:''
    }
  }
  // 处理表单元素值 
  handleForm = (e) => {
    // 获取当前DOM的值
    const { value , name } = e.target
    // console.log(e.target)
    // 获取name
    this.setState({
      [name]: value
    })
  }

  // 点击事件 添加发表内容
  addComments = () => {
    const { comments, userContent , userName } = this.state
    // console.log(userContent , userName)
    // 非空校验
    if(userName.trim() === '' || userContent.trim() === '') {
      alert('不允许为空，请输入评论人和评论内容')
      return
    }
    // 把数据添加到数组中  （...展开运算符，...comments放前放后代表添加数据时在前还是在后添加）
    const newComments = [
      {
      id:Math.random(),  // 生成随机id
      name:userName,
      content:userContent
      },
      ...comments
    ]
    // console.log(newComments)
    this.setState({
      comments:newComments,
      // 清空文本框
      userName:'',
      userContent:''
    })
  }

  // 优化代码结构 代码抽离(这里判断用的是三目运算判断 也可以用if做判断 根据个人喜好)
  renderList = () => {
    // 将值结构出来
    const { comments } = this.state
    return comments.length === 0
      ? (<div>暂无评论，快抢占沙发吧~</div>)
      : (<ul>
        {
          comments.map(item => {
            return (
              <li key={item.id}>
                <h3>评论人：{item.name}</h3>
                <p>评论内容：{item.content}</p>
              </li>
            )
          })
        }
      </ul>
      )
  }
  render() {
    const { userContent , userName} = this.state
    return (
      <div>
        <div>
          <br />
          {/* 文本框 */}
          {/* name的值和状态的值是相同的 */}
          <input type="text"
           value={userName} 
           name="userName" 
           onChange={this.handleForm} />
          <br />
          <br />
          {/* 富文本框 */}
          <textarea
            name="userContent"
            value={userContent}
            cols="30"
            rows="10"
            placeholder="请输入评论内容"
            onChange={this.handleForm}
          >
          </textarea>
          <br />
          <button onClick={this.addComments}>发表评论</button>
        </div>
        {/* 通过条件判断 来决定渲染什么内容 */}
        {/* 代码优化  将这部分内容抽离  通过引入方法的形式展示出来
            注意：方法中必须return出来
        */}

        {/* 通过引入方法的形式显示 */}
        {this.renderList()}

        {/* 将这部分代码注释掉 下边这部分代码等同于上边引入的方法*/}
        {/* {
          comments.length === 0
            ? (<div>暂无评论，快抢占沙发吧~</div>)
            : (<ul>
              {
                comments.map(item => {
                  return(
                    <li key={item.id}>
                    <h3>评论人：{item.name}</h3>
                    <p>评论内容：{item.content}</p>
                  </li>
                  )
                })
              }
            </ul>)
        } */}
      </div>
    )
  }
}
export default Index