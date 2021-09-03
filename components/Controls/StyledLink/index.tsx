import styles from './styledLink.module.scss';
import Link from 'next/link';
import React from 'react';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
}
const StyledLink = React.forwardRef(
  ({ href, prefetch, ...props }: IProps, ref: any) => {
    return (
      <Link href={href} prefetch={prefetch || false}>
        <a className={styles['styled-link']} {...props} ref={ref} />
      </Link>
    );
  }
);
StyledLink.displayName = 'MyLink';
export default StyledLink;
