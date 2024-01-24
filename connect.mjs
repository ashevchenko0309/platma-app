import sqlite3 from 'sqlite3'
import { faker } from '@faker-js/faker'

sqlite3.verbose()

const db = new sqlite3.Database('./orders.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message)
  } else {
    console.log('Connected to the SQLite database.')
  }
})

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS 'order' (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product TEXT,
                phone TEXT,
                color TEXT,
                status TEXT,
                category TEXT,
                quantity INTEGER,
                price REAL
        )`,
    (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log('Created order table')

      db.run(`DELETE FROM 'order'`, (err) => {
        if (err) {
          return console.error(err.message)
        }
        console.log('Deleted items in order table')

        const seed = new Array(20)
          .fill(null)
          .map(() => [
            faker.commerce.product(),
            faker.phone.number('1-###-###-####'),
            faker.helpers.arrayElement(['Blue', 'Green', 'Red']),
            faker.helpers.arrayElement(['Pending', 'Canceled', 'Done']),
            faker.vehicle.manufacturer(),
            faker.number.int({ min: 1, max: 5 }),
            faker.commerce.price()
          ])

        const insertSql = `INSERT INTO 'order' (product, phone, color, status, category, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?)`

        seed.forEach((value) => {
          db.run(insertSql, value, (err) => {
            if (err) {
              return console.error(err.message)
            }
            console.log(`Added order item`)
          })
        })

        db.close((err) => {
          if (err) {
            return console.error(err.message)
          }
          console.log('Closed the database connection.')
        })
      })
    }
  )
})
