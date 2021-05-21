import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button } from 'react-native'

import Api from '../../api'

export default props => {
  const [products, setProducts] = useState([])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>id_productos: {item.id_productos}</Text>
        <Text style={styles.title}>nombre: {item.nombre}</Text>
        <Text style={styles.title}>cantidad: {item.cantidad}</Text>
        <Text style={styles.title}>precio: {item.precio}</Text>
        <Button title="Editar" onPress={ () => handleClick(item.id_productos) } />
      </View>
    )
  }

  const handleClick = id_productos => {
    props.navigation.navigate({ name: 'products_edit', params: { id_productos } });
  }
  
  const getProducts = async () => {
    const response = await Api.getProductos()
    if(response && response.data) setProducts(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [props.navigation])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ products }
        renderItem={ renderItem }
        keyExtractor={item => `${item.id_productos} ${item.name}`}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#83EEDC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});