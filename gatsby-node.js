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
  { actions: { createNode }, store, cache, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { api_key, api_secret, ...options } = {
    ...defaultOptions,
    ...pluginOptions
  };

  const publitio = new PublitioAPI(api_key, api_secret);

  const data = await publitio.call("/files/list", "GET", options);

  if (data.files) {
    data.files.forEach(async file => {
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
    });
  }

  return;
};
