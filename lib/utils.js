import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatNumber(num) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}

export const TimeFormattor = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now"; // In case the date is too recent
};
export const questions = [
  {
    _id: 1,
    title: "Getting Started with React",
    tags: [
      { _id: 1, name: "React" },
      { _id: 2, name: "CSS" },
    ],
    author: {
      _id: 1,
      name: "Jane Doe",
      picture: "https://example.com/jane_doe.jpg",
    },
    upvotes: 45,
    views: 50000,
    answers: [
      {
        _id: 1,
        content: "React is a powerful library for building user interfaces.",
      },
    ],
    createdAt: "2024-08-01T08:30:00Z",
  },
  {
    _id: 2,
    title: "Building Cross-Platform Apps with Flutter",
    tags: [{ _id: 2, name: "Flutter" }],
    author: {
      _id: 2,
      name: "John Smith",
      picture: "https://example.com/john_smith.jpg",
    },
    upvotes: 6000000,
    views: 650,
    answers: [
      {
        _id: 2,
        content:
          "Flutter makes it easy to create natively compiled applications for mobile, web, and desktop from a single codebase.",
      },
    ],
    createdAt: "2024-08-05T14:00:00Z",
  },
  {
    _id: 3,
    title: "Understanding Javascript Closures",
    tags: [{ _id: 3, name: "Javascript" }],
    author: {
      _id: 3,
      name: "Emily Brown",
      picture: "https://example.com/emily_brown.jpg",
    },
    upvotes: 70,
    views: 800,
    answers: [
      {
        _id: 3,
        content:
          "Closures are a fundamental concept in JavaScript that allow functions to retain access to their lexical scope.",
      },
    ],
    createdAt: "2024-08-10T10:45:00Z",
  },
  {
    _id: 4,
    title: "Introduction to Python Data Analysis",
    tags: [{ _id: 4, name: "python" }],
    author: {
      _id: 4,
      name: "Michael Davis",
      picture: "https://example.com/michael_davis.jpg",
    },
    upvotes: 85,
    views: 950,
    answers: [
      {
        _id: 4,
        content:
          "Python provides powerful libraries for data analysis such as pandas and NumPy.",
      },
    ],
    createdAt: "2024-08-15T12:00:00Z",
  },
  {
    _id: 5,
    title: "Advanced C++ Techniques",
    tags: [{ _id: 5, name: "c++" }],
    author: {
      _id: 5,
      name: "Sarah Lee",
      picture: "https://example.com/sarah_lee.jpg",
    },
    upvotes: 50,
    views: 700,
    answers: [
      {
        _id: 5,
        content:
          "C++ offers advanced features like template programming and multiple inheritance.",
      },
    ],
    createdAt: "2024-08-20T16:30:00Z",
  },
];
