''' 
	this serves as the server currently running on local host
	will recieve parameters from the client (website) when the 
	user presses search and will return back the json in a string
	from the locu api 
'''
from urllib.request import *
import json
from flask import Flask, render_template, jsonify
''' FIX TO ENCODING PROBLEM chcp 65001'''
app = Flask(__name__)
# You will need to obtain your own API key from 
# https://dev.locu.com/
locu_api = 'c4e2a6ec419e82c8432bff3ce3aca9b232695f01'


# renders the client template
@app.route("/", methods=["GET"])
def retreive():
    return render_template('map.html') 

@app.route("/sendRequest/<string:query>")
def locu_search(query):
	final_url = 'https://api.locu.com/v1_0/venue/search/?'
	query = query.split(',')
	if query[0] != "":
		locality = query[0].replace(' ','%20')
		final_url += 'locality=' + locality + '&'
	if query[1] != "":
		region = query[1].replace(' ','%20')
		final_url += 'region=' + region + '&'
	if query[2] != "":
		postal_code = query[2].replace(' ','%20')
		final_url += 'postal_code=' + postal_code + '&'
	
	final_url += 'api_key=' +locu_api
	
	print(final_url)
	response = urlopen(final_url).read().decode("utf-8")

	#data = json.loads(response) 
	# will return a string of json to the javascript (client side)
	return response
if __name__ ==  "__main__":
	app.run(host="10.109.129.61", port=33)
