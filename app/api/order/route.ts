import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
import { NextRequest, NextResponse } from 'next/server'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function GET() {
  if (!db) {
    db = await open({
      filename: './orders.db',
      driver: sqlite3.Database
    })
  }

  const orders = await db.all("SELECT * FROM 'order'")

  return new Response(JSON.stringify(orders), {
    headers: { 'content-type': 'application/json' },
    status: 200
  })
}

export async function PUT(req: NextRequest, res: NextResponse) {
  if (!db) {
    db = await open({
      filename: './orders.db',
      driver: sqlite3.Database
    })
  }

  const { id, product, phone, color, status, category, quantity, price } = await req.json()

  await db.run("UPDATE 'order' SET product=?, phone=?, color=?, status=?, category=?, quantity=?, price=? WHERE id=?", [
    product,
    phone,
    color,
    status,
    category,
    quantity,
    price,
    id
  ])

  return new Response(JSON.stringify({ id, product, phone, color, status, category, quantity, price }), {
    headers: { 'content-type': 'application/json' },
    status: 200
  })
}

export async function POST(req: NextRequest, res: NextResponse) {
  if (!db) {
    db = await open({
      filename: './orders.db',
      driver: sqlite3.Database
    })
  }

  const { product, phone, color, status, category, quantity, price } = await req.json()

  await db.run("INSERT INTO 'order' (product, phone, color, status, category, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?)", [
    product,
    phone,
    color,
    status,
    category,
    quantity,
    price
  ])

  return new Response(JSON.stringify({ product, phone, color, status, category, quantity, price }), {
    headers: { 'content-type': 'application/json' },
    status: 200
  })
}
