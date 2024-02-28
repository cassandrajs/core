import { CqlSession, ResultSet } from "@cassandrajs/driver"

// Start our session by getting the CqlSession builder
const session: CqlSession = CqlSession.builder()
    // Next, define the contact points
    .addContactPoint(new TcpOverWebsocketContactPoint("wss://"))
    .addContactPoint(new CloudflareSocketsContactPoint({ hostname: "gopher.floodgap.com", port: 70 }))
    // Finally, build the session
    .build();

// Execute a query
const resultSet: ResultSet = session.execute("SELECT release_version FROM system.local")

// Use the results from the query
const version: string = resultSet.one().getString(0)
console.log("Version: " + version)
