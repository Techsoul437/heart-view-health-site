"use client";

import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ImagePlus, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import ResetButton from "@/Ui/buttons/ResetButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    Alignment,
    AutoImage,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    ClassicEditor,
    CodeBlock,
    Essentials,
    Font,
    Heading,
    Image,
    ImageCaption,
    ImageInsert,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link as CKEditorLink,
    List,
    Paragraph,
    RemoveFormat,
    Strikethrough,
    Underline,
    Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById, updateBlog } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import type { BlogContent } from "@/redux/Api";

const editorConfig = {
    licenseKey: "GPL",
    plugins: [
        Essentials, Paragraph, Heading, Bold, Italic, Underline, Strikethrough,
        Font, Alignment, List, CKEditorLink, Image, ImageToolbar, ImageUpload,
        ImageCaption, ImageStyle, ImageInsert, AutoImage, Base64UploadAdapter,
        BlockQuote, CodeBlock, RemoveFormat, Undo,
    ],
    toolbar: [
        "undo", "redo", "|", "heading", "|", "fontFamily", "fontSize",
        "fontColor", "fontBackgroundColor", "|", "bold", "italic", "underline",
        "strikethrough", "|", "alignment", "|", "numberedList", "bulletedList",
        "|", "link", "insertImage", "blockQuote", "codeBlock", "|", "removeFormat",
    ],
    image: { toolbar: ["imageTextAlternative", "toggleImageCaption", "imageStyle:inline", "imageStyle:block", "imageStyle:side"] },
};

type Faq = {
    question: string;
    answer: string;
};

type BlogFormValues = {
    title: string;
    slug: string;
    category: string;
    author: string;
    publishDate: string;
    excerpt: string;
    content: string;
    mainImage: File | null;
    tags: string;
    status: "draft" | "published";
    metaTitle: string;
    metaDescription: string;
    peopleAlsoAsk: Faq[];
    faqs: Faq[];
};

const emptyValues: BlogFormValues = {
    title: "",
    slug: "",
    category: "",
    author: "",
    publishDate: new Date().toISOString().slice(0, 10),
    excerpt: "",
    content: "",
    mainImage: null,
    tags: "",
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    peopleAlsoAsk: [{ question: "", answer: "" }],
    faqs: [{ question: "", answer: "" }],
};

const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read image file"));
        reader.readAsDataURL(file);
    });

const htmlToBlogContent = (html: string): BlogContent[] => {
    if (typeof window === "undefined" || !html.trim()) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const blocks: BlogContent[] = [];
    let current: BlogContent = { heading: "", paragraphs: [], images: [] };

    const pushCurrentIfNeeded = () => {
        if (current.heading || current.paragraphs.length || current.images.length) {
            blocks.push(current);
        }
    };

    Array.from(doc.body.children).forEach((el) => {
        const tag = el.tagName.toLowerCase();

        if (/^h[1-6]$/.test(tag)) {
            pushCurrentIfNeeded();
            current = { heading: el.textContent?.trim() || "", paragraphs: [], images: [] };
            return;
        }

        if (tag === "figure" || tag === "img") {
            const imgEl = tag === "img" ? (el as HTMLImageElement) : el.querySelector("img");
            const src = imgEl?.getAttribute("src");
            if (src) current.images.push(src);
            return;
        }

        if (tag === "ul" || tag === "ol") {
            const items = Array.from(el.querySelectorAll("li")).map((li) => li.innerHTML.trim());
            if (items.length) {
                current.paragraphs.push(`<${tag}>${items.map((item) => `<li>${item}</li>`).join("")}</${tag}>`);
            }
            return;
        }

        const inner = el.innerHTML.trim();
        if (inner) current.paragraphs.push(inner);
        el.querySelectorAll("img").forEach((img) => {
            const src = img.getAttribute("src");
            if (src) current.images.push(src);
        });
    });

    pushCurrentIfNeeded();

    if (blocks.length === 0) {
        blocks.push({ heading: "", paragraphs: [html], images: [] });
    }

    return blocks;
};

