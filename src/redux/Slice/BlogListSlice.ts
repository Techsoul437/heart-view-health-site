import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  addBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogById,
} from "../Api";

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
// DELETE BLOG RESPONSE
// =========================

export interface DeleteBlogResponse {
  success: boolean;
  message: string;
  data?: Blog;
}

// =========================
// GET ALL BLOG RESPONSE
// =========================

export interface GetBlogsResponse {
  success: boolean;
  message: string;
  count: number;
  data: Blog[];
}

// =========================
// GET BLOG BY ID RESPONSE
// =========================

export interface GetBlogByIdResponse {
  success: boolean;
  message: string;
  data: Blog;
}

// =========================
// STATE
// =========================

interface BlogState {
  blog: Blog | null;

  blogs: Blog[];

  loading: boolean;

  addLoading: boolean;

  updateLoading: boolean;

  deleteLoading: boolean;

  error: string | null;

  success: boolean;

  message: string | null;
}

// =========================
// INITIAL STATE
// =========================

const initialState: BlogState = {
  blog: null,

  blogs: [],

  loading: false,

  addLoading: false,

  updateLoading: false,

  deleteLoading: false,

  error: null,

  success: false,

  message: null,
};

// =========================
// SLICE
// =========================

const BlogListSlice = createSlice({
  name: "blog",

  initialState,

  reducers: {
    // =========================
    // SET BLOG
    // =========================

    setBlog: (
      state,
      action: PayloadAction<Blog | null>
    ) => {
      state.blog = action.payload;
    },

    // =========================
    // SET BLOGS
    // =========================

    setBlogs: (
      state,
      action: PayloadAction<Blog[]>
    ) => {
      state.blogs = action.payload;
    },

    // =========================
    // CLEAR BLOG STATE
    // =========================

    clearBlogState: (state) => {
      state.blog = null;
      state.blogs = [];

      state.loading = false;
      state.addLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;

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

  // =========================
  // API
  // =========================

  extraReducers: (builder) => {
    builder

      // =====================================================
      // ADD BLOG
      // =====================================================

      .addCase(addBlog.pending, (state) => {
        state.addLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })

      .addCase(addBlog.fulfilled, (state, action) => {
        state.addLoading = false;
        state.success = true;

        state.message =
          action.payload.message || "Blog added successfully";

        if (action.payload.data) {
          state.blogs.unshift(action.payload.data);
        }
      })

      .addCase(addBlog.rejected, (state, action) => {
        state.addLoading = false;
        state.success = false;

        state.error =
          action.payload || "Unable to add blog";
      })

      // =====================================================
      // UPDATE BLOG
      // =====================================================

      .addCase(updateBlog.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })

      .addCase(updateBlog.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = true;

        state.message =
          action.payload.message ||
          "Blog updated successfully";

        const updatedBlog = action.payload.data;

        if (updatedBlog) {
          const index = state.blogs.findIndex(
            (blog) => blog._id === updatedBlog._id
          );

          if (index !== -1) {
            state.blogs[index] = updatedBlog;
          }

          // Update selected blog also
          if (
            state.blog &&
            state.blog._id === updatedBlog._id
          ) {
            state.blog = updatedBlog;
          }
        }
      })

      .addCase(updateBlog.rejected, (state, action) => {
        state.updateLoading = false;
        state.success = false;

        state.error =
          action.payload || "Unable to update blog";
      })

      // =====================================================
      // DELETE BLOG
      // =====================================================

      .addCase(deleteBlog.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;

        state.message =
          action.payload.message ||
          "Blog deleted successfully";

        // Get deleted blog ID from backend response
        const deletedBlogId =
          action.payload.data?._id || null;

        if (deletedBlogId) {
          // Remove blog from list
          state.blogs = state.blogs.filter(
            (blog) => blog._id !== deletedBlogId
          );

          // Clear selected blog if same blog deleted
          if (
            state.blog &&
            state.blog._id === deletedBlogId
          ) {
            state.blog = null;
          }
        }
      })

      .addCase(deleteBlog.rejected, (state, action) => {
        state.deleteLoading = false;
        state.success = false;

        state.error =
          action.payload || "Unable to delete blog";
      })

      // =====================================================
      // GET ALL BLOGS
      // =====================================================

      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.blogs = action.payload.data || [];

        state.message =
          action.payload.message || null;
      })

      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          "Unable to fetch blogs";
      })

      // =====================================================
      // GET BLOG BY ID
      // =====================================================

      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.blog = null;
      })

      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.blog = action.payload.data;

        state.message =
          action.payload.message || null;
      })

      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          "Unable to fetch blog";
      });
  },
});

// =========================
// EXPORT ACTIONS
// =========================

export const {
  setBlog,
  setBlogs,
  clearBlogState,
  clearBlogError,
  clearBlogMessage,
  setBlogLoading,
  setBlogSuccess,
  setBlogMessage,
  setBlogError,
} = BlogListSlice.actions;

// =========================
// EXPORT REDUCER
// =========================

export default BlogListSlice.reducer;