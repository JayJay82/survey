import React from 'react';

export const TextArea = ({field}) => {
    const { meta : { touched,error }} = field;
    const className = "form-group " +  (touched && error) ? 'has-error' : '' ;
    return(
        <div className={className}>
            <textarea  style={{ border: touched && error ? "1px solid red" : "" }} className="form-control mt-2" id="text_response" rows="3" {...field.input}></textarea>
            <div className="text-help">
             {touched ? error : ''}
            </div>
        </div>
    )
}