const blogContentToHtml = (blocks?: BlogContent[] | null): string => {
    if (!blocks || !blocks.length) return "";

    return blocks
        .map((block) => {
            let html = "";
            if (block.heading) html += `<h2>${block.heading}</h2>`;

            block.paragraphs?.forEach((p: string) => {
                html += /^\s*<(ul|ol)>/i.test(p) ? p : `<p>${p}</p>`;
            });

            block.images?.forEach((src: string) => {
                html += `<figure class="image"><img src="${src}" /></figure>`;
            });

            return html;
        })
        .join("");
};

const validationSchema = Yup.object({
    title: Yup.string().required("Blog title is required"),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
        .required("Slug is required"),
    category: Yup.string().required("Category is required"),
    author: Yup.string().required("Author name is required"),
    publishDate: Yup.string().required("Publish date is required"),
    excerpt: Yup.string().max(300, "Excerpt cannot exceed 300 characters").required("Excerpt is required"),
    content: Yup.string().test("content", "Blog content is required", (value) => {
        const plainText = value?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
        return Boolean(plainText);
    }),
    mainImage: Yup.mixed<File>().nullable(),
    metaTitle: Yup.string().max(60, "SEO title should be 60 characters or fewer"),
    metaDescription: Yup.string().max(160, "SEO description should be 160 characters or fewer"),
    peopleAlsoAsk: Yup.array().of(
        Yup.object({
            question: Yup.string().required("Question is required"),
            answer: Yup.string().required("Answer is required"),
        })
    ),
    faqs: Yup.array().of(
        Yup.object({
            question: Yup.string().required("Question is required"),
            answer: Yup.string().required("Answer is required"),
        })
    ),
});

