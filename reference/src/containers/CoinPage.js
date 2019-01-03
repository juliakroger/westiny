import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';
import * as coinActions from '../actions/coinActions';
import { Container, Message, Loader, Dimmer } from 'semantic-ui-react';

// import {formatForDropdown} from '../utils/adapters';
import CoinList from '../components/Coin/CoinList';
import CoinToolbar from '../components/Coin/CoinToolbar';
import CoinSummary from '../components/Coin/CoinSummary';


class CoinPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  loadCoin() {
    this.props.actions.loadCoin();
  }

  formatList(list) {
    return list.map((item) => {
      item.nodeWorth = item.requiredCoins * item.price;
      item.percentLocked = (item.numActiveMasternodes * item.requiredCoins * 100) / item.availableSupply;
      return item;
    });
  }

  componentDidMount() {
    this.loadCoin();
  }

  render() {
    const onViewModeChange = () => {};

    const list = this.formatList(this.props.coin.list);

    return (
      <Container fluid>
        {this.props.coin.loading &&
        <div className="loading-content">
          <Loader active content="Loading" />
        </div>
        ||
          <CoinList list={list} />
        }
      </Container>
    );
  }
}

CoinPage.defaultProps = {
  coin: {
    list: [],
  },
};

CoinPage.propTypes = {
  coin: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    coin: state.coin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(objectAssign({}, coinActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoinPage);
