import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, GridRow, GridColumn, Icon, Button, Card, Image } from 'semantic-ui-react';
import NumberArrow from '../../common/NumberArrow';
import Percent from '../../common/Percent';
import CoinImage from '../../common/CoinImage';
import NumberFormat from 'react-number-format';
import MonitorRemove from './MonitorRemove';
import MonitorInfo from './MonitorInfo';
import Moment from 'react-moment';
import MasternodeStatus from '../../common/MasternodeStatus';

const screenWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;


const MonitorList = props => (
  <div>

    {props.groupedList.map((group, index) =>
      (<Table celled fixed singleLine sortable>
        <Table.Header>
          <Table.Row className="darker-row">
            <Table.HeaderCell verticalAlign={'middle'} style={{ width: '216px' }}>
              <Grid verticalAlign={'middle'}>
                <GridRow columns={'2'}>
                  <Grid.Column width={4}>
                    <CoinImage coin={group.coin} />
                  </Grid.Column>
                  <GridColumn style={{ paddingLeft: '0', paddingRight: '0' }}>
                    {group.coin.label} ({group.coin.code.toUpperCase()})
                  </GridColumn>
                </GridRow>
              </Grid>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '80px' }}>Port</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Wallet</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '160px' }}>Balance</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '144px' }}>Balance USD</Table.HeaderCell>
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

              {item.masternode.status !== 'ENABLED' &&
              <Table.Cell textAlign={'center'} verticalAlign={'middle'} negative>
                {item.masternode.port}
              </Table.Cell>
            ||
            <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
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
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <Grid verticalAlign={'middle'}>
                <GridRow columns={'4'}>
                  <Grid.Column width={4}>
                    <MasternodeStatus status={'ENABLED'} />
                  </Grid.Column>
                  <GridColumn style={{ paddingLeft: '0', paddingRight: '0' }}>
                    { group.online }
                  </GridColumn>
                  <Grid.Column width={4}>
                    <MasternodeStatus status={'DISABLED'} />
                  </Grid.Column>
                  <GridColumn style={{ paddingLeft: '0', paddingRight: '0' }}>
                    { group.offline }
                  </GridColumn>
                </GridRow>
              </Grid>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>
              <span style={{ color: 'green' }}>{ group.online }</span> / { group.list.length }
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>
              <NumberFormat
                value={group.balance}
                displayType={'text'}
                decimalPrecision={2}
                thousandSeparator
                suffix={` ${group.coin.code.toUpperCase()}`}
              />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>
              <NumberFormat
                value={group.balanceUsd}
                displayType={'text'}
                decimalPrecision={2}
                thousandSeparator
                prefix={'$'}
              />
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>),
    )}
    <MonitorRemove />
  </div>
);

MonitorList.propTypes = {
  list: PropTypes.array.isRequired,
  monitorUpdating: PropTypes.bool.isRequired,
};

export default MonitorList;
