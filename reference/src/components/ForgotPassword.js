import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import * as appActions from '../actions/appActions';
import { isEmailInvalid } from '../utils/validation';
import { Grid, Form, Button, Message, Icon, Modal, Input } from 'semantic-ui-react';
import ModalServerError from '../common/ModalServerError';

class ForgotPassword extends React.Component {
  updateForgotPasswordProps(ev, data) {
    this.props.actions.forgotPasswordPropUpdated(data.name, data.value);
  }

  forgotPassword() {
    this.props.actions.sendForgotPasswordEmail(this.props.email);
  }

  finish() {
    this.props.actions.clearForgetPassword();
    this.props.actions.forgotPasswordFinished();
  }

  cancel() {
    this.props.actions.clearForgetPassword();
    this.props.actions.closeModal('forgotPassword');
  }

  validateForm(email) {
    const errors = {};

    if (!email) {
      return false;
    }
    if (isEmailInvalid(email)) {
      errors.email = 'Invalid e-mail';
      return false;
    }

    return true;
  }

  render() {
    // const isValid = this.validateForm(this.props.email, this.props.password, this.props.passwordConfirmation)
    return (
      <Modal size="mini" open={this.props.forgotPasswordOpened}>
        <Modal.Header style={{ backgroundColor: '#1565C0', color: '#FFFFFF' }}>
          <Icon name="signup" style={{ marginRight: '8px' }} />
          Forgot Password
        </Modal.Header>
        <Modal.Content scrolling>
          {this.props.forgotPasswordRejected &&
          <ModalServerError onClick={this.cancel.bind(this)} />
          || this.props.forgotPasswordFulfilled &&
          <div>
            <Message
              success
              icon="mail outline"
              header="E-mail sent"
              content="A confirmation link has been sent to your e-mail, please check your inbox."
            />
            <Grid style={{ marginTop: '12px' }}>
              <Grid.Row>
                <Grid.Column textAlign="right">
                  <Button onClick={this.cancel.bind(this)} color="green">
                    Ok
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          ||
          <Form loading={this.props.forgotPasswordLoading}>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column verticalAlign="bottom">
                  <Form.Input
                    type="email"
                    name="email"
                    maxLength="50"
                    onChange={this.updateForgotPasswordProps.bind(this)}
                    value={this.props.email}
                    label="E-mail"
                    placeholder=""
                  />
                  {this.props.forgotPasswordError &&
                  <div>
                    <Message
                      negative
                      icon="remove circle"
                      header="Invalid request"
                      content={this.props.forgotPasswordError.message}
                    />
                  </div>
                  }
                  <Grid style={{ marginTop: '8px' }}>
                    <Grid.Row textAlign="right">
                      <Grid.Column>
                        <Button onClick={this.cancel.bind(this)}>
                          Cancel
                        </Button>
                        <Button
                          color="green"
                          style={{ marginLeft: '8px' }}
                          disabled={this.props.forgotPasswordLoading || !this.props.email}
                          loading={this.props.forgotPasswordLoading}
                          onClick={this.forgotPassword.bind(this)}
                        >
                          Send E-mail
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
          }
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    forgotPasswordOpened: state.app.modals.forgotPassword.opened,
    email: state.auth.forgotPassword.email,
    forgotPasswordLoading: state.auth.forgotPassword.forgotPasswordLoading,
    forgotPasswordFulfilled: state.auth.forgotPassword.forgotPasswordFulfilled,
    forgotPasswordRejected: state.auth.forgotPassword.forgotPasswordRejected,
    forgotPasswordError: state.auth.forgotPassword.forgotPasswordError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, authActions, appActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
