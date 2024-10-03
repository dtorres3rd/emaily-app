// this is for a user to add input
import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; // reduxForm allows communication to redux store
import {Link} from "react-router-dom";
import SurveyField from "./SurveyField";

const FIELDS = [
    {
        label: 'Survey Title', name: 'title'
    },
    {
        label: 'Subject Line', name: 'subject'
    },
    {
        label: 'Email Body', name: 'body'
    },
    {
        label: 'Recepient List', name: 'email'
    }
];

class SurveyForm extends Component {
    // create constructor

    // helper functions
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field key={name} component={SurveyField} type='text' label={label} name={name} />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className='red btn-flat white-text'>
                        Cancel
                    </Link>
                    <button type="submit" className='teal btn-flat right white-text'>
                        Next 
                        <i className='material-icons right'>done</i>
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    //configuration property
    form: 'surveyForm'
})(SurveyForm);