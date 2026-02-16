variable "client_id" {}
variable "client_secret" {}
variable "tenant_id" {}
variable "subscription_id" {}

variable "resource_group_name" {}
variable "location" {}
variable "storage_account_name" {}

variable "containers" {
  type = list(string)
}
