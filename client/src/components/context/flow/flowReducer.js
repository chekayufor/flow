import {
    GET_FLOWS,
    ADD_FLOW,
    DELETE_FLOW,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_FLOW,
    CLEAR_FLOWS,
    FLOW_ERROR,
    SET_CURRENT_ELEMENT,
    SET_ELEMENTS,
    UPDATE_ELEMENT,
    SET_FLOW_NAME,
    DELETE_ELEMENT,
    SET_LOADING,

} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_FLOWS:
            return {
                ...state,
                flowList: action.payload,
                loading: false
            };
        case ADD_FLOW:
            return {
                ...state,
                flowList: [action.payload, ...state.flowsList],
                loading: false
            };
        case UPDATE_FLOW:
            return {
                ...state,
                flowList: state.flowsList.map(flow =>
                    flow._id === action.payload._id ? action.payload : flow
                ),
                loading: false
            };
        case DELETE_FLOW:
            return {
                ...state,
                flowList: state.flowList.filter(
                    flow => flow._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_FLOWS:
            return {
                ...state,
                flowList: null,
                filtered: null,
                error: null,
                currentFlow: null
            };

        case SET_CURRENT:
            return {
                ...state,
                currentFlow: action.payload
            };
        case SET_ELEMENTS:
            return {
                ...state,
                flowElements: action.payload
            };

        case UPDATE_ELEMENT:
            return {
                ...state,
                flowElements: state.flowElements.map(el =>
                    el.id === action.payload.id ? action.payload : el
                )
            };


        case SET_CURRENT_ELEMENT:
            return {
                ...state,
                currentElement: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };

        case SET_FLOW_NAME:
            return {
                ...state,
                flowName: action.payload
            };
        case DELETE_ELEMENT:
            return {
                ...state,
                flowElements: state.flowElements.filter(
                    el => el.id !== action.payload
                ),
                loading: false
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                currentFlow: null
            };

        case FLOW_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};