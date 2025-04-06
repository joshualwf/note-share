import { CommentProps } from "../types/comment";
import { RESOURCE_TYPES } from "./constants";

// MOCK RESPONSES FROM BACKEND APIs
export type Post = {
  id: number;
  userId: string;
  schoolName: string;
  courseCode: string;
  courseName: string;
  description: string;
  content: string;
  fileKey: string;
  postType: string;
  upvoteCount: number;
  createdAt: Date;
};

export type ResourceType = (typeof RESOURCE_TYPES)[number];
export const mockDocuments: Post[] = [
  {
    id: 1,
    userId: "TEST",
    schoolName: "National University of Singapore",
    courseCode: "CS1010S",
    courseName: "Programming Methodology",
    description:
      "Notes from Tutorial 10 covering recursion and list processing.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Notes",
    upvoteCount: 47,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    userId: "TEST",
    schoolName: "Nanyang Technological University",
    courseCode: "CZ1005",
    courseName: "Digital Logic",
    description: "Condensed notes and key concepts for midterm revision.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Exam Papers",
    upvoteCount: 32,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    userId: "TEST",
    schoolName: "Harvard University",
    courseCode: "CS50",
    courseName: "Introduction to Computer Science",
    description: "A one-page cheatsheet summarizing key exam topics.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Solutions",
    upvoteCount: 60,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    userId: "TEST",
    schoolName: "Stanford University",
    courseCode: "CS229",
    courseName: "Machine Learning",
    description:
      "Detailed lecture notes on supervised and unsupervised learning.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Notes",
    upvoteCount: 90,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    userId: "TEST",
    schoolName: "Massachusetts Institute of Technology",
    courseCode: "6.042J",
    courseName: "Mathematics for Computer Science",
    description:
      "Key concepts in logic, proofs, and combinatorics for CS students.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Notes",
    upvoteCount: 75,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 6,
    userId: "TEST",
    schoolName: "University of California, Berkeley",
    courseCode: "CS61B",
    courseName: "Data Structures",
    description:
      "Comprehensive notes and code examples for common data structures.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Exam Papers",
    upvoteCount: 88,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: 7,
    userId: "TEST",
    schoolName: "Carnegie Mellon University",
    courseCode: "15-410",
    courseName: "Operating System Design and Implementation",
    description:
      "In-depth lecture notes covering concurrency and system design.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Notes",
    upvoteCount: 110,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
  },
  {
    id: 8,
    userId: "TEST",
    schoolName: "University of California, Los Angeles",
    courseCode: "CS118",
    courseName: "Computer Networks",
    description:
      "Study guide with protocol explanations and practice questions.",
    content: "TEST",
    fileKey: "TEST",
    postType: "Solutions",
    upvoteCount: 53,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
];

export const mockComments: CommentProps[] = [
  {
    username: "code_wizard",
    time: new Date("2025-03-15"),
    text: "Super useful notes for revision, thanks a ton!",
    likeCount: 22,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=552676&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "quiet_fox",
    time: new Date("2024-12-10"),
    text: "I wish I found this site earlier!",
    likeCount: 11,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=918885&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "astro_girl",
    time: new Date("2024-11-08"),
    text: "The CS229 notes were 🔥. Respect!",
    likeCount: 19,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=315982&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "green_penguin",
    time: new Date("2025-03-23"),
    text: "Cheatsheet was solid. Minimal but thorough.",
    likeCount: 15,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=489800&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "coffee_dev",
    time: new Date("2024-10-30"),
    text: "Now I finally understand recursion 😭☕",
    likeCount: 28,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=245672&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "puzzle_head",
    time: new Date("2024-08-10"),
    text: "Appreciate whoever uploaded the midterm guide ❤️",
    likeCount: 34,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=866332&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "algo_ace",
    time: new Date("2024-09-01"),
    text: "Sorting section in the notes is super clean!",
    likeCount: 17,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=244203&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "design_duck",
    time: new Date("2024-07-20"),
    text: "UI of this platform is next level 😍",
    likeCount: 21,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=208618&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "math_monkey",
    time: new Date("2024-06-18"),
    text: "Anyone else actually enjoyed the proofs? Just me?",
    likeCount: 9,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=449108&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "binary_bat",
    time: new Date("2025-01-02"),
    text: "Binary search explanation was crystal clear. Thanks!",
    likeCount: 13,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=704012&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "cloud_kitten",
    time: new Date("2024-10-01"),
    text: "Can someone upload solutions for the latest lab?",
    likeCount: 5,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=789024&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "linux_lion",
    time: new Date("2024-09-12"),
    text: "Really impressed by the Linux notes!",
    likeCount: 16,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=873091&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
  {
    username: "dev_dolphin",
    time: new Date("2024-11-25"),
    text: "Great resource for last-minute revision!",
    likeCount: 12,
    profilePic:
      "https://api.dicebear.com/9.x/micah/svg?seed=139471&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile",
  },
];
