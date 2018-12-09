import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { GET_SURVEY_REQUEST } from '../sagas/survey.sagas';
import { Field, reduxForm } from 'redux-form';

const validateComment = (value, allValues, props) => {
    console.log("validate",value);
    if (!value) return "Can't be empty."
  }
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
    renderSurvey = () => {
        const { error, handleSubmit, pristine, reset, submitting , invalid } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {this.renderPack()}
                <button type="submit" disabled={submitting || invalid } className="btn">Submit</button>
            </form>
        )
    }
    renderPack = () => {
        return(
            this.props.survey.map((pack) => {
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
        )
    }
  
    renderAnswers = (answers, type, questionID) => {
       switch(type) {
           case OPEN :
              return (
                <Field name={questionID + "s"} validate={validateComment} component={this.renderTextArea} />
               /* <div className="form-group">
                    <textarea className="form-control mt-2" id="text_response" rows="3"></textarea>
                </div> */
            )
            
            case EXCLUSIVE :
            return(
                answers.map((item) => {
                return(
                    <div key={item.id} className="form-check mt-1">
                       <input className="form-check-input" type="radio" name={questionID} id={item.id} value={item.id}/>
                        <label className="form-check-label" htmlFor={item.id}>
                            {item.response}
                        </label>
                    </div>)
                })
            )
            
            case MULTIPLE:
                return(
                    answers.map((item) => {
                    return(
                        <div key={item.id} className="form-check mt-1">
                            <Field name={item.id + "-" + questionID} validate={validateComment} dataResponse={item.response} dataId={item.id} component={this.renderCheckBox} />
                        </div>)
                    })
                )
            
       }
    }
    renderTextArea(field) {
        const { meta : { touched,error }} = field;
        const className = "form-group " +  (touched && error) ? 'has-error' : '' ;
        return(
            <div className={className}>
                <textarea className="form-control mt-2" id="text_response" rows="3" {...field.input}></textarea>
                <div className="text-help">
                 {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderCheckBox(field) {
        const { meta : { touched,error }} = field;
        const className = "form-checkt mt-1 " +  (touched && error) ? 'has-error' : '' ;
        return(
            <div key={field.dataId} className={className}>
                        <input className="form-check-input" type="checkbox" value={field.dataId} id={field.dataId} {...field.input} />
                            <label className="form-check-label" htmlFor={field.dataId}>
                                {field.dataResponse}
                            </label>
                            <div className="text-help">
                            {touched ? error : ''}
                        </div>
             </div>
             )
        
        
    }
    onSubmit(values) {
        console.log(values);
    }
   render(){
    const { fetching, survey, onRequestSurvey, error } = this.props;
    return (
        <Container className="mt-2">
           <h2>Survey</h2>
           <hr />
           { survey ? this.renderSurvey() : (null)}
        </Container>
     )
  }
}

function validate(values) {
    const errors = {};
    if(!values.title) {
        errors.title = "Required";
    }
    return errors;
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

//export default  connect(mapStateToProps, mapDispatchToProps)(Survey);

export default  reduxForm({
    form : 'SurveyForm'
})(connect(mapStateToProps, mapDispatchToProps)(Survey));