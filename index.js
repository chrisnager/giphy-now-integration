const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');

const store = { searchTerm: '' };
const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
let items = [];

module.exports = withUiHook(async ({ payload }) => {
  const { clientState, action } = payload;

  if (action === 'submit') store.searchTerm = clientState.searchTerm;

  if (clientState.searchTerm) {
    await axios(`http://api.giphy.com/v1/gifs/search?q=${clientState.searchTerm}&api_key=${GIPHY_API_KEY}&limit=8`)
      .then(({ data: { data } }) => {
        // console.log(data);
        items = data;
      })
      .catch(error => console.error({ error }));
  }

  // console.log({ payload });
  // console.log('outside', items[2].images);

  return htm`
    <Page>
      <Box marginBottom="1rem">
        <Input label="Search GIFs" placeholder="cat" name="searchTerm" value="${clientState.searchTerm || ''}" />
      </Box>
      <Box marginBottom="1rem">
        <Button>Submit</Button>
      </Box>
      <Box minHeight="310px" marginBottom="1rem" padding="0.25rem" display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" border="1px solid">
        ${
          items.length === 0
            ? htm`<P fontStyle="italic">No GIFs to display.</P>`
            : items.map(
                item => htm`
          <Box width="25%" height="150px" overflow="hidden" border="0.25rem solid #fafafa" display="flex" alignItems="center" backgroundColor="#000">
            <Img width="100%" src="${item.images.original.url}" />
          </Box>
        `,
              )
        }
      </Box>
      <Box marginBottom="1rem">
        Created by <Link href="http://chrisnager.com" target="_blank">Chris Nager</Link> for the <Link href="https://zeit.co/hackathon" target="_blank">ZEIT Hackathon</Link>.
      </Box>
      <Box>
        <Img width="200px" src="https://i.imgur.com/g9ZzbKX.gif" />
      </Box>
    </Page>
  `;
});
