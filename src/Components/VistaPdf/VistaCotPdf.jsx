import React from "react";
import Logo from "../../assets/MiNegocio.png";

import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: "40px",
    maxWidth: "600px",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  titleContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    color: "blue",
    textAlign: "center",
  },
  subHeader: {
    textAlign: "center",
    color: "red",
    marginTop: "10px",
    marginBottom: "12px",
    fontSize: "12px",
  },
  fecha: {
    fontSize: "12px",
    color: "#444",
    marginBottom: "20px",
  },
  cotizacion: {
    fontSize: "20px",
    textAlign: "center",
    color: "#444",
    marginTop: "20px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "12px",
    marginBottom: "5px",
    color: "#444",
  },
  itemDescription: {
    flex: 2,
    fontSize: "12px",
    wordBreak: "break-all",
    marginBottom: "5px",
  },
  empresa: {
    fontSize: "12px",
    color: "#444",
    marginBottom: "20px",
  },
  logo: {
    width: "75px",
    marginLeft: 30,
  },
  contentContainer: {
    marginBottom: "10px",
  },
  piePagina: {
    fontSize: "12px",
    color: "blue",
    textAlign: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  totalContainer: {
    fontSize: "18px",
    color: "#444",
    textAlign: "right",
    fontWeight: "bold",
    marginTop: "20px",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px dotted #ccc",
    marginBottom: "5px",
  },
  itemSubtotal: {
    fontSize: "12px",
    textAlign: "right",
  },
});

const VistaCotPdf = ({ values }) => {
  return (
    <Document>
      <Page size="letter" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image style={styles.logo} src={Logo} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Mi negocio.com</Text>
            <View style={styles.subHeader}>
              <Text>
                La solución todo en uno para gestionar tu negocio,{"\n"}
                productos, y clientes.
              </Text>
              <Text> Nit: 72.272.605 - 1</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.fecha}>
            <Text style={styles.text}> Barranquilla, {values.value.fecha}</Text>
          </View>
          <View style={styles.empresa}>
            <Text> Señores: {values.value.empresa}</Text>
            <Text> Nit: {values.value.nit}</Text>
            <Text> Obra: {values.value.direccion}</Text>
          </View>

          <Text style={styles.cotizacion}>Cotización</Text>
          {values.value.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemDescription}>
                {item.quantity} {item.description}
              </Text>
              <Text style={styles.itemSubtotal}>{item.subtotal}</Text>
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text>Total: {values.value.total}</Text>
          </View>
        </View>

        <View style={styles.piePagina}>
          <Text> hrking31@gmail.com</Text>
          <Text> hrking31@hotmail.com</Text>
          <Text>Cra. 68 #74-158 Tel 605 3258759 - 302 8446805</Text>
          <Text>BARRANQUILLA - COLOMBIA</Text>
        </View>
      </Page>
    </Document>
  );
};

export default VistaCotPdf;
