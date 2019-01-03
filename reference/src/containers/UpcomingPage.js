import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as upcomingActions from '../actions/upcomingActions';
import { Container, Message, Loader, Dimmer } from 'semantic-ui-react';

import UpcomingList from '../components/Upcoming/UpcomingList';

class UpcomingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  loadUpcoming() {
    this.props.actions.loadUpcoming();
  }

  formatList(list) {
    return list.map(item =>

      // item.nodeWorth = item.requiredUpcomings * item.price

      item,
    );
  }

  componentDidMount() {
    this.loadUpcoming();
  }

  render() {
    const onViewModeChange = () => {};

    const list = this.formatList(this.props.upcoming.list);

    return (
      <Container fluid>
        {this.props.upcoming.loading &&
        <div className="loading-content">
          <Loader active content="Loading" />
        </div>
        || !list.length &&
          <Message
            icon="rocket"
            header="There are no upcoming coins"
            content="Everything we've got is on the masternodes page."
          />
        ||
          <UpcomingList list={list} />
        }
      </Container>
    );
  }
}
// <UpcomingSummary onViewModeChange={onViewModeChange} upcoming={this.props.upcoming} />
// <UpcomingToolbar />

UpcomingPage.defaultProps = {
  upcoming: {
    list: [],
  },
};

UpcomingPage.propTypes = {
  upcoming: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    upcoming: state.upcoming,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, upcomingActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpcomingPage);
