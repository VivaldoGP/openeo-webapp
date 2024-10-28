export default function UploadForm() {
    return (
        <form action="/openeo/uploadFile" method="POST" encType="multipart/form-data">
            <input type="file" name="file" accept=".geojson" required/>
            <button type="submit">Submit</button>
        </form>
    );
}