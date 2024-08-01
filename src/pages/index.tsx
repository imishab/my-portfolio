import Image from "next/image";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleCloseWindow = () => {
    if (window.confirm("Close Window?")) {
      window.close();
    }
  };

  return (
    <div className="container bg-gray-900">
      <main
        className={`bg-gray-900 flex min-h-screen items-center justify-center ${inter.className}`}
      >
        <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
          <div className="flex justify-between items-center -mb-3">
            <div className="flex space-x-2 text-red-500">
              <button onClick={handleCloseWindow}>
                <div className="w-3 h-3 rounded-full bg-red-500" /></button>
              <a href="https://www.google.com" target="_blank">
                <div className="w-3 h-3 rounded-full bg-yellow-500" /></a>
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p className="text-sm">Mishab</p>
          </div>
          <div className="mt-4">
            <p className="text-green-400" style={{ marginBottom: 4 }}>$ npm install desc</p>
            <p className="text-white" style={{ marginBottom: 4 }}>+ next@latest</p>
            <p className="text-info p1 ml-5" style={{ marginBottom: 4 }}>A web developer and designer with experience in MERN stack, proficient
              in Web/App development. </p>
            <p className="text-green-400" style={{ marginBottom: 4 }}>$ npm install skills</p>
            <p className="text-white p1 ml-5" style={{ marginBottom: 4 }}> ... MERN-Stack | UI/UX | Git | Aws | IoT</p>
            <p className="text-green-400" style={{ marginBottom: 4 }}>$ npm install contact</p>
            <p className="text-yellow-500 p1 ml-5" style={{ marginBottom: 4 }}> mishab@vectorcrop.com | +91 9947 15 4691</p>

          </div>
        </aside>
      </main >
    </div>

  );
}
