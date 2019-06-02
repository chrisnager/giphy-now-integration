const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');
const { Form, Gallery, Credits } = require('./components');

let store = { search: '', errored: false, apiKey: '', items: [] };

module.exports = withUiHook(async ({ payload }) => {
  const { query, clientState, action } = payload;
  const search = query.search || clientState.search || '';
  const apiKey = query.apiKey || clientState.apiKey || '';

  store = { ...store, search, apiKey };
  if (action === 'search') store.errored = !search;
  if (action === 'reset') store = { search: '', errored: false, apiKey: '', items: [] };

  const url = 'http://api.giphy.com/v1/gifs';
  const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
  const baseParams = { api_key: apiKey.length === 32 ? apiKey : GIPHY_API_KEY, rating: 'pg-13' };

  if (action === 'search' && search) {
    const { data } = await axios(`${url}/search`, { params: { ...baseParams, q: search, limit: 8 } });
    store.items = data.data;
  }

  if (action === 'trending') {
    const { data } = await axios(`${url}/trending`, { params: { ...baseParams, limit: 8 } });
    store = { ...store, search: '', items: data.data };
  }

  if (action === 'random') {
    const { data } = await axios(`${url}/random`, { params: baseParams });
    store = { ...store, search: data.data.title, items: [data.data] };
  }

  const { items } = store;

  return htm`
    <Page>
      <Fieldset>
        <FsContent>
          <${Form} ...${store} />
          <${Gallery} ...${{ items }} />
        </FsContent>
        <FsFooter>
          <${Credits} />
        </FsFooter>
      </Fieldset>
    </Page>
  `;
});
