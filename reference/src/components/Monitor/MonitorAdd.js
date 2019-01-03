import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as monitorActions from '../../actions/monitorActions';
import { Grid, Table, Checkbox, Form, Button, Message, Icon, Image, Modal } from 'semantic-ui-react';
import Moment from 'react-moment';
import CoinImage from '../../common/CoinImage';


class MonitorAdd extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.searchText = '';
  }

  selectMonitor(masternode) {
    if (masternode._id) {
      this.props.actions.selectMonitor(masternode._id, this.props.monitorAddSelectedList);
    }
  }

  selectAllMonitors(checked) {
    if (!checked) {
      this.props.actions.selectAllMonitors(this.props.masternodeSearchResult, this.props.monitorAddSelectedList);
    } else {
      this.props.actions.deselectAllMonitors();
    }
  }

  addMonitors() {
    this.props.actions.addMonitors(this.props.monitorAddSelectedList);
  }

  cancel() {
    this.props.actions.addMonitorClose();
  }

  open() {
    this.props.actions.addMonitorOpen();
  }

  searchMasternodes() {
    this.props.actions.searchMasternodes(this.props.masternodeSearchText);
  }

  formatList(list = [], result = []) {
    return result.map((item) => {
      item.alreadyAdded = !!list.find(i => i.masternode._id === item._id);

      return item;
    });
  }

  updateSearchText(ev, data) {
    this.props.actions.propChanged(data.name, data.value);
  }

  render() {
    const list = this.formatList(this.props.list, this.props.masternodeSearchResult);
    const allChecked = this.props.monitorAddSelectedList.length === this.props.masternodeSearchResult.length;

    return (
      <Modal size="large" open={this.props.monitorAddOpened} trigger={<Button color="green" onClick={this.open.bind(this)}><Icon name="plus" /> Add</Button>}>
        <Modal.Header style={{ backgroundColor: '#00897B', color: '#FFFFFF' }}>Add Masternode</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Form loading={this.props.masternodeSearchLoading}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={6}>
                    <Form.Input
                      name="masternodeSearchText"
                      onChange={this.updateSearchText.bind(this)}
                      value={this.props.masternodeSearchText}
                      label="Search (Wallet Address, IP or Output tx)"
                      placeholder=""
                    />
                  </Grid.Column>
                  <Grid.Column verticalAlign={'bottom'} className="u-auto-grow">
                    <Button onClick={this.searchMasternodes.bind(this)}>
                      Search
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
            {this.props.masternodeSearchResultNotFound &&
              <Message
                icon="info"
                header="We didn't find any masternodes."
                content="If you just created the masternode maybe is not propagated in the network yet."
              />
            || !list.length &&
              <Message
                icon="info"
                header="We will scan the blockchain of each coin to find your node."
                content="Note that we can only find masternodes that are on our masternodes page."
              />
            ||
              <Table celled fixed singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell verticalAlign={'middle'} style={{ width: '216px' }}>Masternode Coin</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Status</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>IP</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Wallet</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Last Seen</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '64px' }} />
                  </Table.Row>
                </Table.Header>


                <Table.Body>
                  {list.map(item =>
                    (<Table.Row key={item._id}>
                      <Table.Cell verticalAlign={'middle'} style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                        <Grid verticalAlign={'middle'}>
                          <Grid.Row columns={'2'}>
                            <Grid.Column width={4}>
                              <CoinImage coin={item.coin} />
                            </Grid.Column>
                            <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }}>
                              {item.coin.label} ({item.coin.code.toUpperCase()})
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Table.Cell>
                      <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                        {item.status}
                      </Table.Cell>
                      <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                        {item.ip}:{item.port}
                      </Table.Cell>
                      <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                        {item.payee}
                      </Table.Cell>
                      <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                        <Moment unix fromNow>{item.lastseen}</Moment>
                      </Table.Cell>
                      <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                        {item.alreadyAdded &&
                        <div style={{ color: 'green' }}>Added</div>
                        ||
                        <Checkbox checked={item.checked} onChange={this.selectMonitor.bind(this, item)} />
                        }
                      </Table.Cell>
                    </Table.Row>),
                  )}

                </Table.Body>
              </Table>
            }
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.cancel.bind(this)}>
            Cancel
          </Button>
          <Button
            color="green"
            disabled={this.props.monitorAddLoading || !this.props.monitorAddSelectedList.length}
            loading={this.props.monitorAddLoading}
            onClick={this.addMonitors.bind(this)}
          >
            <Icon name="plus" /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.monitor.list,
    masternodeSearchText: state.monitor.masternodeSearchText,
    masternodeSearchResult: state.monitor.masternodeSearchResult,
    masternodeSearchResultNotFound: state.monitor.masternodeSearchResultNotFound,
    masternodeSearchLoading: state.monitor.masternodeSearchLoading,
    monitorAddLoading: state.monitor.monitorAddLoading,
    monitorAddOpened: state.monitor.monitorAddOpened,
    monitorAddSelectedList: state.monitor.monitorAddSelectedList,
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
)(MonitorAdd);
