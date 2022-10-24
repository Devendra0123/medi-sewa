export default {
    name: 'pastYearQuestions',
    title: 'Past Year Questions',
    type: 'document',
    fields: [
        {
            name: 'file',
            title: 'File',
            type: 'file',
        },
        {
            name: 'year',
            title: 'Year',
            type: 'array',
            of: [{type: 'string'}],
            options: {
              list: [ 
                {value: 'first-year', title: 'First Year'},
                {value: 'second-year', title: 'Second Year'},
                {value: 'third-year', title: 'Third Year'},
                {value: 'fourth-year', title: 'Fourth Year'},
                {value: 'fifth-year', title: 'Fifth Year'},          
                ],
                layout: 'radio' 
              },
        },
        {
            name: 'program',
            title: 'Program',
            type: 'array',
            of: [{type: 'string'}],
            options: {
              list: [ 
                {value: 'bds', title: 'BDS'},
                {value: 'mbbs', title: 'MBBS'},          
                ],
                layout: 'radio' 
              },
        },
    ]
}