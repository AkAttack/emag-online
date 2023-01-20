module.exports = function QuoteTemplate(quote) {
  const customer = quote.customer
  const cart = quote.cart
  const quoteDetails = quote.quoteDetails
  const calculation = quote.calculation
  const adminInfo = quote.adminInfo

  return (
    `
    <style>
      .quoteBody{
        background-color: #F6F6F6; 
        margin: 0;
        padding: 0;
        height: 100%;
      }
      h1,h2,h3,h4,h5,h6{
        margin: 0;
        padding: 0;
      }
      p{
        margin: 0;
        padding: 0;
      }
      .container{
        width: 80%;
        margin-right: auto;
        margin-left: auto;
      }
      .brand-section{
       background-color: #0d1033;
       padding: 10px 40px;
      }
      .logo{
        width: 50%;
      }
      .row{
        display: flex;
        flex-wrap: wrap;
      }
      .col-6{
        width: 50%;
        flex: 0 0 auto;
      }
      .text-white{
        color: #fff;
      }
      .company-details{
        float: right;
        text-align: right;
      }
      .body-section{
        padding: 16px;
        border: 1px solid gray;
      }
      .heading{
        font-size: 20px;
        margin-bottom: 08px;
      }
      .sub-heading{
        color: #262626;
        margin-bottom: 05px;
      }
      table{
        background-color: #fff;
        width: 100%;
        border-collapse: collapse;
      }
      table thead tr{
        border: 1px solid #111;
        background-color: #f2f2f2;
      }
      table td {
        vertical-align: middle !important;
        text-align: center;
      }
      table th, table td {
        padding-top: 08px;
        padding-bottom: 08px;
      }
      .table-bordered{
        box-shadow: 0px 0px 5px 0.5px gray;
      }
      .table-bordered td, .table-bordered th {
        border: 1px solid #dee2e6;
      }
      .text-right{
        text-align: end;
      }
      .w-20{
        width: 20%;
      }
      .float-right{
        float: right;
      }
    </style>
    <div class='quoteBody' id='quoteTemplate'>
      <div class="container">
          <div class="brand-section">
              <div class="row">
                  <div class="col-6">
                      <h1 class="text-white">E-Mag Online</h1>
                  </div>
                  <div class="col-6">
                      <div class="company-details">
                          <p class="text-white">EMag Online shopping</p>
                          <p class="text-white">Turkeyne, Georgetown</p>
                          <p class="text-white">+592 663-8816</p>
                      </div>
                  </div>
              </div>
          </div>

          <div class="body-section">
              <div class="row">
                  <div class="col-6">
                      <h2 class="heading">Quote ID: ${quoteDetails.quoteId}</h2>
                      <p class="sub-heading">Order Date: 20-20-2021 </p>
                      <p class="sub-heading"> </p>
                      <p class="sub-heading"> </p>
                  </div>
                  <div class="col-6">
                      <p class="sub-heading">Full Name: ${customer.nameFirst} ${customer.nameLast} </p>
                      <p class="sub-heading">Address: ${customer.address} </p>
                      <p class="sub-heading">Phone Number: ${customer.mobile} </p>
                      <p class="sub-heading">Cust. ID: ${customer.id}  </p>
                  </div>
              </div>
          </div>

          <div class="body-section">
              <h3 class="heading">Ordered Items</h3>
              <br/>
              <table class="table-bordered">
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th class="w-20">Price</th>
                          <th class="w-20">Quantity</th>
                          <th class="w-20">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                    
                      ${cart.map((item, index)=>(
                        `
                        <tr key=${'cart'+index}>
                          <td><a href=${item.URL} rel='noreferrer' target='_blank'>${item.description}</a></td>
                          <td>${item.unitItemPriceUSD}</td>
                          <td>${item.quantity}</td>
                          <td>${item.quantityPriceTotalUSD}</td>
                        </tr>
                        `
                      ))}
                      <tr>
                          <td colSpan="3" class="text-right">Items Total (USD)</td>
                          <td> ${calculation.cartSubTotal_USD}</td>
                      </tr>
                      <tr>
                          <td colSpan="3" class="text-right">(@${adminInfo.USD_Rates}) Items Total (GYD) </td>
                          <td> ${calculation.cartSubTotal_GYD}</td>
                      </tr>
                      <tr>
                          <td colSpan="3" class="text-right">Items Total Weight </td>
                          <td> ${calculation.cartWeight}</td>
                      </tr>

                      <tr>
                          <td colSpan="4" class="text-right"> </td>
                      </tr>

                      <tr>
                          <td colSpan="3" class="text-right">Freight Charges (GYD)</td>
                          <td> ${calculation.freightAir}</td>
                      </tr>
                      <tr>
                          <td colSpan="3" class="text-right">Business Charges (GYD)</td>
                          <td> ${calculation.businessCharge}</td>
                      </tr>
                      <tr>
                          <td colSpan="3" class="text-right">Grand Total (GYD)</td>
                          <td> ${calculation.grandTotal}</td>
                      </tr>
                  </tbody>
              </table>
              <br/>
              <h3 class="heading">Payment Status: Paid</h3>
              <h3 class="heading">Payment Mode: Cash on Delivery</h3>
          </div>

          <div class="body-section">
              <p>&copy; Copyright 2021 - Fabcart. All rights reserved. 
                  <a href="https://www.fundaofwebit.com/" class="float-right">www.fundaofwebit.com</a>
              </p>
          </div>      
      </div>      
    </div>  
    `
   )
}
