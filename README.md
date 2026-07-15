# Operación: Costa Guayaba

Un dia el ejercito de un pais opresor convenientemente sin nombre amenaza con atentar contra la integridad de tu lider supremo
con un curioso bigote y una extrana aficion por el color rojo, pero por muy mala suerte te quedate dormido cerca del palacio 
cuando llegaron las fuerzas enemigas. Ya no te queda mas remedio que tomar el arma de ferias que te otorgaron en un extraño acto nada politico
y velar por la integridad de tu lider supremo. Sino él no será el único en desaparecer...


## Integrantes

- Efraín Mejías – C.I. 38.525.582
- Carlos Lugo – C.I. 31.171.121

  (tenganos piedad por favor, somos solo dos personas puede que hasta autistas, y no teniamos nada mas que fé y pocas horas con luz,
  lo dimos todo, pero el poder de la amistad no fue suficiente...)

## Tecnologías

- React + Vite
- Phaser
- Django + Django REST Framework
- PostgreSQL

## Características

- Modo de 1 y 2 jugadores.
- Sistema de vidas y puntuación.
- Muros destructibles e indestructibles.
- Tabla de puntuaciones conectada al backend.

## Ejecutar el proyecto

Crea un archivo .env dentro de backend/ con tus credenciales de PostgreSQL:

DB_NAME=battlecity_db
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```


### Frontend

```bash
cd frontend
npm install
npm run dev
```

El backend se ejecuta en `http://localhost:8000` y el frontend en `http://localhost:5173`.

## Nota

Todos los personajes de este proyecto son fictios, cualqioer parecido con la realidad es mera causalidad.
