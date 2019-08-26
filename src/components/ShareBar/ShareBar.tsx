import * as React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import Router from 'next/router';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

const ShareUL = styled.ul`
    padding: 0;
    list-style: none;
    text-align: center;
    margin: 0 0 25px 0;
    li {
        display: inline-block;
        margin: 0 5px 5px 5px;
        a {
            background: #fff;
            border: 1px solid #666;
            border-radius: 50px;
            font-weight: 500;
            font-size: 13px;
            padding: 7px 20px;
            transition: 0.3s;
            display: inline-block;
            line-height: 17px;
            font-weight: 500;
            :hover {
                color: #fff;
            }
            &.fb-share {
                border-color: #3b5998;
                color: #3b5998;
                :hover {
                    background: #3b5998;
                    color: #fff;
                }
            }
        }
        i {
            font-size: 16px;
            font-size: 1rem;
            position: relative;
            right: 3px;
            top: 2px;
        }
    }
`;


interface IShareBar {
    link?: string;
}

export const ShareBar: React.SFC<IShareBar> = ({ link }) => {
    const currentPath = () => {
        if (typeof window === 'object') {
            return `${process.env.SITE_URL}${Router.asPath}`;
        } else {
            return link
        }
    }
    function socialWindow(url) {
        if (typeof window === 'object') {
            var left = 300;
            var top = 300;
            var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
            window.open(url, "NewWindow", params);
        }
    }

    return (
        <>
            <span style={{
                textAlign: 'center',
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                paddingBottom: '8px'
            }}>این صفحه را به اشتراک بگذارید</span>
            <ShareUL className="share-buttons">
                <Popup
                    position='bottom right'
                    size='tiny'
                    content='توییت کنید'
                    inverted
                    trigger={
                        <a onClick={
                            () => {
                                socialWindow(`http://twitter.com/share?text=این ماشین رو دیدید؟&url=${
                                    currentPath()}&hashtags=کرایه_ماشین`);
                            }
                        }>
                            <Button circular icon='twitter' />
                        </a>
                    }
                />
                <Popup
                    position='bottom right'
                    size='tiny'
                    content='ارسال از طریق ایمیل'
                    inverted
                    trigger={
                        <a onClick={
                            () => {
                                socialWindow(`mailto: ?subject=${currentPath()}`);
                            }
                        }>
                            <Button circular icon='mail' />
                        </a>
                    }
                />
                <Popup
                    position='bottom right'
                    size='tiny'
                    content='ارسال به تلگرام'
                    inverted
                    trigger={
                        <a onClick={
                            () => {
                                socialWindow(`https://telegram.me/share/url?url=${
                                    currentPath()}&text= نظرت در مورد کرایه این ماشین چیه؟`);
                            }
                        }>
                            <Button circular icon='telegram' />
                        </a>
                    }
                />
                <Popup
                    position='bottom right'
                    size='tiny'
                    content='کپی پیوند پروفایل'
                    inverted
                    trigger={
                        <CopyToClipboard
                            text={currentPath()}
                            onCopy={() => alert("کپی شد")}
                        >
                            <Button circular icon='copy' />
                        </CopyToClipboard>
                    }
                />
            </ShareUL>
        </>
    )
}