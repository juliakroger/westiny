import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as monitorActions from '../../actions/monitorActions';
import { Message, Button, Icon, Modal } from 'semantic-ui-react';


class MonitorInfo extends React.Component {
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
      <Modal open={this.props.MonitorInfoOpened} trigger={<Icon color="blue" className="actions-icon" style={{ paddingTop: '2px', marginRight: '18px' }} size="large" onClick={this.open.bind(this)} name="external" />}>
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
            disabled={this.props.MonitorInfoLoading}
            loading={this.props.MonitorInfoLoading}
          >
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

MonitorInfo.propTypes = {
  monitor: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, monitorActions), dispatch),
  };
}

function mapStateToProps(state) {
  return {
    MonitorInfoOpened: state.monitor.MonitorInfoOpened,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonitorInfo);
