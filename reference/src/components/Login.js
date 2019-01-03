import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import * as appActions from '../actions/appActions';
import { Grid, Form, Button, Message, Icon, Modal } from 'semantic-ui-react';


class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.searchText = '';
  }

  login() {
    if (this.props.privateKey) {
      this.props.actions.anonymousLogin(this.props.privateKey);
    } else {
      this.props.actions.login(this.props.email, this.props.password);
    }
  }

  forgotPassword() {
    this.props.actions.loginClose();
    this.props.actions.openModal('forgotPassword');
  }

  signup() {
    this.props.actions.loginClose();
    this.props.actions.signupOpen();
  }

  cancel() {
    this.props.actions.loginClose();
  }

  open() {
    this.props.actions.loginOpen();
  }

  updateLoginProps(ev, data) {
    this.props.actions.loginPropUpdated(data.name, data.value);
  }

  formatList(list = [], result = []) {
    return result.map((item) => {
      item.alreadyAdded = !!list.find(i => i.masternode._id === item._id);

      return item;
    });
  }

  render() {
    return (
      <Modal size="small" open={this.props.loginOpened} trigger={<Button color="green" onClick={this.open.bind(this)} style={{ marginRight: '8px' }}>Login</Button>}>
        <Modal.Header style={{ backgroundColor: '#00897B', color: '#FFFFFF' }}>
          <Icon name="key" style={{ marginRight: '8px' }} />
          Login
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description />

          <Form loading={this.props.loginLoading} onSubmit={this.login.bind(this)}>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column width={7} verticalAlign="bottom">
                  <Form.Input
                    type="email"
                    name="email"
                    onChange={this.updateLoginProps.bind(this)}
                    value={this.props.email}
                    label="E-mail"
                    placeholder=""
                  />
                  <Form.Input
                    type="password"
                    name="password"
                    onChange={this.updateLoginProps.bind(this)}
                    value={this.props.password}
                    label="Password"
                    placeholder=""
                  />
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                        <a onClick={this.forgotPassword.bind(this)} className="login-button">Forgot Password</a>
                      </Grid.Column>

                      <Grid.Column textAlign="right" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                        <a onClick={this.signup.bind(this)} className="login-button">Signup</a>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="middle" width={1}>
                  Or
                </Grid.Column>
                <Grid.Column width={8}>
                  <Message
                    icon="spy"
                    header="Anonymous Login"
                  />

                  <Form.Input
                    type="text"
                    name="privateKey"
                    onChange={this.updateLoginProps.bind(this)}
                    value={this.props.privateKey}
                    label="Key"
                    placeholder=""
                  />
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column verticalAlign="middle">
                {this.props.loginError &&
                  <Message
                    negative
                    size="mini"
                    icon="remove circle"
                    header={this.props.loginError.message}
                  />
                }
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="right">
                <Button onClick={this.cancel.bind(this)}>
                  Cancel
                </Button>
                <Button
                  style={{ marginLeft: '8px' }}
                  type="submit"
                  color="green"
                  disabled={this.props.loginLoading || (!this.props.privateKey && (!this.props.email || !this.props.password))}
                  loading={this.props.loginLoading}
                  onClick={this.login.bind(this)}
                >
                  Login
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    privateKey: state.auth.login.privateKey,
    password: state.auth.login.password,
    email: state.auth.login.email,
    loginLoading: state.auth.login.loading,
    loginError: state.auth.login.loginError,
    loginFulfilled: state.auth.login.loginFulfilled,
    loginOpened: state.auth.login.loginOpened,
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
)(Login);
