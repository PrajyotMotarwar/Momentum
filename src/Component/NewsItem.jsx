import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
    <div className='my-4' style={{ position: 'relative' }}>
      <div className="card">
        <div style={{margin:'-30px 0px' ,display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={!imageUrl ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI00S2AWI2Hu-SqkkeKdjiFz2eAur0YQWopYbDLuZwlAN3b5TsLR4ncJr6Kuf_QgCT6O0&usqp=CAU' : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className='text-muted'>By {!author ? ' Unknown' : author} on {new Date(date).toUTCString()}</small></p>
          <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
