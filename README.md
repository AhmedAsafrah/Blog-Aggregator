# Gator Blog Aggregator CLI

Welcome to Gator! This is a simple, friendly command-line tool for keeping track of your favorite RSS feeds and users. Whether you're a developer or just love blogs, Gator makes it easy to organize and follow feeds right from your terminal.

## What You'll Need

- Node.js (v18 or newer is best)
- A running PostgreSQL database

## Getting Started

1. **Clone the repo:**
   ```
   git clone https://github.com/AhmedAsafrah/Blog-Aggregator.git
   cd Blog-Aggregator
   ```
2. **Install everything:**
   ```
   npm install
   ```
3. **Set up your database:**
   - Open `src/config.ts` and update the database URL, or use a `.env` file if you prefer.
   - Example: `postgres://postgres:postgres@localhost:5432/gator?sslmode=disable`

4. **Configure your user:**
   - Gator stores your current user and database info in a config file. You can edit `src/config.ts` or use the CLI to set up your user.

## Running Gator

To start using Gator, just run:
To start using Gator, just run:

```
npm start
```

Or, if you want to run directly:

```
node src/index.js
```

## What Can You Do?

Here are a few handy commands:

- `add-user <username>`: Create a new user.
- `add-feed <feed-name> <feed-url>`: Add a new RSS feed for your user.
- `follow <feed-url>`: Follow a feed as your user.
- `list-feeds`: See all feeds you can follow.
- `users`: See all users in the system.
- `reset`: Delete all users (careful—this wipes everything!).

## For Developers

- Want to add new commands? Check out `src/commands/`.
- Need to tweak the database? See `src/lib/db/schema.ts`.

## Contributing

If you have ideas or improvements, feel free to open a pull request. All contributions are welcome!

## License

MIT

---

**GitHub Repo:** https://github.com/AhmedAsafrah/Blog-Aggregator.git
