// React
import React, {useEffect, useState} from 'react'

// Styles
import classes from './ProductItemForm/ProductItemForm.module.css'

// Third-party
import {useDispatch} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import bsCustomFileInput from 'bs-custom-file-input'
import Select from 'react-select'

// Typescript
import {
    IProduct,
    IProductPrice
} from '../IProducts'
import {IProvider} from '../../Providers/IProviders'

// Actions
import {
    updateProduct,
    updateProductImageById
} from '../../../store/actions/products'

// App
import TextEditor from '../../UI/TextEditor/TextEditor'
import {currencyConversion} from '../../../utils'
import Form from '../../UI/Form/Form'
import Input from '../../UI/Inputs/Input/Input'

interface IEditProductData {
    nameRu: string
    nameEn: string
    vendorCode: string
    autolongNumber: number
    hsCode: any
    aboutRu: string
    aboutEn: string
    providerId: any
    image: string
    imageFile?: Blob[]
    priceCny: number
    priceRub: number | undefined
    priceUsd: number | undefined
    weightNetto: number
    weightBrutto: number
}

type Props = {
    product: IProduct,
    providers: IProvider[]
    unpublished: string
}

const ProductFormEdit: React.FC<Props> = (props) => {
    const {product, providers, unpublished} = props
    const [priceState, setPriceState] = useState<IProductPrice>({rub: 0, usd: 0, cny: 0})

    const providersOptions = providers.map(
        (provider: IProvider) => {
            return {
                label: provider.name,
                value: provider.id
            }
        })

    const defaultValues: IEditProductData = {
        nameRu: product.nameRu,
        nameEn: product.nameEn,
        vendorCode: product.vendorCode,
        aboutRu: product.aboutRu,
        aboutEn: product.aboutEn,
        image: product.image,
        providerId: product.provider?.id
            ? providersOptions.filter(({value}) =>
                value === product.provider.id)[0]
            : {
                label: '???? ?????????????????? ????????????????????',
                value: 0
            },
        autolongNumber: +product.autolongNumber,
        hsCode: product.hsCode,
        priceCny: product.price.cny,
        priceRub: product.price.rub,
        priceUsd: product.price.usd,
        weightNetto: product.weightNetto,
        weightBrutto: product.weightBrutto
    }

    useEffect(() => {
        return setPriceState(currencyConversion(+product.price.cny, 'cny'))
    }, [product.price.cny])

    const {register, handleSubmit, errors, control} = useForm<IEditProductData>({defaultValues})

    let img = '/imgs/placeholder-product-image.png'
    if ('image' in product && product.image) {
        img = product.image
    }

    const dispatch = useDispatch()

    if (unpublished === 'unpublished') {
        providersOptions.unshift({
            label: '???? ?????????????????? ????????????????????',
            value: 0
        })
    }

    const productFormSubmitHandler = handleSubmit(async (formValues: IEditProductData) => {
        formValues.providerId = formValues.providerId.value === 0 ? null : formValues.providerId.value
        if (formValues.imageFile?.[0]) {
            dispatch(updateProductImageById(product.id, {image: formValues.imageFile[0]}, `/product/${product.id}`))
            dispatch(updateProduct(product.id, formValues))
        } else {
            dispatch(updateProduct(product.id, formValues, `/product/${product.id}`))
        }
    })

    const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>, currencyCode: string) => {
        const value = e.target.value
        setPriceState(currencyConversion(+value, currencyCode))
    }

    const fileInput =
        <input
            type="file"
            name="imageFile"
            ref={register}
            className="custom-file-input"
        />

    const providerSelect = <Select
        placeholder='???????????????? ????????????????????'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    bsCustomFileInput.init()

    const content =
        <div className='card mb-3'>
            <div className="card-body">
                <Form onSubmit={productFormSubmitHandler}>

                    {unpublished !== 'unpublished'
                        ? <div className='mb-3 row'>
                            <div className="col-lg-6">
                                <label
                                    htmlFor='autolongNumber'
                                    className='w-100 required'>
                                    ???????????????????? ??????????
                                </label>
                                <input
                                    className='col-lg-10 mb-3'
                                    name="autolongNumber"
                                    ref={register({required: true})}
                                    type="text"
                                    defaultValue={product.autolongNumber}
                                    placeholder="?????????????? ??????????"
                                />
                                {errors.autolongNumber &&
                                <small>?????? ???????? ??????????????????????</small>}
                                <label
                                    htmlFor='hsCode'
                                    className='w-100'>
                                    HS code
                                </label>
                                <input
                                    className='col-lg-10 mb-3'
                                    name="hsCode"
                                    ref={register}
                                    type="string"
                                    placeholder="?????????????? HS code"
                                />

                                <label htmlFor='vendorCode'
                                       className='w-100'>
                                    ?????????????? ??????????????
                                </label>
                                <input
                                    className='col-lg-10 mb-3'
                                    name="vendorCode"
                                    ref={register}
                                    type="text"
                                    placeholder="?????????????? ??????????"
                                />

                            </div>
                            <div className="col-lg-6">
                                <div className="row mb-3">
                                    <div className="col-lg-2 col-3 pr-0">
                                        {img
                                            ? <img
                                                className={classes.ProductItemImg}
                                                src={img} alt=""/>
                                            : null
                                        }
                                    </div>
                                    <div className="col-lg-8">
                                        <label htmlFor='image'>
                                            ???????????????? ??????????????????????
                                        </label>
                                        <div className="custom-file">
                                            <input
                                                className='hidden d-none'
                                                ref={register}
                                                name='image'
                                                type="hidden"
                                            />
                                            {fileInput}
                                            <label
                                                className="custom-file-label"
                                                htmlFor="imageFile">
                                                ???????????????? ????????
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <label className='required'
                                       htmlFor='providerId'>
                                    ???????????????? ????????????????????
                                </label>
                                <div className='col-lg-10 mb-3 p-0'>
                                    <Controller
                                        name="providerId"
                                        as={providerSelect}
                                        defaultValue=''
                                        options={providersOptions}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                    {errors.providerId &&
                                    <small>?????? ???????? ??????????????????????</small>}
                                </div>
                            </div>
                        </div>
                        : <div className='mb-3 row'>
                            <div className="col-lg-6">
                                <label htmlFor='vendorCode'
                                       className='w-100'>
                                    ?????????????? ??????????????
                                </label>
                                <input
                                    name="vendorCode"
                                    ref={register}
                                    type="text"
                                    placeholder="?????????????? ??????????"
                                />
                                <label
                                    className='required'
                                    htmlFor='providerId'>
                                    ???????????????? ????????????????????
                                </label>
                                <div className='col-lg-10 mb-3 p-0'>
                                    <Controller
                                        name="providerId"
                                        as={providerSelect}
                                        defaultValue={{label: '???? ?????????????????? ????????????????????', value: 0}}
                                        options={providersOptions}
                                        control={control}
                                    />
                                    {errors.providerId &&
                                    <small>?????? ???????? ??????????????????????</small>}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row mb-3">
                                    <div className="col-lg-2 col-3 pr-0">
                                        {img
                                            ? <img
                                                className={classes.ProductItemImg}
                                                src={img} alt=""/>
                                            : null
                                        }
                                    </div>
                                    <div className="col-lg-8">
                                        <label htmlFor='image'>
                                            ???????????????? ??????????????????????
                                        </label>
                                        <div className="custom-file">
                                            <input
                                                className='hidden d-none'
                                                ref={register}
                                                name='image'
                                                type="hidden"
                                            />
                                            {fileInput}
                                            <label
                                                className="custom-file-label"
                                                htmlFor="imageFile">
                                                ???????????????? ????????
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className='mb-3 row'>
                        <div className='col-lg-6'>
                            <label
                                htmlFor='nameRu'
                                className='w-100 required'>
                                ?????????????? ???????????????? ????????????
                                <span className="float-right text-main font-weight-bold">
                                    RU
                                </span>
                            </label>
                            <input
                                name="nameRu"
                                className='col-lg-10 mb-3'
                                ref={register({required: true})}
                                type="text"
                                placeholder="?????????????? ????????????????"
                            />
                            {errors.nameRu &&
                            <small>?????? ???????? ??????????????????????</small>}
                            <label htmlFor='aboutRu'>
                                ???????????????? ????????????
                            </label>
                            <div className="row">
                                <div className="col-lg-10">
                                    <Controller
                                        name="aboutRu"
                                        control={control}
                                        defaultValue=''
                                        render={({value, onChange}) => (
                                            <TextEditor
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    {errors.aboutRu &&
                                    <small>?????? ???????? ??????????????????????</small>}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-lg-0 mt-3">
                            <label htmlFor='nameEn' className='w-100'>
                                Product name
                                <span className="float-right text-main font-weight-bold">
                                    ENG
                                </span>
                            </label>
                            <input
                                name="nameEn"
                                className='col-lg-10 mb-3'
                                ref={register}
                                type="text" placeholder="Type here"
                            />

                            <label htmlFor='aboutEn'>Description</label>
                            <div className="row">
                                <div className="col-lg-10">
                                    <Controller
                                        name="aboutEn"
                                        control={control}
                                        render={({value, onChange}) => (
                                            <TextEditor
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label className='required'>
                                ?????????????? ????????</label>
                            <div className='row mb-3'>
                                <div className='col-lg-10 col-11'>
                                    <Input
                                        style={{maxWidth: '100%', padding: '0', margin: '0'}}
                                        name="priceCny"
                                        className='w-100'
                                        ref={register({required: true})}
                                        type="number"
                                        value={priceState.cny}
                                        onChange={(e) => onChangePrice(e, 'cny')}
                                        placeholder="0"
                                    />
                                    {errors.priceCny &&
                                    <small>?????? ???????? ??????????????????????</small>}
                                </div>
                                <div className='col-1 pl-0'>
                                    <span className='priceSymbol text-orange font-weight-bold'>
                                        ??
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='col-xl-4 col-lg-10 col-11'>
                                    <Input
                                        style={{maxWidth: '100%', padding: '0', margin: '0'}}
                                        name="priceUsd"
                                        type="number"
                                        ref={register}
                                        onChange={(e) =>
                                            onChangePrice(e, 'usd')}
                                        value={priceState.usd}
                                        className='w-100'
                                        placeholder="0"
                                    />
                                </div>
                                <div className='col-xl-2 col-1 pl-0'>
                                    <span className='priceSymbol text-main font-weight-bold'>
                                        $
                                    </span>
                                </div>
                                <div className='col-xl-4 col-lg-10 col-11 mt-xl-0 mt-3'>
                                    <Input
                                        style={{maxWidth: '100%', padding: '0', margin: '0'}}
                                        name="priceRub"
                                        type="number"
                                        ref={register}
                                        onChange={(e) => onChangePrice(e, 'rub')}
                                        value={priceState.rub}
                                        className='w-100'
                                        placeholder="0"
                                    />
                                </div>
                                <div className='col-xl-2 col-1 pl-0 mt-xl-0 mt-3'>
                                    <span className='priceSymbol text-main font-weight-bold'>
                                        ???
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='row mb-3'>
                                <div className='col-lg-12'>
                                    <label>?????????????? ??????</label>

                                    <div className='row mb-3'>
                                        <div className='col-xl-2 col-3 small pt-2 font-weight-bold'>
                                            ????????????
                                        </div>
                                        <div className='col-xl-8 col-lg-7 col-8'>
                                            <input
                                                name="weightBrutto"
                                                placeholder="0"
                                                ref={register}
                                                type="number"
                                                className='w-100'
                                            />
                                            {errors.weightBrutto &&
                                            <small>
                                                ?????? ???????? ??????????????????????
                                            </small>}
                                        </div>
                                        <div
                                            className='col-xl-2 col-lg-2 col-1 priceSymbol text-main font-weight-bold pl-0'>
                                            ????
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-xl-2 col-3 small pt-2 font-weight-bold'>
                                            ??????????
                                        </div>
                                        <div className='col-xl-8 col-lg-7 col-8'>
                                            <input
                                                name="weightNetto"
                                                className='w-100'
                                                ref={register}
                                                type="number"
                                                placeholder="0"
                                            />
                                            {errors.weightNetto &&
                                            <small>
                                                ?????? ???????? ??????????????????????
                                            </small>}
                                        </div>
                                        <div
                                            className='col-xl-2 col-lg-2 col-1 priceSymbol text-main font-weight-bold pl-0'>
                                            ????
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.btns + ' col-lg-12'}>
                                    <button
                                        className='btn btn-success'
                                        type="submit">
                                        ????????????????
                                    </button>
                                    <button className='btn btn-light'>
                                        ???????????????? ????????????????????
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>

    return (content)
}

export default ProductFormEdit
