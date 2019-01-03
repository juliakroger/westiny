import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, GridRow, GridColumn, Icon, Button, Card, Image } from 'semantic-ui-react';
import NumberArrow from '../../common/NumberArrow';
import Percent from '../../common/Percent';
import Number from '../../common/Number';
import CoinImage from '../../common/CoinImage';
import NumberFormat from 'react-number-format';
import MonitorRemove from './MonitorRemove';
import MonitorInfo from './MonitorInfo';
import Moment from 'react-moment';
import MasternodeStatus from '../../common/MasternodeStatus';

const screenWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;


const MonitorListGroupedDetailed = props => (
  <div>

    {props.groupedList.map((group, index) => (
      <div key={index} style={{ marginTop: '24px' }}>
        <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
          <Grid.Row columns={2} style={{ paddingBottom: '0', paddingTop: '0', height: '64px' }}>
            <div style={{ paddingRight: '0' }} className="grouped-list-coin-info__header__icon">
              <CoinImage coin={group.coin} />
            </div>
            <Grid.Column className="u-auto-grow grouped-list-coin-info__header__name">
              {group.coin.label} ({group.coin.code.toUpperCase()})
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="grouped-list-box shadow">
          <div className="grouped-list-coin-info">

            <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
              <Grid.Row columns={2} style={{ paddingBottom: '0', paddingTop: '0' }}>
                <div className="grouped-list-coin-info__header">
                  <Grid verticalAlign={'middle'} style={{ margin: 0 }}>

                    <Grid.Row style={{ paddingBottom: '0', paddingTop: '0', height: '64px' }}>
                      <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }}>
                        <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
                          <Grid.Row style={{ paddingBottom: '0', paddingTop: '0' }}>
                            <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }} className="grouped-list-coin-info__header__net-worth">
                              <NumberFormat
                                value={group.balanceUsd}
                                displayType={'text'}
                                decimalPrecision={2}
                                thousandSeparator
                                prefix={'$'}
                              />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row style={{ paddingBottom: '0', paddingTop: '4px' }}>
                            <Grid.Column style={{ paddingLeft: '0', paddingRight: '0' }}>
                              <NumberArrow value={20} text={<Number value={group.balanceUsd * 0.2} />} />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '0', paddingTop: '0', height: '64px' }}>
                      <Grid.Column className="grouped-list-coin-info__header__price-info" style={{ paddingLeft: '0', paddingRight: '0' }}>
                        <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
                          <Grid.Row columns={4}>
                            <Grid.Column width={2} verticalAlign={'middle'} style={{ paddingLeft: '0', paddingRight: '0' }}>
                              <MasternodeStatus size="large" status={'ENABLED'} />
                            </Grid.Column>
                            <Grid.Column className="grouped-list-coin-info__header__name" width={6} verticalAlign={'middle'} style={{ paddingLeft: '12px', paddingRight: '0' }}>
                              { group.online }
                            </Grid.Column>
                            <Grid.Column width={2} verticalAlign={'middle'} style={{ paddingLeft: '0', paddingRight: '0' }}>
                              <MasternodeStatus size="large" status={'DISABLED'} />
                            </Grid.Column>
                            <Grid.Column className="grouped-list-coin-info__header__name" width={6} verticalAlign={'middle'} style={{ paddingLeft: '12px', paddingRight: '2px' }}>
                              { group.offline }
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
                <Grid.Column className="u-auto-grow" style={{ paddingLeft: '0', paddingRight: '0' }}>
                  <Grid verticalAlign={'middle'} style={{ margin: 0 }}>
                    <Grid.Row columns={6} style={{ paddingBottom: '0', paddingTop: '0' }}>
                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Node Worth
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat value={group.coin.nodeWorth} displayType={'text'} decimalPrecision={0} thousandSeparator prefix={'$'} />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          ROI
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <Percent value={group.coin.percentRoi} color={'black'} />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Required Coins
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat value={group.coin.requiredCoins} displayType={'text'} decimalPrecision={0} thousandSeparator />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Active Nodes
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat value={group.coin.numActiveMasternodes} displayType={'text'} decimalPrecision={0} thousandSeparator />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Locked
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <Percent value={group.coin.percentLocked} color={'black'} />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Current Block
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          {group.coin.currentBlock &&
                          <NumberFormat
                            value={group.coin.currentBlock}
                            displayType={'text'}
                            decimalPrecision={0}
                            thousandSeparator
                          />
                          ||
                            '-'
                          }
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={6} style={{ paddingBottom: '0', paddingTop: '0' }}>
                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Market Cap
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat value={group.coin.marketCap} displayType={'text'} decimalPrecision={0} thousandSeparator prefix={'$'} />
                        </div>
                      </Grid.Column>
                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Price
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat
                            value={group.coin.price}
                            displayType={'text'}
                            decimalPrecision={2}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Daily Earnings
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat
                            value={group.dailyEarnings}
                            displayType={'text'}
                            decimalPrecision={2}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Weekly Earnings
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat
                            value={group.weeklyEarnings}
                            displayType={'text'}
                            decimalPrecision={2}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </Grid.Column>

                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Monthly Earnings
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat
                            value={group.monthlyEarnings}
                            displayType={'text'}
                            decimalPrecision={2}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </Grid.Column>
                      <Grid.Column className="grouped-list-coin-info__item">
                        <div className="grouped-list-coin-info__item__label">
                          Yearly Earnings
                        </div>
                        <div className="grouped-list-coin-info__item__value">
                          <NumberFormat
                            value={group.yearlyEarnings}
                            displayType={'text'}
                            decimalPrecision={2}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <Table celled fixed singleLine sortable>
            <Table.Header>
              <Table.Row className="darker-row">
                <Table.HeaderCell verticalAlign={'middle'} style={{ width: '200px', paddingBottom: '0', paddingTop: '0' }}>
                  Server
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '80px' }}>
                  Port
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Wallet</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '160px' }}>
                  Balance
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '144px' }}>
                  Balance USD
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '160px' }}>Last Balance Update</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '128px' }}>Last Paid</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '72px' }}>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>


            <Table.Body>
              {group.list.map((item, itemIndex) =>
                (<Table.Row key={item._id}>
                  {item.masternode.status !== 'ENABLED' &&
                  <Table.Cell textAlign={'left'} verticalAlign={'middle'} negative>
                    <Grid verticalAlign={'middle'}>
                      <GridRow columns={'2'}>
                        <Grid.Column width={4}>
                          <MasternodeStatus status={item.masternode.status} />
                        </Grid.Column>
                        <GridColumn style={{ paddingLeft: '0', paddingRight: '0' }}>
                          <span>{ item.masternode.ip }</span>
                        </GridColumn>
                      </GridRow>
                    </Grid>
                  </Table.Cell>
                  ||
                  <Table.Cell textAlign={'left'} verticalAlign={'middle'}>
                    <Grid verticalAlign={'middle'}>
                      <GridRow columns={'2'}>
                        <Grid.Column width={4}>
                          <MasternodeStatus status={item.masternode.status} />
                        </Grid.Column>
                        <GridColumn style={{ paddingLeft: '0', paddingRight: '0' }}>
                          <span>{ item.masternode.ip }</span>
                        </GridColumn>
                      </GridRow>
                    </Grid>
                  </Table.Cell>
                  }

                  {item.masternode.portAvailable &&
                    <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                      {item.masternode.port}
                    </Table.Cell>
                  ||
                    <Table.Cell textAlign={'center'} verticalAlign={'middle'} negative>
                      {item.masternode.port}
                    </Table.Cell>
                  }
                  <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                    { item.masternode.payee }
                  </Table.Cell>
                  <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                    { props.monitorUpdating &&
                    'Loading...'
                    || item.masternode.balance &&
                    <NumberFormat
                      value={item.masternode.balance}
                      displayType={'text'}
                      decimalPrecision={2}
                      thousandSeparator
                      suffix={` ${item.masternode.coin.code.toUpperCase()}`}
                    />
                    ||
                    '-'
                    }
                  </Table.Cell>
                  <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                    { props.monitorUpdating &&
                    'Loading...'
                    || item.masternode.balance &&
                    <NumberFormat
                      value={item.masternode.balance * item.masternode.coin.price}
                      displayType={'text'}
                      decimalPrecision={2}
                      thousandSeparator
                      prefix={'$'}
                    />
                    ||
                    '-'
                    }
                  </Table.Cell>
                  <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                    { props.monitorUpdating &&
                    'Loading...'
                    || item.masternode.lastBalanceUpdate &&
                    <Moment unix fromNow>{ item.masternode.lastBalanceUpdate }</Moment>
                    ||
                    '-'
                    }
                  </Table.Cell>
                  <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                    <Moment unix fromNow>{item.masternode.lastseen}</Moment>
                  </Table.Cell>
                  <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
                    {false &&
                    <MonitorInfo monitor={item} />
                    }
                    <Icon color="red" className="actions-icon" size="large" onClick={props.onRemove.bind(this, item)} name="trash" />
                  </Table.Cell>
                </Table.Row>),
              )}

            </Table.Body>
          </Table>
        </div>
      </div>
    ))}
    <MonitorRemove />
  </div>
);

MonitorListGroupedDetailed.propTypes = {
  list: PropTypes.array.isRequired,
  groupedList: PropTypes.array.isRequired,
  monitorUpdating: PropTypes.bool.isRequired,
};

export default MonitorListGroupedDetailed;
