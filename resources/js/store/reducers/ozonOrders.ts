import {
    FETCH_OZON_ORDERS_SUCCESS,
    FETCH_OZON_ORDERS_START,
    FETCH_OZON_ORDERS_ERROR
} from '../actions/actionTypes'
import {IOrdersActionTypes, IOrdersState} from '../../pages/marketplaces/ozon/IOrders'

const initialState: IOrdersState = {
    orders: [],
    loading: true,
    error: null
}

export default function ozonOrdersReducer(
    state = initialState,
    action: IOrdersActionTypes): IOrdersState {
    switch (action.type) {
        case FETCH_OZON_ORDERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_OZON_ORDERS_SUCCESS:
            return {
                ...state, orders: action.payload, loading: false
            }
        case FETCH_OZON_ORDERS_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        default:
            return state
    }
}
