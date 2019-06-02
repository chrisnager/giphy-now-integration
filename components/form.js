const { htm } = require('@zeit/integration-utils');

const Form = ({ searchTerm = '', errored = false, giphyApiKey = '' }) => htm`  
  <Box>
    <Box marginBottom="1rem" display="flex">
      <Box width="50%" paddingRight="0.5rem">
        <Input
          width="100%"
          label="Search GIFs"
          placeholder="pusheen"
          name="searchTerm"
          value="${searchTerm}"
          errored=${errored}
        />
      </Box>
      <Box width="50%" paddingLeft="0.5rem">
        <Input
          width="100%"
          label="GIPHY API key (optional)"
          name="giphyApiKey"
          value="${giphyApiKey}"
        />
      </Box>
    </Box>
    <Box marginBottom="2rem">
      <Button themeColor="blue">Submit</Button>
    </Box>
  </Box>
`;

module.exports = Form;
