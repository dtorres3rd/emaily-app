// functional react component
// SurveyField constains logic to render a single label and text input

import React from "react";

export default (props) => {
    const { input, label, meta } = props;
    const { error, touched } = meta;

    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};