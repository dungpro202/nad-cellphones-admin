import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";

import "./style.css";

/**
 * @author
 * @function Orders
 **/

const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// var x = 5200000;

// const testCash = (cash) => {
//   cash = cash.toLocaleString('vi', { style: 'currency', currency: 'VND' });
// }


const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const toggleClass = (e) => {
    const tag = e.target.parentElement.parentElement
    console.log('tag', tag)
    tag.classList.toggle("mystyle");
  };


  const onOrderUpdate = (status,id) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var deliveryDate = date+' '+time;
    const payload = {
      status,
      deliveryDate,
    };
    dispatch(updateOrder(payload,id));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      <Table bordered hover size="sm" variant="">
        <thead>
          <tr>
            <th>#</th>
            <th>Người Nhận</th>
            <th>Địa Chỉ Giao Hàng</th>
            <th>Số Điện Thoại</th>
            <th>Mã đơn hàng</th>
            <th>Số Tiền Thanh Toán</th>
            <th>Trạng Thái Đơn Hàng</th>
            <th>Chi Tiết</th>
          </tr>
        </thead>
        <tbody>
          {order.orders.map((orderItem, index) => (
            <>
              <tr >
                <td>{index + 1}</td>
                <td>{orderItem.fullname}</td>
                <td style={{ maxWidth: '400px' }}>{orderItem.address}</td>
                <td>{orderItem.phone}</td>
                <td>{orderItem.id}</td>
                <td>{formatCash(orderItem.totalmoney)} ₫</td>
                <td>{orderItem.status}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => { toggleClass(e) }}
                  >
                    =
                  </Button>
                </td>
              </tr>
              <tr className="hidden">
                <td colspan="9">
                  <div>
                    <div className="orderTop">
                      <Table variant="parimary">
                        <thead>
                          <tr>
                            <th className="title"></th>
                            <th className="title">Danh Sách Sản Phẩm</th>
                            <th className="title">Hình Ảnh</th>
                            <th className="title">Giá Tiền</th>
                            <th className="title">Số Lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItem.orderItems.map((item, index) => (
                            <tr key={index}>
                              <td className="value">{index + 1}</td>
                              <td className="value">{item.productname}</td>
                              <td className="value"><img width="50px" height="50px" src={item.imageurl} alt={item.productName} /></td>
                              <td className="value">{formatCash(item.pricecurrent)} ₫</td>
                              <td className="value">{formatCash(item.quantity)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colspan="2" className="title">Hình Thức Thanh Toán : Ship Cod</td>
                            {/* <td colspan="2" className="title">Tổng Tiền: {formatCash(orderItem.totalAmount)} ₫</td> */}
                            <td colspan="2" className="title" style={{ color: 'blue' }}>Trạng Thái đơn hàng: {orderItem.status}</td>
                          </tr>
                          <tr>
                            <td colspan="2" className="title" style={{ color: 'green' }}>Ngày đặt hàng : {orderItem.orderDate}</td>
                            {/* <td colspan="2" className="title">Tổng Tiền: {formatCash(orderItem.totalAmount)} ₫</td> */}

                            <td colspan="2" className="title" style={{ color: 'black' }}>Ngày giao hàng: {orderItem.deliveryDate ? orderItem.deliveryDate : `Chưa giao hàng`}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                    <div
                      className="orderBottom"
                    >
                      <div className="orderTrack">
                        {/* {orderItem.orderStatus.map((status) => (
                          <div
                            className={`orderStatus ${status.isCompleted ? "active" : ""
                              }`}
                          >
                            <div
                              className={`point ${status.isCompleted ? "active" : ""}`}
                            ></div>
                            <div className="orderInfo">
                              <div className="status">{status.type}</div>
                              <div className="date">{formatDate(status.date)}</div>
                            </div>
                          </div>
                        ))} */}

                      </div>

                      {/* select input to apply order action *
                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        <select onChange={(e) => setType(e.target.value)}>
                          <option value={""}>Trạng Thái</option>
                           {orderItem.orderStatus.map((status) => {
                            return (
                              <>
                                {!status.isCompleted ? (
                                  <option key={status.type} value={status.type}>
                                    {status.type}
                                  </option>
                                ) : null}
                              </>
                            );
                          })} 
                        </select>
                      </div>
                       button to confirm action */}

                      <div
                        style={{
                          padding: "0 50px",
                          boxSizing: "border-box",
                        }}
                      >
                        {
                          orderItem.status == "pending"
                            ?
                            <button className="btn btn-primary" onClick={() => onOrderUpdate("confirm",orderItem.id)}>
                              Xác Nhận
                            </button>
                            : null
                        }
                        {
                          orderItem.status == "pending" || orderItem.status == "confirm"
                            ?
                            <button className="btn btn-primary" onClick={() => onOrderUpdate("cancel",orderItem.id)}
                              style={{ backgroundColor: 'red', marginLeft: '15px' }}>
                              Cancel
                            </button>
                            : null
                        }

                        {
                          orderItem.status == "confirm"
                            ?
                            <button className="btn btn-primary" onClick={() => onOrderUpdate("delivery",orderItem.id)}
                              style={{ backgroundColor: 'black', marginLeft: '15px' }}
                            >
                              Đã giao
                            </button>
                            : null
                        }


                      </div>
                    </div>
                  </div>

                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </Layout>
  )
};

export default Orders;