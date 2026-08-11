import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

// =========================
// TYPES
// =========================

export interface BlogContent {
  heading: string;
  paragraphs: string[];
  images: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface Blog {
  _id?: string;

  title: string;
  slug: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage: string;
  description: string;

  content: BlogContent[];

  tags: string[];

  status: "draft" | "published";

  peopleAlsoAsk: BlogFAQ[];
  faq: BlogFAQ[];

  seoTitle?: string;
  seoDescription?: string;

  schemaMarkup?: unknown;

  createdAt?: string;
  updatedAt?: string;
}

// =========================
// ADD BLOG PAYLOAD
// =========================

export interface AddBlogPayload {
  title: string;
  slug: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage: string;
  description: string;

  content: BlogContent[];

  tags: string[];

  status: "draft" | "published";

  peopleAlsoAsk: BlogFAQ[];
  faq: BlogFAQ[];

  seoTitle?: string;
  seoDescription?: string;

  schemaMarkup?: unknown;
}

// =========================
// UPDATE BLOG PAYLOAD
// =========================

export interface UpdateBlogPayload extends AddBlogPayload {
  id: string;
}

// =========================
// RESPONSE
// =========================

export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

// =========================
// STATE
// =========================

interface BlogState {
  blog: Blog | null;

  loading: boolean;

  error: string | null;

  success: boolean;

  message: string | null;
}

// =========================
// INITIAL STATE
// =========================

const initialState: BlogState = {
  blog: null,

  loading: false,

  error: null,

  success: false,

  message: null,
};

// =========================
// SLICE
// =========================

const BlogSlice = createSlice({
  name: "blog",

  initialState,

  reducers: {
    // =========================
    // SET BLOG
    // =========================

    setBlog: (
      state,
      action: PayloadAction<Blog>
    ) => {
      state.blog = action.payload;
    },

    // =========================
    // CLEAR BLOG
    // =========================

    clearBlogState: (state) => {
      state.blog = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearBlogError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR MESSAGE
    // =========================

    clearBlogMessage: (state) => {
      state.message = null;
    },

    // =========================
    // LOADING
    // =========================

    setBlogLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    // =========================
    // SUCCESS
    // =========================

    setBlogSuccess: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.success = action.payload;
    },

    // =========================
    // MESSAGE
    // =========================

    setBlogMessage: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.message = action.payload;
    },

    // =========================
    // ERROR
    // =========================

    setBlogError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },
  },
});

// =========================
// EXPORT ACTIONS
// =========================

export const {
  setBlog,
  clearBlogState,
  clearBlogError,
  clearBlogMessage,
  setBlogLoading,
  setBlogSuccess,
  setBlogMessage,
  setBlogError,
} = BlogSlice.actions;

// =========================
// EXPORT REDUCER
// =========================

export default BlogSlice.reducer;