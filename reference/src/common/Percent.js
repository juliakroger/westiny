import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

const Percent = (props) => {
  const getColorFromValue = (value) => {
    if (value > 0) {
      return 'green';
    } else if (value < 0) {
      return 'red';
    }

    return 'black';
  };

  const value = props.value ? `${Math.round(props.value)}%` : '-';
  const color = props.color || getColorFromValue(Math.round(props.value));
  const decimalPrecision = props.decimalPrecision || 0;

  return (
    <div style={{ color }}>
      {value === '-' &&
        <span>{value}</span>
      ||
        <NumberFormat value={value} displayType={'text'} decimalPrecision={decimalPrecision} thousandSeparator suffix={'%'} />
      }
    </div>
  );
};

Percent.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  decimalPrecision: PropTypes.number,
};

export default Percent;
