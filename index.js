const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');
const { Form, Gallery, Credits } = require('./components');

let store = { search: '', errored: false, apiKey: '', items: [] };

module.exports = withUiHook(async ({ payload, zeitClient }) => {
  // let apiUrl = `/v4/now/deployments?limit=10`;
  // const data = await zeitClient.fetchAndThrow(apiUrl, { method: 'GET' });
  // console.log({ data });

  const { query, clientState, action } = payload;
  const search = query.search || clientState.search || '';
  const apiKey = query.apiKey || clientState.apiKey || '';

  store = { ...store, search, apiKey };
  if (action === 'submit') store.errored = !search;
  if (action === 'reset') store = { search: '', errored: false, apiKey: '', items: [] };

  if (action !== 'reset' && search) {
    const url = 'http://api.giphy.com/v1/gifs/search';
    const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
    const params = { q: search, rating: 'pg-13', api_key: apiKey.length === 32 ? apiKey : GIPHY_API_KEY, limit: 8 };
    const { data } = await axios(url, { params });
    store.items = data.data;
  }

  if (action === 'trending') {
    const trendingUrl = 'http://api.giphy.com/v1/gifs/trending';
    const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
    const trendingParams = { rating: 'pg-13', api_key: apiKey.length === 32 ? apiKey : GIPHY_API_KEY, limit: 8 };
    const { data } = await axios(trendingUrl, { params: trendingParams });
    store.items = data.data;
    store.search = '';
  }

  if (action === 'random') {
    const randomUrl = 'http://api.giphy.com/v1/gifs/random';
    const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
    const randomParams = { rating: 'pg-13', api_key: apiKey.length === 32 ? apiKey : GIPHY_API_KEY };
    const { data } = await axios(randomUrl, { params: randomParams });
    console.log({ data });
    store.items = [data.data];
    store.search = data.data.title;
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
