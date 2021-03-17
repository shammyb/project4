import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/language_db')
secret = os.getenv('SECRET', 'a suitable secret')