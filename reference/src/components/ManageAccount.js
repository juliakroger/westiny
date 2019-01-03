import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import * as appActions from '../actions/appActions';
import { isPasswordWeak, isEmailInvalid } from '../utils/validation';
import { Grid, Form, Button, Message, Icon, Modal, Input } from 'semantic-ui-react';
import ModalServerError from '../common/ModalServerError';

class ManageAccount extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.searchText = '';
  }

  signup() {
    this.props.actions.signup(this.props.email, this.props.password, this.props.name, this.props.user.privateKey);
  }

  cancel() {
    this.props.actions.closeModal('manageAccount');
  }

  updateSignupProps(ev, data) {
    this.props.actions.signupPropUpdated(data.name, data.value);
  }

  generatePrivateKey() {
    this.props.actions.generatePrivateKey();
  }

  validateForm(email, password, passwordConfirmation) {
    const errors = {};

    if (!email || !password || !passwordConfirmation) {
      return false;
    }
    if (isEmailInvalid(email)) {
      errors.email = 'Invalid e-mail';
      return false;
    }
    if (password.length < 8) {
      errors.password = 'Minimum number of characters: 8';
      return false;
    }
    if (isPasswordWeak(password)) {
      errors.password = 'Password too weak, please use letters and numbers';
      return false;
    }
    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords doesn\'t match';
      return false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const isValid = this.validateForm(this.props.email, this.props.password, this.props.passwordConfirmation);

    if (isValid) {
      this.signup();
    }
  }

  render() {
    return (
      <Modal size="small" open={this.props.opened}>
        <Modal.Header style={{ backgroundColor: '#1565C0', color: '#FFFFFF' }}>
          <Icon name="signup" style={{ marginRight: '8px' }} />
          Signup
        </Modal.Header>
        <Modal.Content scrolling>
          {this.props.signupRejected &&
          <ModalServerError onClick={this.cancel.bind(this)} />
          || this.props.signupFulfilled &&

          <div>
            {this.props.sendEmailFulfilled &&
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
            }
          </div>
          ||
          <Form loading={this.props.signupLoading} onSubmit={this.handleSubmit}>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column width={7} verticalAlign="bottom">
                  <Form.Input
                    name="name"
                    onChange={this.updateSignupProps.bind(this)}
                    value={this.props.name}
                    label="Name"
                    maxLength="50"
                    placeholder=""
                  />
                  <Form.Input
                    type="email"
                    name="email"
                    maxLength="50"
                    onChange={this.updateSignupProps.bind(this)}
                    value={this.props.email}
                    label="E-mail"
                    placeholder=""
                  />
                  <Form.Input
                    type="password"
                    name="password"
                    maxLength="50"
                    onChange={this.updateSignupProps.bind(this)}
                    value={this.props.password}
                    label="Password"
                    placeholder=""
                  />
                  <Form.Input
                    type="password"
                    name="passwordConfirmation"
                    maxLength="50"
                    onChange={this.updateSignupProps.bind(this)}
                    value={this.props.passwordConfirmation}
                    label="Confirm Password"
                    placeholder=""
                  />
                  <Grid style={{ marginTop: '8px' }}>
                    <Grid.Row textAlign="right">
                      <Grid.Column>
                        <Button type="button" onClick={this.cancel.bind(this)}>
                          Cancel
                        </Button>
                        <Button
                          color="green"
                          type="submit"
                          style={{ marginLeft: '8px' }}
                          disabled={this.props.signupLoading || !this.props.email || !this.props.password || this.props.password !== this.props.passwordConfirmation}
                          loading={this.props.signupLoading}
                          onClick={this.signup.bind(this)}
                        >
                          Signup
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="middle" width={1}>
                  &nbsp;
                </Grid.Column>
                <Grid.Column width={8}>
                  <Message
                    icon="spy"
                    header="You won't be anonymous anymore"
                    content="After submitting this form we will convert you to a normal user."
                  />

                  <Message
                    style={{ marginTop: '16px' }}
                    icon="child"
                    header="Relax"
                    content="We will keep all your monitoring stuff and you will be able to receive alerts in your email."
                  />

                  {this.props.signupError &&
                    <div>
                      <Message
                        negative
                        style={{ marginTop: '16px' }}
                        icon="remove circle"
                        header="Invalid request"
                        content={this.props.signupError.message}
                      />
                    </div>
                  }

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
    opened: state.app.modals.manageAccount.opened,
    password: state.auth.signup.password,
    passwordConfirmation: state.auth.signup.passwordConfirmation,
    email: state.auth.signup.email,
    name: state.auth.signup.name,
    signupLoading: state.auth.signup.signupLoading,
    signupFulfilled: state.auth.signup.signupFulfilled,
    signupRejected: state.auth.signup.signupRejected,
    signupError: state.auth.signup.signupError,
    sendEmailFulfilled: state.auth.signup.sendEmailFulfilled,
    sendEmailError: state.auth.signup.sendEmailError,
    user: state.auth.user,
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
)(ManageAccount);
