import React from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';

const MasternodeStatus = (props) => {
  const getColorFromValue = (value) => {
    if (value === 'ENABLED') {
      return 'green';
    } else if (value === 'PRE_ENABLED') {
      return 'olive';
    } else if (value === 'WATCHDOG_EXPIRED') {
      return 'yellow';
    }

    return 'red';
  };

  const color = getColorFromValue(props.status);
  const size = props.size || 'large';

  return (
    <Icon size={size} color={color} name="bullseye" />

  );
};

MasternodeStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default MasternodeStatus;
