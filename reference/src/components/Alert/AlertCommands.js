import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as alertActions from '../../actions/alertActions';
import { Button } from 'semantic-ui-react';


class AlertCommands extends React.Component {
  toggleAlert() {
    this.props.actions.toggleAlert(this.props.item, this.props.index);
  }

  render() {
    return (
      <div>
        {this.props.item.status === 'ACTIVE' &&
          <Button color="red" loading={this.props.item.loading} onClick={this.toggleAlert.bind(this)}>
            Turn Off
          </Button>
        ||
          <Button color="green" loading={this.props.item.loading} onClick={this.toggleAlert.bind(this)}>
            Turn On
          </Button>
        }
      </div>
    );
  }
}

function mapStateToProps() {
  return {

  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, alertActions), dispatch),
  };
}

AlertCommands.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertCommands);
