import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../src/components/Layout";
import NextSeo from "next-seo";
import Link from "next/link";
import {REQUEST_URLS_FOR_SITE_MAP} from '../src/API'

const Rent = () => {
  const [UrlList,UrlSetter] = useState([]);

  const fetchAPIs = async() =>{
    const res = await REQUEST_URLS_FOR_SITE_MAP()
    UrlSetter(res.items)
  }

  useEffect(()=>{
    fetchAPIs()
    
  },[])

  return (
    <Layout haveSubHeader={true} pageTitle={"Site map"}>
      {/* {console.log(`https://otoli.net/${seoImage}`)} */}
      <NextSeo
        config={{
          title: `Otoli | site map`,
          description: `Otoli | site map`,
          openGraph: {
            title: `Otoli | site map`,
            description: `Otoli | site map`,
            site_name: "Otoli"
          },
          twitter: {
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image"
          }
        }}
      />
      {UrlList.length > 0 && (
        <ul style={{columnCount: '3'}}>
          {UrlList.map(i=>{
            return <li style={{margin: '5px 0'}}>
            <Link href={`/rent/${i.unique_id}`}>
              <a>{i.title}</a>
            </Link>
          </li>
          })}
        </ul>
      )}
    </Layout>
  );
};

export default Rent;
