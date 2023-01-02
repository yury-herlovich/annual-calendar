import styled from 'styled-components'

export interface Day {
  id?: string
  date: number
  weekDay: string
  isToday: boolean,
}

const StyledDay = styled.div`
  border-right: 1px solid #cccccc;

  &:nth-child(2) {
    border-left: 1px solid #cccccc;
  }
`

const StyledDayHeader = styled.header`
  padding: 0 1px;
  text-align: right;
  font-size: 60%;
  color: #666;
`

export default function DayField({ day }: { day: Day }) {
  return (
    <StyledDay key={`d-${day.date}`}>
      <StyledDayHeader>{ `${day.weekDay}/${day.date}` }</StyledDayHeader>
    </StyledDay>
  )
}