export default function EditBlogPage() {
    const router = useRouter();
    const pathname = usePathname();
    const role = pathname.split("/")[1];
    const baseUrl = `/${role}`;

    const params = useParams();
    const id = params.slug as string;

    const [mainImagePreview, setMainImagePreview] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { blog, loading } = useSelector((state: RootState) => state.BlogList);

    useEffect(() => {
        if (id) {
            dispatch(getBlogById(id));
        }
    }, [dispatch, id]);

    const formInitialValues = useMemo<BlogFormValues>(() => {
        if (!blog) return emptyValues;

        return {
            title: blog.title ?? "",
            slug: blog.slug ?? "",
            category: blog.category ?? "",
            author: blog.author ?? "",
            publishDate: blog.publishDate?.slice(0, 10) ?? "",
            excerpt: blog.description ?? "",
            content: blogContentToHtml(blog.content),
            mainImage: null,
            tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
            status: blog.status === "published" ? "published" : "draft",
            metaTitle: blog.seoTitle ?? "",
            metaDescription: blog.seoDescription ?? "",
            peopleAlsoAsk: blog.peopleAlsoAsk?.length
                ? blog.peopleAlsoAsk
                : [{ question: "", answer: "" }],
            faqs: blog.faq?.length
                ? blog.faq
                : [{ question: "", answer: "" }],
        };
    }, [blog]);

    useEffect(() => {
        if (blog?.mainImage) {
            setMainImagePreview(blog.mainImage);
        }
    }, [blog]);

    const makeSlug = (title: string) =>
        title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleSubmit = async (
        values: BlogFormValues,
        { setSubmitting }: FormikHelpers<BlogFormValues>
    ) => {
        try {
            const peopleAlsoAskPayload = values.peopleAlsoAsk.filter(
                (item) => item.question.trim() && item.answer.trim()
            );

            const faqPayload = values.faqs.filter(
                (faq) => faq.question.trim() && faq.answer.trim()
            );

            if (!id) {
                toast.error("Blog ID not found");
                setSubmitting(false);
                return;
            }

            let mainImage = "";

            if (values.mainImage) {
                mainImage = await fileToBase64(values.mainImage);
            } else {
                mainImage = mainImagePreview;
            }

            if (!mainImage) {
                toast.error("Please upload a main image");
                setSubmitting(false);
                return;
            }

            const result = await dispatch(
                updateBlog({
                    id,
                    title: values.title.trim(),
                    slug: values.slug.trim(),
                    author: values.author.trim(),
                    publishDate: values.publishDate,
                    category: values.category,
                    mainImage,
                    description: values.excerpt.trim(),
                    content: htmlToBlogContent(values.content),
                    tags: values.tags
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    status: values.status,
                    peopleAlsoAsk: peopleAlsoAskPayload,
                    faq: faqPayload,
                    seoTitle: values.metaTitle.trim(),
                    seoDescription: values.metaDescription.trim(),
                    schemaMarkup: null,
                })
            ).unwrap();

            router.push(`${baseUrl}/Blog`);
        } catch (error) {
            toast.error(typeof error === "string" ? error : "Blog update failed");
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = "w-full rounded-xl border border-black/10 bg-[#f7f7f7] px-4 py-3 outline-none transition focus:border-black/40";

    if (loading && !blog) {
        return <div className="p-6 md:p-12">Loading blog...</div>;
    }

    return (
        <div className="min-h-screen p-4 text-black sm:p-6 md:p-12">
            <div className="flex items-center gap-3">
                <Link href={`${baseUrl}/Blog`} aria-label="Back to blogs" className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-black/10">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold">Edit Blog</h1>
                    <p className="text-sm text-[#64748B]">Create an article with content, SEO details and FAQs.</p>
                </div>
            </div>

            <div className="mt-8  rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-8">
                <Formik
                    initialValues={formInitialValues}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, resetForm, isSubmitting }) => (
                        <Form className="flex flex-col gap-7">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium">Blog title <span className="text-red-500">*</span></label>
                                    <Field name="title" placeholder="e.g. How to maintain a healthy heart" className={inputClass} onBlur={(event: React.FocusEvent<HTMLInputElement>) => { if (!values.slug) setFieldValue("slug", makeSlug(event.target.value)); }} />
                                    <ErrorMessage name="title" component="p" className="text-sm text-red-500" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium">URL slug <span className="text-red-500">*</span></label>
                                    <Field name="slug" placeholder="healthy-heart-tips" className={inputClass} />
                                    <ErrorMessage name="slug" component="p" className="text-sm text-red-500" />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2"><label className="font-medium">Author <span className="text-red-500">*</span></label><Field name="author" placeholder="Enter author name" className={inputClass} /><ErrorMessage name="author" component="p" className="text-sm text-red-500" /></div>
                                <div className="flex flex-col gap-2"><label className="font-medium">Publish date <span className="text-red-500">*</span></label><Field type="date" name="publishDate" className={inputClass} /><ErrorMessage name="publishDate" component="p" className="text-sm text-red-500" /></div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium">Category <span className="text-red-500">*</span></label>
                                    <Field as="select" name="category" className={inputClass}>
                                        <option value="">Select category</option>
                                        <option value="Heart-Risk">Heart-Risk</option>
                                        <option value="Blood Pressure">Blood Pressure</option>
                                        <option value="Diabetes">Diabetes</option>
                                        <option value="Lab-Reports">Lab-Reports</option>
                                        <option value="Cholesterol">Cholesterol</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                        <option value="Sleep">Sleep</option>
                                        <option value="Step">Step</option>
                                    </Field>
                                    <ErrorMessage name="category" component="p" className="text-sm text-red-500" />
                                </div>
                            </div>

                            <div className="w-full ">
                                {([
                                    { field: "mainImage", label: "Main Image", preview: mainImagePreview, setPreview: setMainImagePreview, help: "Used on the full blog detail page." },
                                ] as const).map(({ field, label, preview, setPreview, help }) => (
                                    <div key={field} className="flex flex-col gap-2">
                                        <label className="font-medium">{label} <span className="text-red-500">*</span></label>
                                        <label htmlFor={field} className="group relative flex h-64 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] transition hover:border-[#1D7DAF] md:h-72">
                                            {preview ? <img src={preview} alt={`${label} preview`} className="h-full w-full object-cover" /> : <span className="flex flex-col items-center gap-2 text-center text-[#64748B]"><span className="rounded-full bg-white p-3 shadow-sm"><ImagePlus size={22} /></span><span className="font-medium text-black">Upload {label}</span><span className="text-xs">JPG, PNG or WEBP</span></span>}
                                            {preview && <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">Change image</span>}
                                        </label>
                                        <input id={field} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => { const file = event.currentTarget.files?.[0] ?? null; setFieldValue(field, file); setPreview(file ? URL.createObjectURL(file) : ""); }} />
                                        <p className="text-xs text-[#64748B]">Maximum size: 5 MB. {help}</p>
                                        <ErrorMessage name={field} component="p" className="text-sm text-red-500" />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium">Short description <span className="text-red-500">*</span></label>
                                <Field as="textarea" rows={3} name="excerpt" placeholder="A brief summary displayed on the blog listing." className={inputClass} />
                                <div className="flex justify-between text-xs text-[#64748B]"><ErrorMessage name="excerpt" component="span" className="text-red-500" /><span>{values.excerpt.length}/300</span></div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium">Blog content <span className="text-red-500">*</span></label>
                                <div className="ck-editor-wrapper overflow-hidden rounded-xl border border-black/10 [&_.ck-content]:min-h-64 [&_.ck-editor__editable]:border-x-0 [&_.ck-editor__editable]:border-b-0 [&_.ck-toolbar]:border-x-0 [&_.ck-toolbar]:border-t-0">
                                    <CKEditor
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        editor={ClassicEditor as any}
                                        config={editorConfig}
                                        data={values.content}
                                        onChange={(_evt: unknown, editor: { getData: () => string }) => setFieldValue("content", editor.getData())}
                                    />
                                </div>
                                <ErrorMessage name="content" component="p" className="text-sm text-red-500" />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2"><label className="font-medium">Tags</label><Field name="tags" placeholder="health, heart, fitness" className={inputClass} /><p className="text-xs text-[#64748B]">Separate tags with commas.</p></div>
                                <div className="flex flex-col gap-2"><label className="font-medium">Publish status</label><div className="flex gap-5 py-3">{(["draft", "published"] as const).map((status) => <label key={status} className="flex cursor-pointer items-center gap-2 capitalize"><Field type="radio" name="status" value={status} />{status}</label>)}</div></div>
                            </div>

                            <section className="border-t border-black/10 pt-7">
                                <h2 className="text-lg font-semibold">People Also Ask</h2>
                                <p className="mt-1 text-sm text-[#64748B]">Add the questions readers commonly ask about this topic.</p>
                                <FieldArray name="peopleAlsoAsk">{({ push, remove }) => <div className="mt-5 flex flex-col gap-4">{values.peopleAlsoAsk.map((_, index) => <div key={index} className="grid gap-3 rounded-lg border border-black/10 p-4 md:grid-cols-[1fr_1fr_auto]"><div><Field name={`peopleAlsoAsk.${index}.question`} placeholder="Question" className={`w-full ${inputClass}`} /><ErrorMessage name={`peopleAlsoAsk.${index}.question`} component="p" className="mt-1 text-sm text-red-500" /></div><div><Field name={`peopleAlsoAsk.${index}.answer`} placeholder="Answer" className={`w-full ${inputClass}`} /><ErrorMessage name={`peopleAlsoAsk.${index}.answer`} component="p" className="mt-1 text-sm text-red-500" /></div><button type="button" aria-label="Remove People Also Ask item" title="Remove item" onClick={() => remove(index)} disabled={values.peopleAlsoAsk.length === 1} className="self-start rounded p-3 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"><Trash2 size={18} /></button></div>)}<button type="button" onClick={() => push({ question: "", answer: "" })} className="flex w-fit items-center gap-2 rounded-lg border border-black/15 px-4 py-2 font-medium hover:bg-black/5"><Plus size={17} />Add question</button></div>}</FieldArray>
                            </section>

                            <section className="border-t border-black/10 pt-7">
                                <h2 className="text-lg font-semibold">FAQs</h2>
                                <p className="mt-1 text-sm text-[#64748B]">Add frequently asked questions and their answers.</p>
                                <FieldArray name="faqs">{({ push, remove }) => <div className="mt-5 flex flex-col gap-4">{values.faqs.map((_, index) => <div key={index} className="grid gap-3 rounded-lg border border-black/10 p-4 md:grid-cols-[1fr_1fr_auto]"><div><Field name={`faqs.${index}.question`} placeholder="Question" className={`w-full ${inputClass}`} /><ErrorMessage name={`faqs.${index}.question`} component="p" className="mt-1 text-sm text-red-500" /></div><div><Field name={`faqs.${index}.answer`} placeholder="Answer" className={`w-full ${inputClass}`} /><ErrorMessage name={`faqs.${index}.answer`} component="p" className="mt-1 text-sm text-red-500" /></div><button type="button" aria-label="Remove FAQ" title="Remove FAQ" onClick={() => remove(index)} disabled={values.faqs.length === 1} className="self-start rounded p-3 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"><Trash2 size={18} /></button></div>)}<button type="button" onClick={() => push({ question: "", answer: "" })} className="flex w-fit items-center gap-2 rounded-lg border border-black/15 px-4 py-2 font-medium hover:bg-black/5"><Plus size={17} />Add FAQ</button></div>}</FieldArray>
                            </section>

                            <section className="border-t border-black/10 pt-7"><h2 className="text-lg font-semibold">SEO settings</h2><div className="mt-5 grid gap-6 md:grid-cols-2"><div className="flex flex-col gap-2"><label className="font-medium">SEO title</label><Field name="metaTitle" placeholder="Title shown in search results" className={inputClass} /><span className="text-right text-xs text-[#64748B]">{values.metaTitle.length}/60</span><ErrorMessage name="metaTitle" component="p" className="text-sm text-red-500" /></div><div className="flex flex-col gap-2"><label className="font-medium">SEO description</label><Field as="textarea" rows={2} name="metaDescription" placeholder="Description shown in search results" className={inputClass} /><span className="text-right text-xs text-[#64748B]">{values.metaDescription.length}/160</span><ErrorMessage name="metaDescription" component="p" className="text-sm text-red-500" /></div></div></section>

                            <div className="flex flex-col-reverse gap-3 border-t border-black/10 pt-6 sm:flex-row sm:justify-end"><ResetButton onReset={() => { resetForm(); setMainImagePreview(blog?.mainImage ?? ""); }} /><SubmitButton text={isSubmitting ? "Saving..." : "Save Blog"} type="submit" /></div>
                        </Form>
                    )}
                </Formik>
            </div>

            <style jsx global>{`
                .ck-editor-wrapper .ck-content h1 { font-size: 2rem; font-weight: 700; line-height: 1.3; margin: 1rem 0 0.5rem; }
                .ck-editor-wrapper .ck-content h2 { font-size: 1.5rem; font-weight: 700; line-height: 1.3; margin: 1rem 0 0.5rem; }
                .ck-editor-wrapper .ck-content h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.3; margin: 0.75rem 0 0.5rem; }
                .ck-editor-wrapper .ck-content h4 { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
                .ck-editor-wrapper .ck-content p { margin: 0 0 0.75rem; }
                .ck-editor-wrapper .ck-content ul { list-style: disc !important; padding-left: 1.5rem !important; margin: 0.5rem 0; }
                .ck-editor-wrapper .ck-content ol { list-style: decimal !important; padding-left: 1.5rem !important; margin: 0.5rem 0; }
                .ck-editor-wrapper .ck-content ul li, .ck-editor-wrapper .ck-content ol li { display: list-item; margin: 0.25rem 0; }
                .ck-editor-wrapper .ck-content blockquote { border-left: 3px solid #cbd5e1; padding-left: 1rem; color: #475569; font-style: italic; margin: 0.75rem 0; }
                .ck-editor-wrapper .ck-content a { color: #1d7daf; text-decoration: underline; }
            `}</style>
        </div>
    );
}