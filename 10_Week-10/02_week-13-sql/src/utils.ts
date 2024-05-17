import { Client } from 'pg';

// connection with db
export async function getClient() {
    const client = new Client("postgres://wzsxsnxg:LHZ9Cv4QoZ1zctxapkOq2ch672-o9UQe@trumpet.db.elephantsql.com/wzsxsnxg");
    await client.connect();
    return client;
}