export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'shippingDetails',
            title: 'Shipping Details',
            type: 'object',
            fields: [
                {
                    name: 'customerName',
                    title: 'Customer Name',
                    type: 'string'
                },
                {
                    name: 'email',
                    title: 'Customer Email',
                    type: 'string'
                },
                {
                    name: 'location',
                    title: 'Customer Location',
                    type: 'string'
                },
                {
                    name: 'contactNumber',
                    title: 'Contact Number',
                    type: 'number'
                },
            ]
        },
        {
            name: 'totalQuantity',
            title: 'Total Quantity',
            type: 'number',
        },
        {
            name: 'totalPrice',
            title: 'Total Price',
            type: 'number',
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{type: 'product'}]
        },

    ]
}