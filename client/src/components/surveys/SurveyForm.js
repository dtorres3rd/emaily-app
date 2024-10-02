// this is for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; // reduxForm allows communication to redux store

class SurveyForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    <Field
                        type="text"
                        name="surveyTitle"
                        component="input" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    //configuration property
    form: 'surveyForm'
})(SurveyForm);