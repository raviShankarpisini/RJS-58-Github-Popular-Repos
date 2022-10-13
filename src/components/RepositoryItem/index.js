// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachRepositoryItem} = props
  const {
    avatarUrl,
    forksCount,
    id,
    issuesCount,
    name,
    starsCount,
  } = eachRepositoryItem

  return (
    <li className="card-container">
      <img src={avatarUrl} alt={name} className="name-image" />
      <h1 className="card-heading">{name}</h1>
      <div>
        <div className="icon-container">
          <img
            className="icon-size"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount}</p>
        </div>
        <div className="icon-container">
          <img
            className="icon-size"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p>{forksCount}</p>
        </div>
        <div className="icon-container">
          <img
            className="icon-size"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p>{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
