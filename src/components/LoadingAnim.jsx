import React from 'react';
import icon from '../img/loading.svg';
import './LoadingAnim.css';

const LoadingAnim = ({isLoading}) => (
  isLoading && <img src={icon} id="loading-animation" alt="" />
)

export default LoadingAnim;