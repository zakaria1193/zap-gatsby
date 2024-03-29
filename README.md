# ZAP Documentation Web Renderer

## Introduction

The ZAP Documentation Web Renderer is a web application designed to transform ZAP (ZCL Advanced Platform) documentation into an aesthetic static website that can be shared internally or externally with users of your Zigbee or Matter device.

## What is ZAP?

If you don't know ZAP (ZCL Advanced Platform), better start here: [ZAP](https://github.com/project-chip/zap)

## What does it look like ?

Refer to the live sample built from the master branch:

[Rendered Documentation](https://zakaria1193.github.io/zap-gatsby/) from [CI build](#ci-build-and-serve)

[![preview](./website-preview.png)](https://zakaria1193.github.io/zap-gatsby/)

## Quick Start

Refer to [CI Build](#ci-build-and-serve) for a complete running example.

1. Provide

- `zap.sqlite` file using env var `ZAP_SQLITE_PATH`
- JSON descriptors folder using env var `ZAP_JSON_DESCRIPTORS_FOLDER`
- Specify the `PATH_PREFIX` env var, if you intend to deploy to a subdirectory, such as `https://zakaria1193.github.io/zap-gatsby/`. This is optional, with the default path prefix being `/`.

See [Feeding ZAP Documentation Data](#feeding-zap-documentation-data) for more details.

2. Debug

```bash
gatsby develop
```

3. Build and Serve

```bash
gatsby build --prefix-paths --out-dir=./wherever-you-want
```

To serve use any static server (such as github pages), or directly from gatsby:

```bash
gatsby serve --prefix-paths --port 9000
```

## CI Build and Serve

### Github Actions

Refer to [deploy.yml](.github/workflows/gatsby.yml) for a complete running example.
This job will build the project and deploy it to Github Pages. [Rendered Documentation on Github](https://zakaria1193.github.io/zap-gatsby/)

Github pipeline status : [![Deploy Github Pages](https://github.com/zakaria1193/zap-gatsby/actions/workflows/gatsby.yml/badge.svg)](https://github.com/zakaria1193/zap-gatsby/actions/workflows/gatsby.yml)

### Gitlab CI

Refer to [.gitlab-ci.yml](.gitlab-ci.yml) for a complete running example.
This job will build the project and deploy it to Gitlab Pages. [Rendered Documentation on Gitlab](https://zakaria1193.gitlab.io/zap-gatsby/)

Gitlab pipeline status : [![Deploy Gitlab Pages](https://gitlab.com/zakaria1193/zap-gatsby/badges/master/pipeline.svg)](https://gitlab.com/zakaria1193/zap-gatsby/-/pipelines)

## Feeding ZAP Documentation Data

To effectively utilize this web application, follow these steps to provide the necessary data:

1. **zap.sqlite**

env var: `ZAP_SQLITE_PATH`

- **What is it?**: The `zap.sqlite` database is utilized by your ZAP instance. It contains comprehensive information about ZCL (Zigbee Cluster Library), including any custom manufacturer-specific clusters, attributes, and commands added via XML files.
- **Why?**: This database is the source from which cluster and command description strings are extracted. Utilizing this data significantly enhances the readability of the generated documentation.
- **Where to find it?**: On Linux systems, you can typically locate the `zap.sqlite` database under `~/.zap/zap.sqlite`.
- **How to provide?**: Use the environment variable `ZAP_SQLITE_PATH` to specify the path to the `zap.sqlite` database.

2. **JSON Descriptors**

env var: `ZAP_JSON_DESCRIPTORS_FOLDER`

- **What are they?**: JSON descriptors are files that store information about device configurations. When you edit a descriptor for your device, you save your session as a JSON file.
- **Why?**: These JSON descriptor files contain critical device information, and they are the foundation of what gets rendered in the documentation.
- **Where to find them?**: You have the flexibility to choose the location for saving device configuration JSON files when using ZAP.
- **How many?**: You can drop multiple JSON descriptor files under the `./data/descriptors/` directory, and all of them will be rendered as individual device documentation pages. The file names you use will serve as the device names when displayed in the rendered documentation, without the `.json` extension. The directory structure should look like this:

```plaintext
└── $ZAP_JSON_DESCRIPTORS_FOLDER
    ├── device1.json
    ├── device2.json
    └── ...
```


## Implementation details

This web application is built on the Gatsby framework, a powerful and versatile tool for creating static websites. Data for rendering the documentation is sourced from the specified data files, including the `zap.sqlite` database and JSON descriptor files, using standard Gatsby GraphQL data connectors. The combination of Gatsby and these data sources ensures a seamless and efficient documentation rendering process.

I've retained the explanations for both `zap.sqlite` and JSON descriptors in this revised README. Please feel free to further customize and expand the README as needed to provide additional context and instructions for users.

