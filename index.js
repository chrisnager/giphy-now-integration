const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');
const { Form, Gallery, Credits } = require('./components');

const store = { searchTerm: '', errored: false, giphyApiKey: '' };
const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
let items = [];

module.exports = withUiHook(async ({ payload }) => {
  const { action, clientState, query } = payload;
  const { searchTerm, giphyApiKey } = clientState;
  const { errored } = store;

  clientState.searchTerm = query.searchTerm || searchTerm;
  clientState.giphyApiKey = query.giphyApiKey || giphyApiKey;

  if (action === 'submit') store = { ...store, searchTerm, giphyApiKey };

  if (searchTerm) {
    const url = 'http://api.giphy.com/v1/gifs/search';
    const params = { q: searchTerm, api_key: giphyApiKey || GIPHY_API_KEY, limit: 8 };

    await axios(url, { params }).then(({ data: { data } }) => (items = data));
  }

  if (!searchTerm && items.length) store.errored = true;

  return htm`
    <Page>
      <Fieldset>
        <FsContent>
          <${Form} ...${{ searchTerm, errored, giphyApiKey }} />
          <${Gallery} ...${{ items }} />
        </FsContent>
        <FsFooter>
          <${Credits} />
        </FsFooter>
      </Fieldset>
    </Page>
  `;
});
