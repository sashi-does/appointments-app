import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const appointments = []

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    initialAppointments: appointments,
    showFavourite: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  addNewAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      starred: false,
    }
    this.setState(prevState => ({
      title: '',
      date: '',
      initialAppointments: [...prevState.initialAppointments, newAppointment],
    }))
  }

  toggleFavourite = id => {
    this.setState(prevState => ({
      initialAppointments: prevState.initialAppointments.map(
        eachAppointment => {
          if (eachAppointment.id === id) {
            return {...eachAppointment, starred: !eachAppointment.starred}
          }
          return eachAppointment
        },
      ),
    }))
  }

  favouriteAppointments = () => {
    this.setState(prevState => ({
      showFavourite: !prevState.showFavourite,
    }))
  }

  render() {
    const {initialAppointments, showFavourite, title, date} = this.state
    const filteredAppointments = initialAppointments.filter(eachAppointment => {
      if (eachAppointment.starred) return true
      return false
    })
    return (
      <div className="appointment-page">
        <div className="book-appointment-section">
          <div className="hero-section">
            <form className="schedule-section">
              <h1 className="main-heading">Add Appointment</h1>
              <div className="input-section">
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  value={title}
                  onChange={this.onChangeTitle}
                  className="input-area"
                  id="title"
                  type="text"
                />
              </div>
              <div className="input-section">
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  value={date}
                  onChange={this.onChangeDate}
                  className="input-area"
                  id="date"
                  type="date"
                />
              </div>
              <button
                onClick={this.addNewAppointment}
                className="add-button"
                type="submit"
              >
                Add
              </button>
            </form>
            <div className="image-section">
              <img
                className="hero-image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="divider" />
          <div>
            <div className="all-appointments">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                onClick={this.favouriteAppointments}
                type="button"
                className={showFavourite ? 'starred-button starred' : 'starred'}
              >
                Starred
              </button>
            </div>
            <ul className="appointments">
              {showFavourite
                ? filteredAppointments.map(eachAppointment => (
                    <AppointmentItem
                      toggleFavourite={this.toggleFavourite}
                      key={eachAppointment.id}
                      appointmentDetails={eachAppointment}
                    />
                  ))
                : initialAppointments.map(eachAppointment => (
                    <AppointmentItem
                      toggleFavourite={this.toggleFavourite}
                      key={eachAppointment.id}
                      appointmentDetails={eachAppointment}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
