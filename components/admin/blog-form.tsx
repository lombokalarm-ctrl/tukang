"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPostFormState } from "@/lib/blog-admin/actions";
import { toHeadingId } from "@/lib/utils";

type BlogFormAction = (
  state: BlogPostFormState,
  formData: FormData,
) => Promise<BlogPostFormState>;

type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  authorName: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  publishedAt: string;
};

type BlogFormProps = {
  action: BlogFormAction;
  initialValues?: Partial<BlogFormValues>;
  mode: "create" | "edit";
  notice?: string;
};

const initialState: BlogPostFormState = {};

function SubmitButtons({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button disabled={pending} name="intent" type="submit" value="draft" variant="outline">
        {pending ? "Menyimpan..." : mode === "create" ? "Simpan Draft" : "Update Draft"}
      </Button>
      <Button disabled={pending} name="intent" type="submit" value="publish">
        {pending ? "Mempublish..." : mode === "create" ? "Publish Artikel" : "Update & Publish"}
      </Button>
    </div>
  );
}

function FieldError({ errors, name }: { errors?: Record<string, string[] | undefined>; name: string }) {
  const messages = errors?.[name];

  if (!messages?.length) {
    return null;
  }

  return (
    <div className="space-y-1">
      {messages.map((error) => (
        <p className="text-sm text-red-600" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

function toDateTimeLocal(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 16);
}

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

function renderInlinePreview(text: string) {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*.*?\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const linkLabel = match[2];
    const linkHref = match[3];

    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      nodes.push(<strong key={`preview-bold-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (linkLabel && linkHref) {
      nodes.push(
        <a
          className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-orange-600"
          href={linkHref}
          key={`preview-link-${match.index}`}
          rel={isExternalUrl(linkHref) ? "noreferrer" : undefined}
          target={isExternalUrl(linkHref) ? "_blank" : undefined}
        >
          {linkLabel}
        </a>,
      );
    } else {
      nodes.push(token);
    }

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function buildPreviewNodes(source: string) {
  const lines = source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const nodes: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("# ")) {
      nodes.push(
        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900" key={`preview-h1-${index}`}>
          {line.slice(2).trim()}
        </h1>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      nodes.push(
        <h2 className="mt-8 text-2xl font-black tracking-tight text-slate-900" key={`preview-h2-${index}`}>
          {line.slice(3).trim()}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      nodes.push(
        <h3 className="mt-6 text-xl font-black tracking-tight text-slate-900" key={`preview-h3-${index}`}>
          {line.slice(4).trim()}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      let listIndex = index;

      while (listIndex < lines.length && lines[listIndex].startsWith("- ")) {
        items.push(lines[listIndex].slice(2).trim());
        listIndex += 1;
      }

      nodes.push(
        <ul className="mt-5 list-disc space-y-2 pl-6 text-sm leading-7 text-slate-700" key={`preview-list-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{renderInlinePreview(item)}</li>
          ))}
        </ul>,
      );
      index = listIndex;
      continue;
    }

    nodes.push(
      <p className="mt-5 text-sm leading-7 text-slate-700" key={`preview-p-${index}`}>
        {renderInlinePreview(line)}
      </p>,
    );
    index += 1;
  }

  return nodes;
}

