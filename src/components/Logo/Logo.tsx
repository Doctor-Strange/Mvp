import * as React from 'react';
import Link from 'next/link';
import * as LogoSVG from '../../../static/logo_sticky.svg';

export const Logo: React.FunctionComponent = props => (
  <div id="logo">
    <Link href="/">
      <a>
        <img
          src={LogoSVG}
          width="165"
          height="35"
          alt="لوگو اتولی"
          className="logo_sticky"
        />
      </a>
    </Link>
  </div>
);
