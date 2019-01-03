import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const CoinImage = (props) => {
  let imageUrl;

  if (props.coin.logoUrl) {
    imageUrl = props.coin.logoUrl;
  } else {
    imageUrl = `https://s3.amazonaws.com/nodemonitor-assets/images/coins/${props.coin.name}.png`;
  }

  return (
    <Image floated="left" src={imageUrl} />
  );
};

CoinImage.propTypes = {
  coin: PropTypes.object.isRequired,
};

export default CoinImage;
