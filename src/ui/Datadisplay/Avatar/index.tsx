import Image from "next/image";

type AvatarProps = {
  image: string;
  alt: string;
};

export function Avatar({ image, alt }: AvatarProps) {
  return (
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <Image src={image} alt={alt} />
      </div>
    </label>
  );
}
