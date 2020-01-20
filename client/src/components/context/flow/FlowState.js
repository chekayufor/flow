import React, { useReducer } from 'react';
import axios from 'axios';
import FlowContext from './flowContext';
import FlowReducer from './flowReducer';
import {
    GET_FLOWS,
    ADD_FLOW,
    DELETE_FLOW,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_FLOW,
    CLEAR_FLOWS,
    FLOW_ERROR,
    CLEAR_FILTER,
    FILTER_FLOWS,
    SET_CURRENT_ELEMENT,
    SET_LOADING,
    SET_ELEMENTS,
    UPDATE_ELEMENT,
    DELETE_ELEMENT,
    SET_TOP,
    SET_LEFT

} from '../types';

const FlowState = props => {

    const initialState = {
        flowList: null,
        currentFlow: null,
        flowElements: null,
        currentElement: null,
        loading: false,
        top: null,
        left: null,
        error: null
    }

    const [state, dispatch] = useReducer(FlowReducer, initialState);

    // Get Flows
    const getFlows = async () => {

        try {
            setLoading();
            const res = await axios.get('/api/flows');
            console.log({ res });
            dispatch({
                type: GET_FLOWS,
                payload: res.data
            });
        } catch (err) {
            console.log(err);
            // dispatch({
            //     type: FLOW_ERROR,
            //     payload: err.response.msg
            // });
        }
    };

    // Add Flow
    const addFlow = async flow => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            setLoading();
            const res = await axios.post('/api/flows', flow, config);

            dispatch({
                type: ADD_FLOW,
                payload: res.data
            });
        } catch (err) {
            // dispatch({
            //     type: FLOW_ERROR,
            //     payload: err.response.msg
            // });
            console.log(err);
        }
    };

    // Delete Flow
    const deleteFlow = async _id => {
        try {
            setLoading();
            await axios.delete(`/api/flows/${_id}`);

            dispatch({
                type: DELETE_FLOW,
                payload: _id
            });
        } catch (err) {
            // dispatch({
            //     type: FLOW_ERROR,
            //     payload: err.response.msg
            // });
            console.log(err);
        }
    };

    // Update Flow
    const updateFlow = async flow => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            setLoading();
            const res = await axios.put(
                `/api/flows/${flow._id}`,
                flow,
                config
            );

            dispatch({
                type: UPDATE_FLOW,
                payload: res.data
            });
        } catch (err) {
            // dispatch({
            //     type: FLOW_ERROR,
            //     payload: err.response.msg
            // });
            console.log(err);
        }
    };

    // Clear Flows
    const clearFlows = () => {
        dispatch({ type: CLEAR_FLOWS });
    };

    // Set Current flow
    const setCurrentFlow = flow => {
        // console.log({ flow })
        dispatch({ type: SET_CURRENT, payload: flow });
    };
    // Clear Current flow
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Set top
    const setTop = y => {
        dispatch({ type: SET_TOP, payload: y });
    };
    // Set left
    const setLeft = x => {
        dispatch({ type: SET_LEFT, payload: x });
    };
    // Filter Flows
    const filterFlows = text => {
        dispatch({ type: FILTER_FLOWS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    // Set Current element
    const setCurrentElement = element => {
        dispatch({ type: SET_CURRENT_ELEMENT, payload: element });
    };
    // Set elements of current Flow
    const setFlowElements = element => {
        dispatch({ type: SET_ELEMENTS, payload: element });
    };
    // update elements
    const updateElement = updEl => {
        dispatch({ type: UPDATE_ELEMENT, payload: updEl });
    };

    // Delete element
    const deleteElement = id => {
        dispatch({
            type: DELETE_ELEMENT,
            payload: id
        });
    };
    // Set loading to true
    const setLoading = () => {
        return {
            type: SET_LOADING
        };
    };



    return (
        <FlowContext.Provider
            value={{
                flowList: state.flowList,
                currentFlow: state.currentFlow,
                flowElements: state.flowElements,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                top: state.top,
                left: state.left,
                currentElement: state.currentElement,
                addFlow,
                deleteFlow,
                setCurrentFlow,
                setFlowElements,
                clearCurrent,
                updateFlow,
                filterFlows,
                clearFilter,
                clearFlows,
                getFlows,
                setCurrentElement,
                updateElement,
                deleteElement,
                setLoading,
                setTop,
                setLeft
            }
            }
        >
            {props.children}
        </FlowContext.Provider >
    );
};

export default FlowState;