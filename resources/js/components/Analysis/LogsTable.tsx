// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {fetchPurchases} from '../../store/actions/purchases'

// Typescript
import {ILogsRootState} from './ILogs'

// App
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import AutoTable from '../UI/AutoTable/AutoTable'
// import logsTranslate from '../../../logs/logsTranslate.json'

const LogsTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPurchases())
    }, [dispatch])

    const {log, loading, error} = useSelector(
        (state: ILogsRootState) => ({
            log: state.logsState.logs,
            loading: state.logsState.loading,
            error: state.logsState.error
        })
    )

    // const logActionFormatter = (modelName, row) => {
    //     const item = JSON.parse(row.model)
    //     const itemLink = item.name || item.nameRu
    //     return `${logsTranslate.actions[row.action]}
    //      ${logsTranslate.classes[modelName]} "${itemLink}"`
    // }

    // const logBeforeFormatter = (before) => {
    //     if (before) {
    //         const beforeObj = JSON.parse(before)
    //         return Object.entries(beforeObj).map(([key, value]) => {
    //             if (key !== 'updated_at' && key !== 'created_at') {
    //                 return <p key={key + value} className='mb-0'>
    //                     {key} : {value}
    //                 </p>
    //             } else {
    //                 return null
    //             }
    //         })
    //     } else {
    //         return null
    //     }
    // }

    // const logAfterFormatter = (after) => {
    //     if (after) {
    //         const afterObj = JSON.parse(after)
    //         return Object.entries(afterObj).map(([key, value]) => {
    //             if (key !== 'updated_at' && key !== 'created_at') {
    //                 return <p key={key + value} className='mb-0'>
    //                     {value}
    //                 </p>
    //             } else {
    //                 return null
    //             }
    //         })
    //     } else {
    //         return null
    //     }
    // }

    const expandRowTable: any[] = [
        {
            dataField: 'deliveryTime',
            text: '???????? ????????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'balance',
            text: '??????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'currentSales',
            text: '?????????????? ??????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'lastSales',
            text: '???????????????????????? ??????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'inventoryDays',
            text: '???????????? ???? ????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'orderByCurrent',
            text: '?????? ????????????????',
            classes: 'title',
            sort: true
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'autolongNumber',
            text: '??????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'sku',
            text: '??????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'nameRu',
            text: '????????????????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'direction',
            text: '??????????????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'providerName',
            text: '??????????????????',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'lastProviderName',
            text: '?????????????????? ??????????????????',
            classes: 'title',
            sort: true
        }
     ]

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    return <AutoTable
        expandRowTable={expandRowTable}
        keyField='id' data={log} columns={columns}
    />
}

export default LogsTable
