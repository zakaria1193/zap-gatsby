# ZAP Documentation Web Renderer

## Introduction

The ZAP Documentation Web Renderer is a web application designed to transform ZAP (ZCL Advanced Platform) documentation into an aesthetic static website that can be shared internally or externally with users of your Zigbee or Matter device.

## What is ZAP?

If you don't know ZAP (ZCL Advanced Platform), better start here: [ZAP](https://github.com/project-chip/zap)

## What does it look like ?

Refer to the live sample built from the master branch: [Rendered Documentation](https://zakaria1193.github.io/zap-gatsby/)
[![Deploy Github Pages](https://github.com/zakaria1193/zap-gatsby/actions/workflows/gatsby.yml/badge.svg)](https://github.com/zakaria1193/zap-gatsby/actions/workflows/gatsby.yml)

## Quick Start

Refer to [deploy.yml](.github/workflows/deploy.yml) for a complete example.

1. Provide

- `zap.sqlite` file using env var `ZAP_SQLITE_PATH`
- JSON descriptors folder using env var `ZAP_JSON_DESCRIPTORS_FOLDER`

See [Feeding ZAP Documentation Data](#Feeding-ZAP-Documentation-Data) for more details

2. buid the project

```bash
gatsby build --prefix-paths --out-dir=./wherever-you-want
```

3. Serve it (static website)

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

## Performing an Out-of-Tree Build

By default, the ZAP Documentation Web Renderer builds the website into the `public` directory within your project. To perform an out-of-tree build, follow these steps:

Use the `--out-dir` flag to specify the output directory for the static build during the build process. For example, to build the website into a directory called `build` in your project's root directory:

```bash
gatsby build --prefix-paths --out-dir=./build
```

**--prefix-paths**: Ensures that paths in your website are relative, which is important for out-of-tree builds.

After the build process is complete, you will find your static website files in the specified out-of-tree directory (e.g., `./build`). These files can be deployed to a web server or hosting service.

## Stack

This web application is built on the Gatsby framework, a powerful and versatile tool for creating static websites. Data for rendering the documentation is sourced from the specified data files, including the `zap.sqlite` database and JSON descriptor files, using standard Gatsby GraphQL data connectors. The combination of Gatsby and these data sources ensures a seamless and efficient documentation rendering process.

I've retained the explanations for both `zap.sqlite` and JSON descriptors in this revised README. Please feel free to further customize and expand the README as needed to provide additional context and instructions for users.
