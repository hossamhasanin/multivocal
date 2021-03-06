module.exports = {
  "Local": {
    "und": {
      "Suffix": {
        "Default": [
          {
            "Template": ""
          }
        ]
      },
      "Voice": [
        {
          "Name": "Default"
        }
      ]
    }
  },
  "Setting": {
    "Intent": {
      "Path": [
        "Context/multivocal_requirements/parameters/intentName",
        "Body/result/metadata/intentName",
        "Body/queryResult/intent/displayName"
      ],
      "Template": "Intent.{{IntentName}}"
    },
    "Action": {
      "Path": [
        "Context/multivocal_requirements/parameters/actionName",
        "Body/result/action",
        "Body/queryResult/action"
      ],
      "Template": "Action.{{ActionName}}"
    },
    "Default": {
      "Template": "Default"
    },
    "Platform": {
      "RuleCriteria": {
        "IsDialogflow": {
          "Terms":[
            "{{isTruthy Body.originalRequest}}",
            "{{isTruthy Body.originalDetectIntentRequest}}"
          ],
          "Op": "or"
        },
        "DialogflowVersion":
          "{{#if Platform.IsDialogflow}}"+
            "{{#if (isTruthy Body.originalRequest)}}"+
              "1"+
            "{{else}}"+
              "2"+
            "{{/if}}"+
          "{{/if}}",
        "ActionsSDKVersion": "{{Val 'Req/headers/google-assistant-api-version'}}",
        "IsActionsSDK": "{{isTruthy Platform.ActionsSDKVersion}}",
        "IsActionsOnGoogle": {
          "Terms":[
            "{{eq Body.originalRequest.source             'google'}}",
            "{{eq Body.originalDetectIntentRequest.source 'google'}}",
            "{{Platform.IsActionsSDK}}"
          ],
          "Op": "or"
        },
        "ActionsOnGoogleVersion":
          "{{#if (isTruthy Platform.IsActionsSDK)}}{{Platform.ActionsSDKVersion}}"+
          "{{else if (eq Platform.DialogflowVersion '1')}}{{Body.originalRequest.version}}"+
          "{{else}}{{Body.originalDetectIntentRequest.version}}"+
          "{{/if}}"
      }
    },
    "Precondition": {
      "GooglePing":{
        "Path": [
          "Body/originalRequest/data/inputs",
          "Body/originalDetectIntentRequest/data/inputs"
        ],
        "Default": [],
        "ArgumentName": "is_health_check"
      }
    },
    "Locale": {
      "Path": [
        "Body/originalRequest/data/user/locale",
        "Body/originalDetectIntentRequest/payload/user/locale"
      ],
      "Default": "und"
    },
    "Handler": {
      "Names": [
        "{{Intent}}",
        "{{Action}}",
        "{{Default}}",
        "Default"
      ],
      "Counter": "Handler.{{HandlerName}}"
    },
    "Parameters": {
      "Path": [
        "Body/result/parameters",
        "Body/queryResult/parameters"
      ],
      "Default": {}
    },
    "Contexts": {
      "Path": [
        "Body/result/contexts",
        "Body/queryResult/outputContexts"
      ],
      "Default": {}
    },
    "Option": {
      "Path": [
        "Body/originalRequest/data/inputs[0]/arguments[0]/textValue",
        "Body/originalDetectIntentRequest/payload/inputs[0]/arguments[0]/textValue"
      ],
      "Prefix": "OPTION_"
    },
    "MediaStatus": {
      "Inputs": {
        "Path": [
          "Body/originalRequest/data/inputs",
          "Body/originalDetectIntentRequest/payload/inputs"
        ]
      }
    },
    "Requirements": {
      "Path": [
        "Config/Local/{{Locale}}/Requirements/{{Intent}}",
        "Config/Local/{{Locale}}/Requirements/{{Action}}",
        "Config/Local/{{Locale}}/Requirements/Default",
        "Config/Local/{{Lang}}/Requirements/{{Intent}}",
        "Config/Local/{{Lang}}/Requirements/{{Action}}",
        "Config/Local/{{Lang}}/Requirements/Default",
        "Config/Local/und/Requirements/{{Intent}}",
        "Config/Local/und/Requirements/{{Action}}",
        "Config/Local/und/Requirements/Default"
      ],
      "PermissionList": [
        {
          "Permission": "NAME",
          "Target":     "User/Name",
          "Source":     [
            "Body/originalRequest/data/user/profile/givenName",
            "Body/originalDetectIntentRequest/payload/user/profile/givenName"
          ]
        },
        {
          "Permission": "DEVICE_PRECISE_LOCATION",
          "Target":     "Session/Location",
          "Source":     [
            "Body/originalRequest/data/device/location/coordinates",
            "Body/originalDetectIntentRequest/payload/device/location/coordinates"
          ]
        }
      ]
    },
    "Response": {
      "Path": [
        "Config/Local/{{Locale}}/Response/{{Outent}}",
        "Config/Local/{{Locale}}/Response/{{Intent}}",
        "Config/Local/{{Locale}}/Response/{{Action}}",
        "Config/Local/{{Locale}}/Response/{{Default}}",
        "Config/Local/{{Lang}}/Response/{{Outent}}",
        "Config/Local/{{Lang}}/Response/{{Intent}}",
        "Config/Local/{{Lang}}/Response/{{Action}}",
        "Config/Local/{{Lang}}/Response/{{Default}}",
        "Config/Local/und/Response/{{Outent}}",
        "Config/Local/und/Response/{{Intent}}",
        "Config/Local/und/Response/{{Action}}",
        "Config/Local/und/Response/{{Default}}"
      ],
      "EnvField": "Response",
      "Base": {
        "TemplateEnvMap": {
          "Template": "Msg",
          "TemplateCard": "Card",
          "TemplateSuggestions": "Suggestions"
        }
      }
    },
    "Suffix": {
      "Path": [
        "Config/Local/{{Locale}}/Suffix/{{Outent}}",
        "Config/Local/{{Locale}}/Suffix/{{Intent}}",
        "Config/Local/{{Locale}}/Suffix/{{Action}}",
        "Config/Local/{{Locale}}/Suffix/{{Default}}",
        "Config/Local/{{Lang}}/Suffix/{{Outent}}",
        "Config/Local/{{Lang}}/Suffix/{{Intent}}",
        "Config/Local/{{Lang}}/Suffix/{{Action}}",
        "Config/Local/{{Lang}}/Suffix/{{Default}}",
        "Config/Local/und/Suffix/{{Outent}}",
        "Config/Local/und/Suffix/{{Intent}}",
        "Config/Local/und/Suffix/{{Action}}",
        "Config/Local/und/Suffix/{{Default}}",
        "DefCon/Local/und/Suffix/Default"
      ],
      "EnvField": "ResponseSuffix",
      "Base": {
        "TemplateEnvMap": {
          "Template": "Suffix"
        }
      }
    },
    "Session": {
      "Feature": {
        "Path": [
          "Body/originalRequest/data/surface",
          "Body/originalDetectIntentRequest/payload/surface"
        ],
        "Default": []
      },
      "State": {
        "Path": [
          "Context/multivocal_session/parameters/state"
        ],
        "Default": "{}"
      },
      "Counter": {
        "Path": [
          'Context/multivocal_session/parameters/counter'
        ],
        "Default": "{}"
      },
      "Consecutive": {
        "Path": [
          'Context/multivocal_session/parameters/consecutive'
        ],
        "Default": "{}"
      }
    },
    "User": {
      "Id": {
        "Path": [
          "User/State/UserId",
          "Body/originalRequest/data/user/userId",
          "Body/originalDetectIntentRequest/payload/user/userId"
        ],
        "State": "User/State/UserId",
        "Template": "google:{{User.State.UserId}}"
      },
      "AccessToken":{
        "Path": [
          "Body/originalRequest/data/user/accessToken",
          "Body/originalDetectIntentRequest/payload/user/accessToken"
        ]
      },
      "Profile":{
        "Path": [
          "Body/originalRequest/data/user/idToken",
          "Body/originalDetectIntentRequest/payload/user/idToken"
        ]
      },
      "Feature": {
        "Path": [
          "Body/originalRequest/data/availableSurfaces",
          "Body/originalDetectIntentRequest/payload/availableSurfaces"
        ],
        "Default": []
      },
      "State": {
        "Path": [
          "Body/originalRequest/data/user/userStorage",
          "Body/originalDetectIntentRequest/payload/user/userStorage"
        ],
        "Default": "{}"
      }
    },
    "Voice": {
      "Path": [
        "Config/Local/{{Locale}}/Voice",
        "Config/Local/{{Lang}}/Voice",
        "Config/Local/und/Voice",
        "DefCon/Local/und/Voice"
      ]
    },
    "NoSuffixNeeded": {
      "Criteria":{
        "Terms": [
          "{{EndsWith (join Msg.Ssml ' ') '?'}}",
          "{{Response.ShouldClose}}",
          "{{Response.ShouldRepeat}}"
        ],
        "Op": "or"
      }
    },
    "Ssml": {
      "Template": "{{{join (First Msg.Ssml Msg.Text) ' '}}} {{{join (First Suffix.Ssml Suffix.Text) ' '}}}"
    },
    "Text": {
      "Template": "{{{join (First Msg.Text Msg.Ssml) ' '}}} {{{join (First Suffix.Text Suffix.Ssml) ' '}}}"
    },
    "Context": {
      "PathList": [
        "Requirements/Context",
        "Send/Session",
        "Send/Remember",
        "Response/Context",
        "ResponseSuffix/Context"
      ]
    },
    "ShouldClose": {
      "Path": [
        "ShouldClose",
        "Response/ShouldClose",
        "ResponseSuffix/ShouldClose"
      ],
      "Default": false
    }
  }
};
