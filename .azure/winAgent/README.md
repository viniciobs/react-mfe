# Azure DevOps Pipeline - React App to Azure Blob Storage
This pipeline builds a React application and uploads the generated files to an Azure Blob Storage container configured for static website hosting.

## What this pipeline does
1. Installs Node.js
2. Installs dependencies
3. Builds the React app
4. Uploads the build output to Azure Blob Storage (`$web` container)

## Prerequisites
Before running this pipeline, the following Azure and Azure DevOps resources **must be configured**.

### Azure Pipelines
If your project still doesn't have the pipeline configured, go ahead and configure it linking to the pipeline files in this project.

### Azure DevOps Service Connection
You must create a Service Connection in Azure DevOps that allows the pipeline ton authenticate to Azure.
Create it in Azure DevOps > Project Settings > Service connections > New Service connection > Azure Resource Manager.

### Agent Pool
This pipeline is configured to run on a self-hosted agent installed on a Windows machine.

Instead of using Microsoft-hosted agents, this project uses a local agent pool (for example: `LocalPool`) that points to a Windows machine where the Azure DevOps agent is installed.

#### Requirements on the agent machine

The Windows machine running the agent must have:

- Node.js installed
- pnpm (or Corepack enabled)
- Azure CLI installed
- Internet access to download dependencies
- Access to Azure DevOps

You can verify the tools with:
```cmd
node --version
pnpm --version
az --version
```

### Resource Group and Service Principal
Please, refer to this document: [Resource Group and Service Principal setup documentation](../../.terraform/README.md)

# Summary

To use this pipeline, you need:

✔ Azure Storage Account with static website    
✔ Azure DevOps Service Connection    
✔ Correct permissions (RBAC)   
✔ Pipeline variables configured    
✔ React build output folder matches buildFolder    