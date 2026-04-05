import { db } from './db';
import { users } from './db/schema';

async function test() {
  console.log('Testing DB CRUD...');
  
  // Create
  const newUser = await db.insert(users).values({
    name: 'Dasun',
    preferredLanguage: 'si',
  }).returning();
  
  console.log('Inserted user:', newUser);

  // Read
  const allUsers = await db.select().from(users);
  console.log('All users:', allUsers);

  if (allUsers.length > 0) {
    console.log('DB CRUD test passed!');
  } else {
    console.error('DB CRUD test failed!');
  }
  
  process.exit(0);
}

test().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
