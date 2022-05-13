import { Map } from 'immutable';
import { handleActions, createActions } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';

export const setHeadersVisibility = createActions(SET_HEADER_VISIBILITY);

const initialState = Map({
    header: Map({
        visible: true,
    })
});

export default handleActions({
    [SET_HEADER_VISIBILITY]: (state, action) => state.setIn(['header', 'visible'], action.payload)
}, initialState);