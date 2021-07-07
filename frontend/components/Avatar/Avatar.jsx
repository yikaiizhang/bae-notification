import Image from "next/image";

export default function Avatar({ src, alt = "" }) {
  if (!src) {
    return (
      <div className='flex justify-center rounded-full overflow-hidden w-9 h-9 bg-black'></div>
    );
  }
  return (
    <div className='flex justify-center rounded-full overflow-hidden w-9 h-9'>
      <Image
        src={src}
        alt={alt}
        className='w-full h-full'
        width={40}
        height={40}
      />
    </div>
  );
}
