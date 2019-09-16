// Cars
import { REQUEST_getCar } from './Get/getCar';
import { REQUEST_editCarPartial } from "./Set/editCarPartial";

// Lists
import { REQUEST_getLocations } from './Get/getLocations';
import { REQUEST_getFactoryBrands } from './Get/getFactoryBrands';
import { REQUEST_getFactoryCars } from './Get/getFactoryCars';

// Search For Cars
import { REQUEST_getSearchForRent } from './Get/getSearchForRent';

// User Stuff
import { REQUEST_getUser } from './Get/getUser';
import { REQUEST_getUserCars } from './Get/getUserCars';
import { REQUEST_getCarIsMine } from './Get/getCarIsMine';
import { REQUEST_setUserImage } from './Set/setUserImage';
import { REQUEST_setUsetNameLastName } from './Set/setUserNameLastName';
import { REQUEST_setUsername  } from './Set/setUsername';

// Car Availabilities
import { REQUEST_getCarAvailabilities } from './Get/getCarAvailabilities';
import { REQUEST_newCarAvailability } from "./Set/newCarAvailability";
import { REQUEST_setCarAvailability } from "./Set/setCarAvailablity";
import { REQUEST_deleteCarAvailability } from "./Set/deleteCarAvailability";

// Car Discounts
import { REQUEST_getCarDiscounts } from "./Get/getCarDiscounts";
import { REQUEST_setCarDiscounts } from "./Set/setCarDiscount";

// Car Media
import { REQUEST_newCarMedia } from './Set/newCarMedia';

// Rent Requests
import { REQUEST_getOrderRequests } from './Get/getOrderRequests';
import { REQUEST_getOrderRequest } from './Get/getOrderRequest'
import { REQUEST_newRentRequest } from './Set/newRentRequest';
import { REQUEST_setOrderStatus } from './Set/setRequestsActions';

// Other
import { REQUEST_getFAQ } from "./Get/getFAQ";

// Out of service
import {REQUEST_set_out_of_service} from './Set/setOutOfServie'

export {
  REQUEST_getCar,
  REQUEST_getLocations,
  REQUEST_getFactoryBrands,
  REQUEST_getFactoryCars,
  REQUEST_getSearchForRent,
  REQUEST_getOrderRequests,
  REQUEST_getUser,
  REQUEST_getUserCars,
  REQUEST_getCarIsMine,
  REQUEST_getCarAvailabilities,
  REQUEST_newRentRequest,
  REQUEST_setOrderStatus,
  REQUEST_setUserImage,
  REQUEST_setUsetNameLastName,
  REQUEST_setUsername,
  REQUEST_newCarAvailability,
  REQUEST_setCarAvailability,
  REQUEST_editCarPartial,
  REQUEST_deleteCarAvailability,
  REQUEST_getCarDiscounts,
  REQUEST_setCarDiscounts,
  REQUEST_newCarMedia,
  REQUEST_getOrderRequest,
  REQUEST_getFAQ,
  REQUEST_set_out_of_service
};
