import React from 'react';
import icon from '../loading.svg';
import './LoadingAnim.css';

const LoadingAnim = ({isLoading}) => (
  isLoading && <img src={icon} id="loading-animation" alt="" />
)

export default LoadingAnim;