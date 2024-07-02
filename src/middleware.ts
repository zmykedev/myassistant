// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // Redirige a esta página si no estás autenticado
  },
});

export const config = { matcher: ["/"] };
