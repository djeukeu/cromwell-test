import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const RouterLink = forwardRef((props, ref) => {
  const { href, ...other } = props;

  return <Link ref={ref} to={href} {...other} />;
});

export default RouterLink;
