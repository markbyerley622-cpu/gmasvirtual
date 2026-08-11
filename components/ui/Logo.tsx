import Image from "next/image";

export function Logo({
  size = 34,
  withWordmark = true,
  /** Lets the nav drop the wordmark on very narrow screens. */
  wordmarkClassName = "",
}: {
  size?: number;
  withWordmark?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/assets/logo.png"
        alt=""
        width={size}
        height={size}
        className="rounded-[9px]"
        priority
      />
      {withWordmark && (
        <span
          className={`text-[14.5px] font-semibold leading-[1.05] tracking-[-0.035em] ${wordmarkClassName}`}
        >
          Grab Me
          <br />a Slice
        </span>
      )}
    </span>
  );
}
