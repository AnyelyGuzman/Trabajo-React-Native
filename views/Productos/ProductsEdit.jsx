import React, {useEffect} from "react";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import Api from '../../api'

export default props => {
  const [nombre, setnombre] = React.useState("");
  const [cantidad, setcantidad] = React.useState(0);
  const [precio, setprecio] = React.useState(0);

  const getProductosId = async id =>{
    const response = await Api.getProductosId(id)
    if(response?.data) {
        const data = response?.data[0]
        setnombre(data.nombre)
        setcantidad(data.cantidad)
        setprecio(data.precio)
    }
  }

  const hladleSubmit = async e => {
    if(nombre.length > 0 && cantidad && precio) {
        const response = await Api.editarProductos({
            id: props.route.params?.id_productos,
            nombre: nombre,
            cantidad: cantidad,
            precio: precio
        })
        console.log(response)
        props.navigation.navigate('products')
    }
  }

  useEffect(() => {
    if(props.route.params?.id_productos){
        getProductosId(props.route.params?.id_productos)
    }
  }, [props.route.params?.id_productos])

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={ val => setnombre(val) }
        value={nombre}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        onChangeText={ val => setcantidad(val) }
        value={cantidad}
        placeholder="Cantidad"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={ val => setprecio(val) }
        value={precio}
        placeholder="Cantidad"
        keyboardType="numeric"
      />
      <Button
        title="Editar"
        onPress={ hladleSubmit }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
