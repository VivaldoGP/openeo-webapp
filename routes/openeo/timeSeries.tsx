import TimeSeriesForm from "../../components/TimeSeriesForm.tsx";
import { Handlers } from "$fresh/server.ts"

export const handler: Handlers = {
    async POST(req, _ctx) {
        // Obtener los datos del formulario
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const startDate = formData.get("start-date") as string;
        const endDate = formData.get("end-date") as string;
        const imgCollection = formData.get("img-collection") as string;
        console.log("Start date:", startDate);
    
        if (!file) {
            return new Response("No file uploaded", { status: 400 });
        }
    
        if (file.type !== "application/json" && file.type !== "application/geo+json") {
            return new Response("Invalid file type", { status: 400 });
        }
    
        // Mostrar los datos en la consola
        console.log("File:", file);
        console.log("File name:", file.name);
        console.log("Start date:", startDate);
        console.log("End date:", endDate);
        console.log("Image collection:", imgCollection);
    
        const fileContent = await file.text();
        const geojson = JSON.parse(fileContent);
        console.log("GeoJSON:", geojson)
    
        const dataToSend = {
            geojson,
            startDate,
            endDate,
            imgCollection
        }
        // Enviar el archivo al servidor
    
        const res = await fetch("http://localhost:8000/openeo/timeSeries", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
        console.log("Response:", res)
    
            if (!res.ok) {
                return new Response("Error uploading file", { status: 500 });
            }
        // En lugar de redirigir, puedes devolver un simple mensaje
        return new Response("File received", { status: 200 });
    }
}

export default function TimeSeries() {
    return (
        <div>
            <h1>Time Series</h1>
            <TimeSeriesForm />
        </div>
    );
}