import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as alertActions from '../actions/alertActions';

import { Container, Message, Loader } from 'semantic-ui-react';

// import {formatForDropdown} from '../utils/adapters';
import AlertList from '../components/Alert/AlertList';
import AlertSummary from '../components/Alert/AlertSummary';
import Signup from '../components/Signup';
import Login from '../components/Login';


class AlertPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  loadAlert() {
    this.props.actions.loadAlert();
  }

  formatList(list) {
    return list.map((item) => {
      if (item.requiredAlerts && item.price) {
        item.nodeWorth = item.requiredAlerts * item.price;
      }


      return item;
    });
  }

  componentDidMount() {
    this.loadAlert();
  }

  render() {
    const onViewModeChange = () => {};

    const list = this.formatList(this.props.alert.list);

    return (
      <Container fluid style={{ paddingRight: '8px', paddingBottom: '8px' }}>

        {this.props.isAuthenticated &&
          <Container fluid>
            {this.props.alert.loading &&
              <div className="loading-content">
                <Loader active content="Loading" />
              </div>
            || this.props.auth.user && this.props.auth.user.isAnonymous &&
              <Message
                icon="spy"
                header="Anonymous user"
                content="You need to register your e-mail to be able to receive alerts. You can do that be going to Manage Account on the top menu."
              />
            || !list.length &&
              <Message
                icon="desktop"
                header="There are no masternodes being alerted yet"
                content="Click on the Add button to add your first."
              />
            ||
              <AlertList list={list} />
            }
          </Container>
        ||
          <div>
            <Message
              negative
              icon="info circle"
              header="You need to log in to access this page"
              content="You can either choose to be anonymous or a normal user, if you choose to be anonymous you won't be able to receive alerts but you can still alert your masternodes."
            />
            <Signup />
            <Login />
          </div>
        }
      </Container>
    );
  }
}
// <AlertSummary onViewModeChange={onViewModeChange} alert={this.props.alert} />
// <AlertToolbar />

function mapStateToProps(state) {
  return {
    alert: state.alert,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, alertActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertPage);
