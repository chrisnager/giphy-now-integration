const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');

const store = { searchTerm: '' };
const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
let items = [];

module.exports = withUiHook(async ({ payload }) => {
  const { clientState, action } = payload;

  if (action === 'submit') store.searchTerm = clientState.searchTerm;

  await axios(`http://api.giphy.com/v1/gifs/search?q=${clientState.searchTerm}&api_key=${GIPHY_API_KEY}&limit=3`)
    .then(({ data: { data } }) => {
      // console.log(data);
      items = data;
    })
    .catch(error => console.error({ error }));

  // console.log({ payload });
  // console.log('outside', items[0].images);

  return htm`
    <Page>
      <Container>
        <Input label="Search for GIFs" placeholder="cat" name="searchTerm" value="${clientState.searchTerm || ''}" />
      </Container>
      <Container>
        <Button>Submit</Button>
      </Container>
      <Container>
        <UL>
          ${items && items.map(item => htm`<LI><Img src="${item.images.original.url}" /></LI>`)}
        </UL>
      </Container>
    </Page>
  `;
});
