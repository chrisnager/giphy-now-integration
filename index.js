const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');
const { Form, Gallery, Credits } = require('./components');

module.exports = withUiHook(async ({ payload }) => {
  const initialStore = { search: '', errored: false, apiKey: '', items: [] };
  const { query, clientState, action } = payload;
  const search = query.search || clientState.search || '';
  const apiKey = query.apiKey || clientState.apiKey || '';
  let store = { ...initialStore, search, apiKey };

  if (action === 'submit') store.errored = !search;
  if (action === 'reset') store = initialStore;

  if (action !== 'reset' && search) {
    const url = 'http://api.giphy.com/v1/gifs/search';
    const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
    const params = { q: search, api_key: apiKey || GIPHY_API_KEY, limit: 8 };

    await axios(url, { params }).then(({ data: { data } }) => (store.items = data));
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
