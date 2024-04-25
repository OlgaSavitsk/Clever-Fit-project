import { Location } from 'react-router-dom';
import { RouterState } from 'redux-first-history';

export const getPrevLocation = (router: RouterState): Location => {
    const previousLocations = router.previousLocations?.find(
        (location) => location.location?.key !== router.location?.key,
    );

    return previousLocations?.location as Location;
};
