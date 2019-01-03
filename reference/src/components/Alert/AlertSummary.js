import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Tab, Statistic, Grid, Icon, Button, Card, Image } from 'semantic-ui-react';
import Number from '../../common/Number';

const AlertSummary = props => (
  <Card.Group>
    <Card style={{ width: '320px', padding: '16px' }}>
      <Statistic size="small">
        <Statistic.Label>Before</Statistic.Label>
        <Statistic.Value>
          <Number value={1} color={1} />
        </Statistic.Value>
      </Statistic>
    </Card>
    <Card style={{ width: '320px', padding: '16px' }}>
      <Statistic size="small">
        <Statistic.Label>Now</Statistic.Label>
        <Statistic.Value>
          <Number value={1} color={1} />
        </Statistic.Value>
      </Statistic>
    </Card>
    <Card style={{ width: '320px', padding: '16px' }}>
      <Statistic size="small">
        <Statistic.Label>Profit</Statistic.Label>
        <Statistic.Value>
          <Number value={1} />
        </Statistic.Value>
      </Statistic>
    </Card>
  </Card.Group>
);

AlertSummary.propTypes = {
  alert: PropTypes.object.isRequired,
};

export default AlertSummary;
