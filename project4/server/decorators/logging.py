from app import app
from flask import Flask, jsonify, request

# ? A decorator that flask provides for pre-request code.
@app.before_request
def log():
    print('lang log...')
    print('It\'s a long journey ahead')