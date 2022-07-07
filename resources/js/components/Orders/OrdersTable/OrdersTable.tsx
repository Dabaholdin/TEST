// React
import React, {useEffect, useContext} from 'react'
import ReactDOMServer from 'react-dom/server';

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchOrders} from '../../../store/actions/orders'

// Typescript
import {IOrdersRootState} from '../IOrders'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Styles
import classes from './OrdersTable.module.css'

// App
import Placeholder from '../../UI/Placeholder/Placeholder'
import Loader from '../../UI/Loader/Loader'
import {
    getOrderStatusName,
    getPaymentStatusName,
    moneyFormatter,
    nameToLinkFormatter,
    toLocaleNumber
} from '../../../utils'
import AutoTable from '../../UI/AutoTable/AutoTable'
import Error from '../../UI/Error/Error'
import statuses from '../../../../statuses/statuses.json'
import {SanctumContext} from '../../../Sanctum'
import courses from '../../../../courses/courses.json'

const OrdersTable: React.FC = () => {
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const {orders, loading, error} = useSelector((state: IOrdersRootState) => ({
        error: state.ordersState.error,
        orders: state.ordersState.orders,
        loading: state.ordersState.loading
    }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!orders.length) {
        return (
            <Placeholder
                description='Нажмите на кнопку «Добавить заказы», чтобы он отображался в списке'
                link={user && user.role.accesses.ordersCreate == 1 ? 'orderscreate' : undefined}
                linkName='Добавить заказы'
                title='В этом списке ещё нет заказов'
            />
        )
    }

    const filterOptions = Object.entries(statuses.orderStatuses)
        .map(([key, value]) => {
            return {
                label: value,
                value: key
            }
        })

    const filter = {
        options: filterOptions,
        field: 'status',
        placeholder: 'Фильтр по статусу'
    }

    const countsFormatter = (items: any[]): number => {
        return items.reduce((result: number, item) => result + item.quantity, 0);
        // Везде reduce, но, если вопрос о производительности стоит, лучше перебирать for-ом
        // let totalCounts = 0
        // for (const item of items) {
        //     totalCounts += item.quantity
        // }
        // return totalCounts
    }

    // не знаю что приходит в аргументах, пускай будет any
    const itemsFormatter = (items: any): number => {
        return items.length
    }

    const providerFormatter = (provider: {name: string}): string | null => {
        return 'name' in provider
            ? provider.name
            : null
    }

    const containerFormatter = (container: {[key: string]: any}): number | null => {
        return container && Object.keys(container).length ? container.id : null
    }

    // странно, если смотеть /home/dmitriizaytsev/Documents/Frontend/autolong/node_modules/@types/react-bootstrap-table-next/index.d.ts
    // то footerFormatter => void, то есть, функции ничего не требуется возращать
    // тут же вижу функцию возращающую jsx
    // WTF?
    // аргументы тоже вызывают вопросы
    // в нее может приходить только это: cell, row, rowIndex, formatExtraData.
    const footerFormatter = (column: any, columnIndex: number, {text}: {text: string}): React.ReactNode => {
        return <span className='pricesBlock'><span>{text}</span></span>
    }

    const footerFormatterMain = (): React.ReactElement => {
        return <div>
            <p className='mb-0'>Общая стоимость на странице:</p>
            <div className={classes.orderInfo}>
                <span className={classes.orderRateRub}>1 ¥ = {courses.rub.toFixed(2)} ₽</span>
                <span className={classes.orderRateUSD}>1 ¥ = {courses.usd.toFixed(2)} $</span>
            </div>
        </div>
    }

    const footerPriceFormatter = (columnData: {cny: number}[]): React.ReactElement => {
        const totalCny: number = columnData.reduce((acc: number, price: { cny: number }) => acc + price.cny, 0)
        return <>
            <span className='d-block' style={{lineHeight: '15px'}}>{toLocaleNumber(totalCny)} ¥</span>
            <span>{toLocaleNumber((totalCny * courses.rub))} ₽</span>
        </>
    }

    const footerItemsFormatter = (columnData: any[][]): React.ReactElement => {
    // length применяется к массивам и строкам
    const totalItems: number = columnData.reduce((result: number, data: any[] | string) => result + data.length, 0)

    return <>
            <span>{totalItems}</span>
        </>
    }

    const footerCountsFormatter = (columnData: {quantity: number}[][]): React.ReactElement => {
        const totalCounts: number = columnData.reduce((result: number, item: {quantity: number}[]) => {
            return result + item.reduce((result: number, item: {quantity: number}) => result + item.quantity, 0)
        }, 0)

        return <>
            <span>{totalCounts}</span>
        </>
    }

    const expandRowTable: any[] = [
        {
            dataField: 'id',
            text: 'ID',
            headerStyle: {width: '85px'}
        },
        {
            dataField: 'provider',
            text: 'Поставщик',
            formatter: providerFormatter
        },
        {
            dataField: 'statusPayment',
            text: 'Статус оплаты',
            formatter: (statusPayment: string) => getPaymentStatusName(statusPayment)
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название',
            classes: 'title',
            headerStyle: {width: '285px'},
            sort: true,
            formatter: (name, row) => nameToLinkFormatter(name, row, 'order'),
            footer: ReactDOMServer.renderToStaticMarkup(footerFormatterMain()),
        },
        {
            dataField: 'container',
            text: '№ кон.',
            headerStyle: {width: '90px'},
            classes: 'email',
            sort: true,
            formatter: containerFormatter,
            footer: ''
        },
        {
            dataField: 'status',
            text: 'Статус',
            classes: 'status',
            formatter: (status) => getOrderStatusName(status),
            sort: true,
            footer: ''
        },
        {
            dataField: 'items',
            text: 'Кол.шт.',
            headerStyle: {width: '88px'},
            formatter: countsFormatter,
            footer: columnData => ReactDOMServer.renderToStaticMarkup(footerCountsFormatter(columnData)),
        },
        {
            dataField: 'items',
            text: 'Кол.наим.',
            headerStyle: {width: '88px'},
            formatter: itemsFormatter,
            footer: columnData => ReactDOMServer.renderToStaticMarkup(footerItemsFormatter(columnData)),
        },
        {
            dataField: 'price',
            text: 'Сумма',
            headerStyle: {width: '90px'},
            formatter: (price) => moneyFormatter(price, ['rub', 'usd']),
            footer: columnData => ReactDOMServer.renderToStaticMarkup(footerPriceFormatter(columnData)),
            footerFormatter,
        }
    ]

    return (
        <AutoTable
            filter={filter}
            expandRowTable={expandRowTable}
            rowClickLink='order'
            keyField='id' data={orders} columns={columns}
            button={user && user.role.accesses.ordersCreate == 1
                ? {link: 'orderscreate', text: 'Добавить заказы'}
                : undefined}
        />
    )
}

export default OrdersTable
