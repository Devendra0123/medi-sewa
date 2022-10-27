
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import product from './product';
import banner from './banner';
import ebook from './ebook';
import blog from './blog';
import user from './user';
import pastYearQuestions from './pastYearQuestions';
import order from './order';
import medicalBook from './medicalBook';
import orderData from './orderData';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,medicalBook, banner, ebook, blog, user, pastYearQuestions,orderData, order
  ]),
})
