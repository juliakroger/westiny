import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Grid, Icon, Button, Card, Image } from 'semantic-ui-react';

const MonitorSimpleCards = () => (
  <Card.Group>
    {this.props.monitor.items.map(item =>
      (<Card>
        <Card.Content>
          <Image floated="left" size="mini" src={item.crypto.img} />

          <Grid>
            <Grid.Row verticalAlign="middle" columns={2}>
              <Grid.Column style={{ paddingLeft: '0px' }}>
                <Card.Header>
                  {item.crypto.name}
                </Card.Header>
                <Card.Meta>
                  {item.amount} {item.crypto.id.toUpperCase()}
                </Card.Meta>
              </Grid.Column>
              <Grid.Column textAlign="right" style={{ paddingRight: '0px' }}>

                <Icon size="large" color="green" name="level up" />
                <span>40%</span>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Card.Description>
            <Grid>
              <Grid.Row verticalAlign="middle" columns={3}>
                <Grid.Column textAlign="center">
                  <div>Before</div>
                  <div>${item.price}</div>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <div>Now</div>
                  <div>${item.price * 1.1}</div>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <div>Profit</div>
                  <div>${item.price * 1.1}</div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row verticalAlign="middle" columns={2}>
                <Grid.Column>
                  <Icon size="large" name="calendar" />
                  {item.dateOfPurchase}
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <Image floated="right" size="tiny" src="/assets/img/bittrex.png" />
                </Grid.Column>
              </Grid.Row>
            </Grid>


          </Card.Description>
        </Card.Content>
      </Card>),
    )}
  </Card.Group>
);

MonitorSimpleCards.propTypes = {
  monitor: PropTypes.array.isRequired,
};

export default MonitorSimpleCards;
