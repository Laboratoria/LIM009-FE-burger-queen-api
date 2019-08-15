Burger Queen - API con Node.js

Un pequeño restaurante de hamburguesas, que está creciendo, necesita un sistema a través del cual puedan tomar pedidos usando una tablet, y enviarlos a la cocina para que se preparen ordenada y eficientemente. Este proyecto tiene dos áreas: interfaz (cliente) y API (servidor). Nuestra clienta nos ha solicitado desarrollar la API que se debe integra con la interfaz, que otro equipo de desarrolladoras está trabajando simultáneamente Para desarrollar la API rest utilizamos Node js y Express, lo complementamos con un motor de base de datos MongoDB. Utilizamos la librería Mongoose para poder conectarnos a la base de datos. Se desarrollaron cuatro módulos(Auth, Users, Products, Orders) de acuerdo a lo solicitado en la documentaciónlink a la documentación,la cuál especifica el comportamiento esperado de la API que expondremos por HTTP.
1 API

Según lo establecido por la documentación entregada por nuestra clienta, la API debe exponer los siguientes endpoints:

1.1 /

    GET /

1.2 /auth

    POST /auth

    [POST/auth](img/postAuth.png)

1.3 /users

    GET /users
    GET /users/:uid
    POST /users
    PUT /users/:uid
    DELETE /users/:uid

1.4 /products

    GET /products
    GET /products/:productid
    POST /products
    PUT /products/:productid
    DELETE /products/:productid

La siguiente imagen ejemplifica una petición con el método POST para crear un nuevo producto en la base de datos.
1.5 /orders

    GET /orders
    GET /orders/:orderid
    POST /orders
    PUT /orders/:orderid
    DELETE /orders/:orderid
