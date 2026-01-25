import Image from "./Image";

function Bruh ({type, name, image_file, behaviour}) {
  return (
    <div className="md:max-w-sm w-full p-6 rounded-xl shadow-xl bg-black border border-zinc-800 hover:border-white transition-all duration-300 hover:transform hover:scale-105 group">
      <div className="relative overflow-hidden rounded-lg mb-6">
        <Image
          file_name = {image_file}
          w={500}
          h={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-white text-black rounded-full mb-3">
          {name}
        </span>
        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-200">
          {type}
        </h2>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {behaviour}
      </p>
    </div>
  );
}

export default Bruh;