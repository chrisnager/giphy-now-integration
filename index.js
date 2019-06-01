const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');

const store = { giphyApiKey: '', searchTerm: '' };
const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
let items = [];

module.exports = withUiHook(async ({ payload }) => {
  const { action, clientState } = payload;

  if (action === 'submit') {
    store.giphyApiKey = clientState.giphyApiKey;
    store.searchTerm = clientState.searchTerm;
  }

  if (clientState.searchTerm) {
    const url = 'http://api.giphy.com/v1/gifs/search';
    const params = {
      q: clientState.searchTerm,
      api_key: clientState.giphyApiKey || GIPHY_API_KEY,
      limit: 8,
    };

    await axios(url, { params })
      .then(({ data: { data } }) => (items = data))
      .catch(error => console.error({ error }));
  }

  // console.log({ payload });

  const Form = () => htm`
    <Box marginBottom="1rem">
      <Input label="GIPHY API key (optional)" name="giphyApiKey" value="${clientState.giphyApiKey || ''}" />
      <Input label="Search GIFs" placeholder="pusheen" name="searchTerm" value="${clientState.searchTerm || ''}" />
    </Box>
    <Box marginBottom="1rem">
      <Button>Submit</Button>
    </Box>
  `;

  const Gallery = ({ items }) => htm`
    <Box minHeight="310px" marginBottom="1rem" padding="0.25rem" display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" border="1px solid">
      ${
        items.length
          ? items.map(
              item => htm`
                <Box width="25%" height="150px" overflow="hidden" border="0.25rem solid #fafafa" display="flex" alignItems="center" backgroundColor="#000">
                  <Img width="100%" src="${item.images.original.url}" />
                </Box>
              `,
            )
          : htm`<P fontStyle="italic">No GIFs to display</P>`
      }
    </Box>
  `;

  const Credits = () => htm`
    <Box marginBottom="1rem">
      <P>Created by <Link href="http://chrisnager.com" target="_blank">Chris Nager</Link> for the <Link href="https://zeit.co/hackathon" target="_blank">ZEIT Hackathon</Link></P>
    </Box>
    <Box>
      <Img width="200px" src="https://i.imgur.com/g9ZzbKX.gif" />
    </Box>
  `;

  return htm`
    <Page>
      <${Form} />
      <${Gallery} items="${items}" />
      <${Credits} />
    </Page>
  `;
});
