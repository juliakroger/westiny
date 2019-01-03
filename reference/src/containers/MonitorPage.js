import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as monitorActions from '../actions/monitorActions';
import NumberFormat from 'react-number-format';
import { Container, Message, Loader, Dimmer, Statistic, Grid, Breadcrumb } from 'semantic-ui-react';

// import {formatForDropdown} from '../utils/adapters';
import MonitorListGroupedDetailed from '../components/Monitor/MonitorListGroupedDetailed';
import MonitorToolbar from '../components/Monitor/MonitorToolbar';
import MonitorSummary from '../components/Monitor/MonitorSummary';
import MonitorAdd from '../components/Monitor/MonitorAdd';
import Signup from '../components/Signup';
import Login from '../components/Login';
import _ from 'underscore';
import MasternodeStatus from '../common/MasternodeStatus';
import Number from '../common/Number';
import NumberArrow from '../common/NumberArrow';


class MonitorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  loadMonitor() {
    this.props.actions.loadMonitor();
  }

  refreshMonitor() {
    this.props.actions.refreshMonitor();
  }

  onRemove(item) {
    this.props.actions.removeMonitorOpen(item);
  }

  formatList(list) {
    return list.filter(item => item !== null).map((item) => {
      if (item && item.coin && item.coin.requiredCoins && item.coin.price) {
        item.coin.nodeWorth = item.coin.requiredCoins * item.coin.price;
        item.coin.percentLocked = (item.coin.numActiveMasternodes * item.coin.requiredCoins * 100) / item.coin.availableSupply;
      }

      return item;
    });
  }

  groupList(list) {
    const groupsMap = list.reduce((map, item) => {
      const coin = item.coin;

      if (!map[coin.name]) {
        map[coin.name] = {
          online: 0,
          offline: 0,
          balance: 0,
          balanceUsd: 0,
          coin,
          name: coin.name,
          list: [],
          dailyEarnings: 0,
        };
      }

      const group = map[coin.name];

      if (item.masternode.status === 'ENABLED') {
        group.online++;
      } else {
        group.offline++;
      }

      if (item.masternode.balance) {
        group.balance += item.masternode.balance;
        group.balanceUsd += item.masternode.balance * coin.price;
      }

      if (item.masternode.portAvailable) {
        group.portAvailable++;
      }

      group.list.push(item);

      return map;
    }, {});

    return _.sortBy(Object.values(groupsMap), 'name');
  }

  getStats(list) {
    return list.reduce((stats, group) => {
      stats.portAvailable += group.portAvailable;
      stats.online += group.online;
      stats.offline += group.offline;
      stats.nodes += group.list.length;
      stats.balanceUsd += group.balanceUsd;

      if (group.coin.percentRoi && group.coin.requiredCoins) {
        const yearly = group.coin.percentRoi / 100 * group.coin.requiredCoins * group.coin.price * group.list.length;

        group.dailyEarnings = yearly / 365;
        group.weeklyEarnings = group.dailyEarnings * 7;
        group.monthlyEarnings = group.dailyEarnings * 30;
        group.yearlyEarnings = yearly;

        stats.dailyEarnings += group.dailyEarnings;
        stats.weeklyEarnings += group.weeklyEarnings;
        stats.monthlyEarnings += group.monthlyEarnings;
        stats.yearlyEarnings += group.yearlyEarnings;
      }

      return stats;
    }, {
      balanceUsd: 0,
      nodes: 0,
      online: 0,
      offline: 0,
      dailyEarnings: 0,
      weeklyEarnings: 0,
      monthlyEarnings: 0,
      yearlyEarnings: 0,
      portAvailable: 0,
    });
  }

  componentDidMount() {
    this.loadMonitor();
  }

  render() {
    const onViewModeChange = () => {};

    const list = this.formatList(this.props.monitor.list);

    const groupedList = this.groupList(list);
    const stats = this.getStats(groupedList);
    const visualization = 'GROUPED_DETAILED';

    return (
      <Container fluid>
        {this.props.isAuthenticated &&
          <Container fluid>
            {this.props.monitor.loading &&
              <div className="loading-content">
                <Loader active content="Loading" />
              </div>
            ||
              <div>
                <Grid style={{ margin: 0 }}>
                  <Grid.Row verticalAlign="middle" columns={2} style={{ paddingBottom: '0', paddingTop: '0' }}>
                    <Grid.Column width={10} style={{ paddingLeft: '0' }} />
                    <Grid.Column width={6} textAlign="right" style={{ paddingLeft: '0', paddingRight: '0' }} verticalAlign={'middle'}>
                      <MonitorToolbar
                        refreshing={this.props.monitor.monitorRefreshLoading || this.props.monitor.monitorUpdating}
                        onRefresh={this.refreshMonitor.bind(this)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <div style={{ fontSize: '20px', marginBottom: '1rem' }}>Summary</div>
                <Grid className="stats">
                  <Grid.Row verticalAlign="top" columns={6}>
                    <Grid.Column className="stats__item">
                      <div className="stats__item__label">Net Worth</div>
                      <div className="stats__item__value">
                        <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
                          <Grid.Row style={{ paddingBottom: '0', paddingTop: '0' }}>
                            <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }}>
                              <NumberFormat
                                value={stats.balanceUsd}
                                displayType={'text'}
                                decimalPrecision={2}
                                thousandSeparator
                                prefix={'$'}
                              />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row style={{ paddingBottom: '0', paddingTop: '4px', fontSize: '12px' }}>
                            <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }}>
                              <NumberArrow value={20} text={<Number value={stats.balanceUsd * 0.2} />} />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>
                    </Grid.Column>

                    <Grid.Column className="stats__item">
                      <div className="stats__item__label">Number of Nodes</div>
                      <div className="stats__item__value">
                        <Grid>
                          <Grid.Row columns={2}>
                            <Grid.Column>
                              <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
                                <Grid.Row columns={2} style={{ paddingBottom: '0', paddingTop: '0' }}>
                                  <Grid.Column width={4} verticalAlign={'middle'} style={{ paddingLeft: '0', paddingRight: '0' }}>
                                    <MasternodeStatus size="small" status={'ENABLED'} />
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }} verticalAlign={'middle'}>
                                    { stats.online }
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingBottom: '0', paddingTop: '4px', fontSize: '12px' }}>
                                  <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }}>
                                    Online Nodes
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Grid.Column>
                            <Grid.Column>
                              <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
                                <Grid.Row columns={2} style={{ paddingBottom: '0', paddingTop: '0' }}>
                                  <Grid.Column width={4} verticalAlign={'middle'} style={{ paddingLeft: '0', paddingRight: '0' }}>
                                    <MasternodeStatus size="small" status={'DISABLED'} />
                                  </Grid.Column>
                                  <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }} verticalAlign={'middle'}>
                                    { stats.offline }
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ paddingBottom: '0', paddingTop: '4px', fontSize: '12px' }}>
                                  <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }}>
                                    Offline Nodes
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>
                    </Grid.Column>

                    <Grid.Column className="stats__item">
                      <div className="stats__item__label">Daily Earnings</div>
                      <div className="stats__item__value">
                        <NumberFormat
                          value={stats.dailyEarnings}
                          displayType={'text'}
                          decimalPrecision={2}
                          thousandSeparator
                          prefix={'$'}
                        />
                      </div>
                    </Grid.Column>
                    <Grid.Column className="stats__item">
                      <div className="stats__item__label">Weekly Earnings</div>
                      <div className="stats__item__value">
                        <NumberFormat
                          value={stats.weeklyEarnings}
                          displayType={'text'}
                          decimalPrecision={2}
                          thousandSeparator
                          prefix={'$'}
                        />
                      </div>
                    </Grid.Column>
                    <Grid.Column className="stats__item">
                      <div className="stats__item__label">Monthly Earnings</div>
                      <div className="stats__item__value">
                        <NumberFormat
                          value={stats.monthlyEarnings}
                          displayType={'text'}
                          decimalPrecision={2}
                          thousandSeparator
                          prefix={'$'}
                        />
                      </div>
                    </Grid.Column>
                    <Grid.Column className="stats__item">
                      <div className="stats__item__label">Yearly Earnings</div>
                      <div className="stats__item__value">
                        <NumberFormat
                          value={stats.yearlyEarnings}
                          displayType={'text'}
                          decimalPrecision={2}
                          thousandSeparator
                          prefix={'$'}
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                {!list.length &&
                  <Message
                    icon="desktop"
                    header="There are no masternodes being monitored yet"
                    content="Click on the Add button to add your first."
                  />
                || visualization === 'GROUPED_DETAILED' &&
                  <MonitorListGroupedDetailed list={list} groupedList={groupedList} monitorUpdating={this.props.monitor.monitorUpdating} onRemove={this.onRemove.bind(this)} />
                }
              </div>
            }
          </Container>
        ||
          <div>
            <Message
              negative
              icon="info circle"
              header="You need to log in to access this page"
              content="You can either choose to be anonymous or a normal user, if you choose to be  anonymous you won't be able to receive alerts but you can still monitor your masternodes."
            />
            <Signup />
            <Login />
          </div>
        }
      </Container>
    );
  }
}
// <MonitorSummary onViewModeChange={onViewModeChange} monitor={this.props.monitor} />
// <MonitorToolbar />

function mapStateToProps(state) {
  return {
    monitor: state.monitor,
    isAuthenticated: state.auth.isAuthenticated,
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
)(MonitorPage);
