// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageFilter, onChangeLanguage, isSelected} = props
  const {id, language} = eachLanguageFilter

  const onClickLanguage = () => {
    onChangeLanguage(id)
  }
  const selectedButtonStyle = isSelected ? 'selected-button-style' : ''

  return (
    <li>
      <button
        type="button"
        onClick={onClickLanguage}
        className={`language-button ${selectedButtonStyle}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
