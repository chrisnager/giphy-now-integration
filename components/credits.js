const { htm } = require('@zeit/integration-utils');

const Credits = () => htm`
  <Box marginBottom="1rem">
    <P>
      Created by
      <Link href="http://chrisnager.com" target="_blank">Chris Nager</Link>
      for the
      <Link href="https://zeit.co/hackathon" target="_blank">ZEIT Hackathon</Link>
    </P>
  </Box>
  <Box>
    <Img width="200px" src="https://i.imgur.com/g9ZzbKX.gif" />
  </Box>
`;

module.exports = Credits;
