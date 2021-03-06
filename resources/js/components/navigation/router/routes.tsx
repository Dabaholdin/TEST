// React
import React, {lazy} from 'react'

import pMinDelay from 'p-min-delay'

// Typescript
import {IRoute} from './IRoute'
import Loader from '../../UI/Loader/Loader'

// Icons
import {
    Catalogs,
    Containers,
    Importers,
    Log,
    Orders,
    Products,
    Settings,
    Providers,
    Prices,
    NewItems
} from '../../UI/iconComponents'
import LoaderPublic from '../../UI/Loader/LoaderPublic'

export const routes: IRoute[] = [
    {
        name: 'Заказы',
        pageName: 'Заказы',
        path: '/',
        redirect: '/orders',
        hide: true,
        exact: true,
        private: true,
        fallback: <Loader/>
    },
    {
        name: 'Заказы',
        pageName: 'Заказы',
        path: '/orders',
        component: lazy(() => pMinDelay(import('../../../pages/orders/Orders'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Orders/>,
        access: ['ordersIndex']
    },
    {
        name: 'Просмотр информации о заказе',
        path: '/order/:id',
        component: lazy(() => pMinDelay(import('../../../pages/orders/Order'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['ordersIndex']
    },
    {
        name: 'Инициализация нового заказа',
        path: '/ordercreate',
        component: lazy(() => pMinDelay(import('../../../pages/orders/OrderCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['ordersIndex', 'ordersCreate']
    },
    {
        name: 'Инициализация нескольких новых заказов',
        path: '/orderscreate',
        component: lazy(() => pMinDelay(import('../../../pages/orders/OrdersCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['ordersIndex', 'ordersCreate']
    },
    {
        name: 'Контейнеры',
        pageName: 'Список контейнеров',
        path: '/containers',
        component: lazy(() => pMinDelay(import('../../../pages/containers/Containers'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Containers/>,
        access: ['containersIndex']
    },
    {
        name: 'Просмотр информации о контейнере',
        path: '/container/:id',
        component: lazy(() => pMinDelay(import('../../../pages/containers/Container'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['containersIndex']
    },
    {
        name: 'Сформировать контейнер',
        path: '/containercreate',
        component: lazy(() => pMinDelay(import('../../../pages/containers/ContainerCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['containersIndex', 'containersCreate']
    },
    {
        name: 'Каталоги',
        pageName: 'Список каталогов',
        path: '/catalogs',
        component: lazy(() => pMinDelay(import('../../../pages/catalogs/Catalogs'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Catalogs/>,
        access: ['catalogsIndex']
    },
    {
        name: 'Просмотр информации о каталоге',
        path: '/catalog/:id',
        component: lazy(() => pMinDelay(import('../../../pages/catalogs/Catalog'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['catalogsIndex']
    },
    {
        name: 'Добавление нового каталога',
        path: '/catalogcreate',
        component: lazy(() => pMinDelay(import('../../../pages/catalogs/CatalogCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['catalogsIndex', 'catalogsCreate']
    },
    {
        name: 'Изменение информации о каталоге',
        path: '/catalogedit/:id',
        component: lazy(() => pMinDelay(import('../../../pages/catalogs/CatalogEdit'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['catalogsIndex', 'catalogsUpdate']
    },
    {
        name: 'Товары',
        pageName: 'Список оцифрованных товаров',
        path: '/products',
        component: lazy(() => pMinDelay(import('../../../pages/products/Products'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Products/>,
        access: ['productsIndex']
    },
    {
        name: 'Просмотр информации о товаре',
        path: '/product/:id',
        component: lazy(() => pMinDelay(import('../../../pages/products/Product'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['productsIndex']
    },
    {
        name: 'Редактирование информации о товаре',
        path: '/productedit/:id/:unpublished',
        component: lazy(() => pMinDelay(import('../../../pages/products/ProductEdit'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['productsIndex', 'productsUpdate']
    },
    {
        name: 'Анализ закупок',
        path: '/analysis_purchases',
        component: lazy(() => pMinDelay(import('../../../pages/analysis/Purchases'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Prices/>,
        access: ['compareIndex']
    },
    {
        name: 'Добавление нового товара',
        path: '/productcreate',
        component: lazy(() => pMinDelay(import('../../../pages/products/ProductCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['productsIndex', 'productsCreate']
    },
    {
        name: 'Добавление нескольких новых товаров',
        path: '/productscreate/:unpublished',
        component: lazy(() => pMinDelay(import('../../../pages/products/ProductsCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['productsIndex', 'productsCreate']
    },
    {
        name: 'Цены',
        path: '/compare',
        component: lazy(() => pMinDelay(import('../../../pages/compare/Compare'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Prices/>,
        access: ['compareIndex']
    },
    {
        name: 'Новинки',
        pageName: 'Список неопубликованных товаров',
        path: '/newproducts',
        component: lazy(() => pMinDelay(import('../../../pages/newproducts/NewProducts'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <NewItems/>,
        access: ['productsNewIndex']
    },
    {
        name: 'Поставщики',
        pageName: 'Список поставщиков',
        path: '/providers',
        component: lazy(() => pMinDelay(import('../../../pages/providers/Providers'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Providers/>,
        access: ['providersIndex']
    },
    {
        name: 'Просмотр информации о поставщике',
        path: '/provider/:id',
        component: lazy(() => pMinDelay(import('../../../pages/providers/Provider'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['providersIndex']
    },
    {
        name: 'Редактирование информации о поставщике',
        path: '/provideredit/:id',
        component: lazy(() => pMinDelay(import('../../../pages/providers/ProviderEdit'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['providersIndex', 'providersUpdate']
    },
    {
        name: 'Добавление нового поставщика',
        path: '/providercreate',
        component: lazy(() => pMinDelay(import('../../../pages/providers/ProviderCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['providersIndex', 'providersCreate']
    },
    {
        name: 'Импортеры',
        pageName: 'Список импортеров',
        path: '/importers',
        component: lazy(() => pMinDelay(import('../../../pages/importers/Importers'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Importers/>,
        access: ['importersIndex']
    },
    {
        name: 'Просмотр информации об импортере',
        path: '/importer/:id',
        component: lazy(() => pMinDelay(import('../../../pages/importers/Importer'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['importersIndex']
    },
    {
        name: 'Добавление нового импортера',
        path: '/importercreate',
        component: lazy(() => pMinDelay(import('../../../pages/importers/ImporterCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['importersIndex', 'importersCreate']
    },
    {
        name: 'Импортер изменение',
        path: '/importeredit/:id',
        component: lazy(() => pMinDelay(import('../../../pages/importers/ImporterEdit'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        access: ['importersIndex', 'importersUpdate']
    },
    {
        name: 'Лог',
        path: '/logs',
        component: lazy(() => pMinDelay(import('../../../pages/Logs'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Log/>,
        access: ['logsIndex']
    },
    {
        name: 'Настройки',
        path: '/settings',
        component: lazy(() => pMinDelay(import('../../../pages/settings/Settings'), 600)),
        hide: false,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex']
    },
    {
        name: 'Бекапы',
        path: '/settings/backups',
        component: lazy(() => pMinDelay(import('../../../pages/settings/Backups'), 600)),
        hide: true,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex']
    },
    {
        name: 'Общие настройки',
        path: '/settings/general',
        component: lazy(() => pMinDelay(import('../../../pages/settings/GeneralSettings'), 600)),
        hide: true,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex']
    },
    {
        name: 'Настроить права доступа',
        path: '/settings/roles',
        component: lazy(() => pMinDelay(import('../../../pages/settings/roles/RolesSettings'), 600)),
        hide: true,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userRolesIndex']
    },
    {
        name: 'Настроить права доступа',
        path: '/settings/roles/add',
        component: lazy(() => pMinDelay(import('../../../pages/settings/roles/CreateRole'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userRolesIndex', 'userRolesCreate']
    },
    {
        name: 'Обновить права доступа',
        path: '/settings/role/edit/:id',
        component: lazy(() => pMinDelay(import('../../../pages/settings/roles/EditRole'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userRolesIndex', 'userRolesUpdate']
    },
    {
        name: 'Просмотр прав доступа',
        path: '/settings/role/:id',
        component: lazy(() => pMinDelay(import('../../../pages/settings/roles/Role'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userRolesIndex']
    },
    {
        name: 'Пользователи',
        path: '/settings/users',
        component: lazy(() => pMinDelay(import('../../../pages/settings/users/UsersSettings'), 600)),
        hide: true,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userIndex']
    },
    {
        name: 'Пользователи',
        path: '/settings/users/add',
        component: lazy(() => pMinDelay(import('../../../pages/settings/users/CreateUser'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userIndex', 'userCreate']
    },
    {
        name: 'Редактирование сотрудника',
        path: '/settings/user/edit/:id',
        component: lazy(() => pMinDelay(import('../../../pages/settings/users/EditUser'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userIndex', 'userUpdate']
    },
    {
        name: 'Редактирование сотрудника',
        path: '/settings/user/:id',
        component: lazy(() => pMinDelay(import('../../../pages/settings/users/User'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>,
        access: ['settingsIndex', 'userIndex']
    },
    {
        name: 'Справка по работе с системой',
        path: '/help',
        component: lazy(() => pMinDelay(import('../../../pages/Help'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Settings/>
    },
    {
        name: 'Забыли пароль?',
        path: '/forgotpassword',
        component: lazy(() => pMinDelay(import('../../../pages/forgotpassword/ForgotPassword'), 600)),
        hide: true,
        exact: false,
        private: false,
        fallback: <LoaderPublic/>
    },
    {
        name: 'Восстановление пароля',
        path: '/passwordreset',
        component: lazy(() => pMinDelay(import('../../../pages/resetpassword/ResetPassword'), 600)),
        hide: true,
        exact: false,
        private: false,
        fallback: <LoaderPublic/>
    },
    {
        name: 'Восстановление пароля',
        path: '/reset',
        component: lazy(() => pMinDelay(import('../../../pages/resetpassword/ResetPassword'), 600)),
        hide: true,
        exact: false,
        private: false,
        fallback: <LoaderPublic/>
    },
    {
        name: 'Выход',
        path: '/logout',
        redirect: '/login',
        hide: true,
        exact: false,
        private: true,
        fallback: <div> Loading... </div>
    },
    {
        name: 'Парсер',
        path: '/parser',
        redirect: '/parser',
        hide: true,
        exact: false,
        private: true,
        fallback: <div> Loading... </div>
    },
    {
        name: 'Лог изменений',
        path: '/changelog',
        component: lazy(() => pMinDelay(import('../../../pages/changelog/Changelog'), 600)),
        hide: false,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Log/>,
        access: ['logsIndex']
    },
    {
        name: 'Лог изменений - создать',
        path: '/changelogcreate',
        component: lazy(() => pMinDelay(import('../../../pages/changelog/ChangelogCreate'), 600)),
        hide: true,
        exact: false,
        private: true,
        fallback: <Loader/>,
        icon: <Log/>,
        access: ['logsIndex']
    },
    {
        name: 'Маркетплейсы',
        path: '/marketplaces',
        component: lazy(() => pMinDelay(import('../../../pages/marketplaces/Marketplaces'), 600)),
        hide: false,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Prices/>,
        access: ['compareIndex']
    },
    {
        name: 'OZON: товарные остатки',
        path: '/marketplaces/ozon/goods/stocks',
        component: lazy(() => pMinDelay(import('../../../pages/marketplaces/ozon/GoodsStocks'), 600)),
        hide: true,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Prices/>,
        access: ['compareIndex']
    },
    {
        name: 'OZON: заказы',
        path: '/marketplaces/ozon/orders',
        component: lazy(() => pMinDelay(import('../../../pages/marketplaces/ozon/Orders'), 600)),
        hide: true,
        exact: true,
        private: true,
        fallback: <Loader/>,
        icon: <Prices/>,
        access: ['compareIndex']
    },
    {
        name: 'Логин',
        path: '/login',
        component: lazy(() => pMinDelay(import('../../../pages/login/Login'), 600)),
        hide: true,
        private: false,
        exact: false,
        fallback: <LoaderPublic/>
    }
]
