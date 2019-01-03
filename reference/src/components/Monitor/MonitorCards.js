import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Tab, Dropdown, Grid, Icon, Button, Card, Image } from 'semantic-ui-react';
import Number from '../../common/Number';
import NumberArrow from '../../common/NumberArrow';

const MonitorCards = props => (
  <Card.Group>
    {props.monitor.items.map(item =>
      (<Card style={{ width: '320px' }}>

        <Grid padded>
          <Grid.Row verticalAlign="middle" columns={2} style={{ padding: '8px 16px' }}>
            <Grid.Column width={8} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <Grid.Column width={4} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <Image style={{ paddingTop: '3px' }} floated="left" src={`https://files.coinmarketcap.com/static/img/coins/32x32/${item.crypto.id}.png`} />
              </Grid.Column>
              <Grid.Column width={12} style={{ paddingLeft: '0px' }}>
                <Card.Header>
                  {item.crypto.name}
                </Card.Header>
                <Card.Meta>
                  {item.amount} {item.crypto.symbol.toUpperCase()}
                </Card.Meta>
              </Grid.Column>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
              <Card.Header>
                  ${item.crypto.price_usd}
              </Card.Header>
              <Card.Meta>
                <Icon color="green" name="level up" />
                <span>40%</span>
              </Card.Meta>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Card.Content style={{ paddingTop: '4px' }}>

          <Tab
            menu={{ fluid: true, secondary: true, pointing: true }}
            panes={[
              {
                menuItem: <Menu.Item style={{ width: '33%', display: 'block', textAlign: 'center' }} key="wallet">Wallet</Menu.Item>,
                render: () =>
                  (<Tab.Pane attached={false}>
                    <Grid>
                      <Grid.Row verticalAlign="middle" columns={3}>
                        <Grid.Column textAlign="center">
                          <div>Before</div>
                          <Number value={item.before} color={'black'} />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <div>Now</div>
                          <Number color={item.profit} value={item.now} />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <div>Profit</div>
                          <Number value={item.profit} />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row verticalAlign="middle" columns={3}>
                        <Grid.Column textAlign="center">
                          <div><Icon size="large" color="grey" name="search" /></div>
                          <div>Wallet</div>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <div><Icon size="large" color="grey" name="signal" /></div>
                          <div>Exchange</div>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <div><Icon size="large" color="grey" name="dashboard" /></div>
                          <div>Stats</div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Tab.Pane>),
              },
              {
                menuItem: <Menu.Item style={{ width: '34%', display: 'block', textAlign: 'center' }} key="market">Market</Menu.Item>,
                render: () =>
                  (<Tab.Pane attached={false}>
                    <Grid>
                      <Grid.Row verticalAlign="middle" columns={3}>
                        <Grid.Column textAlign="center">
                          <div>MarketCap</div>
                          <div>${item.crypto.market_cap_usd}</div>
                        </Grid.Column>
                        <Grid.Column textAlign="center" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                          <div>Volume 24h</div>
                          <div>${item.crypto.day_volume_usd}</div>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <div>
                              Supply
                            <span style={{ fontSize: '0.7em' }}>({item.crypto.percentage_supply}%)</span>
                          </div>
                          <div>{item.crypto.available_supply}</div>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row verticalAlign="middle" columns={3}>
                        <Grid.Column textAlign="center">
                          <NumberArrow value={item.crypto.percent_change_1h} text={'1h'} />
                          <div>{item.crypto.percent_change_1h}%</div>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <NumberArrow value={item.crypto.percent_change_24h} text={'24h'} />
                          <div>{item.crypto.percent_change_24h}%</div>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <NumberArrow value={item.crypto.percent_change_7d} text={'7d'} />
                          <div>{item.crypto.percent_change_7d}%</div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Tab.Pane>),
              },
              {
                menuItem: <Menu.Item style={{ width: '33%', display: 'block', textAlign: 'center' }} key="social">Social</Menu.Item>,
                render: () =>
                  (<Tab.Pane attached={false}>
                    <Grid>
                      <Grid.Row verticalAlign="middle" columns={4}>
                        <Grid.Column textAlign="center">
                          <Button circular color="blue" icon="world" />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Button circular color="blue" icon="comments outline" />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Button circular color="facebook" icon="facebook" />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Button circular color="twitter" icon="twitter" />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row verticalAlign="middle" columns={4}>
                        <Grid.Column textAlign="center">
                          <Icon size="large" color="facebook" name="facebook" />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Button circular color="slack" icon="slack" />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Icon size="large" color="grey" name="comments outline" />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                          <Icon size="large" color="grey" name="dashboard" />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Tab.Pane>),
              },
            ]}
          />


        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Row verticalAlign="middle" columns={6}>
              <Grid.Column textAlign="center">
                <div>#{item.crypto.rank}</div>
              </Grid.Column>
              <Grid.Column textAlign="center" />
              <Grid.Column textAlign="center">
                <Icon size="large" color="grey" name="trash" />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Icon size="large" color="grey" name="star" />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Icon size="large" color="grey" name="alarm outline" />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Icon size="large" color="grey" name="pencil" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>),
    )}
  </Card.Group>
);

MonitorCards.propTypes = {
  monitor: PropTypes.object.isRequired,
};

export default MonitorCards;
