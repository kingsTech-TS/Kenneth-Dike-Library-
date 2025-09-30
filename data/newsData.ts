// /data/newsData.ts

export interface News {
  author: string
  category: string
  title: string
  description: string
  imageUrl: string
  likes: string[]
  scheduledFor: string | null
  status: "Draft" | "Published" | "Archived"  // can keep "Archived" or adjust
  tags: string[]
  views: number

  // ✅ Make these optional since Firestore sets them
  createdAt?: string
  updatedAt?: string
}

// 🔹 Example single news item
export const newsData: News[] = [
  {
    author: "King Solomon",
    category: "Book Reviews",
    createdAt: "2025-03-26T22:44:26Z", // stored in UTC ISO format
    updatedAt: "2025-03-26T22:44:26Z",
    title: "The Magic of Old Bookstores: A Journey Through Time",
    description:
      "There’s something enchanting about stepping into an old bookstore. The scent of aged paper, the soft rustling of pages being turned, and the quiet hum of fellow book lovers lost in their own literary worlds create a timeless atmosphere. Old bookstores are more than just shops—they are treasure troves of knowledge, history, and nostalgia. Their wooden shelves, often leaning slightly from the weight of countless stories, hold books that have passed through many hands, each with a story beyond the words printed inside. Some books bear handwritten notes in the margins, while others carry the faint scent of the places they once called home. Beyond the books themselves, these stores are a haven for thinkers, dreamers, and wanderers. Each corner holds the promise of a new adventure, waiting to be discovered between the covers of an old classic or a forgotten manuscript. If you’ve ever found yourself lost in the aisles of a vintage bookstore, you know that time moves differently in these magical spaces. Perhaps that’s why, even in the digital age, the charm of an old bookstore remains irreplaceable.",
    imageUrl:
      "https://res.cloudinary.com/dskj6z1lj/image/upload/v1743029065/slr1jxz6xpi28otpoehg.webp",
    likes: ["JTHXbFTeNyPZqRzf551dzoMlcFw2"],
    scheduledFor: null,
    status: "Published",
    tags: ["#booklovers"],
    views: 17,
  },
]
