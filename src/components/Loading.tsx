import styled from 'styled-components'
import icon from '../img/loading.svg'

const StyledLoading = styled.div`
  display: grid;
  align-items: center;
`

export default function Loading({ ...isLoading }) {
  return (
    <StyledLoading>
      {isLoading && <img src={icon} alt="" />}
    </StyledLoading>
  )
}
