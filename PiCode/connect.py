
# Establish Connection to network

# Wait for code to be input 

# Send Query with Code and receive back order information

# Process Order information, queue items for dispensing

# Confirm payment through Stripe

# Dispense the items

import json
import requests

KEY = '70327a82-8bd8-483e-9de0-f3607999ceea'

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

def completeOrder(mid, orderCode):
    q_string = 'mutation {'
    q_string += f"completeOrder(machine: \"{mid}\", orderCode: \"{orderCode}\")"
    q_string += "{ products{displayName }    }    }"

    return q_string


rad = 500
coords = ('37.951759', '-91.776447')

# -------------------------------------- #
# An example to get the remaining rate limit using the Github GraphQL API.

url = 'http://snackhack.tech/graphql'
json = { 'query' : getNearbyMachines(rad, coords[0], coords[1]) }
headers = {'Authorization': f'Bearer {KEY}'}

r = requests.post(url=url, json=json, headers=headers)

data = r.json()['data']

machine = data['nearbyMachines']  
mid = machine[0]['id']
#print(mid)

# Wait on Code from User
orderCode = input("Enter A Code to Receive a Drink: ")

orderJson = { 'query' : completeOrder(mid, orderCode) }
header2 = {'Authorization': f'Bearer {KEY}'}
orderRequest = requests.post(url=url, json=orderJson, headers=header2)

order = orderRequest.json()['data']
items = order['completeOrder']['products']


DRINK1 = "Diet Coke 20 fl oz"
DRINK2 = "Sprite 20 fl oz"
DRINK3 = "Dr Pepper 20 fl oz"
DRINK4 = "Coca-Cola Classic 20 fl oz"


print("You Purchased")
for itm in items:
    print(itm['displayName'])
    drink = itm['displayName']

    """
    from gpiozero import LED

    led1 = LED(17) 
    led2 = LED(22)
    led3 = LED(27)
    led4 = LED(?)


    if drink == DRINK1:
        led1.on()
        sleep(5)
        led1.off()
    elif drink == DRINK2:
        led2.on()
        sleep(5)
        led2.off()
    elif drink == DRINK3:
        led3.on()
        sleep(5)
        led3.off()
    elif drink == DRINK4:
        led4.on()
        sleep(5)
        led4.off()
    """















