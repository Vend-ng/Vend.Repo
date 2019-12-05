
# Establish Connection to network

# Wait for code to be input 

# Send Query with Code and receive back order information

# Process Order information, queue items for dispensing

# Confirm payment through Stripe

# Dispense the items

import json
import requests


class Query:
    def __init__(url, key, mid):
        self.url = url
        self.key = key
        self.machineID = mid


def getNearbyMachines(radius, lat, long):
    q_string = '{'
    
    q_string += f"nearbyMachines(radius:{radius}, latitude:{lat}, longitude:{long})"
    q_string += "{ id, latitude, longitude }"
    q_string += "}"

    return q_string


rad = 500
coords = ('37.951759', '-91.776447')

# -------------------------------------- #
# An example to get the remaining rate limit using the Github GraphQL API.

import requests
import json

url = 'http://snackhack.tech/graphql'
json = { 'query' : getNearbyMachines(rad, coords[0], coords[1]) }
headers = {'Authorization': 'Bearer 23e3a7d5-4a35-4e8a-afec-9bb1056d5b41'}

r = requests.post(url=url, json=json, headers=headers)

data = r.json()['data']

machine = data['nearbyMachines']  
mid = machine[0]['id']
print(mid)











