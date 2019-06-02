const { htm } = require('@zeit/integration-utils');

const Gallery = ({ items }) => htm`
  <Box
    minHeight="310px"
    border="1px solid"
    padding="0.25rem"
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="center"
  >
    ${
      items.length
        ? items.map(
            item => htm`
              <Box
                width="25%"
                height="150px"
                border="0.25rem solid #fafafa"
                display="flex"
                alignItems="center"
                overflow="hidden"
                backgroundColor="#000"
              >
                <Img src="${item.images.original.url}" width="100%" />
              </Box>
            `,
          )
        : htm`<P>No GIFs to display</P>`
    }
  </Box>
`;

module.exports = Gallery;
