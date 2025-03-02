import { RESOURCE_TYPES } from "./constants";

// MOCK RESPONSES FROM BACKEND APIs
export interface Document {
  id: number;
  title: string;
  description: string;
  likes: number;
  uploadTime: Date;
  resourceType: ResourceType;
}
export type ResourceType = (typeof RESOURCE_TYPES)[number];
export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Tutorial 10 Notes",
    description: "NUS | CS1010S",
    likes: 47,
    uploadTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    resourceType: "Notes",
  },
  {
    id: 2,
    title: "Midterm Revision Guide",
    description: "NTU | CZ1005",
    likes: 32,
    uploadTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    resourceType: "Exam Papers",
  },
  {
    id: 3,
    title: "Final Exam Cheatsheet",
    description: "Harvard | CS50",
    likes: 60,
    uploadTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    resourceType: "Solutions",
  },
  {
    id: 4,
    title: "AI and Machine Learning Notes",
    description: "Stanford | CS229",
    likes: 90,
    uploadTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    resourceType: "Notes",
  },
  {
    id: 5,
    title: "Mathematical Foundations for CS",
    description: "MIT | 6.042J",
    likes: 75,
    uploadTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    resourceType: "Notes",
  },
  {
    id: 6,
    title: "Data Structures and Algorithms",
    description: "UC Berkeley | CS61B",
    likes: 88,
    uploadTime: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
    resourceType: "Exam Papers",
  },
  {
    id: 7,
    title: "Operating Systems Lecture Notes",
    description: "CMU | 15-410",
    likes: 110,
    uploadTime: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
    resourceType: "Notes",
  },
  {
    id: 8,
    title: "Computer Networks Guide",
    description: "UCLA | CS118",
    likes: 53,
    uploadTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
    resourceType: "Solutions",
  },
];
