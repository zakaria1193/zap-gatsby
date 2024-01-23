// Validate required environment variables
const requiredEnvVariables = ['ZAP_JSON_DESCRIPTORS_FOLDER', 'ZAP_SQLITE_FILE'];

requiredEnvVariables.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || "/",
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: process.env.ZAP_JSON_DESCRIPTORS_FOLDER,
      },
    },
    {
      resolve: `gatsby-source-sqlite`,
      options: {
        fileName: process.env.ZAP_SQLITE_FILE,
        queries: [
          {
            statement:
              "SELECT CLUSTER.cluster_id, CLUSTER.name, CLUSTER.code, CLUSTER.description FROM CLUSTER",
            idFieldName: "CODE",
            name: "clusters",
          },

          {
            statement:
              "SELECT COMMAND.name, COMMAND.code, COMMAND.description, CLUSTER.code AS CLUSTER_CODE FROM COMMAND LEFT JOIN CLUSTER ON cluster_ref == cluster_id",
            idFieldName: "CODE",
            name: "commands",
          },
        ],
      },
    },
    // ... other plugins
  ],
};
