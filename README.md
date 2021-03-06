# Next.js TypeScript Otoli Front-end

![Otoli](static/logo_sticky.svg)

## Stack
- **Next.js** for SSR
- **TypeScript** for sake of god
- **StyledComponent** for styling components
- **Semantic UI**
- **SEO & analytics**(Google Analytics, Facebook Pixel, Next SEO)
- ~~Storybook~~
- **Jest** & **Enzyme**
- **Docz** for documenting

### Load from CDN
- font-awesome@5

## Seting up
### Installation

```sh
git clone https://gitlab.com/otoli/mvp-front
cd mvp-front
yarn
```
####  Test
```bash
yarn test # test
yarn test:watch
yarn test:coverage # report coverage
```

####  Docs
```bash
yarn docz:dev # run docs webserver in http://127.0.0.1:3000/
yarn docz:build # build docs in docz```


#### Development

```bash
yarn start:dev # run
```

#### Serve

```bash
yarn
yarn build # create .next directory
yarn start # start server
```

## Configuration

Set SEO & analytics variables
> src/constants/env'

```typescript
export const GA_TRACKING_ID = '';
export const FB_TRACKING_ID = '';
export const SENTRY_TRACKING_ID = '';

// for meta tag <og & twitter>
export const SITE_NAME = '';
export const SITE_TITLE = '';
export const SITE_DESCRIPTION = '';
export const SITE_IMAGE = '';
```

If each variable evaluated false, it does not load related library

## Usage
This project is biult on top of [Next.js](https://nextjs.org/docs). 

## Folder Structure

```
└── pages
    │   # [Next.js files]
    ├── _app
    ├── _document
    ├── _error
    │
    │   # [Otoli Pages]
    ├── index
    ├── search-results
    ├── car
    ├── checkout
    ├── peyment_succeed
    ├── request
    ├── requests
    ├── complete-register
    ├── profile
    ├── add-car
    ├── set-car-timing
    └── faq
└── src
    ├── @types
    ├── actions
    │   # [API calls, wrapped in an async function]
    ├── API
    │   ├── Get
    │   │   ├── getCarAvailabilities
    │   │   ├── getCarDiscounts
    │   │   ├── getCarIsMine
    │   │   ├── getCar
    │   │   ├── getFactoryBrands
    │   │   ├── getFactoryCars
    │   │   ├── getFAQ
    │   │   ├── getLocations
    │   │   ├── getOrderRequests
    │   │   ├── getOrderRequest
    │   │   ├── getSearchForRent
    │   │   ├── getUserCars
    │   │   └── getUser
    │   └── Set
    │       ├── deleteCarAvailability
    │       ├── editCarPartial
    │       ├── newCarAvailability
    │       ├── newCarMedia
    │       ├── newRentRequest
    │       ├── setCarAvailablity
    │       ├── setCarDiscount
    │       ├── setRequestsActions
    │       ├── setUserImage
    │       ├── setUserNameLastName
    │       └── setUsername
    ├── components
    │   ├── 404
    │   │   └── 404
    │   ├── Car
    │   │   ├── CarDateRange
    │   │   ├── CarNav
    │   │   ├── CarSideCard
    │   │   └── Details
    │   ├── Cards
    │   │   ├── BoxCard
    │   │   ├── CarCardPlaceholder
    │   │   ├── CarCard
    │   │   ├── ContentCard
    │   │   ├── ContentSideCard
    │   │   ├── DateGrid
    │   │   ├── Pelak
    │   │   ├── PriceCard
    │   │   ├── RequestCardPlaceholder
    │   │   ├── RequestCard
    │   │   └── UserCard
    │   ├── Carousel
    │   │   ├── PanelsWrapper
    │   │   └── Panel
    │   ├── Comments
    │   │   └── CommentSection
    │   ├── Footer
    │   │   └── Footer
    │   ├── Forms
    │   │   ├── AddCarForm
    │   │   ├── AddCarImageUpload.ts
    │   │   ├── CompleteRegisterForm
    │   │   ├── DiscountsSelector
    │   │   ├── indexForm.test
    │   │   ├── IndexForm
    │   │   ├── SetCarTimingForm
    │   │   └── TimeRangesSelector
    │   ├── Header
    │   │   ├── Header
    │   │   └── SubHeader
    │   ├── Layout
    │   │   └── Layout
    │   ├── List
    │   │   └── List
    │   ├── Logo
    │   │   └── Logo
    │   ├── Modals
    │   │   ├── LoginModal
    │   │   ├── LoginStyle.ts
    │   │   ├── ModalCore
    │   │   └── ModalWrapper
    │   ├── Nav
    │   │   └── Nav
    │   ├── row
    │   │   └── Sections
    │   ├── Search
    │   │   ├── FilterAndSortBar
    │   │   ├── FilterType
    │   │   ├── ResultsCards
    │   │   └── SearchBar
    │   └── ShareBar
    │       └── ShareBar
    ├── constants
    │   ├── env
    │   └── options
    ├── theme
    │   ├── Colors
    │   ├── Directions
    │   ├── GlobalStyle
    │   ├── Interfaces
    │   └── Spacings
    │── utils
    │   ├── date
    │   ├── numbers
    │   └── timer
    │── store.ts
    └── i18n.js
└── static
    ├── fonts
    └── locales
└── babel.config.js
└── next.config.js
└── routes.js
└── server.js

```
