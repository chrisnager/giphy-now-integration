const axios = require('axios');
const { withUiHook, htm } = require('@zeit/integration-utils');
const { Form, Gallery, Credits } = require('./components');

const store = { giphyApiKey: '', searchTerm: '' };
const GIPHY_API_KEY = 'I3Gl6RcFBwkIL0UC3IQb61op0S0Eeax8';
let items = [];

module.exports = withUiHook(async ({ payload }) => {
  console.log({ payload });

  if (payload.action === 'submit') {
    store.giphyApiKey = payload.clientState.giphyApiKey;
    store.searchTerm = payload.clientState.searchTerm;
  }

  if (payload.clientState.searchTerm) {
    const url = 'http://api.giphy.com/v1/gifs/search';

    const params = {
      q: payload.clientState.searchTerm,
      api_key: payload.clientState.giphyApiKey || GIPHY_API_KEY,
      limit: 8,
    };

    await axios(url, { params })
      .then(({ data: { data } }) => (items = data))
      .catch(error => console.error({ error }));
  }

  return htm`
    <Page>
      <${Form} giphyApiKey="${payload.clientState.giphyApiKey}" searchTerm="${payload.clientState.searchTerm}" />
      <${Gallery} items="${items}" />
      <${Credits} />
    </Page>
  `;
});
