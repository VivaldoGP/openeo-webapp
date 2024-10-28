import UploadForm from "../../components/UploadForm.tsx";
import { Handlers } from "$fresh/server.ts"

export const handler: Handlers = {
    async POST(req, _ctx) {
      // Obtener los datos del formulario
      const formData = await req.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return new Response("No file uploaded", { status: 400 });
      }

      if (file.type !== "application/json" && file.type !== "application/geo+json") {
        return new Response("Invalid file type", { status: 400 });
      }
  
      // Mostrar los datos en la consola
      console.log("File:", file);
      console.log("File name:", file.name);

      const fileContent = await file.text();
      const geojson = JSON.parse(fileContent);
      console.log("GeoJSON:", geojson)
  


      const res = await fetch("http://localhost:8000/openeo/uploadFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geojson),
      })
      console.log("Response:", res)

        if (!res.ok) {
            return new Response("Error uploading file", { status: 500 });
        }
      // En lugar de redirigir, puedes devolver un simple mensaje
      return new Response("File received", { status: 200 });
    }
}

export default function UploadFile() {
    return (
        <div>
            <h1>Upload file</h1>
            <UploadForm />
        </div>
    );
}