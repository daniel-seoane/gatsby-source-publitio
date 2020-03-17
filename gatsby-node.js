const PublitioAPI = require("publitio_js_sdk").default;
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const defaultOptions = {
  limit: 1000,
  offset: 0,
  filter_privacy: "all",
  filter_extension: "all",
  filter_type: "all",
  filter_ad: "all",
  tags: "",
  folder: ""
};

exports.sourceNodes = async (
  { actions: { createNode }, store, cache, createNodeId, createContentDigest, reporter },
  pluginOptions
) => {
  const { api_key, api_secret, ...options } = {
    ...defaultOptions,
    ...pluginOptions
  };

  if(!api_key)
    reporter.warn(`gatsby-source-publitio api_key required`)

  if(!api_secret)
    reporter.warn(`gatsby-source-publitio api_secret required`)

  const publitio = new PublitioAPI(api_key, api_secret);

  const data = await publitio.call("/files/list", "GET", options);

  if(!data.success)
    reporter.error(`gatsby-source-publitio ${data.error.message}`)
  else if (data.files) {
    for (const file of data.files) {
      const nodeId = createNodeId(`publitio-file-${file.id}`);

      const fileNode = await createRemoteFileNode({
        url: file.url_download,
        store,
        cache,
        createNode,
        createNodeId,
        parentNodeId: nodeId
      });

      createNode({
        ...file,
        file___NODE: fileNode.id,
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: `PublitioFile`,
          contentDigest: createContentDigest(file)
        }
      });
    }
  }

  return;
};
