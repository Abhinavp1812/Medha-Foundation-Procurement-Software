import { NewRfqForm } from "@/components/NewRfqForm";

export default function NewRfqPage() {
  return (
    <div className="px-8 py-7 max-w-2xl">
      <h1 className="font-display text-2xl font-medium mb-1">
        New requirement
      </h1>
      <p className="text-black/50 text-sm mb-7">
        Describe what you need. Vendors will submit quotations against it.
      </p>
      <NewRfqForm />
    </div>
  );
}
