from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/PWA-CalcPioneer/<path:filename>')
def serve_files(filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    print(root_dir)
    print(filename)
    if filename.startswith('scripts/'):
        return send_from_directory(os.path.join(root_dir, 'scripts'), filename[8:])
    elif filename.startswith('images/'):
        return send_from_directory(os.path.join(root_dir, 'images'), filename[7:])
    elif filename.startswith('styles/'):
        return send_from_directory(os.path.join(root_dir, 'styles'), filename[7:])
    else:
        return send_from_directory(root_dir, filename)

@app.route('/')
def index():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(root_dir, 'index.html')


if __name__ == "__main__":
    app.run()