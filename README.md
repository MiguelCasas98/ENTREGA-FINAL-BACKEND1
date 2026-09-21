# Administrador de Vuelos y Reservas

Proyecto backend desarrollado en Node.js + Express utilizando ESM (import/export) y arquitectura por capas.
Permite administrar vuelos y reservas, incluyendo la asignación de vuelos a cada reserva y el manejo de cantidades.

La persistencia fue migrada desde archivos JSON hacia MongoDB Atlas utilizando Mongoose, manteniendo el funcionamiento original de la API.

## Nota sobre el dominio del proyecto

Este proyecto interpreta el dominio de "servicios" solicitado en la consigna como los **vuelos ofrecidos por una aerolínea**. Es decir, cada `Flight` (vuelo) representa un servicio disponible para reservar, y cada `Ticket` (reserva) es la asociación de uno o más servicios (vuelos) a un cliente, con su respectiva `quantity` (cantidad de pasajes).

Esta decisión de diseño busca aplicar los conceptos pedidos (CRUD de servicios, relación mediante `ObjectId`, `populate`, filtros/paginación/ordenamiento, etc.) en un caso de uso realista de una empresa aérea, manteniendo toda la funcionalidad requerida por la consigna bajo esta nomenclatura de dominio.
---

# Arquitectura del Proyecto

### Estructura de carpetas

```
src/
├── config/
│   ├── db.config.js
│   └── env.config.js
│
├── controllers/
│   ├── flights.controller.js
│   ├── tickets.controller.js
│   └── messages.controller.js
│
├── dao/
│   ├── flights.dao.js
│   ├── tickets.dao.js
│   └── messages.dao.js
│
├── models/
│   ├── flight.model.js
│   ├── ticket.model.js
│   └── message.model.js
│
├── repositories/
│   ├── flights.repository.js
│   ├── tickets.repository.js
│   └── messages.repository.js
│
├── routes/
│   ├── flights.routes.js
│   ├── tickets.routes.js
│   ├── messages.routes.js
│   └── views.router.js
│
├── services/
│   ├── flights.service.js
│   ├── tickets.service.js
│   └── messages.service.js
│
├── validations/
│   ├── flights.validation.js
│   └── tickets.validation.js
│
├── middlewares/
│   └── validateSchema.js
│
├── views/
│   ├── flights.handlebars
│   ├── flightsAvailability.handlebars
│   ├── availability.handlebars
│   └── layouts/
│       └── main.handlebars
│
└── server.js
```
---

# Arquitectura por capas

### Routers

Definen las rutas y delegan la lógica a los controllers.
No contienen validaciones ni acceso a la base de datos.
Aplican middlewares cuando corresponde (por ejemplo, validación de Schemas).

### Controllers

Reciben req y res, llaman al service y devuelven la respuesta.
No contienen validaciones ni lógica de negocio.

### Services

Capa de negocio.
Procesan reglas, validaciones lógicas y delegan en los repositories.
No acceden a la base de datos.

### Repositories

Conectan los services con los DAOs.
No contienen lógica de negocio.

### DAOs

Acceden directamente a MongoDB mediante Mongoose.
Incluyen las operaciones CRUD reales.

### Models

Definen los Schemas de Mongoose:

* Flight

* Ticket

* Message

Incluyen validaciones de estructura y tipos de datos.

### Validations

Validaciones específicas para cada recurso utilizando Zod.
Se aplican mediante el middleware validateSchema.

### Middlewares

Middlewares reutilizables.
Incluye:

* validateSchema.js → aplica validaciones Zod antes de ejecutar el controller.

---

# Instalación

### Instalar dependencias

```
npm install
```

### Crear archivo .env

```
PORT=5050
NODE_ENV=development
MONGO_URI=tu_uri_de_mongo_atlas
```

El archivo .env no se sube al repositorio.
Existe .env.example con las variables necesarias.

---

# Ejecutar el proyecto

```
npm start
```

El servidor se inicia en el puerto definido en .env.

---

# Variables de entorno

* PORT → puerto del servidor

* NODE_ENV → entorno de ejecución

* MONGO_URI → cadena de conexión a MongoDB Atlas

---

# Vuelos (Services)

### Funcionalidades

* Crear vuelos

* Listar vuelos (con filtros, paginación y ordenamiento)

* Buscar por ID

* Actualizar

* Eliminar

### Estructura de un vuelo

* code

* origin

* destination

* date

* time

* airline

* price

* available

* capacity (opcional)

* seatsAvailable (opcional)

### Validaciones (Zod)

Campos obligatorios:

* code (string)

* origin (string)

* destination (string)

* date (string)

* time (string)

* airline (string)

* price (number positivo)

* available (boolean opcional)

---

# Endpoints REST — Vuelos

### GET /api/flights

Devuelve todos los vuelos (con filtros opcionales).

### GET /api/flights/:fid

Devuelve un vuelo por ID.

* 200 si existe

* 404 si no existe

### POST /api/flights

Crea un vuelo nuevo.

* 201 si se crea

* 400 error de validación

### PUT /api/flights/:fid

Actualiza un vuelo.

* 200 si existe

* 404 si no existe

### DELETE /api/flights/:fid

Elimina un vuelo.

* 200 si existe

* 404 si no existe

---

# Reservas (Tickets)

### Funcionalidades

* Crear reservas

* Listar reservas

* Buscar por ID

* Filtrar por fecha

* Filtrar por estado

* Agregar vuelos a una reserva

* Actualizar estado

* Eliminar vuelos dentro de una reserva

* Eliminar reservas completas

### Estructura de una reserva

* clientName

* clientEmail

* date

* time

* status (pendiente, confirmado, cancelado)

* flights: array de objetos con:

    * flight (ObjectId de Flight, populado en las respuestas)

    * quantity

---

# Endpoints REST — Reservas

### GET /api/tickets

Devuelve todas las reservas.

### GET /api/tickets/:tid

Devuelve una reserva por ID.

### GET /api/tickets/date/:date

Filtra reservas por fecha.

### GET /api/tickets/status/:status

Filtra reservas por estado.

### POST /api/tickets

Crea una reserva nueva.

### POST /api/tickets/:tid/flights

Agrega un vuelo a una reserva existente.

Body requerido:

```
{
  "flight": "ObjectId del vuelo",
  "quantity": número
}
```

### PUT /api/tickets/:tid/status

Actualiza el estado de una reserva.

### DELETE /api/tickets/:tid

Elimina una reserva completa.

### DELETE /api/tickets/:tid/flights/:fid

Elimina un vuelo dentro de una reserva.

---

# Mensajes

Recurso agregado en la etapa final del proyecto.

### Estructura

* user

* message

* timestamp

### Endpoints

* GET /api/messages

* POST /api/messages

* DELETE /api/messages/:id

---

# Vistas (Handlebars)

El proyecto incluye vistas para:

* Listado de vuelos

* Disponibilidad de vuelos

* Detalle de vuelo

* Listado de reservas

* Creación de reservas

* Disponibilidad de reservas

Las vistas utilizan datos populados desde MongoDB.

---

# server.js

Archivo principal del proyecto.
Configura:

* Express

* Middlewares

* Rutas base

* Motor de plantillas Handlebars

* Archivos estáticos

* Conexión a MongoDB Atlas

* Socket.io

* Inicio del servidor

# Notas importantes

* No se sube node_modules ni .env al repositorio.

* IDs de vuelos y reservas se generan automáticamente.

* Persistencia migrada desde JSON hacia MongoDB Atlas.

* Arquitectura por capas implementada correctamente:
  router → controller → service → repository → DAO → MongoDB
---  