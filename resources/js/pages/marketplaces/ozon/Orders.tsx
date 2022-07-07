// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {
    fetchOrders
} from '../../../store/actions/ozon'

// Typescript
import {IOrdersRootState} from './IOrders'

// App
import Loader from '../../../components/UI/Loader/Loader'
import AutoTable from '../../../components/UI/AutoTable/AutoTable'
import Error from '../../../components/UI/Error/Error'

const Orders: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const {orders, loading, error} = useSelector((state: IOrdersRootState) => ({
        error: state.ozonOrdersState.error,
        orders: state.ozonOrdersState.orders,
        loading: state.ozonOrdersState.loading
    }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    const productsFormatter = (products) => {
        const productsList = [];

        if (products) {
            console.log(products);
            products.forEach((item) => {
                productsList.push(<p>{item.name} ({item.offer_id}): {item.quantity} шт.</p>)
            })

            return productsList;
        }
        return null
    }

    const expandRowTable = [
        {
            dataField: 'products',
            text: 'Товары',
            formatter: productsFormatter
        },
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'posting_number',
            text: 'Номер отправления',
            sort: true,
        },
        {
            dataField: 'status',
            text: 'Статус',
            sort: true,
        },
        {
            dataField: 'in_process_at',
            text: 'Дата процессинга',
            sort: true,
        },
        {
            dataField: 'shipment_date',
            text: 'Дата отправления',
            sort: true,
        },
        {
            dataField: 'delivering_date',
            text: 'Дата доставки',
            sort: true,
        },
    ]

    return (
            <AutoTable keyField='posting_number' data={orders} columns={columns} expandRowTable={expandRowTable}/>
    )
}

export default Orders
