const { htm } = require('@zeit/integration-utils');

const Form = ({ search, errored, apiKey }) => htm`  
  <Box>
    <Box marginBottom="0.75rem" display="flex">
      <Box width="50%" paddingRight="0.125rem">
        <Input
          autoFocus
          width="100%"
          label="Search GIFs"
          placeholder="pusheen"
          name="search"
          value="${search}"
          errored=${errored}
        />
      </Box>
      <Box width="50%" paddingLeft="0.125rem">
        <Input
          width="100%"
          label="GIPHY API key (optional)"
          name="apiKey"
          value="${apiKey}"
        />
      </Box>
    </Box>
    <Box marginBottom="2.25rem">
      <Button action="submit" width="auto" themeColor="blue">Submit</Button>
      <Button action="reset" width="auto" secondary>Reset</Button>
    </Box>
  </Box>
`;

module.exports = Form;
