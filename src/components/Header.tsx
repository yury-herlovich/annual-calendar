import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useYear } from '../hooks/useYear'
import Loading from './Loading'

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 95px 1fr;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  align-self: center;

  & > div {
    display: grid;
    justify-self: right;
    grid-template-columns: 30px 100px; {*  30px 50px 100px *}
    justify-content: space-between;
    align-items: center;
  }
`

const StyledSelectYear = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr 25px;
  align-items: center;
  justify-items: center;
`

const StyledYear = styled.span`
  display: inline-block;
`

const StyledLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2px;
  font-size: 1.1em;
  text-decoration: none;
  color: #000;
`

function SelectYear() {
  const year = useYear()

  return (
    <StyledSelectYear>
      <StyledLink to={`/year/${year - 1}`}>&lt;</StyledLink>
      <StyledYear className="year-view">{year}</StyledYear>
      <StyledLink to={`/year/${year + 1}`}>&gt;</StyledLink>
    </StyledSelectYear>
  )
}

function Header() {
  return (
    <StyledHeader>
      <div></div>
      <div>
        <Loading hidden />
        {/* <Link to="/add"><Icon icon="plus" color="#333333" /></Link> */}
        <SelectYear />
      </div>
    </StyledHeader>
  )
}

export default Header
