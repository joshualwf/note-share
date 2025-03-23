import { CommentProps } from "../types/comment";
import { RESOURCE_TYPES } from "./constants";

// MOCK RESPONSES FROM BACKEND APIs
export interface Document {
  id: number;
  title: string;
  school: string;
  modCode: string;
  likes: number;
  uploadTime: Date;
  resourceType: ResourceType;
}
export type ResourceType = (typeof RESOURCE_TYPES)[number];
export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Tutorial 10 Notes",
    school: "National University of Singapore",
    modCode: "CS1010S",
    likes: 47,
    uploadTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    resourceType: "Notes",
  },
  {
    id: 2,
    title: "Midterm Revision Guide",
    school: "Nanyang Technological University",
    modCode: "CZ1005",
    likes: 32,
    uploadTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    resourceType: "Exam Papers",
  },
  {
    id: 3,
    title: "Final Exam Cheatsheet",
    school: "Harvard University",
    modCode: "CS50",
    likes: 60,
    uploadTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    resourceType: "Solutions",
  },
  {
    id: 4,
    title: "AI and Machine Learning Notes",
    school: "Stanford University",
    modCode: "CS229",
    likes: 90,
    uploadTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    resourceType: "Notes",
  },
  {
    id: 5,
    title: "Mathematical Foundations for CS",
    school: "Massachusetts Institute of Technology",
    modCode: "6.042J",
    likes: 75,
    uploadTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    resourceType: "Notes",
  },
  {
    id: 6,
    title: "Data Structures and Algorithms",
    school: "University of California, Berkeley",
    modCode: "CS61B",
    likes: 88,
    uploadTime: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
    resourceType: "Exam Papers",
  },
  {
    id: 7,
    title: "Operating Systems Lecture Notes",
    school: "Carnegie Mellon University",
    modCode: "15-410",
    likes: 110,
    uploadTime: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
    resourceType: "Notes",
  },
  {
    id: 8,
    title: "Computer Networks Guide",
    school: "University of California, Los Angeles",
    modCode: "CS118",
    likes: 53,
    uploadTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    resourceType: "Solutions",
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
        time: new Date("2000-01-16"),
        text: "Saved me during finals 🙌",
        likeCount: 6,
        profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Nerd",
      },
    ],
  },
  {
    username: "quiet_fox",
    time: new Date("2000-12-10"),
    text: "I wish I found this site earlier!",
    likeCount: 11,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Fox",
  },
  {
    username: "astro_girl",
    time: new Date("2024-01-08"),
    text: "The CS229 notes were 🔥. Respect!",
    likeCount: 19,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Galaxy",
    replies: [
      {
        username: "rocket_man",
        time: new Date("2025-03-23"),
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
    time: new Date("2023-12-30"),
    text: "Now I finally understand recursion 😭☕",
    likeCount: 28,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Coffee",
    replies: [
      {
        username: "tea_debugger",
        time: new Date("2023-12-31"),
        text: "Haha same, CS2040 was a trip.",
        likeCount: 4,
        profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tea",
      },
      {
        username: "tea_debugger",
        time: new Date("2023-12-31"),
        text: "blablabla i like spamming hehehehe.",
        likeCount: 4,
        profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tea",
      },
      {
        username: "tea_debugger",
        time: new Date("2023-12-31"),
        text: "kekekekek hehexd yeet",
        likeCount: 4,
        profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tea",
      },
    ],
  },
  {
    username: "puzzle_head",
    time: new Date("2024-01-10"),
    text: "Appreciate whoever uploaded the midterm guide ❤️",
    likeCount: 34,
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  },
  // {
  //   username: "puzzle_head",
  //   time: new Date("2024-01-10"),
  //   text: "Appreciate whoever uploaded the midterm guide ❤️",
  //   likeCount: 34,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  // },
  // {
  //   username: "puzzle_head",
  //   time: new Date("2024-01-10"),
  //   text: "Appreciate whoever uploaded the midterm guide ❤️",
  //   likeCount: 34,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  // },
  // {
  //   username: "puzzle_head",
  //   time: new Date("2024-01-10"),
  //   text: "Appreciate whoever uploaded the midterm guide ❤️",
  //   likeCount: 34,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  // },
  // {
  //   username: "puzzle_head",
  //   time: new Date("2024-01-10"),
  //   text: "Appreciate whoever uploaded the midterm guide ❤️",
  //   likeCount: 34,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  // },
  // {
  //   username: "puzzle_head",
  //   time: new Date("2024-01-10"),
  //   text: "Appreciate whoever uploaded the midterm guide ❤️",
  //   likeCount: 34,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  // },
  // {
  //   username: "puzzle_head",
  //   time: new Date("2024-01-10"),
  //   text: "Appreciate whoever uploaded the midterm guide ❤️",
  //   likeCount: 34,
  //   profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Puzzle",
  // },
];
