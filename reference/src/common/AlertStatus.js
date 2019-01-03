import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

const AlertStatus = (props) => {
  const color = props.status === 'ACTIVE' ? 'green' : 'red';

  return (
    <Label color={color} horizontal>{props.status}</Label>
  );
};

AlertStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default AlertStatus;
