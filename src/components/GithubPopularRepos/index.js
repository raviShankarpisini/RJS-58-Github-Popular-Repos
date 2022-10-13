import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const fetchingStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  successful: 'SUCCESSFUL',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    uiList: [],
    status: fetchingStatus.initial,
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({status: fetchingStatus.loading})

    const {activeTabId} = this.state

    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(githubReposApiUrl)
    const data = await response.json()
    console.log('data', data)
    if (response.ok === true) {
      const uiList = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({status: fetchingStatus.successful, uiList})
    } else {
      this.setState({status: fetchingStatus.failure})
    }
  }

  onChangeLanguage = id => {
    this.setState({activeTabId: id}, this.getProducts)
  }

  renderFetchingUI = () => {
    const {uiList, status} = this.state
    switch (status) {
      case fetchingStatus.loading:
        return (
          <div testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )

      case fetchingStatus.successful:
        return (
          <ul className="items-container">
            {uiList.map(each => (
              <RepositoryItem key={each.id} eachRepositoryItem={each} />
            ))}
          </ul>
        )
      // return console.log('success')

      case fetchingStatus.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
          </div>
        )

      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div>
        <div className="github-container">
          <h1 className="heading">Popular</h1>
          <ul className="filtered-container">
            {languageFiltersData.map(eachLanguageFilter => (
              <LanguageFilterItem
                eachLanguageFilter={eachLanguageFilter}
                key={eachLanguageFilter.id}
                onChangeLanguage={this.onChangeLanguage}
                isSelected={eachLanguageFilter.id === activeTabId}
              />
            ))}
          </ul>

          {this.renderFetchingUI()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
