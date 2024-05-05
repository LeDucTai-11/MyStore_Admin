import { wrapIntoResponse } from '../helpers';
import { mockVoucherList } from './data';

const getMockVoucherList = () => wrapIntoResponse(mockVoucherList);

export { getMockVoucherList };
