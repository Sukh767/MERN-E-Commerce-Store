import React from 'react';
import { Helmet } from 'react-helmet';

function Meta({
  title = 'Welcome To Proshop',
  description = 'We Selll the best products for cheap',
  keyword = 'electronics, buy electronics, buy latest smartphones ',
}) {
  return (
    <Helmet>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
      </Helmet>
    </Helmet>
  );
}

export default Meta;
