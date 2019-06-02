const { htm } = require('@zeit/integration-utils');

const Form = ({ search, errored, apiKey }) => htm`  
  <Box>
    <Box marginBottom="1rem" display="flex">
      <Box width="50%" paddingRight="0.5rem">
        <Input
          width="100%"
          label="Search GIFs"
          placeholder="pusheen"
          name="search"
          value="${search}"
          errored=${errored}
        />
      </Box>
      <Box width="50%" paddingLeft="0.5rem">
        <Input
          width="100%"
          label="GIPHY API key (optional)"
          name="apiKey"
          value="${apiKey}"
        />
      </Box>
    </Box>
    <Box marginBottom="2rem">
      <Button action="submit" themeColor="blue">Submit</Button>
      <Button action="reset" secondary>Reset</Button>
    </Box>
  </Box>
`;

module.exports = Form;
