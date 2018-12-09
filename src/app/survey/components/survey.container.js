import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getSurvey } from '../actions/survey.actions';
import { Container } from 'reactstrap';
import { GET_SURVEY_REQUEST } from '../sagas/survey.sagas';

const OPEN = 'open';
const EXCLUSIVE = 'exclusive';
const MULTIPLE = 'multiple';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.response = [];
    }
    componentDidMount() {
       this.props.onRequestSurvey();
    }
    renderSurvey= () => {
       return this.props.survey.map((pack) => {
           const {question, answers} = pack;
           return (
           <div key={question.id} className="col-md-12">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <p className="card-text">{question.title}</p>
                { this.renderAnswers(answers,question.type) }
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small className="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
           )
       })
    }
    renderAnswers = (answers, type) => {
       switch(type) {
           case OPEN :
              return (
                <div className="form-group">
                    <textarea className="form-control mt-2" id="text_response" rows="3"></textarea>
                </div>
            ) 
            
       }
    }
   render(){
    const { fetching, survey, onRequestSurvey, error } = this.props;
    return (
        <Container className="mt-2">
           <h2>Survey</h2>
           { survey ? this.renderSurvey() : (<a>No survey</a>) }
        </Container>
     )
  }
}

const mapStateToProps = state => {
    return {
      fetching: state.survey.fetching,
      survey: state.survey.result,
      error: state.survey.error
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onRequestSurvey: () => dispatch({ type: GET_SURVEY_REQUEST })
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Survey);