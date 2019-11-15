module.exports = {
  "services": {
    "databases-for-postgresql": [
      {
        "label": "databases-for-postgresql",
        "provider": null,
        "plan": "standard",
        "name": "swim-psql",
        "tags": [
          "data_management",
          "ibm_created",
          "rc_compatible",
          "ibmcloud-alias"
        ],
        "instance_name": "swim-psql",
        "binding_name": null,
        "credentials": {
          "connection": {
            "cli": {
              "arguments": [
                [
                  "host=5eb0a6a2-89ce-4112-82ab-9683e6de9af6.blijtlfd05jdimoomdig.databases.appdomain.cloud port=32411 dbname=ibmclouddb user=ibm_cloud_06528956_c8d3_4ee4_b96d_e160027c41f2 sslmode=verify-full"
                ]
              ],
              "bin": "psql",
              "certificate": {
                "certificate_base64": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUREekNDQWZlZ0F3SUJBZ0lKQU5FSDU4eTIva3pITUEwR0NTcUdTSWIzRFFFQkN3VUFNQjR4SERBYUJnTlYKQkFNTUUwbENUU0JEYkc5MVpDQkVZWFJoWW1GelpYTXdIaGNOTVRnd05qSTFNVFF5T1RBd1doY05Namd3TmpJeQpNVFF5T1RBd1dqQWVNUnd3R2dZRFZRUUREQk5KUWswZ1EyeHZkV1FnUkdGMFlXSmhjMlZ6TUlJQklqQU5CZ2txCmhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBOGxwYVFHemNGZEdxZU1sbXFqZmZNUHBJUWhxcGQ4cUoKUHIzYklrclhKYlRjSko5dUlja1NVY0NqdzRaL3JTZzhublQxM1NDY09sKzF0bys3a2RNaVU4cU9XS2ljZVlaNQp5K3laWWZDa0dhaVpWZmF6UUJtNDV6QnRGV3YrQUIvOGhmQ1RkTkY3Vlk0c3BhQTNvQkUyYVM3T0FOTlNSWlNLCnB3eTI0SVVnVWNJTEpXK21jdlc4MFZ4K0dYUmZEOVl0dDZQUkpnQmhZdVVCcGd6dm5nbUNNR0JuK2wyS05pU2YKd2VvdllEQ0Q2Vm5nbDIrNlc5UUZBRnRXWFdnRjNpRFFENW5sL240bXJpcE1TWDZVRy9uNjY1N3U3VERkZ2t2QQoxZUtJMkZMellLcG9LQmU1cmNuck03bkhnTmMvbkNkRXM1SmVjSGIxZEh2MVFmUG02cHpJeHdJREFRQUJvMUF3ClRqQWRCZ05WSFE0RUZnUVVLMytYWm8xd3lLcytERW9ZWGJIcnV3U3BYamd3SHdZRFZSMGpCQmd3Rm9BVUszK1gKWm8xd3lLcytERW9ZWGJIcnV3U3BYamd3REFZRFZSMFRCQVV3QXdFQi96QU5CZ2txaGtpRzl3MEJBUXNGQUFPQwpBUUVBSmY1ZHZselVwcWFpeDI2cUpFdXFGRzBJUDU3UVFJNVRDUko2WHQvc3VwUkhvNjNlRHZLdzh6Ujd0bFdRCmxWNVAwTjJ4d3VTbDlacUFKdDcvay8zWmVCK25Zd1BveU8zS3ZLdkFUdW5SdmxQQm40RldWWGVhUHNHKzdmaFMKcXNlam1reW9uWXc3N0hSekdPekpINFpnOFVONm1mcGJhV1NzeWFFeHZxa25DcDlTb1RRUDNENjdBeldxYjF6WQpkb3FxZ0dJWjJueENrcDUvRlh4Ri9UTWI1NXZ0ZVRRd2ZnQnk2MGpWVmtiRjdlVk9XQ3YwS2FOSFBGNWhycWJOCmkrM1hqSjcvcGVGM3hNdlRNb3kzNURjVDNFMlplU1Zqb3VaczE1Tzkwa0kzazJkYVMyT0hKQUJXMHZTajRuTHoKK1BRenAvQjljUW1PTzhkQ2UwNDlRM29hVUE9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCgo=",
                "name": "33d558dc-d56b-11e9-8bb3-6643e1ee2390"
              },
              "composed": [
                "PGPASSWORD=ffe416c9f92f65923a1da9d559c369d3b551994ef248069bff63a8b76ce5c566 PGSSLROOTCERT=33d558dc-d56b-11e9-8bb3-6643e1ee2390 psql 'host=5eb0a6a2-89ce-4112-82ab-9683e6de9af6.blijtlfd05jdimoomdig.databases.appdomain.cloud port=32411 dbname=ibmclouddb user=ibm_cloud_06528956_c8d3_4ee4_b96d_e160027c41f2 sslmode=verify-full'"
              ],
              "environment": {
                "PGPASSWORD": "ffe416c9f92f65923a1da9d559c369d3b551994ef248069bff63a8b76ce5c566",
                "PGSSLROOTCERT": "33d558dc-d56b-11e9-8bb3-6643e1ee2390"
              },
              "type": "cli"
            },
            "postgres": {
              "authentication": {
                "method": "direct",
                "password": "ffe416c9f92f65923a1da9d559c369d3b551994ef248069bff63a8b76ce5c566",
                "username": "ibm_cloud_06528956_c8d3_4ee4_b96d_e160027c41f2"
              },
              "certificate": {
                "certificate_base64": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUREekNDQWZlZ0F3SUJBZ0lKQU5FSDU4eTIva3pITUEwR0NTcUdTSWIzRFFFQkN3VUFNQjR4SERBYUJnTlYKQkFNTUUwbENUU0JEYkc5MVpDQkVZWFJoWW1GelpYTXdIaGNOTVRnd05qSTFNVFF5T1RBd1doY05Namd3TmpJeQpNVFF5T1RBd1dqQWVNUnd3R2dZRFZRUUREQk5KUWswZ1EyeHZkV1FnUkdGMFlXSmhjMlZ6TUlJQklqQU5CZ2txCmhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBOGxwYVFHemNGZEdxZU1sbXFqZmZNUHBJUWhxcGQ4cUoKUHIzYklrclhKYlRjSko5dUlja1NVY0NqdzRaL3JTZzhublQxM1NDY09sKzF0bys3a2RNaVU4cU9XS2ljZVlaNQp5K3laWWZDa0dhaVpWZmF6UUJtNDV6QnRGV3YrQUIvOGhmQ1RkTkY3Vlk0c3BhQTNvQkUyYVM3T0FOTlNSWlNLCnB3eTI0SVVnVWNJTEpXK21jdlc4MFZ4K0dYUmZEOVl0dDZQUkpnQmhZdVVCcGd6dm5nbUNNR0JuK2wyS05pU2YKd2VvdllEQ0Q2Vm5nbDIrNlc5UUZBRnRXWFdnRjNpRFFENW5sL240bXJpcE1TWDZVRy9uNjY1N3U3VERkZ2t2QQoxZUtJMkZMellLcG9LQmU1cmNuck03bkhnTmMvbkNkRXM1SmVjSGIxZEh2MVFmUG02cHpJeHdJREFRQUJvMUF3ClRqQWRCZ05WSFE0RUZnUVVLMytYWm8xd3lLcytERW9ZWGJIcnV3U3BYamd3SHdZRFZSMGpCQmd3Rm9BVUszK1gKWm8xd3lLcytERW9ZWGJIcnV3U3BYamd3REFZRFZSMFRCQVV3QXdFQi96QU5CZ2txaGtpRzl3MEJBUXNGQUFPQwpBUUVBSmY1ZHZselVwcWFpeDI2cUpFdXFGRzBJUDU3UVFJNVRDUko2WHQvc3VwUkhvNjNlRHZLdzh6Ujd0bFdRCmxWNVAwTjJ4d3VTbDlacUFKdDcvay8zWmVCK25Zd1BveU8zS3ZLdkFUdW5SdmxQQm40RldWWGVhUHNHKzdmaFMKcXNlam1reW9uWXc3N0hSekdPekpINFpnOFVONm1mcGJhV1NzeWFFeHZxa25DcDlTb1RRUDNENjdBeldxYjF6WQpkb3FxZ0dJWjJueENrcDUvRlh4Ri9UTWI1NXZ0ZVRRd2ZnQnk2MGpWVmtiRjdlVk9XQ3YwS2FOSFBGNWhycWJOCmkrM1hqSjcvcGVGM3hNdlRNb3kzNURjVDNFMlplU1Zqb3VaczE1Tzkwa0kzazJkYVMyT0hKQUJXMHZTajRuTHoKK1BRenAvQjljUW1PTzhkQ2UwNDlRM29hVUE9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCgo=",
                "name": "33d558dc-d56b-11e9-8bb3-6643e1ee2390"
              },
              "composed": [
                "postgres://ibm_cloud_06528956_c8d3_4ee4_b96d_e160027c41f2:ffe416c9f92f65923a1da9d559c369d3b551994ef248069bff63a8b76ce5c566@5eb0a6a2-89ce-4112-82ab-9683e6de9af6.blijtlfd05jdimoomdig.databases.appdomain.cloud:32411/ibmclouddb?sslmode=verify-full"
              ],
              "database": "ibmclouddb",
              "hosts": [
                {
                  "hostname": "5eb0a6a2-89ce-4112-82ab-9683e6de9af6.blijtlfd05jdimoomdig.databases.appdomain.cloud",
                  "port": 32411
                }
              ],
              "path": "/ibmclouddb",
              "query_options": {
                "sslmode": "verify-full"
              },
              "scheme": "postgres",
              "type": "uri"
            }
          },
          "instance_administration_api": {
            "deployment_id": "crn:v1:bluemix:public:databases-for-postgresql:us-south:a/2815cd8060f147cd9fad07192d8c4678:5eb0a6a2-89ce-4112-82ab-9683e6de9af6::",
            "instance_id": "crn:v1:bluemix:public:databases-for-postgresql:us-south:a/2815cd8060f147cd9fad07192d8c4678:5eb0a6a2-89ce-4112-82ab-9683e6de9af6::",
            "root": "https://api.us-south.databases.cloud.ibm.com/v4/ibm"
          }
        },
        "syslog_drain_url": null,
        "volume_mounts": []
      }
    ],
    "AppID": [
      {
        "label": "AppID",
        "provider": null,
        "plan": "lite",
        "name": "App ID-fl",
        "tags": [
          "security",
          "mobile",
          "ibm_created",
          "lite",
          "ibmcloud-alias"
        ],
        "instance_name": "App ID-fl",
        "binding_name": null,
        "credentials": {
          "apikey": "X56ly8QhFfoGmHlaeo5Vlkfs45kMEKFmIPtPtMgv6xfn",
          "appidServiceEndpoint": "https://us-south.appid.cloud.ibm.com",
          "clientId": "ed342e2d-7699-478b-bb16-70b86e28fabc",
          "discoveryEndpoint": "https://us-south.appid.cloud.ibm.com/oauth/v4/4406e763-e2fb-4443-bd0f-50e4ab5e6f14/.well-known/openid-configuration",
          "iam_apikey_description": "Auto-generated for binding ed342e2d-7699-478b-bb16-70b86e28fabc",
          "iam_apikey_name": "App ID-fl",
          "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Reader",
          "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/2815cd8060f147cd9fad07192d8c4678::serviceid:ServiceId-ff0646bb-1c10-400d-9380-bb3773f7051c",
          "managementUrl": "https://us-south.appid.cloud.ibm.com/management/v4/4406e763-e2fb-4443-bd0f-50e4ab5e6f14",
          "oauthServerUrl": "https://us-south.appid.cloud.ibm.com/oauth/v4/4406e763-e2fb-4443-bd0f-50e4ab5e6f14",
          "profilesUrl": "https://us-south.appid.cloud.ibm.com",
          "secret": "MGRjNjk5MDQtYmRkMi00NjYxLWJmMmUtY2JhZWFhMTc3Nzhi",
          "tenantId": "4406e763-e2fb-4443-bd0f-50e4ab5e6f14",
          "version": 4
        },
        "syslog_drain_url": null,
        "volume_mounts": []
      }
    ]
  }
}