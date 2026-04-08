export const metadata = {
  title: 'School Management API',
  description: 'School management APIs'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, background: '#f7f7f7', color: '#111' }}>
        {children}
      </body>
    </html>
  );
}
