import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, GridRow, GridColumn, Icon, Button, Card } from 'semantic-ui-react';
import NumberArrow from '../../common/NumberArrow';
import Percent from '../../common/Percent';
import NumberFormat from 'react-number-format';
import CoinImage from '../../common/CoinImage';

const screenWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;


const CoinList = props => (
  <Table celled fixed singleLine sortable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell verticalAlign={'middle'} style={{ width: '216px' }}>Masternode Coin</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Price</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>ROI</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Required</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Node Worth</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Active</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Locked</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'}>Market Cap</Table.HeaderCell>
        <Table.HeaderCell textAlign={'center'} verticalAlign={'middle'} style={{ width: '216px' }}>Links</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.list.map((item, index) =>
        (<Table.Row key={index}>
          <Table.Cell verticalAlign={'middle'} style={{ paddingTop: '3px', paddingBottom: '3px' }}>
            <Grid verticalAlign={'middle'}>
              <GridRow columns={'2'}>
                <Grid.Column width={4}>
                  <CoinImage coin={item} />
                </Grid.Column>
                <GridColumn style={{ paddingLeft: '0', paddingRight: '0' }}>
                  {item.label} ({item.code.toUpperCase()})
                </GridColumn>
              </GridRow>
            </Grid>
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <NumberFormat value={item.price} displayType={'text'} decimalPrecision={2} thousandSeparator prefix={'$'} />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <Percent value={item.percentRoi} color={'black'} />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <NumberFormat value={item.requiredCoins} displayType={'text'} decimalPrecision={0} thousandSeparator />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <NumberFormat value={item.nodeWorth} displayType={'text'} decimalPrecision={0} thousandSeparator prefix={'$'} />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <NumberFormat value={item.numActiveMasternodes} displayType={'text'} decimalPrecision={0} thousandSeparator />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <Percent value={item.percentLocked} color={'black'} />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            <NumberFormat value={item.marketCap} displayType={'text'} decimalPrecision={0} thousandSeparator prefix={'$'} />
          </Table.Cell>
          <Table.Cell textAlign={'center'} verticalAlign={'middle'}>
            {(item.links || []).map((link, linkIndex) => (
              <a key={linkIndex} href={link.url} target="_blank" style={{ marginRight: '4px' }}>
                <Icon size="large" color={link.color || 'grey'} name={link.icon} />
              </a>
            ))}
          </Table.Cell>
        </Table.Row>),
      )}

    </Table.Body>
  </Table>
);

CoinList.propTypes = {
  list: PropTypes.array.isRequired,
  groupedList: PropTypes.array.isRequired,
};

export default CoinList;
