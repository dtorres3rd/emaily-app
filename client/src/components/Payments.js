import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

// this is needed for wiring up actions 
import { connect } from 'react-redux';
import * as actions from '../actions';


// class components
class Payments extends Component{
    render() {
        return(
            <StripeCheckout
            name='Emaily'
            description='For email credits'
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}

            >
                <button className='btn'>
                    Add Credits
                </button>
            </StripeCheckout>
            
        );
    }
}
// export default Payments;

// this is needed for wiring up actions 
export default connect(null, actions)(Payments);