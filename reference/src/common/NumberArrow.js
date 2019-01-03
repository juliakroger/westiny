import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';


const NumberArrow = (props) => {
  const getColorFromValue = (value) => {
    if (value > 0) {
      return 'green';
    } else if (value < 0) {
      return 'red';
    }

    return 'black';
  };

  const text = props.text || '';
  const color = props.color || getColorFromValue(props.value);

  if (color === 'black') {
    return (<div>{text}</div>);
  }

  const icon = color === 'green' ? 'level up' : 'level down';

  return (
    <div>
      <Icon color={color} name={icon} />{text}
    </div>
  );
};

NumberArrow.propTypes = {
  value: PropTypes.string,
  text: PropTypes.string,
};

export default NumberArrow;
