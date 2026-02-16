# Terraform – Azure Setup Guide

This document describes the required Azure setup before running Terraform.

## 1. Login and select the subscription
```bash
az login
```
## 2. Create a Resource Group
```bash
az group create --name <resource_group_name> --location <location_value>
```

Example:
```bash
az group create --name mfe-dev-rg --location brazilsouth
```

## 3. Create a Service Principal scoped to the Resource Group
```bash
az ad sp create-for-rbac --name "<value>" --role "Contributor" --scopes "/subscriptions/<subscription_id>/resourceGroups/<resource_group_name>"
```

Example:
```bash
az ad sp create-for-rbac --name "terraform-sp" --role "Contributor" --scopes "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/mfe-dev-rg"
```

## 4. Save the credentials
The output will look like:
```json
{
  "appId": "client_id_for_terraform",
  "displayName": "name_choosen",
  "password": "client_secret",
  "tenant": "tenant_id"
}
```

Store these values as GitHub Secrets:
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

## 5. Register the required Resource Providers
Most of the time Azure already has them registered, but just in case:
```bash
az provider register --namespace Microsoft.Storage
az provider register --namespace Microsoft.Resources
```