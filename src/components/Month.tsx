import styled from 'styled-components'
import DayField, { Day } from './Day'

export interface Month {
  title: string
  month: number
  days: Day[]
}

const StyledMonth = styled.section`
  display: grid;
  grid-template-columns: 1.2fr repeat(31, minmax(38px, 1fr));
  justify-items: stretch;
  border-bottom: 1px solid #cccccc;

  &:first-child {
    border-top: 1px solid #cccccc;
  }
`

const StyledMonthHeader = styled.header`
  justify-self: center;
  align-self: center;
`

export default function MonthGrid({ month }: { month: Month } ) {
  return (
    <StyledMonth key={`m-${month.month}`}>
      <StyledMonthHeader>{month.title}</StyledMonthHeader>
      {month.days.map((day, dInd) => (
        <DayField day={day} />
      ))}
    </StyledMonth>
  )
}

