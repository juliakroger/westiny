import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import { Container, Message, Loader } from 'semantic-ui-react';

class CheckEmailPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.checkEmail(this.props.params.hash);
  }

  render() {
    return (
      <Container fluid style={{ paddingRight: '16px', paddingBottom: '16px' }}>

        {this.props.checkEmailLoading &&
          <div>
            <Loader content="Loading" />
          </div>
        || this.props.checkEmailRejected &&
          <Message
            negative
            icon="remove circle"
            header="Something wrong with your link"
            content="Your link is not valid or the user has already been activated."
          />
        ||
          <Message
            success
            icon="checkmark"
            header="E-mail confirmed"
            content="Now you can log in and configure alerts for your masternodes and receive in your e-mail."
          />
        }
      </Container>

    );
  }
}

function mapStateToProps(state) {
  return {
    checkEmailLoading: state.auth.signup.checkEmailLoading,
    checkEmailFulfilled: state.auth.signup.checkEmailFulfilled,
    checkEmailRejected: state.auth.signup.checkEmailRejected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, authActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckEmailPage);
