terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = "eu-north-1"     
}

resource "aws_api_gateway_rest_api" "test_api" {
  name        = "TestiAPI"
  description = "Tämä on testiapigateway Terraformin testaukseen"
}