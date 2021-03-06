import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createReceipt } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
* @author
* @function Receipt
**/

export const Receipt = (props) => {
    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');


    const receipt = useSelector(state => state.receipt);
    const product = useSelector(state => state.product);

    const [showCreateModel, setShowCreateModel] = useState(false);
    const [showCreateModel2, setShowCreateModel2] = useState(false);

    const [address, setAddress] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");


    const [sl, setSl] = useState(0);
    const [bang, setBang] = useState([]);
    const [arrayProduct, setArrayProduct] = useState([]);


    const dispatch = useDispatch();

    const toggleClass = (e) => {
        const tag = e.target.parentElement.parentElement
        tag.classList.toggle("mystyle");
    };


    const handleCloseCreate = () => setShowCreateModel(false);
    const handleCloseCreate2 = () => setShowCreateModel2(false);
    const handleSaveCreate = (e) => {
        e.preventDefault();
        setShowCreateModel(false)
        const mapItem = [];
        for (let i = 0; i < sl; i++) {

            mapItem.push(i);
        }
        setBang(mapItem)
        let temp = []
        let item = mapItem.map((x) => {
            return {
                "productid": "",
                "pricereceipt": 0,
                "quantity": 0,
            }
        })
        console.log('item', item)

        setArrayProduct(item)
        console.log('arrayProduct', arrayProduct)
        if (sl > 0) {
            setShowCreateModel2(true)
        }
    }
    const handleShowCreate = () => setShowCreateModel(true);
    const handleSaveCreate2 = (e) => {
        e.preventDefault();

        const totalAmount = arrayProduct.reduce((temp, item) =>
            temp + item.productPrice * item.productQty
            , 0)

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var receiptDate = date + ' ' + time;
        const receipt = {
            address,
            company, phone,
            receiptItems: arrayProduct,
            
            receiptDate
        }
        console.log('receipt', receipt)
        dispatch(createReceipt(receipt))
        setShowCreateModel2(false);
    }


    const renderReceipts = () => {
        return (
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>M?? ????n Nh???p</th>
                        <th>C??ng Ty</th>
                        <th>?????a Ch???</th>
                        <th>Ng??y Nh???p</th>
                        <th>S??? Lo???i SP</th>
                        <th>T???ng Gi??</th>
                        <th>Chi ti???t</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        receipt.receipts ?
                            receipt.receipts.map((receipt, index) =>
                                <>
                                    <tr key={receipt.id}>
                                        <td>{index + 1}</td>
                                        <td>{receipt.id}</td>
                                        <td>{receipt.company}</td>
                                        <td>{receipt.address}</td>
                                        <td>{receipt.receiptDate}</td>

                                        <td>{receipt.receiptItems.length}</td>
                                        <td>{formatCash(receipt.totalmoney)}  ???</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={(e) => { toggleClass(e) }}
                                            >
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr className="hidden">
                                        <td colspan="8">
                                            <div>
                                                <Table variant="parimary">
                                                    <thead>
                                                        <tr>
                                                            <th className="title"></th>
                                                            <th className="title">T??n S???n Ph???m</th>
                                                            <th className="title">H??nh ???nh</th>
                                                            <th className="title">Gi?? Nh???p</th>
                                                            <th className="title">S??? L?????ng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {receipt.receiptItems.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="value">{index + 1}</td>
                                                                <td className="value">{item.productname}</td>
                                                                <td className="value"><img width="50px" height="50px" src={item.imageurl} alt={item.productname} /></td>
                                                                <td className="value">{formatCash(item.pricereceipt)} ???</td>
                                                                <td className="value">{item.quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ) : null
                    }

                </tbody>
            </Table>
        )
    }



    const renderCreateReceipt = () => {
        return (
            <NewModal
                size={'lg'}
                show={showCreateModel}
                handleClose={handleCloseCreate}
                modalTitle={'T???o ????n Nh???p H??ng M???i'}
                handleSave={handleSaveCreate}
            >

                <Input
                    type={'text'}
                    label={'C??ng ty'}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={'C??ng ty'}
                />
                <Input
                    type={'text'}
                    label={'?????a Ch???'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={'?????a Ch???'}
                />
                <Input
                    type={'text'}
                    label={'S??? ??i???n Tho???i'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={'S??? ??i???n Tho???i'}
                />


                <Input
                    type={'number'}
                    label={'So luong mat hang'}
                    value={sl}
                    onChange={(e) => { setSl(e.target.value); }}
                />

            </NewModal>
        )
    }

    const onChangeProductId = (e, x) => {
        let value = e.target.value;
        console.log('arrayProduct', arrayProduct);
        arrayProduct[x].productid = value
        setArrayProduct([...arrayProduct])
    }

    const onChangeProductPrice = (e, x) => {
        let value = e.target.value;
        console.log('arrayProduct', arrayProduct);
        arrayProduct[x].pricereceipt = value
        setArrayProduct([...arrayProduct])
    }

    const onChangeProductQty = (e, x) => {
        let value = e.target.value;
        console.log('arrayProduct', arrayProduct);
        arrayProduct[x].quantity = value
        setArrayProduct([...arrayProduct])
    }

    const renderCreateReceipt2 = () => {
        return (
            <NewModal
                size={'lg'}
                show={showCreateModel2}
                handleClose={handleCloseCreate2}
                modalTitle={'T???o ????n Nh???p H??ng M???i'}
                handleSave={handleSaveCreate2}
            >

                {JSON.stringify(arrayProduct)}
                {
                    bang.map((x) => <>
                        <Row>
                            <Col>
                                <Input
                                    type={'select'}
                                    label={'Ten San Pham'}
                                    value={arrayProduct[x].id}
                                    onChange={(e) => onChangeProductId(e, x)}
                                    placeholder={'Select Product Parent'}
                                >
                                    {product.products.map(option =>
                                        <option key={option.value} value={option.id}>{option.productname}</option>
                                    )}
                                </Input>
                            </Col>
                            <Col>
                                <Input
                                    type={'number'}
                                    label={'Gi?? Nh???p'}
                                    value={arrayProduct[x].price}
                                    onChange={(e) => onChangeProductPrice(e, x)}
                                />
                            </Col>
                            <Col>
                                <Input
                                    type={'number'}
                                    label={'S??? l?????ng'}
                                    value={arrayProduct[x].quantity}
                                    onChange={(e) => onChangeProductQty(e, x)}
                                />
                            </Col>
                        </Row>
                    </>)
                }

            </NewModal>
        )
    }

    return (
        <Layout sidebar>
            <Container >
                <Row style={{ marginBottom: '50px' }}>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Ho?? ????n Nh???p H??ng</h3>
                            <Button
                                variant="primary"
                                onClick={handleShowCreate}
                            >
                                T???o ????n Nh???p M???i
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderReceipts()}
                    </Col>
                </Row>
            </Container>


            {renderCreateReceipt()}
            {renderCreateReceipt2()}


            <ToastContainer />

        </Layout>
    )

}