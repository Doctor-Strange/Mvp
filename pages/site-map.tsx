import * as React from "react";
import Layout from "../src/components/Layout";
import NextSeo from "next-seo";
import Link from "next/link";

const Rent = () => {
  return (
    <Layout>
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
      <ul>
        <li>
          <Link href={`/rent/tehran`}>
            <a>tehran</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default Rent;
