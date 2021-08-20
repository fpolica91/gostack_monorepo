import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { format, isToday, parseISO, isAfter } from 'date-fns'
import { FiPower, FiClock } from 'react-icons/fi'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import logoImg from '../../components/assets/logo.svg'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import {
  Container,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Content,
  Schedule,
  Section,
  Calendar,
  Appointment,
} from './styles'

export interface DashboardProps {}

interface MonthAvailability {
  day: number
  available: boolean
}

interface Appointments {
  id: string
  date: string
  hourFormatted: string
  user: {
    name: string
    avatar_url: string
  }
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [appointments, setAppointments] = useState<Appointments[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([])

  const handleDatechange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  const disabledays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => !monthDay.available)
      .map((monthDay) => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        return new Date(year, month, monthDay.day)
      })
    return dates
  }, [currentMonth, monthAvailability])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, " dd 'of' MMMM ")
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc')
  }, [selectedDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12
    })
  }, [appointments])

  const eveningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12
    })
  }, [appointments])

  const { singOut, user } = useAuth()

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user.id])

  useEffect(() => {
    api
      .get<Appointments[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          }
        })
        setAppointments(appointmentsFormatted)
      })
  }, [selectedDate])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) => {
      return isAfter(parseISO(appointment.date), new Date())
    })
  }, [appointments])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="goBarber" />
          <Profile>
            <img
              src={
                user.avatar_url ||
                'https://api.adorable.io/avatars/56/abott@adorable.io.png'
              }
              alt={user.name}
            />
            <div>
              <span>Welcome</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={singOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Scheduled Appointments</h1>
          <p>
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Following Appointment</strong>
              <div>
                <img
                  src={
                    nextAppointment.user.avatar_url ||
                    'https://api.adorable.io/avatars/56/apery@adorable.io.png'
                  }
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Morning</strong>
            {morningAppointments.length === 0 && (
              <p>No morning appointments available</p>
            )}
            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={
                      appointment.user.avatar_url ||
                      'https://api.adorable.io/avatars/56/apery@adorable.io.png'
                    }
                    alt="ape"
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Evening</strong>
            {eveningAppointments.length === 0 && (
              <p>No evening appointments available</p>
            )}
            {eveningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={
                      appointment.user.avatar_url ||
                      'https://api.adorable.io/avatars/56/apery@adorable.io.png'
                    }
                    alt="ape"
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            disabledDays={[{ daysOfWeek: [0] }, ...disabledays]}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDatechange}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
