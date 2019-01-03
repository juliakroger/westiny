import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import * as appActions from '../actions/appActions';

import { Form, Grid, Input, Button, Message, Icon, Modal } from 'semantic-ui-react';

class ChangePassword extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  cancel() {
    this.props.actions.closeModal('changePassword');
  }

  renewPassword() {
    this.props.actions.changePassword(this.props.oldPassword, this.props.newPassword);
  }

  updateRenewPasswordProps(ev, data) {
    this.props.actions.renewPasswordPropUpdated(data.name, data.value);
  }

  render() {
    return (
      <Modal onClose={this.cancel.bind(this)} size="mini" open={this.props.opened}>
        <Modal.Header style={{ backgroundColor: '#00897B', color: '#FFFFFF' }}>
          <Icon name="signup" style={{ marginRight: '8px' }} />
          Change Password
        </Modal.Header>
        <Modal.Content scrolling>

          {this.props.renewPasswordFulfilled &&
          <div>
            <Message
              success
              icon="checkmark"
              header="Password changed"
              content="Your password has been changed."
            />
            <Grid style={{ marginTop: '8px' }}>
              <Grid.Row textAlign="right">
                <Grid.Column>
                  <Button type="button" onClick={this.cancel.bind(this)}>
                  Ok
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ||
        <Form loading={this.props.renewPasswordLoading}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column verticalAlign="bottom">
                <Form.Input
                  type="password"
                  name="oldPassword"
                  maxLength="50"
                  onChange={this.updateRenewPasswordProps.bind(this)}
                  value={this.props.oldPassword}
                  label="Current Password"
                  placeholder=""
                />
                <Form.Input
                  type="password"
                  name="newPassword"
                  maxLength="50"
                  onChange={this.updateRenewPasswordProps.bind(this)}
                  value={this.props.newPassword}
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
                      <Button type="button" onClick={this.cancel.bind(this)}>
                        Cancel
                      </Button>
                      <Button
                        color="green"
                        style={{ marginLeft: '8px' }}
                        disabled={this.props.renewPasswordLoading || !this.props.oldPassword || !this.props.newPassword || !this.props.passwordConfirmation || this.props.newPassword !== this.props.passwordConfirmation}
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
        </Modal.Content>
      </Modal>

    );
  }
}

function mapStateToProps(state) {
  return {
    oldPassword: state.auth.renewPassword.oldPassword,
    newPassword: state.auth.renewPassword.newPassword,
    passwordConfirmation: state.auth.renewPassword.passwordConfirmation,
    renewPasswordLoading: state.auth.renewPassword.renewPasswordLoading,
    renewPasswordFulfilled: state.auth.renewPassword.renewPasswordFulfilled,
    renewPasswordError: state.auth.renewPassword.renewPasswordError,
    renewPasswordRejected: state.auth.renewPassword.renewPasswordRejected,
    opened: state.app.modals.changePassword.opened,
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
)(ChangePassword);
