import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as monitorActions from '../../actions/monitorActions';
import { Dropdown, Grid, Icon, Button, Card, Image } from 'semantic-ui-react';
import MonitorAdd from './MonitorAdd';


class MonitorToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  searchMasternodes() {
    this.props.actions.loadMonitor();
  }

  formatList(list) {
    return list.map((item) => {
      item.nodeWorth = item.requiredMonitors * item.price;

      return item;
    });
  }

  onRefresh() {
    this.props.onRefresh();
  }

  componentDidMount() {
    // this.loadMonitor();
  }

  render() {
    const orderByOptions = [
      {
        text: 'Profit',
        value: 'profit',
      },
      {
        text: 'Loss',
        value: 'loss',
      },
      {
        text: 'Date',
        value: 'date',
      },
      {
        text: 'Value',
        value: 'value',
      },
      {
        text: 'Favorites',
        value: 'favorites',
      },
    ];

    const onViewModeChange = () => {};

    const list = this.formatList(this.props.monitor.list);

    return (
      <Grid style={{ marginBottom: '8px' }}>
        <Grid.Row verticalAlign="middle" columns={4}>
          <Grid.Column width={8} />
          <Grid.Column width={8} textAlign="right">
            <Button disabled={this.props.refreshing} loading={this.props.refreshing} onClick={this.onRefresh.bind(this)} icon primary><Icon name="refresh" /></Button>
            <MonitorAdd />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

MonitorToolbar.defaultProps = {
  monitor: {
    list: [],
  },
};

MonitorToolbar.propTypes = {
  monitor: PropTypes.object.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    monitor: state.monitor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, monitorActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonitorToolbar);
