const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');
const { Form, Gallery, Credits } = require('./components');

const store = { giphyApiKey: '', searchTerm: '', errored: false };
const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
let items = [];

module.exports = withUiHook(async ({ payload }) => {
  const { action, clientState, query } = payload;

  clientState.giphyApiKey = query.giphyApiKey || clientState.giphyApiKey;
  clientState.searchTerm = query.searchTerm || clientState.searchTerm;

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

  if (clientState.searchTerm) {
    store.errored = false;
  } else {
    store.errored = true;
  }

  const { giphyApiKey, searchTerm } = clientState;
  const { errored } = store;

  return htm`
    <Page>
      <Fieldset>
        <FsContent>
          <${Form} ...${{ giphyApiKey, searchTerm, errored }} />
          <${Gallery} ...${{ items }} />
        </FsContent>
        <FsFooter>
          <${Credits} />
        </FsFooter>
      </Fieldset>
    </Page>
  `;
});
