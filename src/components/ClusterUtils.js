import { GetClusterDescription } from "./ZapDbReader/GetCluster";

// Cluster couple type
// with one client cluster and one server cluster (can be null)
class ClusterCouple {
  constructor(client_cluster, server_cluster) {

    this.client_cluster = client_cluster;
    this.server_cluster = server_cluster;

    // One cluster can be null
    const ref_cluster = client_cluster || server_cluster;
    let other_cluster = client_cluster ? server_cluster : client_cluster;

    this.name = ref_cluster.name;
    this.code = "0x" + ref_cluster.code.toString(16).toUpperCase();

    if (!other_cluster) {
      other_cluster = get_empty_cluster(ref_cluster.side === "client" ? "server" : "client",
        ref_cluster.name, ref_cluster.code);
    } else if ((ref_cluster.code !== other_cluster.code)
      || (ref_cluster.name !== other_cluster.name)) {
      throw new Error("Cluster couple must have same name and code");
    }

    this.description = GetClusterDescription(parseInt(this.code, 16));
  }

  get merged_commands() {
    let merged_commands = [];

    if (this.client_cluster && this.client_cluster.commands) {
      merged_commands = merged_commands.concat(this.client_cluster.commands);
    }

    if (this.server_cluster && this.server_cluster.commands) {
      merged_commands = merged_commands.concat(this.server_cluster.commands);
    }

    return merged_commands;
  }

  side(side) {
    if (side === "client") {
      return this.client_cluster;
    }
    else if (side === "server") {
    return this.server_cluster;
    }
    else {
      throw new Error("Invalid side");
    }
  }
}

function get_empty_cluster(side, name, code) {
  return {
    name: name,
    code: code,
    side: side,
    attributes: [],
    commands: [],
  };
}


// Find clusters of same name and code but different side
function find_cluster_couples(clusters) {
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
        if (cluster.side === "client") {
          cluster_couples.push(new ClusterCouple(cluster, other_cluster));
        } else {
          cluster_couples.push(new ClusterCouple(other_cluster, cluster));
        }
        found_couples_names.push(cluster.name);
      }
    });
  });

  // Filter out clusters that are part of a couple
  let single_clusters = clusters.filter(
    (cluster) => !found_couples_names.includes(cluster.name)
  );

  // Convert each single cluster to a cluster couple by picking side
  single_clusters = single_clusters.map((cluster) => {
    if (cluster.side === "client") {
      return new ClusterCouple(cluster, null);
    } else {
      return new ClusterCouple(null, cluster);
    }
  });

  const merged_list = single_clusters.concat(cluster_couples);

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

export { find_cluster_couples, concatenate_cluster_commands };
