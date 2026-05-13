import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900" {...props} />,
  h2: (props) => <h2 className="mt-10 scroll-mt-24 text-2xl font-bold text-slate-900" {...props} />,
  h3: (props) => <h3 className="mt-8 scroll-mt-24 text-xl font-semibold text-slate-900" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-8 text-slate-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-700" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700" {...props} />,
  li: (props) => <li className="leading-8" {...props} />,
  a: (props) => <a className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-orange-600" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 rounded-2xl border-l-4 border-orange-500 bg-orange-50 px-5 py-4 text-slate-700" {...props} />
  ),
  table: (props) => <table className="mt-6 w-full overflow-hidden rounded-2xl border border-slate-200 text-left text-sm" {...props} />,
  th: (props) => <th className="bg-slate-50 px-4 py-3 font-semibold text-slate-900" {...props} />,
  td: (props) => <td className="border-t border-slate-200 px-4 py-3 text-slate-700" {...props} />,
  hr: (props) => <hr className="my-10 border-slate-200" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
