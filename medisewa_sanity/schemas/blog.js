export default {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200,
            }
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'createdBy',
            title: 'CreatedBy',
            type: 'string',
        },
        {
            name: 'creatorImage',
            title: 'Creator image',
            type: 'image',
        },
    ]
}