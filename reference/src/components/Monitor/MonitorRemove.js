import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as monitorActions from '../../actions/monitorActions';
import { Message, Button, Icon, Modal } from 'semantic-ui-react';


class MonitorRemove extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  remove() {
    this.props.actions.removeMonitor(this.props.monitor._id);
  }

  cancel() {
    this.props.actions.removeMonitorClose();
  }

  open() {
    this.props.actions.removeMonitorOpen();
  }

  render() {
    return (
      <Modal size="small" open={this.props.monitorRemoveOpened}>
        <Modal.Header style={{ backgroundColor: '#CE1D23', color: '#FFFFFF' }}>Delete Masternode</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Message
              icon="delete"
              header="Are you sure you want to delete this masternode from your list?"
              content="All the alerts related to it will be lost."
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={this.cancel.bind(this)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={this.remove.bind(this)}
            disabled={this.props.monitorRemoveLoading}
            loading={this.props.monitorRemoveLoading}
          >
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

MonitorRemove.propTypes = {
  monitor: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, monitorActions), dispatch),
  };
}

function mapStateToProps(state) {
  return {
    monitorRemoveOpened: state.monitor.monitorRemoveOpened,
    monitor: state.monitor.monitorRemoveItem,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonitorRemove);
