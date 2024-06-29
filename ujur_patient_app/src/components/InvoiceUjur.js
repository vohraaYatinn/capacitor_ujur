import React, { useRef, useState } from 'react';
import { Modal, Button, Table } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./invoice.css"
import logoDark from "../images/logo-dark.png"
import moment from 'moment';

const InvoiceModal = ({ show,setShow, invoice, downloadInvoice }) => {
    const handleClose = () =>{
        setShow(false)
    }
    const invoiceContainerRef = useRef(null)
  return (
    
      <Modal
          visible={show}
          onCancel={handleClose}
          footer={[
              <Button key="download" type="primary" onClick={() => {
                  if (invoiceContainerRef.current) {
                      downloadInvoice(invoiceContainerRef.current.innerHTML);
                  }
              }}>
                  Download Invoice
              </Button>,
          ]}
          title={`Invoice #${invoice.id}`}
      >
          {invoice && (
              <div className="container invoice-container" ref={invoiceContainerRef} style={{ overflow: 'auto' }}>
                  <div className="row invoice-header">
                      <div className="col-sm-6">
                          <h1>INVOICE</h1>
                          <p>
                              Invoice #: {invoice.id}
                              <br />
                              Date: {moment(invoice?.appointment?.date_appointment).format("DD, MM, YYYY")}
                              <br />
                          </p>
                      </div>
                      <div className="col-sm-6 text-right"></div>
                  </div>
                  <div className="row invoice-details">
                      <div className="col-sm-6">
                          <h5>Bill To:</h5>
                          <p>
                              {invoice?.appointment?.patient?.full_name}
                              <br />
                              {invoice?.appointment?.patient?.block}
                              <br />
                              {invoice?.appointment?.patient?.district}
                          </p>
                      </div>
                      <div className="col-sm-6 text-right">
                          <h5>Appointment Details:</h5>
                          <p>
                              Appointment ID: {invoice?.appointment?.id}
                              <br />
                              Booking Date: {moment(invoice?.appointment?.date_appointment).format("dddd, MMM D, YYYY")}
                          </p>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12">
                          <Table bordered dataSource={invoice.items} pagination={false}>
                              <Table.Column title="Description" dataIndex="name" key="name" />
                              <Table.Column
                                  title="Doctor fees"
                                  key="doctorFees"
                                  render={(text, record) => (
                                      `Rs ${(parseFloat(record.quantity) - parseFloat(record.quantity) * 0.18).toFixed(2)}`
                                  )}
                              />
                              <Table.Column
                                  title="Booking charges"
                                  key="bookingCharges"
                                  render={(text, record) => (
                                      `Rs ${(parseFloat(record.price) - parseFloat(record.price) * 0.18).toFixed(2)}`
                                  )}
                              />
                          </Table>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12">
                          <table className="table table-bordered">
                              <tfoot>
                                  <tr>
                                      <th colSpan={3} className="text-right">
                                          Tax (18%)
                                      </th>
                                      <th>Rs {((parseFloat(invoice?.items[0]?.quantity) + parseFloat(invoice?.items[0]?.price)) * 0.18).toFixed(2)}</th>
                                  </tr>
                                  <tr>
                                      <th colSpan={3} className="text-right">
                                          Total
                                      </th>
                                      <th>Rs {(parseFloat(invoice?.items[0]?.quantity) + parseFloat(invoice?.items[0]?.price)).toFixed(2)}</th>
                                  </tr>
                              </tfoot>
                          </table>
                      </div>
                  </div>
                  <div className="row invoice-footer">
                      <div className="col-12">
                          <p>Thank you for using UJUR!</p>
                      </div>
                  </div>
                  <img src={logoDark} alt="Hospital Logo" className="watermark" />
              </div>
          )}
      </Modal>
  );
};

const InvoiceUjur = ({show, setShow, downloadInvoice, appointmentDetails}) => {

  console.log(appointmentDetails)
  const invoice = {
    appointment:appointmentDetails,
    hospital:appointmentDetails?.doctor?.hospital?.name,
    id: '00'+appointmentDetails?.id,
    customerName: appointmentDetails?.patient?.full_name,
    date: '2024-06-23',
    items: [
      { name: 'Item 1', quantity: appointmentDetails?.revenues[0]?.doctor_fees, price: appointmentDetails?.revenues[0]?.booking_amount },
    ],
  };
  const check_invoice = (html) =>{
    downloadInvoice(html)
  }


  return (
    
      <InvoiceModal show={show} setShow={setShow} invoice={invoice} downloadInvoice={check_invoice}/>
   
  );
};

export default InvoiceUjur;
