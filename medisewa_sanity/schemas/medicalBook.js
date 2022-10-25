export default {
    name: 'medical-books',
    title: 'Medical Books',
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
            name: 'author',
            title: 'Author',
            type: 'string',
        },
        {
            name: 'publication',
            title: 'Publication',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'categories',
            title: 'Categories', 
            type: 'array',
            of: [{type: 'string'}],
            options: {
              list: [ 
                {value: 'clinical-books', title: 'Clinical Book'},
                {value: 'basic-science-book', title: 'Basic Science Book'}, 
                {value: 'dental-book', title: 'Dental Book'},  
                {value: 'nursing-book', title: 'Nursing Book'},
                {value: 'pg-book', title: 'PG Book'},          
                ],
                layout: 'radio' 
              },
          },
          {
            name: 'newOrOld',
            title: 'New or Old', 
            type: 'array',
            of: [{type: 'string'}],
            options: {
              list: [ 
                {value: 'new', title: 'New Book'},
                {value: 'old', title: 'Second Hand Book'},          
                ],
                layout: 'radio' 
              },
          },
    ]
}