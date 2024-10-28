
export default function AuthForm() {
    return (
        <form action="/openeo/auth" method="POST">
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
        </form>
    );
}