# Transactions in SQL 

- To ensure that both the user information and the address are inserted together or not at all, SQL transactions are used.

- it is like in banking transaction like if 50$ debit from one account then it must have to credit into another account and this whole 2 query called as one transaction.


```sql
BEGIN; -- Start transaction

INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

COMMIT;
```

## and here is nodejs code

```javascript
import { Client } from 'pg';

async function insertUserAndAddress(
    username, 
    email, 
    password, 
    city, 
    country, 
    street, 
    pincode
) {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'mysecretpassword',
    });

    try {
        await client.connect();

        // Start transaction
        await client.query('BEGIN');

        // Insert user
        const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
        const userRes = await client.query(insertUserText, [username, email, password]);
        const userId = userRes.rows[0].id;

        // Insert address using the returned user ID
        const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
        await client.query(insertAddressText, [userId, city, country, street, pincode]);

        // Commit transaction
        await client.query('COMMIT');

        console.log('User and address inserted successfully');
    } catch (err) {
        await client.query('ROLLBACK'); // Roll back the transaction on error
        console.error('Error during transaction, rolled back.', err);
        throw err;
    } finally {
        await client.end(); // Close the client connection
    }
}

// Example usage
insertUserAndAddress(
    'johndoe', 
    'john.doe@example.com', 
    'securepassword123', 
    'New York', 
    'USA', 
    '123 Broadway St', 
    '10001'
);


```

- here during the transaction if one query is successfully run then it will not reflect into the actual DB table
- and after that here if second query is done successfully then it will not reflect into the actual DB table
- and when i do COMMIT and that time it will reflect to actual DB table

<br />

- even single query is failed there and after that i am doing COMMIT and that time `ROLLBACK` happens and the reflection of whole transaction or successfull query of transaction 