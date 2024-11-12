import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleFavourite} = props
  const {id, title, date, starred} = appointmentDetails
  const favIcon = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const scheduledTime = format(new Date(date), 'dd MMMM yyyy, EEEE')
  console.log(scheduledTime)
  const onClickFavourite = () => {
    toggleFavourite(id)
  }
  return (
    <li className="appointment">
      <div className="details">
        <p className="reason">{title}</p>
        <button
          data-testid="star"
          onClick={onClickFavourite}
          className="like-btn"
          type="button"
        >
          <img alt="star" src={favIcon} />
        </button>
      </div>
      <p className="schedule-time">{scheduledTime}</p>
    </li>
  )
}

export default AppointmentItem
