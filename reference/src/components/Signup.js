import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import { isPasswordWeak, isEmailInvalid } from '../utils/validation';
import { Grid, Form, Button, Message, Icon, Modal, Input } from 'semantic-ui-react';
import ModalServerError from '../common/ModalServerError';

class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.searchText = '';
  }

  anonymousSignup() {
    this.props.actions.anonymousSignup(this.props.email, this.props.password);
  }

  signup() {
    this.props.actions.signup(this.props.email, this.props.password, this.props.name);
  }

  finish() {
    this.props.actions.privateKeyFinished();
  }

  cancel() {
    this.props.actions.signupClose();
  }

  open() {
    this.props.actions.signupOpen();
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

  copyToClipboard() {
    const copyTextarea = document.querySelector('#clipboard-text');
    copyTextarea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';

      this.props.actions.copiedToClipboard();
    } catch (err) {
      console.log(err);
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
    // const isValid = this.validateForm(this.props.email, this.props.password, this.props.passwordConfirmation)
    return (
      <Modal size="small" open={this.props.signupOpened} trigger={<Button color="blue" onClick={this.open.bind(this)} style={{ marginRight: '8px' }}>Signup</Button>}>
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
            ||
            <div>
              <Message
                icon="key"
                header="Private Key"
                content="With this key you will be able to login in other devices."
              />
              <Grid style={{ marginTop: '12px' }}>
                <Grid.Row>
                  <Grid.Column>
                    <Input
                      icon="clipboard"
                      id="clipboard-text"
                      iconPosition="left"
                      name="privateKey"
                      style={{ width: '344px' }}
                      value={this.props.user.privateKey}
                      readOnly
                      maxLength="50"
                    />
                    <Button onClick={this.copyToClipboard.bind(this)} color="blue" style={{ marginLeft: '8px' }}>
                      {this.props.privateKeyCopied ? 'Copied !' : 'Copy to clipboard'}
                    </Button>
                    { this.props.privateKeyCopied &&
                      <Button onClick={this.finish.bind(this)} color="green" style={{ marginLeft: '8px' }}>
                        Ok
                      </Button>
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </div>
            }
          </div>
          ||
          <Form loading={this.props.signupLoading || this.props.privateKeyLoading} onSubmit={this.handleSubmit}>
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
                  Or
                </Grid.Column>
                <Grid.Column width={8}>
                  <Message
                    style={{ marginTop: '20px' }}
                    icon="spy"
                    header="Anonymous Signup"
                    content="You won't be able to receive alerts on your e-mail, but you can still monitor your masternodes."
                  />
                  <Grid style={{ marginTop: '8px' }}>
                    <Grid.Row textAlign="center">
                      <Grid.Column>
                        <Button
                          color="blue"
                          type="button"
                          disabled={this.props.privateKeyLoading}
                          onClick={this.generatePrivateKey.bind(this)}
                        >
                          <Icon name="key" />
                          Generate Private Key
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  {this.props.signupError &&
                    <div>
                      <Message
                        negative
                        style={{ marginTop: '64px' }}
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
    password: state.auth.signup.password,
    passwordConfirmation: state.auth.signup.passwordConfirmation,
    email: state.auth.signup.email,
    name: state.auth.signup.name,
    privateKeyLoading: state.auth.signup.privateKeyLoading,
    signupLoading: state.auth.signup.signupLoading,
    signupOpened: state.auth.signup.signupOpened,
    signupFulfilled: state.auth.signup.signupFulfilled,
    signupRejected: state.auth.signup.signupRejected,
    signupError: state.auth.signup.signupError,
    sendEmailFulfilled: state.auth.signup.sendEmailFulfilled,
    sendEmailError: state.auth.signup.sendEmailError,
    privateKeyCopied: state.auth.signup.privateKeyCopied,
    user: state.auth.user,
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
)(Signup);
