PUT _ilm/policy/ztm_policy
{
  "policy": {
    "phases": {
      "hot":{
        "actions": {
          "rollover": {
            "max_size": "1gb",
            "max_age": "30d"
          }
        }
      }
    }
  }
}

PUT _template/ztm_template
{
  "index_patterns": ["ztm-*"],
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1,
    "index.lifecycle.name":"ztm_policy",
    "index.lifecycle.rollover_alias": "ztm"
  },
  "mappings": {
    "properties": {
      "@timestamp": {
        "type": "date"
      },
      "@version": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "bearing": {
        "type": "float"
      },
      "brigade": {
        "type": "keyword"
      },
      "distance": {
        "type": "float"
      },
      "lines": {
        "type": "keyword"
      },
      "location": {
        "type": "geo_point"
      },
      "speed": {
        "type": "float"
      },
      "time": {
        "type": "date",
        "format":"MMM dd, yyyy K:mm:ss a"
      },
      "vehicleNumber": {
        "type": "keyword"
      }
    }
  }
}

PUT ztm-000001
{
  "aliases": {
    "ztm": {
      "is_write_index":true
    }
  }
}
