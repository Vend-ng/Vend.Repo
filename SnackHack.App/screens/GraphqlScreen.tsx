import React from 'react';
import { Component }  from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io"
});

export default class GraphqlScreen extends Component {
    state = { text: "GraphQL screen" }
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <Text>{this.state.text}</Text>
                </ScrollView>
                <Button title="Update" onPress={() => 
                { 
                    client.query(
                        {
                            query: gql`
                            {
                                rates(currency: "USD") {
                                    currency
                                    rate
                                }
                            }
                        `
                        }).then(t => 
                            {
                                var text = "";
                                for (var i = 0; i < t.data.rates.length; i++) {
                                    text += t.data.rates[i].currency + " => " + t.data.rates[i].rate + "\n";
                                }
                                this.setState({ text: text })
                            });
                }} />
            </View>
        );
    }
}