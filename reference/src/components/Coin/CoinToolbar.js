import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Grid, Icon, Button, Card, Image } from 'semantic-ui-react';
// import CoinAdd from "./CoinAdd"

const CoinToolbar = () => {
  const orderByOptions = [
    {
      text: 'Profit',
      value: 'profit',
    },
    {
      text: 'Loss',
      value: 'loss',
    },
    {
      text: 'Date',
      value: 'date',
    },
    {
      text: 'Value',
      value: 'value',
    },
    {
      text: 'Favorites',
      value: 'favorites',
    },
  ];
  return (
    <Grid>
      <Grid.Row verticalAlign="middle" columns={4}>
        <Grid.Column>
          <Dropdown placeholder="Order by" fluid selection options={orderByOptions} />
        </Grid.Column>
        <Grid.Column>
          <Button.Group>
            <Button>Wallet</Button>
            <Button>Market</Button>
            <Button>Social</Button>
          </Button.Group>

        </Grid.Column>
        <Grid.Column>
          <Button.Group>
            <Button>
              <Icon color="black" name="block layout" />
            </Button>
            <Button>
              <Icon color="black" name="grid layout" />
            </Button>
            <Button>
              <Icon color="black" name="list layout" />
            </Button>
          </Button.Group>

        </Grid.Column>
        <Grid.Column />
      </Grid.Row>
    </Grid>
  );
};
// <CoinAdd />
CoinToolbar.propTypes = {
  // onAddItem: PropTypes.function.isRequired
};

export default CoinToolbar;
