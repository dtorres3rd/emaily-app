import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// action creators - connects to API's
// functional components
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });

  //TODO error handling
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
  //TODO error handling
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
