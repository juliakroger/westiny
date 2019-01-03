import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as alertActions from '../../actions/alertActions';
import { Dropdown, Grid, Icon, Button, Card, Image } from 'semantic-ui-react';
import AlertAdd from './AlertAdd';


class AlertToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  searchMasternodes() {
    this.props.actions.loadAlert();
  }

  formatList(list) {
    return list.map((item) => {
      item.nodeWorth = item.requiredAlerts * item.price;

      return item;
    });
  }

  componentDidMount() {
    // this.loadAlert();
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

    const list = this.formatList(this.props.alert.list);

    return (
      <Grid>
        <Grid.Row verticalAlign="middle" columns={4}>
          <Grid.Column width={8} />
          <Grid.Column width={8} textAlign="right">
            <AlertAdd />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

AlertToolbar.defaultProps = {
  alert: {
    list: [],
  },
};

AlertToolbar.propTypes = {
  alert: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    alert: state.alert,
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
)(AlertToolbar);
