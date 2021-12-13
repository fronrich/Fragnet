# Fragnet

Decentralized File Storage Solution By Fronrich Puno

## Purpose

---

There are several problems with today's encryption methods.

- Local encryption stores the file and the key in one place

- in P2P, we create the lock to the key that the other person has

- Modern encryption relies on the secuirty of the encryption scheme, which must not be crackable in polynomial time

- By basing security on the amount of time it takes to crack something, a brute force algorithm run on a fast enough computer would make such security solutions negligable

## Proposed Solution

---

I think that the solution lies in an ensemble method, in which files are encrypted, and then parts of both the encrypted file and key are sent to nodes of a network.

To decrypt and reconstruct the file, the parts of the key and file must be concatonated in their original order, and then run through a decryption algortihm.

The more files are added to this network, the more secure it becomes. Since files and keys are stored as fragments with ambigous names, what may have been single sources of turth become whispers amongust an ocean of information.

## Nodes

Nodes are defined as computers in the network. There are three types of nodes:

- Client

  - Client nodes are computers that upload and download files to and from the network

  - These are usually controlled by users

  - Client Upload

    - Client sends files to an cryptographer node

  - Client Download

    - Client recives files from cryptographer

- Cryptographer

  - Client Upload

    - Encrypts file and sends encrypted file to distribution

    - sends decryption keys to Reception

  - Client Download

    - Decrypts file and sends decrypted file to Client

    - sends decryption keys to Reception

- Receptionist

  - Stores keys

  - Client Upload

    - Accepts decryption key from cryptographer

  - Client Download

    - Gives decryption key to cryptographer

- Distributor

  - Deconstructs encrypted file into several fragments
  - Makes multiple sets of identical copies of these fragments
  - Distributes fragments to several warehouses
  - In case of bad actor, hopefully enough fragments exist to rebild the file

- Warehouse

## Node Rules

Note that in a graphical representation, all nodes have access to all nodes of the type vertically adjacent to them in the heirarchy.

Nodes DO NOT have direct access to vertically non-adjacent nodes in the heirarchy.

Also note that Receptionist and Distributor nodes are horizontally adjacent because they perform roles concurrently, and do not have access to each other

- **Ex. All clients have access to all cryptographers. All distributors have access to all warehouses.Clients DO NOT have direct access to warehouses**

## Stages of a File

### Your Computer

File - The raw file

### Client Node (Your Computer can be dedicated as a client node too)

Wrapped File - The raw file is converted to a bitstream, and appended to a json with metadata. the schema for this data structure is found in `installer/build/nodes/Client/upload/wrappedFile.schema.json`

### Crptographer
