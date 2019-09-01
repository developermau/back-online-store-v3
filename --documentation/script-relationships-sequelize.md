# Sequelize's relations

## RelPertenece ( ROL -> AREA )

```bash
npx sequelize-cli model:generate --name RelPertenece --attributes ro_rol:integer,ar_area:integer
```

## RelIncluye ( COMPRA -> PRODUCTO )

```bash
npx sequelize-cli model:generate --name RelIncluye --attributes co_compra:integer,pr_producto:integer,ri_cantidad:integer,ri_es_envio:string
```

## RelGuarda ( USUARIO -> PRODUCTO )

```bash
npx sequelize-cli model:generate --name RelGuarda --attributes us_usuario:integer,pr_producto:integer
```