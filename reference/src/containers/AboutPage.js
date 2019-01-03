import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import objectAssign from 'object-assign';
import { bindActionCreators } from 'redux';

import { Container, Message, Loader } from 'semantic-ui-react';

class AboutPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Container fluid>
        <Message
          icon="mail outline"
          header="Feel free to contact us"
          content="contact@nodemonitor.io"
        />
      </Container>

    );
  }
}

export default AboutPage;
