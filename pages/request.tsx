import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Section } from '../src/components/row/Sections';
import { RequestCard, RequestCardPlaceholder } from '../src/components/Cards';
import Layout from '../src/components/Layout';
import { REQUEST_getOrderRequest } from '../src/API';
import { Box, Flex } from '@rebass/grid';
import jsCookie from 'js-cookie';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

const Request = ({id}) => {

    const [request, setRequest] = useState(null);

    async function fetchAPI() {
        console.log(jsCookie.get('token'),id)
        const res = await REQUEST_getOrderRequest({ token: jsCookie.get('token'), id  });
        // console.log(res)
        setRequest(res);
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
                            {(!request) ?
                                <>
                                    <RequestCardPlaceholder />
                                </>
                                :
                                [request].map((value, index) => {
                                    const rentDump = value.rent_search_dump;
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
                                        />
                                    )
                                })
                            }
                        </Item.Group>
                    </Box>
                </Flex>
            </Section>
        </Layout>
    );
}


Request.getInitialProps = async (props) => {
    if (typeof window === 'undefined') {
        // console.log('Server Side Router Query', props.query);
    } else {
        // console.log('Client side Router Query', props.query);
    }
    const id = props.query.id;
    return {
        namespacesRequired: ['common'],
        id
    };
}

export default Request;

