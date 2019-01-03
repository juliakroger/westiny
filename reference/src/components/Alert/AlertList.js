import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, GridRow, GridColumn, Icon, Button, Card, Image } from 'semantic-ui-react';
import NumberArrow from '../../common/NumberArrow';
import Percent from '../../common/Percent';
import NumberFormat from 'react-number-format';
import AlertCommands from './AlertCommands';
import Moment from 'react-moment';
import CoinImage from '../../common/CoinImage';
import MasternodeStatus from '../../common/MasternodeStatus';
import AlertStatus from '../../common/AlertStatus';

const AlertList = props => (
  <Table celled fixed singleLine>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell verticalAlign={'middle'} style={{ width: '216px' }}>Masternode Coin</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '216px' }}>MN Status</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '192px' }}>IP</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Wallet</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '128px' }}>Last Seen</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '128px' }}>Alert Status</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '128px' }}>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.list.map((item, index) =>
        (<Table.Row key={index}>
          <Table.Cell verticalAlign={'middle'} style={{ paddingTop: '3px', paddingBottom: '3px' }}>
            <Grid verticalAlign={'middle'}>
              <GridRow columns={'2'}>
                <Grid.Column width={4}>
                  <CoinImage coin={item.masternode.coin} />
                </Grid.Column>
                <GridColumn style={{ paddingLeft: '0', paddingRight: '0' }}>
                  {item.masternode.coin.label} ({item.masternode.coin.code.toUpperCase()})
                </GridColumn>
              </GridRow>
            </Grid>
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <MasternodeStatus status={item.masternode.status} />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            { item.masternode.ip }:{ item.masternode.port }
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            { item.masternode.payee }
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <Moment unix fromNow>{item.masternode.lastseen}</Moment>
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <AlertStatus status={item.status} />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <AlertCommands item={item} index={index} />
          </Table.Cell>
        </Table.Row>),
      )}

    </Table.Body>
  </Table>
);

AlertList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default AlertList;
