# Sequelize's models

## Area

```bash
npx sequelize-cli model:generate --name Area --attributes ar_titulo:string,ar_activa:boolean
```

## Rol

```bash
npx sequelize-cli model:generate --name Rol --attributes ro_titulo:string,ro_activo:boolean
```

## Recurso

```bash
npx sequelize-cli model:generate --name Recurso --attributes re_titulo:string,re_path:string,re_icon:string,ar_area:integer,re_activo:boolean
```

## Usuario

```bash
npx sequelize-cli model:generate --name Usuario --attributes us_primer_nombre:string,us_segundo_nombre:string,us_paterno_apellido:string,us_materno_apellido:string,us_genero:string,us_carnet:bigint,us_username:string,us_password:string,us_email:string,us_direccion:string,us_telefono_fijo:integer,us_telefono_movil:integer,us_avatar:string,us_fecha_nacimiento:string,ro_rol:integer,us_active:boolean
```

## Categoria

```bash
npx sequelize-cli model:generate --name Categoria --attributes ca_nombre:string,ca_imagen:string,ca_estado:string
```

## Proveedor

```bash
npx sequelize-cli model:generate --name Proveedor --attributes pr_nombre:string,pr_direccion:string,pr_telefono:integer,pr_estado:string
```

## Producto

```bash
npx sequelize-cli model:generate --name Producto --attributes pr_nombre:string,pr_descripcion:string,pr_marca:string,pr_precio_bs:double,pr_precio_envio_bs:double,pr_stock:integer,pr_year:integer,pr_estado:string,ca_categoria:integer,pr_proveedor:integer
```

## Fotografia

```bash
npx sequelize-cli model:generate --name Fotografia --attributes fo_ubicacion:string,pr_producto:integer
```

## Opinion

```bash
npx sequelize-cli model:generate --name Opinion --attributes op_texto:string,op_calificacion:double,us_usuario:integer,pr_producto:integer
```

## Compra

```bash
npx sequelize-cli model:generate --name Compra --attributes co_codigo_orden:string,co_nro_deposito:string,co_total_bs:double,co_estado:string,us_usuario:integer
```