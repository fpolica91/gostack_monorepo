import React, { useState, useMemo, useEffect } from 'react'
import {
  format,
  subDays,
  addDays,
  setSeconds,
  setHours,
  setMinutes,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { Container, Time } from './styles'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import api from '~/services/api'

const range = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

export default function Dashboard() {
  const [schedule, setSchedule] = useState([])
  const [date, setDate] = useState(new Date())
  const dateFormatted = useMemo(() => format(date, 'MMMM d'), [date])

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: {
          date,
        },
      })
      const tmzone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const data = range.map((hour) => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0)
        const compareDate = utcToZonedTime(checkDate, tmzone)
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find((a) =>
            isEqual(parseISO(a.date), compareDate)
          ),
        }
      })
      setSchedule(data)
    }
    loadSchedule()
  }, [date])

  function handlePrevDay() {
    setDate(subDays(date, 1))
  }

  function handleNextDay() {
    setDate(addDays(date, 1))
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft color="#FFF" size={36} />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight color="#FFF" size={36} />
        </button>
      </header>

      <ul>
        {schedule.map((time) => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appintment.user.name : 'Available'}
            </span>
          </Time>
        ))}

        {/* <Time past>
          <strong>7:00</strong>
          <span>Jesse Cabrera</span>
        </Time>
        <Time>
          <strong>8:00</strong>
          <span>Fabricio Policarpo</span>
        </Time>
        <Time available>
          <strong>9:00</strong>
          <span>Available</span>
        </Time>
        <Time>
          <strong>10:00</strong>
          <span>Jesse Cabrera</span>
        </Time> */}
      </ul>
    </Container>
  )
}
