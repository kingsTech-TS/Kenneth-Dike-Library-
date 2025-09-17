// /data/libraryData.ts
export interface Library {
  name: string
  faculty: string
  image: string
  description: string
  location: string
  coordinates: string
  books: string
  journals: string
  articles: string
  seatingCapacity: number
  studyRooms: number
  computerStations: number
  openingHours: string
  contact: {
    phone: string
    email: string
    librarian: string
    librarianImage: string
  }
  services: string[]
  facilities: string[]
  departments: string[]
}

export const libraryData: Record<string, Library> = {
  // 🔹 Example template
  template_slug: {
    name: "Library Name",
    faculty: "Faculty Name",
    image: "/Libraries/Faculty/image.jpg", // path to image
    description: "Brief description of the library...",
    location: "Faculty Building, University of Ibadan",
    coordinates: "7.3785° N, 3.9460° E",
    books: "0", // number or string
    journals: "0",
    articles: "0",
    seatingCapacity: 0,
    studyRooms: 0,
    computerStations: 0,
    openingHours: "Monday - Friday: 8:00 AM - 4:00 PM",
    contact: {
      phone: "+234 000 000 0000",
      email: "example@email.com",
      librarian: "Librarian Full Name",
      librarianImage: "/facultylibrarians/Faculty/librarian.jpg",
    },
    services: [
      "Internet access",
      "Reference assistance",
      "Borrowing services",
      "Research support",
    ],
    facilities: [
      "Air conditioners",
      "Study tables and chairs",
      "Bookshelves",
      "Cloakroom shelf",
    ],
    departments: [
      "Department One",
      "Department Two",
      "Department Three",
    ],
  },
}
