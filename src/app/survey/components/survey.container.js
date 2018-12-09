import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getSurvey } from '../actions/survey.actions';
import { Container } from 'reactstrap';

class Survey extends Component {
    componentDidMount() {
        this.props.getSurvey();
    }
   render(){
    return (
        <Container className="mt-2">
           <a>Test</a>
        </Container>
     )
  }
}

function mapState({survey}) {
    return {survey : survey}
}
export default connect(mapState, {getSurvey})(Survey);