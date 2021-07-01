import _ from 'lodash';

export const findByName = (arr, search) => {
    return _.filter(arr, (item) => _.includes(item.name, search));
}