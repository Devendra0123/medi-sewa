export interface ProductType {
    _createdAt: date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: date;
    categories: string[];
    details: string;
    name: string;
    price: number;
    slug: {
        _type: string;
        current: string
    };
    image: {
        _key: string;
        _type: string;
        asset: {
            _ref: string;
            _type: string
        }
    }[];
}

export type BannerType = {
    _createdAt: date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: date;
    image:{
        _type: string;
        asset: {
            _ref: string;
            _type: string
        }
    };
    offer: string;
}

export type EbookType = {
    _createdAt: date;
    _id: string;
    _rev: string;
    _updatedAt: date;
    author: string;
    description: string;
    file:{
        _type: string;
        asset: {
            _ref: string;
            _type: string
        }
    };
    image:{
        _type: string;
        asset: {
            _ref: string;
            _type: string
        }
    };
    name: string;
    publication: string;
    slug: {
        _type: string;
        current: string
    };
}

export type PastYearQuestionType = {
    _createdAt: date;
    _id: string;
    _rev: string;
    _updatedAt: date;
    file:{
        _type: string;
        asset: {
            _ref: string;
            _type: string
        }
    };
    year: string[];
    program: string[];
}