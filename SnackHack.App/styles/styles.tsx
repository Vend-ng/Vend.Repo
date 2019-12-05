import { StyleSheet } from 'react-native'
import { relative } from 'path';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center', 
    },
    items_container: {
      backgroundColor: '#eaeaea',
      alignItems: 'center',
      justifyContent: 'center',
    },
    items_text: {
      backgroundColor: 'red',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
    },
    items_scroll: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      borderWidth: 1,
      borderColor: '#808080',
      width: 200,
      height: 242,
      justifyContent: 'center',
      alignItems: "center",
    },
    item_image: {
      width: 107,
      height: 332
    },
    item_text: {
      textAlign: "center"
    },

    map: {
      flex: 1,
    },

  });

  export { styles } 