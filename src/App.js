import React, { useState } from "react";
import {
  BlobProvider,
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import PSPDFKit from "./PSPDFKit";
// import {TailwindProvider} from 'tailwind-rn';
import utilities from "./tailwind.json";
// import Team from "./Team";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 25,
    // padding: 10,
    flexGrow: 1,
    fontWeight: "bold",
  },
  // title: {
  //   fontFamily: "Roboto",
  //   fontWeight: "bold",
  // },
});

Font.register({
  family: "Roboto",
  src: "./Roboto",
  fontStyle: "normal",
  fontWeight: "bold",
});

const MyDocument = (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Hello World!</Text>
        {/* <Team /> */}
      </View>
    </Page>
  </Document>
);
function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "hide pdf" : "show pdf"}
      </button>
      {show && (
        <BlobProvider document={MyDocument}>
          {({ blob, url, loading, error }) => {
            if (blob) {
              return <PSPDFKit blob={blob} />;
            }

            if (error) {
              return error;
            }

            return <div>The PDF is rendering...</div>;
          }}
        </BlobProvider>
      )}
    </div>
  );
}

export default App;
