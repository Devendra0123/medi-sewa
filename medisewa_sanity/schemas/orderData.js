export default {
    name: 'orderData',
    title: 'Order Data',
    type: 'document',
    fields: [
       {
        name: 'productName',
        title: 'Product Name',
        type: 'string'
       },
       {
        name: 'productPrice',
        title: 'Product Price',
        type: 'number'
       },
       {
        name: 'oldOrNew',
        title: 'New or Old Product',
        type: 'string'
       },
       {
        name: 'productQuantity',
        title: 'Product Quantity',
        type: 'number'
       },
    ]
}