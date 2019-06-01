const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');

const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
let items = [];

module.exports = withUiHook(async ({ payload }) => {
  await axios(`http://api.giphy.com/v1/gifs/search?q=pokemon&api_key=${GIPHY_API_KEY}&limit=1`)
    .then(({ data: { data } }) => {
      // console.log(data);
      items = data;
    })
    .catch(error => console.error({ error }));

  // console.log({ payload });
  // console.log('outside', items[0].images);

  return htm`
    <Page>
      <Button>Load GIF</Button>
      <UL>
        ${items && items.map(item => htm`<LI><Img src="${item.images.original.url}" /></LI>`)}
      </UL>
    </Page>
  `;
});
