import { CommentProps } from "../types/comment";
import { RESOURCE_TYPES } from "./constants";

// MOCK RESPONSES FROM BACKEND APIs
export interface Post {
  id: number;
  userId: string;
  schoolName: string;
  courseCode: string;
  title: string;
  content: string;
  fileKey: string;
  postType: string;
  upvoteCount: number;
  createdAt: Date;
}
export type ResourceType = (typeof RESOURCE_TYPES)[number];
export const mockDocuments: Post[] = [
  {
    id: 1,
    userId: "TEST",
    title: "Tutorial 10 Notes",
    schoolName: "National University of Singapore",
    courseCode: "CS1010S",
    content: "TEST",
    upvoteCount: 47,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    postType: "Notes",
  },
  {
    id: 2,
    userId: "TEST",
    title: "Midterm Revision Guide",
    schoolName: "Nanyang Technological University",
    courseCode: "CZ1005",
    content: "TEST",
    upvoteCount: 32,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    postType: "Exam Papers",
  },
  {
    id: 3,
    userId: "TEST",
    title: "Final Exam Cheatsheet",
    schoolName: "Harvard University",
    courseCode: "CS50",
    content: "TEST",
    upvoteCount: 60,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    postType: "Solutions",
  },
  {
    id: 4,
    userId: "TEST",
    title: "AI and Machine Learning Notes",
    schoolName: "Stanford University",
    courseCode: "CS229",
    content: "TEST",
    upvoteCount: 90,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    postType: "Notes",
  },
  {
    id: 5,
    userId: "TEST",
    title: "Mathematical Foundations for CS",
    schoolName: "Massachusetts Institute of Technology",
    courseCode: "6.042J",
    content: "TEST",
    upvoteCount: 75,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    postType: "Notes",
  },
  {
    id: 6,
    userId: "TEST",
    title: "Data Structures and Algorithms",
    schoolName: "University of California, Berkeley",
    courseCode: "CS61B",
    content: "TEST",
    upvoteCount: 88,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
    postType: "Exam Papers",
  },
  {
    id: 7,
    userId: "TEST",
    title: "Operating Systems Lecture Notes",
    schoolName: "Carnegie Mellon University",
    courseCode: "15-410",
    content: "TEST",
    upvoteCount: 110,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
    postType: "Notes",
  },
  {
    id: 8,
    userId: "TEST",
    title: "Computer Networks Guide",
    schoolName: "University of California, Los Angeles",
    courseCode: "CS118",
    content: "TEST",
    upvoteCount: 53,
    fileKey: "TEST",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    postType: "Solutions",
  },
];

export const mockComments: CommentProps[] = [
  {
    username: "code_wizard",
    time: new Date("2025-03-15"),
    text: "Super useful notes for revision, thanks a ton!",
    likeCount: 22,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Wizard",
    replies: [
      {
        username: "data_nerd",
        time: new Date("2025-03-16"),
        text: "Saved me during finals 🙌",
        likeCount: 6,
        profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Nerd",
      },
    ],
  },
  {
    username: "quiet_fox",
    time: new Date("2024-12-10"),
    text: "I wish I found this site earlier!",
    likeCount: 11,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Fox",
  },
  {
    username: "astro_girl",
    time: new Date("2024-11-08"),
    text: "The CS229 notes were 🔥. Respect!",
    likeCount: 19,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Galaxy",
    replies: [
      {
        username: "rocket_man",
        time: new Date("2024-11-09"),
        text: "100% agree 🚀",
        likeCount: 3,
        profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rocket",
      },
    ],
  },
  {
    username: "green_penguin",
    time: new Date("2025-03-23"),
    text: "Cheatsheet was solid. Minimal but thorough.",
    likeCount: 15,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Penguin",
  },
  {
    username: "coffee_dev",
    time: new Date("2024-10-30"),
    text: "Now I finally understand recursion 😭☕",
    likeCount: 28,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Coffee",
    replies: [
      {
        username: "tea_debugger",
        time: new Date("2024-10-31"),
        text: "Haha same, CS2040 was a trip.",
        likeCount: 4,
        profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tea",
      },
    ],
  },
  // {
  //   username: "puzzle_head",
  //   time: new Date("2024-08-10"),
  //   text: "Appreciate whoever uploaded the midterm guide ❤️",
  //   likeCount: 34,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  // },
  // {
  //   username: "algo_ace",
  //   time: new Date("2024-09-01"),
  //   text: "Sorting section in the notes is super clean!",
  //   likeCount: 17,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ace",
  // },
  // {
  //   username: "design_duck",
  //   time: new Date("2024-07-20"),
  //   text: "UI of this platform is next level 😍",
  //   likeCount: 21,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Duck",
  // },
  // {
  //   username: "math_monkey",
  //   time: new Date("2024-06-18"),
  //   text: "Anyone else actually enjoyed the proofs? Just me?",
  //   likeCount: 9,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Monkey",
  // },
  // {
  //   username: "binary_bat",
  //   time: new Date("2025-01-02"),
  //   text: "Binary search explanation was crystal clear. Thanks!",
  //   likeCount: 13,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bat",
  // },
  // {
  //   username: "cloud_kitten",
  //   time: new Date("2024-10-01"),
  //   text: "Can someone upload solutions for the latest lab?",
  //   likeCount: 5,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Kitten",
  // },
  // {
  //   username: "linux_lion",
  //   time: new Date("2024-09-12"),
  //   text: "Really impressed by the Linux notes!",
  //   likeCount: 16,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lion",
  // },
  // {
  //   username: "dev_dolphin",
  //   time: new Date("2024-11-25"),
  //   text: "Great resource for last-minute revision!",
  //   likeCount: 12,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dolphin",
  // },
  // {
  //   username: "snek_coder",
  //   time: new Date("2025-02-28"),
  //   text: "Whoever made this is a legend 🐍",
  //   likeCount: 25,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Snek",
  // },
];
