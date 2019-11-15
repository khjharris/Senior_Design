import React from 'react';
import { RingLoader } from 'react-spinners';
import PropTypes from 'prop-types';

function Loading(props) {
  const {size} = props;

  return (
    <div className="loading" style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <RingLoader
        size={size ? size : 100}
        color="#4182eb"
        loading={props.loading}
      />
    </div>
  )

}

Loading.propTypes = {
  size: PropTypes.number
}

export default Loading 