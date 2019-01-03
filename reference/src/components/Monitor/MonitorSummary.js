import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Tab, Statistic, Grid, Icon, Button, Card, Image } from 'semantic-ui-react';
import Number from '../../common/Number';

const MonitorSummary = props => (
  <Card.Group>
    <Card style={{ width: '320px', padding: '16px' }}>
      <Statistic size="small">
        <Statistic.Label>Before</Statistic.Label>
        <Statistic.Value>
          <Number value={props.monitor.before} color={'black'} />
        </Statistic.Value>
      </Statistic>
    </Card>
    <Card style={{ width: '320px', padding: '16px' }}>
      <Statistic size="small">
        <Statistic.Label>Now</Statistic.Label>
        <Statistic.Value>
          <Number value={props.monitor.now} color={props.monitor.profit} />
        </Statistic.Value>
      </Statistic>
    </Card>
    <Card style={{ width: '320px', padding: '16px' }}>
      <Statistic size="small">
        <Statistic.Label>Profit</Statistic.Label>
        <Statistic.Value>
          <Number value={props.monitor.profit} />
        </Statistic.Value>
      </Statistic>
    </Card>
  </Card.Group>
);

MonitorSummary.propTypes = {
  monitor: PropTypes.object.isRequired,
};

export default MonitorSummary;
