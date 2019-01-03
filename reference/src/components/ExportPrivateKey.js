import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';
import { Grid, Input, Button, Message, Icon, Modal } from 'semantic-ui-react';


class ExportPrivateKey extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  cancel() {
    this.props.actions.closeModal('exportPrivateKey');
  }

  finish() {
    this.cancel();
  }

  copyToClipboard() {
    const copyTextarea = document.querySelector('#clipboard-text');
    copyTextarea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';

      this.props.actions.copiedToClipboard();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (!this.props.user) {
      return (<div />);
    }

    return (
      <Modal onClose={this.cancel.bind(this)} size="small" open={this.props.opened}>
        <Modal.Header style={{ backgroundColor: '#00897B', color: '#FFFFFF' }}>
          <Icon size="big" name="spy" style={{ marginRight: '8px' }} />
          Private Key
        </Modal.Header>
        <Modal.Content scrolling>
          <Message
            icon="key"
            header="Private Key"
            content="Save your key to be able to login in other devices."
          />
          <Grid style={{ marginTop: '12px' }}>
            <Grid.Row>
              <Grid.Column>
                <Input
                  icon="clipboard"
                  id="clipboard-text"
                  iconPosition="left"
                  name="privateKey"
                  style={{ width: '344px' }}
                  value={this.props.user.privateKey}
                  readOnly
                  maxLength="50"
                />
                <Button onClick={this.copyToClipboard.bind(this)} color="blue" style={{ marginLeft: '8px' }}>
                  {this.props.privateKeyCopied ? 'Copied !' : 'Copy to clipboard'}
                </Button>
                { this.props.privateKeyCopied &&
                <Button onClick={this.finish.bind(this)} color="green" style={{ marginLeft: '8px' }}>
                  Ok
                </Button>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
    opened: state.app.modals.exportPrivateKey.opened,
    privateKeyCopied: state.app.privateKeyCopied,
    user: state.auth.user,
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
)(ExportPrivateKey);
