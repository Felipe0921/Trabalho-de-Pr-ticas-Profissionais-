import "./globals.css";

export const metadata = {
  title: "ReservaFácil",
  description: "Sistema de reservas acadêmicas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

