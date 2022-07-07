import {
    FETCH_OZON_ORDERS_ERROR, FETCH_OZON_ORDERS_START, FETCH_OZON_ORDERS_SUCCESS,
} from '../../../store/actions/actionTypes'

export interface IOrder {
    id: number
}

export interface IOrdersState {
    orders: IOrder[]
    loading: boolean
    error: any
}

export interface IOrdersRootState {
    ozonOrdersState: IOrdersState
}

interface IFetchOrdersStart {
    type: typeof FETCH_OZON_ORDERS_START
    loading: boolean
}

interface IFetchOrdersSuccess {
    type: typeof FETCH_OZON_ORDERS_SUCCESS
    payload: IOrder[]
    loading: boolean
}

interface IFetchOrdersError {
    type: typeof FETCH_OZON_ORDERS_ERROR
    payload: any
    loading: boolean
}

export type IOrdersActionTypes =
        IFetchOrdersStart | IFetchOrdersSuccess | IFetchOrdersError
