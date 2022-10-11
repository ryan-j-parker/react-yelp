const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

exports.handler = async (event, context) => {
  try {
    const response = await fetch('https://api.yelp.com/v3/businesses/search');
    const data = await response.json();
    const json = JSON.stringify({ data });

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
