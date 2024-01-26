export function Dropdown({ children }: { children: React.ReactNode }) {
  return <div className="text-slate-700 shadow-md">{children}</div>;
}

export function DropdownItem({
  children,
  onOptionClick,
}: {
  children: React.ReactNode;
  onOptionClick: () => void;
}) {
  return (
    <div
      onClick={onOptionClick}
      className="cursor-pointer rounded-md border-slate-300 px-4 py-4 shadow-sm shadow-neutral-300 transition-shadow hover:shadow-md hover:shadow-neutral-300"
    >
      {children}
    </div>
  );
}
