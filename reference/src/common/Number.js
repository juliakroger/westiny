import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const Number = (props) => {
  const getColorFromValue = (value) => {
    if (value > 0) {
      return 'green';
    } else if (value < 0) {
      return 'red';
    }

    return 'black';
  };

  let color = props.color;


  if (!color) {
    color = getColorFromValue(props.value);
  } else if (!isNaN(color)) {
    color = getColorFromValue(color);
  }


  return (
    <NumberFormat value={props.value} style={{ color }} displayType={'text'} decimalPrecision={2} thousandSeparator prefix={'$'} />
  );
};

Number.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Number;
