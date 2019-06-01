const { htm } = require('@zeit/integration-utils');

const Form = ({ giphyApiKey, searchTerm }) => htm`
  <Box marginBottom="1rem">
    <Input
      label="GIPHY API key (optional)"
      name="giphyApiKey"
      value="${giphyApiKey || ''}"
    />
    <Input
      label="Search GIFs"
      placeholder="pusheen"
      name="searchTerm"
      value="${searchTerm || ''}"
    />
  </Box>
  <Box marginBottom="1rem">
    <Button>Submit</Button>
  </Box>
`;

module.exports = Form;
