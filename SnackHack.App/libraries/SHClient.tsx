import React from 'react';
import { Marker } from 'react-native-maps';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import Item from '../components/Item';
export default class SHClient {
    client = new ApolloClient({
        uri: "http://snackhack.tech/graphql"
    });

    async nearbyMachines(lat: number, lng: number, func: (id: string, shortName: string) => void) : Promise<JSX.Element[]> {

        var x:JSX.Element[] = [];
        
        var r = await this.client.query({
            query: gql`
            {
                nearbyMachines(
                    longitude: ${lng}
                    latitude: ${lat})
                { 
                    id
                    shortName
                    latitude
                    longitude
                }
            }
            `
        });
        console.log(r.data.nearbyMachines)
        r.data.nearbyMachines.forEach((e: { shortName: string; 
                                latitude: number; 
                                longitude: number; 
                                id: string; }) => {
                console.log("e: " + e);
                var y = <Marker 
                            key= {e.id}
                            title = {e.shortName}
                            // pinColor = "#ffffff"
                            coordinate = {{
                                latitude: e.latitude,
                                longitude: e.longitude
                            }}
                            onPress = {() =>
                                func(e.id, e.shortName)
                            } />
                console.log("y: " + y);
                x.push(y);
                    
        });
        console.log("x: " + x);
        return x;

    }

    async products() {
        var x:JSX.Element[] = [];
        var r = await this.client.query({
            query: gql`
            {
                products{ 
                    id,
                    displayName,
                    description,
                    price,
                }
            }
            `
        });
        r.data.products.forEach(e => {
            console.log("e: " + e);
            var y = <Item 
                        volume={0}
                        description={e.displayName}
                        price={e.price}
                        key={e.id}
                        id={e.id} />

            console.log("y: " + y);
            x.push(y);

        });
        console.log("x: " + x);
        return x;


    }
}