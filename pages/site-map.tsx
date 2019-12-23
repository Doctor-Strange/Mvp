import * as React from "react";
import Layout from "../src/components/Layout";
import NextSeo from "next-seo";
import Link from "next/link";

const Rent = props => {
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
        {/* <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-اتومبیل-در-تهران")}`}>
            <a>اجاره-اتومبیل-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-اتومبیل-در-شیراز")}`}>
            <a>اجاره-اتومبیل-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-اتومبیل-در-کیش")}`}>
            <a>اجاره-اتومبیل-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-اتوموبیل")}`}>
            <a>اجاره-اتوموبیل</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-اتوموبیل-در-تهران")}`}>
            <a>اجاره-اتوموبیل-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-اتوموبیل-در-شیراز")}`}>
            <a>اجاره-اتوموبیل-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-اتوموبیل-در-کیش")}`}>
            <a>اجاره-اتوموبیل-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-خودرو")}`}>
            <a>اجاره-خودرو</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-خودرو-در-تهران")}`}>
            <a>اجاره-خودرو-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-خودرو-در-شیراز")}`}>
            <a>اجاره-خودرو-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-خودرو-در-کیش")}`}>
            <a>اجاره-خودرو-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-سواری")}`}>
            <a>اجاره-سواری</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-سواری-در-تهران")}`}>
            <a>اجاره-سواری-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-سواری-در-شیراز")}`}>
            <a>اجاره-سواری-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-سواری-در-کیش")}`}>
            <a>اجاره-سواری-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-کار")}`}>
            <a>اجاره-کار</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-کار-در-تهران")}`}>
            <a>اجاره-کار-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-کار-در-شیراز")}`}>
            <a>اجاره-کار-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-کار-در-کیش")}`}>
            <a>اجاره-کار-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-ماشین")}`}>
            <a>اجاره-ماشین</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-ماشین-در-تهران")}`}>
            <a>اجاره-ماشین-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-ماشین-در-شیراز")}`}>
            <a>اجاره-ماشین-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("اجاره-ماشین-در-کیش")}`}>
            <a>اجاره-ماشین-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتومبیل")}`}>
            <a>رنت-اتومبیل</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتومبیل-در-تهران")}`}>
            <a>رنت-اتومبیل-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتومبیل-در-شیراز")}`}>
            <a>رنت-اتومبیل-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتومبیل-در-کیش")}`}>
            <a>رنت-اتومبیل-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتوموبیل")}`}>
            <a>رنت-اتوموبیل</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتوموبیل-در-تهران")}`}>
            <a>رنت-اتوموبیل-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتوموبیل-در-شیراز")}`}>
            <a>رنت-اتوموبیل-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-اتوموبیل-در-کیش")}`}>
            <a>رنت-اتوموبیل-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-خودرو")}`}>
            <a>رنت-خودرو</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-خودرو-در-تهران")}`}>
            <a>رنت-خودرو-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-خودرو-در-شیراز")}`}>
            <a>رنت-خودرو-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-خودرو-در-کیش")}`}>
            <a>رنت-خودرو-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-سواری")}`}>
            <a>رنت-سواری</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-سواری-در-تهران")}`}>
            <a>رنت-سواری-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-سواری-در-شیراز")}`}>
            <a>رنت-سواری-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-سواری-در-کیش")}`}>
            <a>رنت-سواری-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-کار")}`}>
            <a>رنت-کار</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-کار-در-تهران")}`}>
            <a>رنت-کار-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-کار-در-شیراز")}`}>
            <a>رنت-کار-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-کار-در-کیش")}`}>
            <a>رنت-کار-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-ماشین")}`}>
            <a>رنت-ماشین</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-ماشین-در-تهران")}`}>
            <a>رنت-ماشین-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-ماشین-در-شیراز")}`}>
            <a>رنت-ماشین-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("رنت-ماشین-در-کیش")}`}>
            <a>رنت-ماشین-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتومبیل")}`}>
            <a>کرایه-اتومبیل</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتومبیل-در-تهران")}`}>
            <a>کرایه-اتومبیل-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتومبیل-در-شیراز")}`}>
            <a>کرایه-اتومبیل-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتومبیل-در-کیش")}`}>
            <a>کرایه-اتومبیل-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتوموبیل")}`}>
            <a>کرایه-اتوموبیل</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتوموبیل-در-تهران")}`}>
            <a>کرایه-اتوموبیل-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتوموبیل-در-شیراز")}`}>
            <a>کرایه-اتوموبیل-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-اتوموبیل-در-کیش")}`}>
            <a>کرایه-اتوموبیل-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-خودرو")}`}>
            <a>کرایه-خودرو</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-خودرو-در-تهران")}`}>
            <a>کرایه-خودرو-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-خودرو-در-شیراز")}`}>
            <a>کرایه-خودرو-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-خودرو-در-کیش")}`}>
            <a>کرایه-خودرو-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-سواری")}`}>
            <a>کرایه-سواری</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-سواری-در-تهران")}`}>
            <a>کرایه-سواری-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-سواری-در-شیراز")}`}>
            <a>کرایه-سواری-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-سواری-در-کیش")}`}>
            <a>کرایه-سواری-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-کار")}`}>
            <a>کرایه-کار</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-کار-در-تهران")}`}>
            <a>کرایه-کار-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-کار-در-شیراز")}`}>
            <a>کرایه-کار-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-کار-در-کیش")}`}>
            <a>کرایه-کار-در-کیش</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-ماشین")}`}>
            <a>کرایه-ماشین</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-ماشین-در-تهران")}`}>
            <a>کرایه-ماشین-در-تهران</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-ماشین-در-شیراز")}`}>
            <a>کرایه-ماشین-در-شیراز</a>
          </Link>
        </li>
        <li>
          <Link href={`/rent/${decodeURIComponent("کرایه-ماشین-در-کیش")}`}>
            <a>کرایه-ماشین-در-کیش</a>
          </Link>
        </li> */}
      </ul>
    </Layout>
  );
};

export default Rent;
