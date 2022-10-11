const fetch = require('cross-fetch');

require('dotenv').config({ path: `.env.development.local` });

exports.handler = async (event) => {
  // add code here to fetch data from yelp API
  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;
  try {
    const resp = await fetch(
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        },
      }
    );
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
  // be sure to include the parameters from event.queryStringParameters
};
