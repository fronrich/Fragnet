# Generic Node

A node not intended to be used in the system. Instead, it's an abstract entity (abstract class and abstract long/short term data structures) who's functionality is inherited by other nodes. These include the ability to receive and send files via ssh, the ability to communicate with neighboring nodes about the oracle, the ability to save to disk in the form of a storage.json, and the ability to cache stuff for dp.

The Node can process 4 primative data types. these primative data types are nothing more than classifications of files. They are as follows:

- File

  - a nonspecific file format

- Package

  - A container with some type of bitstream. The bitstream represents a file or a part of a file in various forms

- Request

  - A request just passes down the heirachy through nodes until it reaches its predetermined destination

- Callback

  - A request just passes up the heirachy through nodes until it reaches its predetermined destination

- Knowledge

  - Oracle data from neighboring node
