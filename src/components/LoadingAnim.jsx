import React from 'react';
import icon from '../img/loading.svg';

const LoadingAnim = ({isLoading}) => (
  <div id="loading-animation">
    {isLoading && <img src={icon} alt="" />}
  </div>

)

export default LoadingAnim;