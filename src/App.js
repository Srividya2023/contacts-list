import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuidv4(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
  }

  onAddContact = event => {
    event.preventDefault()
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }
  onClickContact = () => {
    const {contactsList, name, mobileNo} = this.state 
    contactsList.push({id: uuidv4(), isFavorite : false, mobileNo, name  })
    this.setState(contactsList)
  }
  onClickFav = (id) => {
    const {contactsList} = this.state
    console.log(id)
    const reqContactDetailsIndex = contactsList.findIndex(eachContact => eachContact.id === id)
    console.log(reqContactDetailsIndex)
    contactsList[reqContactDetailsIndex].isFavorite = !contactsList[reqContactDetailsIndex].isFavorite
    console.log(contactsList[reqContactDetailsIndex].isFavorite)
    
    this.setState({contactsList: contactsList })
    
  }
  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button" onClick={this.onClickContact}>
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem key={eachContact.id} contactDetails={eachContact} onClickFav={this.onClickFav}/>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
