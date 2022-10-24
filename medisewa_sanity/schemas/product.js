export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            } 
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        },
        {
            name: 'categories',
            title: 'Categories', 
            type: 'array',
            of: [{type: 'string'}],
            options: {
              list: [ 
                {value: 'dental-products', title: 'Dental Products'},
                {value: 'scrub', title: 'Scrub'}, 
                {value: 'others', title: 'Others'},          
                ],
                layout: 'radio' 
              },
          },
    ]
}