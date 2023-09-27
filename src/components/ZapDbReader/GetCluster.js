import { graphql, useStaticQuery } from "gatsby";

export const query = graphql`
  query {
    allSqliteClusters {
      nodes {
        CODE
        DESCRIPTION
        NAME
      }
    }
    allSqliteCommands {
      nodes {
        CLUSTER_CODE
        DESCRIPTION
        CODE
        NAME
      }
    }
  }
`;

// Cluster to obj
const GetCluster = (cluster_code) => {
  const data = useStaticQuery(query);

  if (data.allSqliteClusters.nodes.length === 0) {
    console.log("No clusters found in database");
    return null;
  }

  const clusters = data.allSqliteClusters.nodes.map((cluster) => {
    return {
      code: parseInt(cluster.CODE, 16),
      description: cluster.DESCRIPTION,
      name: cluster.NAME,
    };
  });

  const clusterObj = clusters.find((cluster) => cluster.code === cluster_code);

  return clusterObj;
};

// Command to obj
const GetCommand = (cluster_code, command_code) => {
  const data = useStaticQuery(query);

  if (data.allSqliteCommands.nodes.length === 0) {
    console.log("No commands found in database");
    return null;
  }

  const commands = data.allSqliteCommands.nodes.map((command) => {
    return {
      cluster_code: parseInt(command.CLUSTER_CODE, 16),
      code: parseInt(command.CODE, 16),
      description: command.DESCRIPTION,
      name: command.NAME,
    };
  });

  const commandObj = commands.find(
    (command) =>
      command.cluster_code === cluster_code && command.code === command_code
  );

  return commandObj;
};

// Get cluster description
const GetClusterDescription = (cluster_code) => {
  const cluster = GetCluster(cluster_code);
  if (!cluster) {
    return "## Description not found";
  }
  return cluster.description;
};

// Get command description
const GetCommandDescription = (cluster_code, command_code) => {
  const command = GetCommand(cluster_code, command_code);
  if (!command) {
    return "## Description not found";
  }
  return command.description;
};

export { GetCluster, GetClusterDescription, GetCommand, GetCommandDescription };
