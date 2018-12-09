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
                { this.renderAnswers(answers,question.type,question.id) }
                <div className="d-flex justify-content-between align-items-center">
                </div>
              </div>
            </div>
          </div>
           )
       })
    }
    renderAnswers = (answers, type, questionID) => {
       switch(type) {
           case OPEN :
              return (
                <div className="form-group">
                    <textarea className="form-control mt-2" id="text_response" rows="3"></textarea>
                </div>
            )
            case MULTIPLE:
                return(
                    answers.map((item) => {
                    return(
                        <div key={item.id} className="form-check mt-1">
                            <input className="form-check-input" type="checkbox" value={item.id} id={item.id} />
                            <label className="form-check-label" htmlFor={item.id}>
                                {item.response}
                            </label>
                        </div>)
                    })
                )
            case EXCLUSIVE :
            return(
                answers.map((item) => {
                return(
                    <div key={item.id} className="form-check mt-1">
                       <input className="form-check-input" type="radio" name={questionID} id={item.id} value="option1"/>
                        <label className="form-check-label" htmlFor={item.id}>
                            Default radio
                        </label>
                    </div>)
                })
            )
            
       }
    }
   render(){
    const { fetching, survey, onRequestSurvey, error } = this.props;
    return (
        <Container className="mt-2">
           <h2>Survey</h2>
           { survey ? this.renderSurvey() : (null)}
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