import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import { Container, Message, Loader } from 'semantic-ui-react';

class LoginExternalPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.logout();
    this.props.actions.externalLogin(this.props.params.hash);
  }

  render() {
    return (
      <Container fluid style={{ paddingRight: '16px', paddingBottom: '16px' }}>

        {this.props.externalLoginLoading &&
          <div>
            <Loader content="Loading" />
          </div>
        || this.props.externalLoginRejected &&
          <Message
            negative
            icon="remove circle"
            header="Something wrong with your link"
            content="Your token is not valid or the user is inactive."
          />
        ||
          <Message
            success
            icon="checkmark"
            header="Logged in"
            content="You got logged in from an external source."
          />
        }
      </Container>

    );
  }
}

function mapStateToProps(state) {
  return {
    externalLoginLoading: state.auth.external.externalLoginLoading,
    externalLoginRejected: state.auth.external.externalLoginRejected,
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
)(LoginExternalPage);
