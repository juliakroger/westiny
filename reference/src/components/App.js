import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { Label, Grid, GridColumn, Dropdown, Dimmer, Loader, Container, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import * as appActions from '../actions/appActions';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ManageAccount from '../components/ManageAccount';
import ChangePassword from '../components/ChangePassword';
import Platforms from '../components/Platforms';
import ExportPrivateKey from '../components/ExportPrivateKey';
import ForgotPassword from '../components/ForgotPassword';

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.actions.loadAuth();
    }, 3000);
  }

  openModal(modalName) {
    this.props.actions.openModal(modalName);
  }

  render() {
    if (this.props.loading) {
      return (
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      );
    }

    return (
      <div style={{ width: '100%' }} className="u-auto-grow">
        <Grid padded style={{ width: '100%' }} className="u-auto-grow">
          <Grid.Row columns={2} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <div className="sidebar">
              <div>
                <Grid style={{ marginTop: '8px' }}>
                  <Grid.Row>
                    <Grid.Column style={{ color: '#BDBDBD' }} verticalAlign="middle" textAlign="center">
                      <Icon className="actions-icon" onClick={this.openModal.bind(this, 'platforms')} size="big" name="android" />
                      <Icon className="actions-icon" onClick={this.openModal.bind(this, 'platforms')} style={{ marginLeft: '12px' }} size="big" name="apple" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
              <IndexLink to="/masternodes" activeClassName="active-link">
                <Grid.Column className="sidebar__item" verticalAlign="middle" style={{ marginTop: '20px' }}>
                  <Grid.Row style={{ textAlign: 'center' }}>
                    <Icon className="sidebar__item__icon" size="big" name="server" />
                  </Grid.Row>
                  <Grid.Row style={{ textAlign: 'center', marginTop: '8px' }}>
                    <label className="sidebar__item__label">MASTERNODES</label>
                  </Grid.Row>
                </Grid.Column>
                <Icon size="large" name="caret left" className="active-link-arrow" />
              </IndexLink>

              <Link to="/monitoring" activeClassName="active-link">
                <Grid.Column className="sidebar__item" verticalAlign="middle">
                  <Grid.Row style={{ textAlign: 'center' }}>
                    <Icon className="sidebar__item__icon" size="big" name="desktop" />
                  </Grid.Row>
                  <Grid.Row style={{ textAlign: 'center', marginTop: '8px' }}>
                    <label className="sidebar__item__label">MONITORING</label>
                  </Grid.Row>
                </Grid.Column>
                <Icon size="large" name="caret left" className="active-link-arrow" />
              </Link>

              <Link to="/alerts" activeClassName="active-link">
                <Grid.Column className="sidebar__item" verticalAlign="middle">
                  <Grid.Row style={{ textAlign: 'center' }}>
                    <Icon className="sidebar__item__icon" size="big" name="alarm outline" />
                  </Grid.Row>
                  <Grid.Row style={{ textAlign: 'center', marginTop: '8px' }}>
                    <label className="sidebar__item__label">ALERTS</label>
                  </Grid.Row>
                </Grid.Column>
                <Icon size="large" name="caret left" className="active-link-arrow" />
              </Link>

              <Link to="/upcoming" activeClassName="active-link">
                <Grid.Column className="sidebar__item" verticalAlign="middle">
                  <Grid.Row style={{ textAlign: 'center' }}>
                    <Icon className="sidebar__item__icon" size="big" name="rocket" />
                  </Grid.Row>
                  <Grid.Row style={{ textAlign: 'center', marginTop: '8px' }}>
                    <label className="sidebar__item__label">UPCOMING</label>
                  </Grid.Row>
                </Grid.Column>
                <Icon size="large" name="caret left" className="active-link-arrow" />
              </Link>

              <Link to="/social" activeClassName="active-link" style={{ display: 'none' }}>
                <Grid.Column className="sidebar__item" verticalAlign="middle">
                  <Grid.Row style={{ textAlign: 'center' }}>
                    <Icon className="sidebar__item__icon" size="big" name="users" />
                  </Grid.Row>
                  <Grid.Row style={{ textAlign: 'center', marginTop: '8px' }}>
                    <label className="sidebar__item__label">SOCIAL</label>
                  </Grid.Row>
                </Grid.Column>
                <Icon size="large" name="caret left" className="active-link-arrow" />
              </Link>

              <Link to="/about" activeClassName="active-link">
                <Grid.Column className="sidebar__item" verticalAlign="middle">
                  <Grid.Row style={{ textAlign: 'center' }}>
                    <Icon className="sidebar__item__icon" size="big" name="mail outline" />
                  </Grid.Row>
                  <Grid.Row style={{ textAlign: 'center', marginTop: '8px' }}>
                    <label className="sidebar__item__label">CONTACT</label>
                  </Grid.Row>
                </Grid.Column>
                <Icon size="large" name="caret left" className="active-link-arrow" />
              </Link>
            </div>
            <Grid.Column style={{ paddingLeft: '0px', paddingRight: '0px', flexGrow: 1, overflowY: 'auto' }}>
              <Grid verticalAlign="top" padded style={{ margin: 0, flexDirection: 'column' }}>
                <Grid.Row verticalAlign="middle" columns={3} className="page-header u-no-wrap">
                  <Grid.Column verticalAlign="middle" style={{ paddingLeft: '0px', paddingRight: '0px', minWidth: '320px' }}>
                    <img style={{ marginTop: '8px', height: '28px', width: '236px' }} src="https://s3.amazonaws.com/nodemonitor-assets/images/logowhite.png" />
                  </Grid.Column>
                  <Grid.Column className="u-auto-grow" textAlign="right" verticalAlign="middle">
                    <Button.Group icon style={{ display: 'none', marginRight: '16px' }}>
                      <Button>
                        <Icon name="bitcoin" />
                      </Button>
                      <Button>
                        <Icon name="dollar" />
                      </Button>
                      <Button>
                        <Icon name="euro" />
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                  <Grid.Column width={4} className="w-256 toolbar-user" textAlign="right" verticalAlign="middle">
                    {this.props.isAuthenticated &&
                    <Grid style={{ marginRight: '-8px' }}>
                      <Grid.Row verticalAlign="middle">
                        <Grid.Column verticalAlign="middle">
                          {this.props.isAnonymous &&
                          <Icon style={{ marginRight: '8px', marginTop: '-2px' }} size="large" name="spy" />
                          ||
                          <Icon style={{ marginRight: '8px', marginTop: '-2px' }} size="large" name="user" />
                          }
                          <Dropdown item text="Account" className="user-menu-title">
                            <Dropdown.Menu size="large" className="user-menu">

                              {this.props.isAnonymous &&
                              <Menu.Item style={{ marginTop: '8px' }} name="account" onClick={this.openModal.bind(this, 'manageAccount')}>
                                <Icon name="settings" />
                                Manage Account
                              </Menu.Item>
                              }

                              {this.props.isAnonymous &&
                              <Menu.Item name="privateKey" onClick={this.openModal.bind(this, 'exportPrivateKey')}>
                                <Icon name="key" />
                                Export Private Key
                              </Menu.Item>
                              ||
                              <Menu.Item style={{ marginTop: '8px' }} name="account" onClick={this.openModal.bind(this, 'changePassword')}>
                                <Icon name="settings" />
                                Change Password
                              </Menu.Item>
                              }

                              <hr style={{ marginLeft: '4px', marginRight: '4px' }} />

                              <Menu.Item name="logout" onClick={this.props.actions.logout} style={{ marginBottom: '8px' }}>
                                <Icon name="sign out" />
                                Logout
                              </Menu.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    ||
                    <div>
                      <Login />
                      <Signup />
                    </div>
                    }
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="u-auto-grow" columns={1} style={{ paddingTop: '0px', paddingBottom: '0px', marginTop: '-1px' }}>
                  <Grid.Column className="u-auto-grow" verticalAlign="top" style={{ overflow: 'auto', paddingLeft: '16px', paddingTop: '16px', paddingBottom: '16px' }}>
                    {this.props.children}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>

          </Grid.Row>
        </Grid>

        <ChangePassword />
        <Platforms />
        <ExportPrivateKey />
        <ForgotPassword />
        <ManageAccount />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isAnonymous: state.auth.user.isAnonymous,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, authActions, appActions), dispatch),
  };
}


App.propTypes = {
  children: PropTypes.element,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
