import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { TextArea } from './elements/textarea.components';
import { GET_SURVEY_REQUEST } from '../sagas/survey.sagas';
import { Field, reduxForm  } from 'redux-form';
import _ from 'lodash';


const validateComment = (value, allValues, props) => {
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
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps)
          || !_.isEqual(this.state, nextState);
      }
    renderSurvey = () => {
        const { error, handleSubmit, pristine, reset, submitting , invalid } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {this.renderPack()}
                <button type="submit" disabled={submitting  } className="btn">Submit</button>
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

    validateCheckBox = (value,allValues,props, name) => {
       let nameArray = _.split(name,'[');
       const current = allValues[nameArray[0]];
       if(!current)
           return true;
       if(allValues[nameArray[0]]) {
          const test = allValues[nameArray[0]];
          const required = test.find((item) => {if(item) return item.value == true});
          if(!required) return true;
      }
    }
    renderAnswers = (answers, type, questionID) => {
       switch(type) {
           case OPEN :
              return (
                <Field name={OPEN+"-"+questionID}  validate={validateComment} component={this.renderTextArea} />
            )
            
            case EXCLUSIVE :
            return(
                answers.map((item) => {
                return(
                    <div key={item.id} className="form-check mt-1">
                      <Field name={EXCLUSIVE+ "-" + questionID} normalize={value => item.id} dataResponse={item.response} dataId={item.id} component={this.renderRadio} />
                    </div>)
                })
            )
            
            case MULTIPLE:
            return (
                <div>
                  {answers.map((option, index) => (
                      <div key={option.id} className="form-check mt-1">
                        <Field
                            name={`${MULTIPLE +"-"+questionID}[${index}]`}
                            dataResponse={option.response}
                            checked={!!+MULTIPLE+"-"+questionID[option.id]}
                            component={this.renderCheckBox}
                            dataId = {option.id}
                            validate = {this.validateCheckBox}
                            normalize= { value => {return {questionId : questionID, id : option.id , value : value }}}
                        />
                    </div>
                  ))}
                </div>
              );
       }
    }
    renderTextArea(field) {
        return(
            <TextArea field={field} />
        )
       /* const { meta : { touched,error }} = field;
        const className = "form-group " +  (touched && error) ? 'has-error' : '' ;
        return(
            <div className={className}>
                <textarea style={{ border: touched && error ? "1px solid red" : "" }} className="form-control mt-2" id="text_response" rows="3" {...field.input}></textarea>
                <div className="text-help">
                 {touched ? error : ''}
                </div>
            </div>
        ) */
    }

    renderRadio(field) {
        const { meta : { touched,error }} = field;
        const className = "form-group " +  (touched && error) ? 'has-error' : '' ;
        return(
            <div>
                <input className="form-check-input"  type="radio" id={field.dataId} value={field.dataId} {...field.input}/>
                <label className="form-check-label" htmlFor={field.dataId}>
                    {field.dataResponse}
                </label>
            </div>
        )

    }
   
    renderCheckBox(field) {
        const { input , meta : { touched,error }} = field;
        const className = "form-checkt mt-1 " +  (touched && error) ? 'has-error' : '' ;
        return(
            <div style={{ border: touched && error ? "1px solid red" : "" }}>
                        <input className="form-check-input" type="checkbox" {...field.input} />
                            <label className="form-check-label">
                                {field.dataResponse}
                            </label> 
             </div>
             )
        
        
    }
    onSubmit(values) {
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
             
                const questionIdArray = _.split(key,"-");
                const questionId = questionIdArray[1];
                console.log(questionId);
            }
        }
    }
   render(){
    const {  survey } = this.props;
    return (
        <Container className="mt-2">
           <h2>Survey</h2>
           <hr />
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
      onRequestSurvey: () => dispatch({ type: GET_SURVEY_REQUEST }),
    };
  };

//export default  connect(mapStateToProps, mapDispatchToProps)(Survey);

export default reduxForm({
    form : 'SurveyForm'
})(connect(mapStateToProps, mapDispatchToProps)(Survey));