export function BlogForm({ action, initialValues, mode, notice }: BlogFormProps) {
  const [state, formAction] = useActionState<BlogPostFormState, FormData>(action, initialState);
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [metaDescription, setMetaDescription] = useState(initialValues?.metaDescription ?? "");
  const [metaDescriptionTouched, setMetaDescriptionTouched] = useState(Boolean(initialValues?.metaDescription));
  const [content, setContent] = useState(initialValues?.content ?? "");

  const generatedSlug = useMemo(() => toHeadingId(title), [title]);
  const generatedMetaDescription = useMemo(() => excerpt.trim().slice(0, 160), [excerpt]);
  const previewNodes = useMemo(() => buildPreviewNodes(content), [content]);

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugTouched) {
      setSlug(toHeadingId(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value);
    setSlugTouched(true);
  }

  function useGeneratedSlug() {
    setSlug(generatedSlug);
    setSlugTouched(true);
  }

  function handleExcerptChange(value: string) {
    setExcerpt(value);

    if (!metaDescriptionTouched) {
      setMetaDescription(value.trim().slice(0, 160));
    }
  }

  function handleMetaDescriptionChange(value: string) {
    setMetaDescription(value);
    setMetaDescriptionTouched(true);
  }

  function useGeneratedMetaDescription() {
    setMetaDescription(generatedMetaDescription);
    setMetaDescriptionTouched(true);
  }

  return (
    <form action={formAction} className="space-y-8">
      {notice ? <div className="rounded-[1.5rem] border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">{notice}</div> : null}
      {state?.message ? <div className="rounded-[1.5rem] border border-orange-200 bg-orange-50 px-5 py-4 text-sm text-orange-700">{state.message}</div> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="title">
            Judul Artikel
          </label>
          <Input id="title" name="title" onChange={(event) => handleTitleChange(event.target.value)} placeholder="Contoh: Cara Memilih Tukang Renovasi Rumah di Lombok" required value={title} />
          <FieldError errors={state.errors} name="title" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-semibold text-slate-700" htmlFor="slug">
              Slug URL
            </label>
            <button className="text-sm font-semibold text-sky-700 transition hover:text-orange-600" onClick={useGeneratedSlug} type="button">
              Gunakan slug otomatis
            </button>
          </div>
          <Input id="slug" name="slug" onChange={(event) => handleSlugChange(event.target.value)} placeholder="cara-memilih-tukang-renovasi-rumah-di-lombok" required value={slug} />
          <FieldError errors={state.errors} name="slug" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="excerpt">
            Ringkasan Artikel
          </label>
          <Textarea id="excerpt" name="excerpt" onChange={(event) => handleExcerptChange(event.target.value)} placeholder="Tulis ringkasan singkat artikel untuk preview kartu blog dan description awal." value={excerpt} />
          <div className="text-xs text-slate-500">Panjang ringkasan: {excerpt.length} karakter</div>
          <FieldError errors={state.errors} name="excerpt" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="category">
            Kategori
          </label>
          <Input id="category" name="category" onChange={(event) => setCategory(event.target.value)} placeholder="Renovasi" value={category} />
          <FieldError errors={state.errors} name="category" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="authorName">
            Nama Penulis
          </label>
          <Input defaultValue={initialValues?.authorName ?? "Admin TukangDiLombok"} id="authorName" name="authorName" placeholder="Admin TukangDiLombok" />
          <FieldError errors={state.errors} name="authorName" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="coverImage">
            URL Cover Image
          </label>
          <Input defaultValue={initialValues?.coverImage ?? ""} id="coverImage" name="coverImage" placeholder="/blog/blog-1.svg atau https://..." />
          <FieldError errors={state.errors} name="coverImage" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="keywords">
            Keywords SEO
          </label>
          <Textarea defaultValue={initialValues?.keywords ?? ""} id="keywords" name="keywords" placeholder="pisahkan dengan koma, contoh: tukang lombok, renovasi rumah lombok, biaya renovasi lombok" />
          <FieldError errors={state.errors} name="keywords" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="metaTitle">
            Meta Title
          </label>
          <Input defaultValue={initialValues?.metaTitle ?? ""} id="metaTitle" name="metaTitle" placeholder="Judul SEO yang tampil di hasil pencarian" />
          <FieldError errors={state.errors} name="metaTitle" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-semibold text-slate-700" htmlFor="metaDescription">
              Meta Description
            </label>
            <button className="text-sm font-semibold text-sky-700 transition hover:text-orange-600" onClick={useGeneratedMetaDescription} type="button">
              Gunakan dari ringkasan
            </button>
          </div>
          <Textarea id="metaDescription" name="metaDescription" onChange={(event) => handleMetaDescriptionChange(event.target.value)} placeholder="Deskripsi singkat SEO sekitar 140-160 karakter." value={metaDescription} />
          <div className="text-xs text-slate-500">Panjang meta description: {metaDescription.length} karakter</div>
          <FieldError errors={state.errors} name="metaDescription" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="publishedAt">
            Tanggal Publish
          </label>
          <Input defaultValue={toDateTimeLocal(initialValues?.publishedAt)} id="publishedAt" name="publishedAt" type="datetime-local" />
          <FieldError errors={state.errors} name="publishedAt" />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-semibold text-slate-700" htmlFor="content">
            Isi Artikel
          </label>
          <Textarea className="min-h-[24rem]" id="content" name="content" onChange={(event) => setContent(event.target.value)} placeholder="Tulis isi artikel dalam format markdown sederhana." value={content} />
          <FieldError errors={state.errors} name="content" />
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <div className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">Preview Artikel</div>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{title || "Judul artikel akan tampil di sini"}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {excerpt || "Ringkasan artikel akan tampil di sini untuk membantu Anda mengecek arah copy sebelum menyimpan atau publish."}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
          <span>Slug: {slug || "-"}</span>
          <span>Kategori: {category || "Belum diisi"}</span>
          <span>Meta desc: {metaDescription.length} karakter</span>
        </div>
        <div className="prose-content mt-8 max-w-none">{previewNodes.length ? previewNodes : <p className="text-sm leading-7 text-slate-500">Isi artikel akan dipreview di sini setelah Anda mulai menulis.</p>}</div>
      </div>

      <SubmitButtons mode={mode} />
    </form>
  );
}
