import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import { Container, Message, Loader, Form, Grid, Button } from 'semantic-ui-react';

class RenewPasswordPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.checkRenewPassword(this.props.params.hash);
  }

  renewPassword() {
    this.props.actions.renewPassword(this.props.password, this.props.email, this.props.params.hash);
  }

  updateRenewPasswordProps(ev, data) {
    this.props.actions.renewPasswordPropUpdated(data.name, data.value);
  }

  render() {
    return (
      <Container fluid style={{ paddingRight: '16px', paddingBottom: '16px' }}>

        {this.props.checkRenewPasswordLoading &&
          <div>
            <Loader content="Loading" />
          </div>
        || this.props.checkRenewPasswordRejected &&
          <Message
            negative
            icon="remove circle"
            header="Something wrong with your link"
            content="Your link is not valid or the user has already changed the password."
          />
        || this.props.checkRenewPasswordError &&
        <Message
          negative
          icon="remove circle"
          header="Invalid request"
          content={this.props.checkRenewPasswordError.message}
        />
        || this.props.renewPasswordFulfilled &&
        <Message
          success
          icon="checkmark"
          header="Password changed"
          content="Click on login and use your new password."
        />
        ||
        <Form loading={this.props.renewPasswordLoading}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column width={6} verticalAlign="bottom">
                <Form.Input
                  type="password"
                  name="password"
                  maxLength="50"
                  onChange={this.updateRenewPasswordProps.bind(this)}
                  value={this.props.password}
                  label="New Password"
                  placeholder=""
                />
                <Form.Input
                  type="password"
                  name="passwordConfirmation"
                  maxLength="50"
                  onChange={this.updateRenewPasswordProps.bind(this)}
                  value={this.props.passwordConfirmation}
                  label="Confirm Password"
                  placeholder=""
                />
                {this.props.renewPasswordError &&
                <div>
                  <Message
                    negative
                    icon="remove circle"
                    header="Invalid request"
                    content={this.props.renewPasswordError.message}
                  />
                </div>
                }
                <Grid style={{ marginTop: '8px' }}>
                  <Grid.Row textAlign="right">
                    <Grid.Column>
                      <Button
                        color="green"
                        style={{ marginLeft: '8px' }}
                        disabled={this.props.renewPasswordLoading || !this.props.password || !this.props.passwordConfirmation || this.props.password !== this.props.passwordConfirmation}
                        loading={this.props.renewPasswordLoading}
                        onClick={this.renewPassword.bind(this)}
                      >
                        Submit
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        }
      </Container>

    );
  }
}

function mapStateToProps(state) {
  return {
    password: state.auth.renewPassword.password,
    email: state.auth.renewPassword.email,
    passwordConfirmation: state.auth.renewPassword.passwordConfirmation,
    checkRenewPasswordLoading: state.auth.renewPassword.checkRenewPasswordLoading,
    checkRenewPasswordRejected: state.auth.renewPassword.checkRenewPasswordRejected,
    checkRenewPasswordError: state.auth.renewPassword.checkRenewPasswordError,
    renewPasswordLoading: state.auth.renewPassword.renewPasswordLoading,
    renewPasswordFulfilled: state.auth.renewPassword.renewPasswordFulfilled,
    renewPasswordError: state.auth.renewPassword.renewPasswordError,
    renewPasswordRejected: state.auth.renewPassword.renewPasswordRejected,
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
)(RenewPasswordPage);
