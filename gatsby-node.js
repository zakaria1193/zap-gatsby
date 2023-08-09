exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query your data to get the list of devices
  const result = await graphql(`
    query {
      allFile {
        nodes {
          base
          childDescriptorsJson {
            endpoints {
              endpointId
              endpointTypeIndex
              endpointTypeName
              profileId
            }
            endpointTypes {
              name
              id
              deviceTypes {
                code
                id
                label
                name
                profileId
              }
              clusters {
                attributes {
                  code
                  maxInterval
                  minInterval
                  reportable
                  reportableChange
                  type
                  defaultValue
                  included
                  bounded
                  side
                  singleton
                  storageOption
                  name
                }
                commands {
                  code
                  incoming
                  name
                  outgoing
                  source
                }
                code
                define
                enabled
                name
                side
              }
              deviceIdentifiers
              deviceTypeCode
              deviceTypeProfileId
              deviceTypeName
              deviceTypeRefs
              deviceTypeRef {
                code
                id
                label
                name
                profileId
              }
              deviceVersions
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Iterate over each device and create a page for it
  const device_files = result.data.allFile.nodes;
  device_files.forEach((device_file, index) => {
    device_file_without_extension = device_file.base.replace(".json", "");
    createPage({
      path: `/device/${device_file_without_extension}`,
      component: require.resolve("./src/templates/DeviceTemplate.js"),
      context: {
        deviceData: device_file,
        product_name: device_file_without_extension,
      },
    });
  });
};
