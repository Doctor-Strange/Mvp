import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Section } from '../src/components/row/Sections';
import { RequestCard, RequestCardPlaceholder } from '../src/components/Cards';
import Layout from '../src/components/Layout';
import { REQUEST_getOrderRequests } from '../src/API';
import { Box, Flex } from '@rebass/grid';
import jsCookie from 'js-cookie';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

export default props => {

    const [requests, setRequests] = useState([{}]);
    const [requestsCount, setRequestsCount] = useState(-1);

    async function fetchAPI() {
        const res = await REQUEST_getOrderRequests({ token: jsCookie.get('token') });
        setRequests(res.items);
        setRequestsCount(res.count || 0);
    }

    useEffect(() => {
        fetchAPI();
    }, []);


    return (
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
            <Section justifyCenter={true}>
                <Flex className="wrapper">
                    <Box width={2 / 2} px={2}>
                        <Item.Group divided style={{ maxWidth: '530px' }}>
                            {(requestsCount <= -1) ?
                                <>
                                    <RequestCardPlaceholder />
                                    <RequestCardPlaceholder />
                                    <RequestCardPlaceholder />
                                </>
                                : requests.length === 0 ? <p>در حال حاضر درخواستی ثبت نشده.</p>
                                : requests.map((value, index) => {
                                    const rentDump = value.rent_search_dump;
                                    const {
                                        has_owner_reviewed_rent_order,
                                        has_owner_reviewed_renter,
                                        has_renter_reviewed_owner,
                                        has_renter_reviewed_rent_order
                                    } = value;
                                    return (
                                        <RequestCard
                                            id={value.id}
                                            key={index}
                                            status={value.status.id}
                                            statusOwner={value.role}
                                            carName={`${rentDump.car.brand.name.fa} ${rentDump.car.name.fa}`}
                                            start={moment(rentDump.start_date, 'jYYYY/jMM/jDD')}
                                            end={moment(rentDump.end_date, 'jYYYY/jMM/jDD')}
                                            price={rentDump.discounted_total_price}
                                            ownerName={
                                                (value.role === "owner")
                                                    ? `${value.renter.first_name} ${value.renter.last_name}`
                                                    : `${rentDump.owner.first_name} ${rentDump.owner.last_name}`
                                            }
                                            ownerPhone={
                                                (value.role === "renter")
                                                    ? null
                                                    : value.renter.cell
                                            }
                                            userID={
                                                (value.role === "owner")
                                                ? value.renter.id
                                                : rentDump.owner.id
                                            }
                                            pelak={{
                                                first: rentDump.registration_plate_first_part,
                                                second: rentDump.registration_plate_second_part,
                                                third: rentDump.registration_plate_third_part,
                                                fourth: rentDump.registration_plate_forth_part
                                            }}
                                            picture={rentDump.media_set[0].url}
                                            refresh={fetchAPI}
                                            reviewStatus={{
                                                has_owner_reviewed_rent_order,
                                                has_owner_reviewed_renter,
                                                has_renter_reviewed_owner,
                                                has_renter_reviewed_rent_order
                                            }}
                                        />
                                    )
                                })
                            }
                            {/* commented by sajad 980528  `bug fixed` */}
                            {/* {(requestsCount <= -1) &&
                                <p>در حال حاضر درخواستی ثبت نشده.</p>
                            } */}
                        </Item.Group>
                    </Box>
                </Flex>
            </Section>
        </Layout>
    );
}
