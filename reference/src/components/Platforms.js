import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';
import { Grid, Form, Button, Message, Icon, Modal } from 'semantic-ui-react';


class Platforms extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  cancel() {
    this.props.actions.closeModal('platforms');
  }

  render() {
    return (
      <Modal onClose={this.cancel.bind(this)} size="small" open={this.props.opened}>
        <Modal.Header style={{ backgroundColor: '#00897B', color: '#FFFFFF' }}>
          <Icon size="big" name="mobile" style={{ marginRight: '8px' }} />
          Upcoming Apps
        </Modal.Header>
        <Modal.Content scrolling>
          <Message
            icon="calendar"
            header="Android and IOS"
            content="Q1 of 2019"
          />
        </Modal.Content>
        <Modal.Actions>
          <Grid>
            <Grid.Row>
              <Grid.Column verticalAlign="middle" textAlign="right">
                <Button onClick={this.cancel.bind(this)}>
                  Close
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
    opened: state.app.modals.platforms.opened,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, appActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Platforms);
