import Image from 'next/image'
import Popup from './components/Popup';

export default function Home() {
  return (
    <section className="w-screen h-screen bg-gray-200 font-poppins">
      <Popup/>
    </section>
  );
}
