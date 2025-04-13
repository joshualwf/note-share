export const RESOURCE_TYPES = [
  "Notes",
  "Practice materials",
  "Practical",
  "Summaries",
  "Cheatsheets",
  "Assignments",
  "Tutorials",
  "Essays",
  "Others",
];

export const SCHOOLS = [
  {
    value: "National University of Singapore",
    label: "National University of Singapore",
  },
  {
    value: "Nanyang Technological University",
    label: "Nanyang Technological University",
  },
  { value: "Harvard University", label: "Harvard University" },
  { value: "Stanford University", label: "Stanford University" },
  {
    value: "Massachusetts Institute of Technology",
    label: "Massachusetts Institute of Technology",
  },
  {
    value: "University of California, Berkeley",
    label: "University of California, Berkeley",
  },
  { value: "Carnegie Mellon University", label: "Carnegie Mellon University" },
  {
    value: "University of California, Los Angeles",
    label: "University of California, Los Angeles",
  },
];

export const COURSECODES = [
  { value: "CS1010S", label: "CS1010S - Programming Methodology" },
  { value: "CZ1005", label: "CZ1005 - Digital Logic" },
  { value: "CS50", label: "CS50 - Introduction to Computer Science" },
  { value: "CS229", label: "CS229 - Machine Learning" },
  { value: "6.042J", label: "6.042J - Mathematics for Computer Science" },
  { value: "CS61B", label: "CS61B - Data Structures and Algorithms" },
  { value: "15-410", label: "15-410 - Operating Systems" },
  { value: "CS118", label: "CS118 - Computer Networks" },
];

export const DUMMY = [];

export const SCHOOLTYPE = [
  { value: "Primary", label: "" },
  { value: "Secondary", label: "" },
  { value: "Pre-University", label: "" },
  { value: "University", label: "" },
];

// this is according to https://www.npmjs.com/package/@cyntler/react-doc-viewer
// to change the allowed file types for user to contribute, edit this list
export const MIME_TYPE_MAP: Record<string, string> = {
  "image/bmp": "bmp",
  "text/csv": "csv",
  "application/vnd.oasis.opendocument.text": "odt",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "image/gif": "gif",
  "text/htm": "htm",
  "text/html": "html",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "application/pdf": "pdf",
  "image/png": "png",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "image/tiff": "tiff",
  "text/plain": "txt",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "video/mp4": "mp4",
  "image/webp": "webp",
};

export const ACCEPTED_FILE_EXTENSIONS = Object.values(MIME_TYPE_MAP)
  .map((ext) => `.${ext}`)
  .join(",");
