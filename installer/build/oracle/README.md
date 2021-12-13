# Oracle

## Role

The role of the oracle is to scale the fragnet architecture dynamically up and down with the additon of new nodesand reaping of corrupt nodes. The governing rules of the architecture are that nodes exist in a heirarchy. All nodes have direct access to all other nodes directly above or below them in the heirarchy.

## Issue with Single Source of Truth Model

If we wanted the entire network to maintain this state of homeostasis all the time, we would have to halt the progress of every transaction taking place over the network, so that updates could happen synchronously. Not only is this inconvenient; it poses a network breaking threat. If a bad actor were to either continually add and reap nodes, they could halt the system indefinitly, locking the files of users forever.

## Introducing Proof-of-Existance (POE)

The oracle is not one entity. In philosophical terms, it's more of a bundle of impressions. In computer science terms it is both static and dynamic. All nodes have an idea of the oracle - the static aspect stored locally. As nodes communicate with each other by sending packages, they share compare ideas of the oracle with neighboring nodes, and the most recent impression of it is remembered by both. This system of constant self discovery has led me to call this concensus algorithm proof-of-existance (POE).

## Seeding POE
