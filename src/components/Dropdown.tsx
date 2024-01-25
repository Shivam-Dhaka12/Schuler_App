export function Dropdown({ children }: { children: React.ReactNode }) {
  return <div className="text-slate-600 shadow-md">{children}</div>;
}

export function DropdownItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-pointer rounded-b-md border-slate-200 px-4 py-4 shadow-sm transition-shadow hover:shadow-md">
      {children}
    </div>
  );
}
