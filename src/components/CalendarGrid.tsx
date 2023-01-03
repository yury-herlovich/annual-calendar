import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { CalendarParams } from '../App'
import MonthGrid, { Month } from './Month'

type Calendar = Array<Month>

const StyledCalendar = styled.section`
  grid-row: 1;
  grid-column: 1;
  display: grid;
  grid-template-rows: repeat(12, minmax(50px, 1fr));
`

export default function CalendarGrid() {
  const [calendar, setCalendar] = useState<Calendar>([])
  const { year = `${new Date().getFullYear()}` } = useParams<CalendarParams>()

  useEffect(() => {
    const parsedYear = Number(year)

    const grid: Calendar = Array(12).fill([]).map((_m, mInd) => {
      const nDays = new Date(parsedYear, mInd + 1, 0).getDate()

      return {
        title: (new Date(parsedYear, mInd).toString()).substring(4, 7),
        month: mInd + 1,
        days: Array(nDays).fill(0).map((_d, dInd) => ({
          date: dInd + 1,
          weekDay: (new Date(parsedYear, mInd, dInd + 1).toString()).substring(0, 3),
          isToday: false,
        }))
      }
    })

    setCalendar(grid)
  }, [year])

  return (
    <StyledCalendar id="calendar-grid">
      {calendar && calendar.map((month, mInd) => (
        <MonthGrid month={month} key={`m-${mInd}`} />
      ))}
    </StyledCalendar>
  )
}