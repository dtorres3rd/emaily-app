// acts as container component for survey form and survey form review
import React, {Component} from "react";
import SurveyForm from "./SurveyForm";

class SurveyNew extends Component {
 render() {
    return (
        <div>
            <SurveyForm />
        </div>
    );
 }   
}

export default SurveyNew;