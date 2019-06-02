const { htm } = require('@zeit/integration-utils');

const Gallery = ({ items }) => htm`
  <Box
    minHeight="310px"
    border="1px solid #e1e1e1"
    border-radius="5px"
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
                border="0.25rem solid #fff"
                display="flex"
                alignItems="center"
                overflow="hidden"
                backgroundColor="#000"
              >
                <Link href="${item.url}" target="_blank">
                  <Img src="${item.images.downsized_medium.url}" width="100%" />
                </Link>
              </Box>
            `,
          )
        : htm`<P>No GIFs to display</P>`
    }
  </Box>
`;

module.exports = Gallery;
