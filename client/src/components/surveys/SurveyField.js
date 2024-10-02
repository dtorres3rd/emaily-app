// functional react component
// SurveyField constains logic to render a single label and text input

import React from "react";

export default (props) => {
    const { input, label } = props;

    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    );
};