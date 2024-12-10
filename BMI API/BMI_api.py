from flask import Flask,request,jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/calculate', methods=['GET'])
def calculate():
  try:  
    weight= float(request.args.get('w'))
    height= float(request.args.get('h'))
    result=weight/(height**2)
    return jsonify({"result": result})
  except ValueError:
        return jsonify({"error": "Invalid numbers provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)