# back-online-store

```bash
set DEBUG=myapp:* & npm start
```

## Run Migration

```bash
npx sequelize-cli db:migrate
```

## Undo Migration

```bash
npx sequelize-cli db:migrate:undo
```

## RUN a seeder file

```bash
npx sequelize-cli db:seed --seed [seed file name]
```