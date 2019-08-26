import { i18n, withTranslation } from '../src/i18n';
import * as React from 'react';
import Layout from '../src/components/Layout';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import { connect } from '../src/store';
import {
    REQUEST_getFactoryBrands,
    REQUEST_getFactoryCars,
    REQUEST_getLocations,
    REQUEST_getSearchForRent
} from '../src/API';
import {
    FilterAndSortBar,
    ResultsCards,
    SearchBar
} from '../src/components/Search';
import Router, { withRouter } from 'next/router';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

export default withRouter(
    withTranslation('common')(
        connect(state => state)(
            class extends React.Component<{
                t: any;
                router: any;
                href: any;
                user: any;
            }> {
                static async getInitialProps(props) {
                    if (typeof window === 'undefined') {
                        // console.log('Server Side Router Query', props.query);
                    } else {
                        // console.log('Client side Router Query', props.query);
                    }
                    let queryString = '';
                    const {
                        start,
                        end,
                        min_price,
                        max_price,
                        deliver,
                        brand,
                        model,
                        city,
                        order
                    } = props.query;
                    if (start && end) {
                        queryString = queryString + `location_id=${city}&`;
                        queryString = queryString + `start_date=${start}&end_date=${end}&`;
                        if (brand) queryString = queryString + `brand_id=${brand}&`;
                        if (model) queryString = queryString + `car_id=${model}&`;
                        if (deliver) {
                            queryString = queryString + `deliver_at_renters_place=1&`;
                        }
                        if (min_price && max_price) {
                            let max = max_price;
                            if (max === 2000000) {
                                max = 100000000;
                            }
                            queryString =
                                queryString + `min_price=${min_price}&max_price=${max}&`;
                        }
                        queryString = queryString + `o=${order}&`;
                    }
                    const res = await REQUEST_getSearchForRent({
                        page: 0,
                        limit: 8,
                        queryString
                    });
                    return {
                        namespacesRequired: ['common'],
                        results: res
                    };
                }

                state = {
                    error: '',
                    city: 1,
                    cityName: null,
                    showFilters: false,
                    citiesFarsi: [{ text: 'کمی صبر کنید...', value: null }],
                    citiesEnglish: [{ text: 'کمی صبر کنید...', value: null }],
                    startDate: moment(),
                    endDate: moment(),
                    price: [0, 2000000],
                    priceSort: 'price',
                    focusedInput: null,
                    brand: null,
                    brandsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
                    brandsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
                    model: null,
                    modelsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
                    modelsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
                    brandLoading: true,
                    modelLoading: true,
                    deliverAtRentersPlace: false,
                    loadingResults: true,
                    lodingMore: false,
                    noResult: false,
                    results: [{}],
                    carBodyType: [],
                    latest_result_key: null,
                    page: 1,
                    total_count: 0,
                    stats: {
                        deliver_at_renters_place: 0,
                        body_style_set: [
                            {
                                id: 1,
                                count: 0
                            },
                            {
                                id: 2,
                                count: 0
                            },
                            {
                                id: 3,
                                count: 0
                            },
                            {
                                id: 4,
                                count: 0
                            },
                            {
                                id: 5,
                                count: 0
                            },
                            {
                                id: 6,
                                count: 0
                            },
                            {
                                id: 7,
                                count: 0
                            },
                            {
                                id: 8,
                                count: 0
                            },
                            {
                                id: 9,
                                count: 0
                            }
                        ]
                    }
                };

                constructor(props) {
                    super(props);
                    this.toggleShowFilters = this.toggleShowFilters.bind(this);
                    this.toggleDeliverAtRentersPlace = this.toggleDeliverAtRentersPlace.bind(
                        this
                    );
                    this.setCity = this.setCity.bind(this);
                    this.setDate = this.setDate.bind(this);
                    this.setfocusedInput = this.setfocusedInput.bind(this);
                    this.setBrandAndGetModels = this.setBrandAndGetModels.bind(this);
                    this.setModel = this.setModel.bind(this);
                    this.setPrice = this.setPrice.bind(this);
                    this.toggleToCarBodyType = this.toggleToCarBodyType.bind(this);
                    this.togglePriceSort = this.togglePriceSort.bind(this);
                    this.nextPage = this.nextPage.bind(this);
                    // this.renderResultsDebounced = debounce(this.renderResults.bind(this), 1000);
                    this.renderResults = debounce(this.renderResults.bind(this), 1000);
                }

                // it's not toggleing. it's a set.
                toggleShowFilters(showFilters) {
                    this.setState({ showFilters });
                }

                toggleDeliverAtRentersPlace(val) {
                    this.setState(
                        { deliverAtRentersPlace: val, loadingResults: true },
                        () => {
                            this.renderResults();
                        }
                    );
                }

                togglePriceSort(priceSort) {
                    this.setState({ priceSort, loadingResults: true }, () => {
                        this.renderResults();
                    });
                }

                nextPage() {
                    // console.log('nextpage is ', this.state.page + 1);
                    this.setState({ lodingMore: true }, () => {
                        this.renderResults(this.state.page + 1);
                        this.setState({ page: this.state.page + 1 })
                    });
                }

                toggleToCarBodyType(id) {
                    // console.log('runned');
                    const carBodyType = this.state.carBodyType;
                    const index = carBodyType.indexOf(id);
                    // console.log({ index, a: "1" });
                    if (index > -1) {
                        carBodyType.splice(index, 1);
                        // console.log(id + 'removed');
                    } else {
                        carBodyType.push(id);
                        // console.log(id + 'pushed');
                    }

                    this.setState({ carBodyType, loadingResults: true }, () => {
                        this.renderResults();
                    });
                }

                setCity(cityID, CityName) {
                    this.setState(
                        { city: cityID, CityName, loadingResults: true },
                        () => {
                            this.renderResults();
                        }
                    );
                }

                setDate(startDate, endDate) {
                    this.setState({ startDate, endDate, loadingResults: true }, () => {
                        this.renderResults();
                    });
                }

                setfocusedInput(focusedInput) {
                    this.setState({ focusedInput });
                }

                async setBrandAndGetModels(brandID, brandName) {
                    if (brandID === '') {
                        this.setState(
                            {
                                brand: null,
                                model: null,
                                modelLoading: false,
                                loadingResults: true
                            },
                            () => {
                                this.renderResults();
                            }
                        );
                    } else {
                        this.setState(
                            { brand: brandID, modelLoading: true, loadingResults: true },
                            () => {
                                this.renderResults();
                            }
                        );
                        const res = await REQUEST_getFactoryCars({
                            limit: 900,
                            brand_id: brandID
                        });
                        this.setState(res);
                    }
                }

                setModel(modelID, modelName) {
                    if (modelID === '') {
                        modelID = null;
                    }
                    this.setState({ model: modelID, loadingResults: true }, () => {
                        this.renderResults();
                    });
                }
                setPrice(price) {
                    this.setState({ price, loadingResults: true }, () => {
                        this.renderResults();
                    });
                }

                componentWillMount() {
                    // if ssr was working below line may help:
                    // this.setState(this.props.results);
                    if (this.props.router.query) {
                        const {
                            start,
                            end,
                            min_price,
                            max_price,
                            deliver,
                            brand,
                            model,
                            city
                        } = this.props.router.query;
                        // console.log(this.props.router.query);
                        const startDate = moment(start, 'jYYYY/jMM/jDD');
                        const endDate = moment(end, 'jYYYY/jMM/jDD');
                        // console.log({ inp: start, startDate: startDate.format('jYYYY/jMM/jDD [is] YYYY/MM/DD') });
                        // console.log({ inp: end, endDate: endDate.format('jYYYY/jMM/jDD [is] YYYY/MM/DD') });
                        if (start) {
                            this.setState({ startDate });
                        }
                        if (end) {
                            this.setState({ endDate });
                        }
                        if (min_price && max_price) {
                            this.setState({
                                price: [min_price, max_price]
                            });
                        }
                        if (deliver) {
                            this.setState({
                                deliverAtRentersPlace: true
                            });
                        }
                        if (brand) {
                            this.setState({
                                brand: Number(brand)
                            });
                        }
                        if (model) {
                            this.setState({
                                model: Number(model)
                            });
                        }
                        if (city) {
                            this.setState({
                                city: Number(city)
                            });
                        }
                    }
                }

                async componentDidMount() {
                    this.renderResults();
                    // if ssr was activeted then discomment below line:
                    // this.setState(this.props.results);

                    // get Locations and assign them to state
                    const resLocations = await REQUEST_getLocations({ brief: true });
                    this.setState(resLocations);

                    if (this.state.city) {
                        this.state.citiesFarsi.map((value, index) => {
                            if (value.value == this.state.city) {
                                this.setState({ cityName: this.state.citiesFarsi[index].text });
                            }
                        });
                    }

                    // get car brands and assign them to state
                    const resBrands = await REQUEST_getFactoryBrands({ limit: 900 });
                    this.setState(resBrands);
                }

                // renderResultsDebounced(page = 0) {
                //   debounce(this.renderResults(page), 500)
                // };

                async renderResults(page = 1) {
                    // send search resluts request
                    if (page === 1) {
                        let queryString = '';
                        let shownURL = '';
                        if (this.state.city) {
                            queryString = queryString + `location_id=${this.state.city}&`;
                            shownURL = shownURL + `city=${this.state.city}&`;
                        }
                        if (this.state.startDate && this.state.endDate) {
                            queryString =
                                queryString +
                                `start_date=${moment(this.state.startDate).format(
                                    'jYYYY/jMM/jDD'
                                )}&end_date=${moment(this.state.endDate).format(
                                    'jYYYY/jMM/jDD'
                                )}&`;
                            shownURL =
                                shownURL +
                                `start=${moment(this.state.startDate).format(
                                    'jYYYY/jMM/jDD'
                                )}&end=${moment(this.state.endDate).format('jYYYY/jMM/jDD')}&`;
                        }
                        if (this.state.brand) {
                            queryString = queryString + `brand_id=${this.state.brand}&`;
                            shownURL = shownURL + `brand=${this.state.brand}&`;
                        }
                        if (this.state.model) {
                            queryString = queryString + `car_id=${this.state.model}&`;
                            shownURL = shownURL + `model=${this.state.model}&`;
                        }
                        if (this.state.deliverAtRentersPlace) {
                            queryString = queryString + `deliver_at_renters_place=1&`;
                            shownURL = shownURL + `deliver=1&`;
                        }
                        if (this.state.price) {
                            let max = this.state.price[1];
                            if (max === 2000000) {
                                max = 100000000;
                            }
                            queryString =
                                queryString +
                                `min_price=${this.state.price[0]}&max_price=${max}&`;
                            shownURL =
                                shownURL +
                                `min_price=${this.state.price[0]}&max_price=${
                                this.state.price[1]
                                }&`;
                        }
                        if (this.state.carBodyType) {
                            queryString =
                                queryString + `body_style_id=${this.state.carBodyType.join()}&`;
                            shownURL =
                                shownURL + `bodytype=${this.state.carBodyType.join()}&`;
                        }
                        if (this.state.priceSort) {
                            queryString = queryString + `o=${this.state.priceSort}&`;
                            shownURL = shownURL + `order=${this.state.priceSort}&`;
                        }

                        const res = await REQUEST_getSearchForRent({
                            page,
                            limit: 8,
                            queryString
                        });
                        this.setState({
                            ...res,
                            page: 1
                        });
                        // update URL
                        const href = `/search-results?${shownURL}page=${page}`;
                        const as = href;
                        Router.replace(href, as);
                    } else if (this.state.latest_result_key) {
                        // console.log('here we go again...!');
                        const res = await REQUEST_getSearchForRent({
                            page,
                            limit: 8,
                            result_key: this.state.latest_result_key
                        });
                        const stateTemp = this.state.results;
                        const resultsTemp = res.results;
                        delete res.results;
                        this.setState({
                            ...res,
                            results: stateTemp.concat(resultsTemp)
                        });
                    }
                }

                render() {
                    const { t, router, href } = this.props;
                    const {
                        showFilters,
                        citiesFarsi,
                        citiesEnglish,
                        city,
                        cityName,
                        startDate,
                        endDate,
                        focusedInput,
                        brand,
                        model,
                        brandsEnglish,
                        brandsFarsi,
                        modelsFarsi,
                        modelsEnglish,
                        brandLoading,
                        modelLoading,
                        deliverAtRentersPlace,
                        loadingResults,
                        results,
                        price,
                        carBodyType,
                        priceSort,
                        noResult,
                        latest_result_key,
                        total_count,
                        stats,
                        page,
                        lodingMore
                    } = this.state;
                    const showMore = page * 8 < total_count;
                    // console.log({ num: page * 4, total_count, showMore });
                    return (
                        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
                            <SearchBar
                                count={total_count}
                                t={t}
                                setDate={this.setDate}
                                startDate={startDate}
                                endDate={endDate}
                                setfocusedInput={this.setfocusedInput}
                                focusedInput={focusedInput}
                                setCity={this.setCity}
                                cities={{ citiesFarsi, citiesEnglish }}
                                city={city}
                                cityName={cityName}
                            />
                            <div
                                className="row container_on_desktop"
                                style={{ margin: 'auto auto', flexDirection: 'row-reverse' }}
                            >
                                <FilterAndSortBar
                                    toggleToCarBodyType={this.toggleToCarBodyType}
                                    priceSort={priceSort}
                                    togglePriceSort={this.togglePriceSort}
                                    carBodyType={carBodyType}
                                    t={t}
                                    showFilters={showFilters}
                                    toggleShowFilters={this.toggleShowFilters}
                                    brand={brand}
                                    model={model}
                                    brands={{ brandsEnglish, brandsFarsi }}
                                    models={{ modelsEnglish, modelsFarsi }}
                                    brandLoading={brandLoading}
                                    modelLoading={modelLoading}
                                    price={price}
                                    setBrandAndGetModels={this.setBrandAndGetModels}
                                    setModel={this.setModel}
                                    setPrice={this.setPrice}
                                    deliverAtRentersPlace={deliverAtRentersPlace}
                                    toggleDeliverAtRentersPlace={this.toggleDeliverAtRentersPlace}
                                    stats={stats}
                                />
                                <ResultsCards
                                    t={t}
                                    nextPage={this.nextPage}
                                    showNextPage={true}
                                    results={results}
                                    loadingResults={loadingResults}
                                    lodingMore={lodingMore}
                                    noResult={noResult}
                                    showMore={showMore}
                                    dateURL={''}
                                />
                            </div>
                        </Layout>
                    );
                }
            }
        )
    )
);
