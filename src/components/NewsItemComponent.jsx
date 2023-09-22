import React, { Component } from 'react'

export class NewsItemComponent extends Component {
  render() {
    let {title,description, imgUrl, newsUrl} = this.props
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imgUrl?'https://upload.wikimedia.org/wikipedia/commons/6/66/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2804-05-2023%29.jpg':imgUrl} className="card-img-top" alt="newsPhoto"/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>

      </div>
    )
  }
}

export default NewsItemComponent