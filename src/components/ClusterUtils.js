// Find clusters of same name and code but different side
function find_clusters_with_same_name(clusters) {
  let cluster_couples = [];
  let found_couples_names = [];
  clusters.forEach((cluster, index) => {
    clusters.forEach((other_cluster, other_index) => {
      if (
        cluster.name === other_cluster.name &&
        cluster.code === other_cluster.code &&
        cluster.side !== other_cluster.side &&
        index !== other_index &&
        !found_couples_names.includes(cluster.name)
      ) {
        cluster_couples.push([cluster, other_cluster]);
        found_couples_names.push(cluster.name);
      }
    });
  });

  // Return a list of list of clusters
  // Each list has either 1 or 2 clusters
  let list_of_single_clusters = clusters.filter(
    (cluster) => !found_couples_names.includes(cluster.name)
  );
  // Convert each single cluster to a list of a single cluster
  list_of_single_clusters = list_of_single_clusters.map((cluster) => [cluster]);

  const merged_list = list_of_single_clusters.concat(cluster_couples);

  return merged_list;
}

function concatenate_cluster_commands(cluster_list) {
  // Join all commands
  const commands_sum = [];

  for (const cluster of cluster_list) {
    if (!cluster.commands || cluster.commands.length === 0) {
      continue;
    }
    for (const command of cluster.commands) {
      commands_sum.push(command);
    }
  }

  return commands_sum;
}

export { find_clusters_with_same_name, concatenate_cluster_commands };
