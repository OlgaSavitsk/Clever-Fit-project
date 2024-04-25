import { getMonthRange, getWeekRange } from './statistics/get-statistics-date-range';
import { isArrayWithItems } from './check-length.utils';
import { setTrainingType } from './get-popular-training-type';
import { handleFormate } from './handle-formate-date';
import { getPrevLocation } from './handle-prev-path.utils';
import { handleSortDate } from './handle-sort-date.utils';
import { setSelectOptions } from './set-select-options';
import { transformPeriod } from './transform-period.utils';
import { updatePals, updateState } from './update-state.utils';

export * from './statistics/handle-statistics-data';
export * from './statistics/handle-statistics-frequent';


export {
    getPrevLocation,
    handleFormate,
    handleSortDate,
    updateState,
    transformPeriod,
    setTrainingType,
    updatePals,
    isArrayWithItems,
    setSelectOptions,
    getWeekRange,
    getMonthRange,
};
