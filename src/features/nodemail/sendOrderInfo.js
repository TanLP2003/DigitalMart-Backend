const { sendMail } = require('./mail.service');

const EMAIL_ORDER_TEMPLATE = (order) => {
    const orderItems = order.items.map(item => {
        return `
      <tr class="item">
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td>${item.subTotalPrice}</td>
      </tr>
    `
    }).join('');
    const createdDate = order.createdAt.toString().split(' ').slice(1, 5).join(' ');
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            .container {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #f4f4f4;
            }

            .email {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 5px 20px;
                border-top: 2px solid #333;
            }

            body {
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                text-align: center;
                color: #777;
            }

            body h1 {
                font-weight: 300;
                margin-bottom: 0px;
                padding-bottom: 0px;
                color: #000;
            }

            body h3 {
                font-weight: 300;
                margin-top: 10px;
                margin-bottom: 20px;
                font-style: italic;
                color: #555;
            }

            body a {
                color: #06f;
            }

            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                color: #555;
            }

            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
                border-collapse: collapse;
            }

            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }

            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }

            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }

            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }

            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }

            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
                text-align: justify;
            }

            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }

            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
                text-align: justify;
            }

            .invoice-box table tr.item.last td {
                border-bottom: none;
            }

            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="email">
                <div class="invoice-box">
                    <table>
                        <tr class="top">
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <td class="title">
                                            DigitalMart
                                        </td>

                                        <td>
                                            OrderId #: ${order._id}<br />
                                            Created: ${createdDate}<br />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr class="information">
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <td>
                                            ${order.user.phonenumber}<br />
                                            ${order.user.username}<br />
                                            ${order.user.email}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr class="heading">
                            <td>Item</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                        ${orderItems}
                        <tr class="total">
                            <td></td>
                            <td></td>
                            <td colspan="3"><strong>Total:</strong> ${order.totalPrice}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>

    </html>
  `
}
const sendOrderInfo = async (emailAddress, order) => {
    await sendMail(
        {
            from: "phutanle372@gmail.com",
            to: emailAddress,
            subject: `[Digital Mart] Order ${order._id} created successfully`,
            html: EMAIL_ORDER_TEMPLATE(order)
        },
        (info) => {
            console.log("Email sent successfully!!!");
            console.log("Message ID: ", info.messageId);
        }
    )
}

module.exports = {
    sendOrderInfo
}