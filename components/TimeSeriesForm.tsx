export default function TimeSeriesForm() {
    return (
        <form action="/openeo/timeSeries" method="POST" encType="multipart/form-data">
            <input type="file" name="file" accept=".geojson" required />
            <input type="date" name="start-date"/>
            <input type="date" name="end-date"/>
            <input type="text" name="img-collection"/>
            <button type="submit">Submit</button>
        </form>
    )
}