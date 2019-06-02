const { htm } = require('@zeit/integration-utils');

const Credits = () => htm`
  <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
    <Box>
      <P>
        Created by
        <Link href="http://chrisnager.com" target="_blank">Chris Nager</Link>
        for the
        <Link href="https://zeit.co/hackathon" target="_blank">ZEIT Hackathon</Link>
      </P>
    </Box>
    <Box height="42px">
      <Img width="200px" src="https://i.imgur.com/g9ZzbKX.gif" />
    </Box>
  </Box>
`;

module.exports = Credits;
