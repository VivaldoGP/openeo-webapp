import AuthForm from "../../components/AuthForm.tsx";
import { Handlers } from "$fresh/server.ts"

export const handler: Handlers = {
    async POST(req, _ctx) {
      // Obtener los datos del formulario
      const formData = await req.formData();
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
  
      // Mostrar los datos en la consola
      console.log("Email:", email);
      console.log("Password:", password);
  
      // En lugar de redirigir, puedes devolver un simple mensaje
      return new Response("Datos recibidos", { status: 200 });
    },
  };

export default function Auth() {
    return (
        <div>
            <h1>Sign in</h1>
            <AuthForm />
        </div>
    );
}