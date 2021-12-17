import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProductById, updateProduct } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import NewModal from '../../components/UI/NewModal'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
* @author
* @function Products
**/

const Products = (props) => {

    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');


    const [productname, setProductname] = useState('');
    const [imageurl, setImageurl] = useState('');
    const [infodesign, setInfodesign] = useState('');
    const [infomation, setInfomation] = useState('');
    const [monitor, setMonitor] = useState('');
    const [system, setSystem] = useState('');
    const [cpu, setCpu] = useState('');
    const [ram, setRam] = useState('');
    const [pin, setPin] = useState('');
    const [thietKe, setThietKe] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [productImages, setProductImages] = useState([]);

    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [productItem, setProductItem] = useState(null);

    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const category = useSelector(state => state.category);
    const brand = useSelector(state => state.brand);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        toast(product.notification);
    }, [product.notification])

    const handleClose = () => setShow(false);
    const handleSave = (e) => {
        e.preventDefault();

        const form = {
            productname,
            price,
            total: 0,
            sold: 0,
            infodesign,
            infomation,
            monitor,
            system,
            cpu,
            ram,
            thietKe,
            pin,
            categoryId,
            brandId,
            imageurl
        }

        console.log({ form })

        dispatch(addProduct(form));

        setProductname(''); setPrice('');
        setCategoryId(''); setProductImages('');

        setShow(false)
    }
    const handleShow = () => setShow(true);

    //update
    const closeUpdateProductForm = () => {
        setShowUpdateModal(false);
    }
    const onUpdateProduct = (product) => {
        setShowUpdateModal(true);
        setProductItem(product)
        renderUpdateProductModal();
    }

    const updateProductForm = () => {

        let id = productItem.id;
        let productname = productItem.productname;
        let price = productItem.price;
        let total = productItem.total;
        let sold = productItem.sold;
        let infodesign = productItem.infodesign;
        let infomation = productItem.infomation;
        let monitor = productItem.monitor;
        let system = productItem.system;
        let cpu = productItem.cpu;
        let ram = productItem.ram;
        let thietKe = productItem.thietKe;
        let pin = productItem.pin;
        let imageurl = productItem.imageurl;

        // let category = productItem.category.id;
        let categoryId = productItem.category ? productItem.category.id : 123456789;
        let brandId = productItem.brand ? productItem.brand.id : 123456789;
        const payload = {
            id,
            productname,
            price,
            total,
            sold,
            infodesign,
            infomation,
            monitor,
            system,
            cpu,
            ram,
            thietKe,
            pin,
            imageurl,
            categoryId,
            brandId,
        }

        dispatch(updateProduct(payload));

        setShowUpdateModal(false);
    }



    // xu ly upload file
    const handleProductImages = (e) => {
        //console.log( "e.target.files[0]",e.target.files[0])
        setProductImages([
            ...productImages,
            e.target.files[0]
        ]);
    }



    const renderProducts = () => {
        return (
            <Table style={{ fontSize: '12px' }} responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Số Lượng Đã Bán</th>
                        <th>Danh Mục</th>
                        <th>Nhãn Hiệu</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) =>
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.productname}</td>
                                    <td>{formatCash(product.price)} ₫ </td>
                                    <td>{product.total}</td>
                                    <td>{product.sold}</td>

                                    <td>{
                                        product.category &&
                                            product.category.categoryname ?
                                            product.category.categoryname : <span style={{ color: 'red' }}>Danh Mục Đã Bị Xóa</span>}</td>

                                    <td>{
                                        product.brand &&
                                            product.brand.brandname ?
                                            product.brand.brandname : <span style={{ color: 'red' }}>Nhãn Hiệu Đã Bị Xóa</span>}</td>


                                    <td style={{ display: 'flex' }}>
                                        <Button variant="primary" onClick={() => showProductDetailsModal(product)}>
                                            Details
                                        </Button>
                                        <div style={{ marginRight: "10px" }}></div>
                                        <Button variant="success" onClick={() => onUpdateProduct(product)}>
                                            Update
                                        </Button>
                                        <div style={{ marginRight: "10px" }}></div>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                const payload = {
                                                    productId: product._id,
                                                };
                                                dispatch(deleteProductById(payload));
                                            }}
                                        >
                                            DELETE
                                        </Button>

                                    </td>
                                </tr>
                            )
                            : null
                    }
                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return (
            <NewModal
                show={show}
                handleClose={handleClose}
                modalTitle={'Thêm Sản Phẩm'}
                handleSave={handleSave}
            >
                <Input
                    value={productname}
                    placeholder={'Tên Sản Phẩm'}
                    onChange={(e) => { setProductname(e.target.value) }}
                />

                <Input
                    type={'number'}
                    value={price}
                    placeholder={'Giá'}
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                <Input
                    value={infodesign}
                    placeholder={'Infodesign'}
                    onChange={(e) => { setInfodesign(e.target.value) }}
                />
                <Input
                    value={infomation}
                    placeholder={'Infomation'}
                    onChange={(e) => { setInfomation(e.target.value) }}
                />
                <Input
                    value={monitor}
                    placeholder={'Monitor'}
                    onChange={(e) => { setMonitor(e.target.value) }}
                />
                <Input
                    value={system}
                    placeholder={'System'}
                    onChange={(e) => { setSystem(e.target.value) }}
                />
                <Input
                    value={cpu}
                    placeholder={'Cpu'}
                    onChange={(e) => { setCpu(e.target.value) }}
                />
                <Input
                    value={ram}
                    placeholder={'Ram'}
                    onChange={(e) => { setRam(e.target.value) }}
                />
                <Input
                    value={thietKe}
                    placeholder={'ThietKe'}
                    onChange={(e) => { setThietKe(e.target.value) }}
                />
                <Input
                    value={pin}
                    placeholder={'pin'}
                    onChange={(e) => { setPin(e.target.value) }}
                />

                <Input
                    value={imageurl}
                    placeholder={'Image'}
                    onChange={(e) => { setImageurl(e.target.value) }}
                />

                <Input
                    type={'select'}
                    placeholder={'Danh Mục'}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {category.categories.map(option =>
                        <option key={option.value} value={option.id}>{option.categoryname}</option>
                    )}
                </Input>

                <Input
                    type={'select'}
                    placeholder={'Nhãn Hiệu'}
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                >
                    {brand.brands.map(option =>
                        <option key={option.value} value={option.id}>{option.brandname}</option>
                    )}
                </Input>


            </NewModal>
        )
    }

    const renderUpdateProductModal = (productItem) => {
        if (!productItem) {
            return null;
        } else {
            console.log(productItem)
            return (
                <NewModal
                    show={showUpdateModal}
                    handleClose={closeUpdateProductForm}
                    modalTitle={'Update Sản Phẩm'}
                    handleSave={updateProductForm}
                >
                    <Input
                        value={productItem.productname}
                        placeholder={'Tên Sản Phẩm'}
                        onChange={(e) => { setProductItem({ ...productItem, productname: e.target.value }) }}
                    />
                    <Input
                        type={'number'}
                        value={productItem.total}
                        placeholder={'Số lượng'}
                        onChange={(e) => { setProductItem({ ...productItem, total: e.target.value }) }}
                        style={{ display: 'none' }}
                    />
                    <Input
                        type={'number'}
                        value={productItem.sold}
                        placeholder={'Số lượng đã bán'}
                        onChange={(e) => { setProductItem({ ...productItem, sold: e.target.value }) }}
                        style={{ display: 'none' }}
                    />
                    <Input
                        type={'number'}
                        value={productItem.price}
                        placeholder={'Giá'}
                        onChange={(e) => { setProductItem({ ...productItem, price: e.target.value }) }}
                    />

                    <Input
                        value={productItem.infodesign}
                        placeholder={'Infodesign'}
                        onChange={(e) => { setProductItem({ ...productItem, infodesign: e.target.value }) }}
                    />
                    <Input
                        value={productItem.infomation}
                        placeholder={'Infomation'}
                        onChange={(e) => { setProductItem({ ...productItem, infomation: e.target.value }) }}
                    />
                    <Input
                        value={productItem.monitor}
                        placeholder={'Monitor'}
                        onChange={(e) => { setProductItem({ ...productItem, monitor: e.target.value }) }}
                    />
                    <Input
                        value={productItem.system}
                        placeholder={'System'}
                        onChange={(e) => { setProductItem({ ...productItem, system: e.target.value }) }}
                    />
                    <Input
                        value={productItem.cpu}
                        placeholder={'Cpu'}
                        onChange={(e) => { setProductItem({ ...productItem, cpu: e.target.value }) }}
                    />
                    <Input
                        value={productItem.ram}
                        placeholder={'Ram'}
                        onChange={(e) => { setProductItem({ ...productItem, ram: e.target.value }) }}
                    />
                    <Input
                        value={productItem.thietKe}
                        placeholder={'ThietKe'}
                        onChange={(e) => { setProductItem({ ...productItem, thietKe: e.target.value }) }}
                    />
                    <Input
                        value={productItem.pin}
                        placeholder={'Pin'}
                        onChange={(e) => { setProductItem({ ...productItem, pin: e.target.value }) }}
                    />
                    <Input
                        value={productItem.imageurl}
                        placeholder={'Imageurl'}
                        onChange={(e) => { setProductItem({ ...productItem, imageurl: e.target.value }) }}
                    />
                    {/* {
                        productItem.category ?
                            <Input
                                type={'select'}
                                value={productItem.category.id}
                                onChange={(e) => { setProductItem({ ...productItem, category: { name: productItem.category.name, id: e.target.value } }) }}
                                placeholder={productItem.category &&
                                    productItem.category.name ?
                                    productItem.category.name : 'Danh Mục Đã Bị Xóa'}
                            >
                                {createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.id}>{option.name}</option>
                                )}
                            </Input>
                            :
                            <Input
                                className="form-control"
                                value={productItem.categoryId}
                                onChange={(e) => { setProductItem({ ...productItem, category: { id: e.target.value } }) }}
                                placeholder={'Danh Mục Đã Bị Xóa'}
                            >
                                {createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )}
                            </Input>



                    } */}


                    <Input
                        type={'select'}
                        placeholder={'Danh Mục'}
                        onChange={(e) => { setProductItem({ ...productItem, category: { id: e.target.value } }) }}
                        placeholder={productItem.category &&
                            productItem.category.categoryname ?
                            productItem.category.categoryname : 'Danh Mục Đã Bị Xóa'}
                    >
                        {category.categories.map(option =>
                            <option key={option.value} value={option.id}>{option.categoryname}</option>
                        )}
                    </Input>

                    <Input
                        type={'select'}
                        placeholder={'Nhãn Hiệu'}
                        onChange={(e) => { setProductItem({ ...productItem, brand: { id: e.target.value } }) }}
                        placeholder={productItem.brand &&
                            productItem.brand.brandname ?
                            productItem.brand.brandname : 'Danh Mục Đã Bị Xóa'}
                    >
                        {brand.brands.map(option =>
                            <option key={option.value} value={option.id}>{option.brandname}</option>
                        )}
                    </Input>


                </NewModal>
            )
        }

    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);

    }

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <NewModal
                show={productDetailModal}
                handleClose={handleCloseProductDetailsModal}
                modalTitle={'Product Details'}
                size={'lg'}
            >
                <Row>
                    <Col md={6}>
                        <label className="key">Tên Sản Phẩm</label>
                        <p className="value">{productDetails.productname}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Giá</label>
                        <p className="value">{productDetails.price}  ₫</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Số lượng tổng</label>
                        <p className="value">{productDetails.total}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Số lượng đã bán</label>
                        <p className="value">{productDetails.sold}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Danh mục</label>
                        <p className="value">{productDetails.category.categoryname}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Nhãn Hiệu</label>
                        <p className="value">{productDetails.brand.brandname}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Mô tả</label>
                        <p className="value">{productDetails.infomation}</p>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <label className="key">Hình ảnh Sản Phẩm</label>
                        <div style={{ display: 'flex' }}>
                            {
                                <div className="productImgContainer">
                                    <img src={productDetails.imageurl} alt='some' />
                                </div>
                            }
                        </div>
                    </Col>
                </Row>

            </NewModal >
        )
    }

    return (
        <Layout sidebar>
            <Container >
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>

            {/* Model Add */}
            {renderAddProductModal()}

            {/* Model Product Details */}
            {renderProductDetailsModal()}

            {renderUpdateProductModal(productItem)}

            <ToastContainer />

        </Layout>
    )

}

export default Products