[![Publitio logo](https://media.publit.io/file/publitio_logo-lB.png)](https://publit.io?fpr=1229)

# gatsby-source-publitio

Source plugin for getting files from your [Publitio](https://publit.io?fpr=1229) account

## Usage

Install the plugin

```sh
npm install --save gatsby-source-publitio
```

or

```sh
yarn add gatsby-source-publitio
```

Add the plugin to your `gatsby-config.js`

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-publitio',
      options: {
        // See options section for more information
      },
    },
  ],
}
```

## Options

### Required

| Key          | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `api_key`    | Get it from your [Publitio Dashboard](https://publit.io/dashboard) |
| `api_secret` | Get it from your [Publitio Dashboard](https://publit.io/dashboard) |

### Optional

| Key                | Default value | Description                                                                                                                                                                                                                                                  |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `limit`            | `1000`        | Maximum number of files to return. Maximum limit is `1000`                                                                                                                                                                                                   |
| `offset`           | `0`           | How many files should be skipped at the beginning of the result set                                                                                                                                                                                          |
| `filter_privacy`   | `all`         | Specifies which files should be returned based on their privacy. Supported values are `all`, `private` and `public`                                                                                                                                          |
| `filter_extension` | `all`         | Specifies which files should be returned based on their extension. For a full list of extensions see [supported extensions](https://publit.io/docs/#create-file)                                                                                             |
| `filter_type`      | `all`         | Specifies which files should be returned based on their type. Supported values are `all`, `image`, `video` and `audio`                                                                                                                                       |
| `filter_ad`        | `all`         | Specifies which files should be returned based on their option_ad status. Supported values are `all`, `enabled`, `disabled` and `new`                                                                                                                        |
| `tags`             |               | Search query tags separated by + signs. You can append :any to list files which have any of the tags, or :all to list only files which have all of the tags. For example, use `dogs+cats:any` to select all files which either have the dogs or the cats tag |
| `folder`           |               | Folder ID or Path to list files from. Default lists all files. Use / to list top (root) folder files                                                                                                                                                         |



## Example of query

```
query ImagesQuery {
   allPublitioFile(filter: {type: { eq: "image" }}) {
    edges {
      node {
        title
        file {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
```

