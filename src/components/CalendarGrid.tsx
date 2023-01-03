import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useYear } from '../hooks/useYear'
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
  const year = useYear()

  useEffect(() => {
    const grid: Calendar = Array(12).fill([]).map((_m, mInd) => {
      const nDays = new Date(year, mInd + 1, 0).getDate()

      return {
        title: (new Date(year, mInd).toString()).substring(4, 7),
        month: mInd + 1,
        days: Array(nDays).fill(0).map((_d, dInd) => ({
          date: dInd + 1,
          weekDay: (new Date(year, mInd, dInd + 1).toString()).substring(0, 3),
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