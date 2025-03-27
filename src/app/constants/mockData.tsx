import { CommentProps } from "../types/comment";
import { RESOURCE_TYPES } from "./constants";

// MOCK RESPONSES FROM BACKEND APIs
export interface Post {
  id: number;
  user_id: string;
  school_name: string;
  course_code: string;
  title: string;
  content: string;
  file_key: string;
  post_type: string;
  upvote_count: number;
  created_at: Date;
}
export type ResourceType = (typeof RESOURCE_TYPES)[number];
export const mockDocuments: Post[] = [
  {
    id: 1,
    user_id: "TEST",
    title: "Tutorial 10 Notes",
    school_name: "National University of Singapore",
    course_code: "CS1010S",
    content: "TEST",
    upvote_count: 47,
    file_key: "TEST",
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    post_type: "Notes",
  },
  {
    id: 2,
    user_id: "TEST",
    title: "Midterm Revision Guide",
    school_name: "Nanyang Technological University",
    course_code: "CZ1005",
    content: "TEST",
    upvote_count: 32,
    file_key: "TEST",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    post_type: "Exam Papers",
  },
  {
    id: 3,
    user_id: "TEST",
    title: "Final Exam Cheatsheet",
    school_name: "Harvard University",
    course_code: "CS50",
    content: "TEST",
    upvote_count: 60,
    file_key: "TEST",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    post_type: "Solutions",
  },
  {
    id: 4,
    user_id: "TEST",
    title: "AI and Machine Learning Notes",
    school_name: "Stanford University",
    course_code: "CS229",
    content: "TEST",
    upvote_count: 90,
    file_key: "TEST",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    post_type: "Notes",
  },
  {
    id: 5,
    user_id: "TEST",
    title: "Mathematical Foundations for CS",
    school_name: "Massachusetts Institute of Technology",
    course_code: "6.042J",
    content: "TEST",
    upvote_count: 75,
    file_key: "TEST",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    post_type: "Notes",
  },
  {
    id: 6,
    user_id: "TEST",
    title: "Data Structures and Algorithms",
    school_name: "University of California, Berkeley",
    course_code: "CS61B",
    content: "TEST",
    upvote_count: 88,
    file_key: "TEST",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
    post_type: "Exam Papers",
  },
  {
    id: 7,
    user_id: "TEST",
    title: "Operating Systems Lecture Notes",
    school_name: "Carnegie Mellon University",
    course_code: "15-410",
    content: "TEST",
    upvote_count: 110,
    file_key: "TEST",
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
    post_type: "Notes",
  },
  {
    id: 8,
    user_id: "TEST",
    title: "Computer Networks Guide",
    school_name: "University of California, Los Angeles",
    course_code: "CS118",
    content: "TEST",
    upvote_count: 53,
    file_key: "TEST",
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    post_type: "Solutions",
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
