import nodemailer from 'nodemailer';

export const sendMail = async(req, res) => {

    const cartList = req.body.cartList;

    let date = new Date(cartList.selected); // assuming cartList.selected is a date

    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    let year = date.getFullYear();

    let formattedDate = month + '/' + day + '/' + year;


  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'partysafariohio@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: 'Tentlify Rentals <partysafariohio@gmail.com>',
    to: `${cartList.email}`,
    subject: `Tentlify Rentals Quote - ${cartList.title}`,
    html: `
    <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          .my-table {
            width: 100%;
            border: 1px solid black;
          }
          .my-table th {
            text-align: center;
            background-color: #acacac;
          }
          .my-table tr {
            text-align: center;
            
          }
          .my-table-2 {
            width: 100%;
            border: 1px solid black;
            margin-top: 10px;
          }
          .my-table-2 th {
            text-align: center;
            background-color: #acacac;
          }
          .my-table-2 tr {
            text-align: center;
            
          }
          .product-image {
            width: 100%;
            max-width: 250px;
            height: auto;
            border-radius: 5px;
            object-fit: contain;
          }
          .flex-col-container-start {
                display: flex;
                flex-direction: column;
                align-items: center;
          }
          .flex-container-end {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            .flex-container-center {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        </style>
      </head>
     
      <body>
      <div class="flex-container-center">
      <img style="width: 100px; height: 100px;" src="https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FTenlify_Logo_Thin_Small.png?alt=media&token=977d961e-7d08-4031-b2d1-52cfa3d2cada" alt="partySafariLogo" />
      </div>
        <h1>Your Quote</h1>
        <h3>Thank you for your interest in Tentlify Rentals! Below is your quote:</h3>
        <h4>Event Date: ${formattedDate}</h4>
        <h4>Email: ${cartList.email}</h4>
        <table class="my-table">
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Item Price</th>
          </tr>
          ${cartList.cart.map(item => `
            <tr>
            <td>
                <img class="product-image" src="${item.image}" />
                <div>${item.product}</div>
              </td>
              
              <td>${item.cartQuantity}</td>
              <td >$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td >$${(item.price * item.cartQuantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
           
          `).join('')}

         
          
            
          
        </table>

        <table class="my-table-2">
          <tr >
            <th>Subtotal</th>
            <th>Tax</th>
            <th>Delivery Fee</th>
            <th>Total</th>
          </tr>
          
            <tr>
              <td>$${cartList.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>$${cartList.taxPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>$${cartList.deliveryFee.toFixed(2)}</td>
              <td><b>$${cartList.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
            </tr>
           
          
        </table>
      
      </body>
    </html>
  `,
  };

  let info = await transporter.sendMail(mailOptions);

  res.send('Email sent: ' + info.response);

}