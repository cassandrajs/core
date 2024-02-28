# Cassandra Core

X

## Credits

This project was made possible with thanks to **DataStax**.

This is a port of [https://github.com/apache/cassandra-java-driver/](https://github.com/apache/cassandra-java-driver/) from Java to TypeScript.

## Connection Protocols

To connect to a Cassandra database you'll also need to use a Connection Protocol.

You can build your own by extending the ContactPoint class or use one of our pre-made libraries:

### NodeJS Sockets - `SocketContactPoint`

To install: `npm i @cassandrajs/cp-node`

Usage:

```typescript
new SocketContactPoint({
    address: string, // Hostname, IPv4 or IPv6 address to connect to
    port: number, // Port to connect to
    flowlabel?: number // An IPv6 flow-label
    localAddress?: string, // Local address the socket should connect from
    localPort?: number, // Local port the socket should connect from
    tls?: { // If set, connection will be made TLS encrypted
        servername?: string, // Server name for the SNI TLS extension
        pskCallback?: (hint: string | null) => PSKCallbackNegotation | null // When negotiating TLS-PSK (pre-shared keys), this function is called
        checkServerIdentity?: (servername, cert) => Error | undefined, // Custom function to check the certificate
        rejectUnauthorized: boolean, // If not false, the server certificate is verified against the list of supplied CAs
    }
    lookup?: (hostname: string, options: dns.LookupOptions, callback: (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family?: number) => void, // Use a custom DNS lookup function
})
```

### Cloudflare Workers - `@cassandrajs/cp-cloudflare`

To install: `npm i @cassandrajs/cp-cloudflare`

Usage:

```typescript
new CloudflareContactPoint({
    type: "socket" | "websocket",
    address: string, // Socket hostname or WebSocket URL
    port?: number, // Port number to use (sockets only)
    tls?: {
        servername?: string, // Expected server name
        checkServerIdentity?: (socket: Socket) => Error | undefined, // Custom function to check the server during StartTLS
    },
    wsHeaders?: { [key: string]: string } // If defined, headers to send in the websocket upgrade request (can be used for secure Cloudflare Tunnels)
})
```

## Usage

Once you've installed one of the Connection Protocols you can use it in the CqlSession builder.

Here's a short example of how to connect to Cassandra and execute a SELECT query:

```typescript
import { CqlSession, ResultSet } from "@cassandrajs/driver";
import { SocketContactPoint } from "@cassandrajs/cp-node";

// Start our session by getting the CqlSession builder
const session: CqlSession = CqlSession.builder()
  // Next, define the contact points
  .addContactPoint(new SocketContactPoint({ address: "127.0.0.1", port: 9042 }))
  // Finally, build the session
  .build();

// Execute a query
const resultSet: ResultSet = session.execute(
  "SELECT release_version FROM system.local"
);

// Use the results from the query
const version: string = resultSet.one().getString(0);
console.log("Version: " + version);
```

## Disclaimers

DataStax is a registered trademark of DataStax, Inc. and its subsidiaries in the United States and/or other countries.

Apache Cassandra, Apache, Tomcat, Lucene, Solr, Hadoop, Spark, TinkerPop, and Cassandra are trademarks of the [Apache Software Foundation](http://www.apache.org/) or its subsidiaries in Canada, the United States and/or other countries.
