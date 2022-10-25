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
                {value: 'medical-products', title: 'Medical Products'},          
                ],
                layout: 'radio' 
              },
          },
          {
            name: 'subCategories',
            title: 'Sub Categories', 
            type: 'array',
            of: [{type: 'string'}],
            options: {
              list: [
                {value: 'scrub', title: 'Scrub and Apron'},  
                {value: 'medical-product', title: 'Medical Products'}, 
                {value: 'prosthodontics', title: 'Prosthodontic Products'},
                {value: 'conservative-endodontics', title: 'Conservative and Endodontics Products'}, 
                {value: 'orthodontics', title: 'Orthodontic Products'}, 
                {value: 'oral-maxillofacial-surgery', title: 'Oral Maxillofacial Surgery Products'},
                {value: 'oral-anatomy-pathology', title: 'Oral Anatomy and Pathology Products'}, 
                {value: 'pedodontics', title: 'Pedodontics Products'},           
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
                {value: 'new', title: 'New Product'},
                {value: 'old', title: 'Second Hand Product'},          
                ],
                layout: 'radio' 
              },
          },
    ]
}