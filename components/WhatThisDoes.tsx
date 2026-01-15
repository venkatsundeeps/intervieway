export default function WhatThisDoes() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          What does this actually do?
        </h2>
        <ul className="space-y-3 text-lg text-slate-700">
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Visitors ask questions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Assistant replies instantly</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Understands what they want</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Collects contact details</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span>You receive a new enquiry</span>
          </li>
        </ul>
        <p className="text-lg text-slate-600 pt-2">
          Think of it as a smart helper on your website that brings you enquiries.
        </p>
      </div>
    </section>
  );
}
