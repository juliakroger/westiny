import React from 'react';
import PropTypes from 'prop-types';
import { Message, Button } from 'semantic-ui-react';

const ModalServerError = props => (
  <div>
    <Message
      icon="configure"
      header="Server Error"
      content={props.msg || 'There was a problem processing your request, please try again.'}
    />
    <div style={{ textAlign: 'right' }}>
      <Button style={{ marginTop: '16px' }} onClick={props.onClick}>
          Close
      </Button>
    </div>
  </div>
);

ModalServerError.propTypes = {
  onClick: PropTypes.func,
  msg: PropTypes.string,
};

export default ModalServerError;
