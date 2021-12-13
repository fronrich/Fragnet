# static elements

static elemennts of this architecture are those which "stay in place" They process data and move it from one part of the system to the next, but their locations remain static. These elements include nodes, their environments, and their reapers.

## Static Architecture

### Directory Tree

```json
"fragnet": [
  {
    "name": "imports",
    "description": "incoming files are cached here",
    "subdirs": ["*.<fileContainerType>.json", "*.dns.json", "*.blueprint.json"]
  },
  {
    "name": "exports",
    "description": "outgoing files are cached here",
    "subdirs": ["*.<fileContainerType>.json", "*.dns.json", "*.blueprint.json"]
  },
  {
    "name": "env",
    "description": "the virutal environment, running in express.js. lazy loads nodes as subprocesses (vnodes) so imports can be processed in parallel. Lazy loading relies on chokidar library.",
    "subdirs": [
      {
        "name": "node",
        "description": "the node program dedicated to this env",
        "subdirs": [
          "NodeClass.js",
          "NodeProps.js",
          "imports.js"
          {
            "name": "schemas",
            "description": "the schemas used to validate"
          }
        ]
      }
    ]
  }

]
```
