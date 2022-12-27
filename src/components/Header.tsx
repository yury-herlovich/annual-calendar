import styled from 'styled-components'
import Loading from './Loading'

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 95px 1fr;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`

function Header() {
  return (
    <StyledHeader>
      <div id="calendar-partial">
        <Loading />
        {/* <Link to="/add"><Icon icon="plus" color="#333333" /></Link> */}
        {/* <SelectYear match={match} /> */}
      </div>
    </StyledHeader>
  )
}

export default Header
