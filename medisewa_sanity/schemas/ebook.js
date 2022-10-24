export default {
    name: 'ebook',
    title: 'Ebook',
    type: 'document',
    fields: [
        {
            name: 'file',
            title: 'File',
            type: 'file',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
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

    ]
}