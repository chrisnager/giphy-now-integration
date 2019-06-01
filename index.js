const { withUiHook } = require('@zeit/integration-utils');

let count = 0;

module.exports = withUiHook(({ payload }) => {
  count += 1;

  return `
    <Page>
      <H1>Counter: ${count}</H1>
      <Button>Action</Button>
    </Page>
  `;
});
