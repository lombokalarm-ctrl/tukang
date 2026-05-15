import type { ComponentType, ReactNode } from "react";
import { toHeadingId } from "@/lib/utils";

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function createParagraph(line: string, key: string) {
  return (
    <p className="mt-6 text-base leading-8 text-slate-700" key={key}>
      {renderInlineMarkdown(line)}
    </p>
  );
}

function createBulletList(lines: string[], startIndex: number) {
  const items: string[] = [];
  let index = startIndex;

  while (index < lines.length && lines[index].startsWith("- ")) {
    items.push(lines[index].slice(2).trim());
    index += 1;
  }

  const node = (
    <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-slate-700" key={`list-${startIndex}`}>
      {items.map((item, itemIndex) => (
        <li key={`${item}-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
      ))}
    </ul>
  );

  return {
    nextIndex: index,
    node,
  };
}

function buildMarkdownNodes(source: string): ReactNode[] {
  const lines = source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const nodes: ReactNode[] = [];
  let index = 0;
  let titleSkipped = false;

  while (index < lines.length) {
    const line = lines[index];

    if (!titleSkipped && line.startsWith("# ")) {
      titleSkipped = true;
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      nodes.push(
        <h2 className="mt-10 scroll-mt-28 text-2xl font-black tracking-tight text-slate-900" id={toHeadingId(text)} key={`h2-${text}-${index}`}>
          {text}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      nodes.push(
        <h3 className="mt-8 scroll-mt-28 text-xl font-black tracking-tight text-slate-900" id={toHeadingId(text)} key={`h3-${text}-${index}`}>
          {text}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const list = createBulletList(lines, index);
      nodes.push(list.node);
      index = list.nextIndex;
      continue;
    }

    nodes.push(createParagraph(line, `p-${index}`));
    index += 1;
  }

  return nodes;
}

export function createMarkdownArticleComponent(source: string): ComponentType {
  function MarkdownArticleContent() {
    return <>{buildMarkdownNodes(source)}</>;
  }

  return MarkdownArticleContent;
}
