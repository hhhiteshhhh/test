import React from "react";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import {
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";

function pdf({ blob }) {
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl={pdfjsWorker}>
      <div style={{ height: "550px" }} key={1}>
        <Viewer
          fileUrl={URL.createObjectURL(blob)}
        //   plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
}

export default pdf;
