# Azure DevOps Pipeline - React App to Azure Blob Storage
This pipeline builds a React application and uploads the generated files to an Azure Blob Storage container configured for static website hosting.

## What this pipeline does
1. Installs Node.js
2. Installs dependencies
3. Builds the React app
4. Uploads the build output to Azure Blob Storage (`$web` container)

## Prerequisites
Before running this pipeline, the following Azure and Azure DevOps resources **must be configured**.

### Azure Storage Account
You must have an Azure Storage Account configured with **Static Website** enabled.
In Azure Portal:
1. Go to your Storage Account
2. Go to Data management > Static Website
3. Enable it

This creates a container named `$web` where the React build files will be uploaded to.

### Azure DevOps Service Connection
You must create a Service Connection in Azure DevOps that allows the pipeline ton authenticate to Azure.
Create it in Azure DevOps > Project Settings > Service connections > New Service connection > Azure Resource Manager.

### Pipeline Variables
The pipeline expects the following variables to exist:
|Variable Name|Description|
|-------------|-----------|
|`AZURE_STORAGE_ACCOUNT_NAME`|Name of the Azure Storage Account|
|`AZURE_SERVICE_CONNECTION`|Name of the Azure DevOps Service Connection.|

# Summary

To use this pipeline, you need:

✔ Azure Storage Account with static website    
✔ Azure DevOps Service Connection    
✔ Correct permissions (RBAC)   
✔ Pipeline variables configured    
✔ React build output folder matches buildFolder    