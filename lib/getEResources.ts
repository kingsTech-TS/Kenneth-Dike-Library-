import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { EResourceItem } from "@/app/admin/e-resources/EresourcesForm";


export interface DatabaseCardData {
  id: string;
  name: string;
  description?: string;
  category?: string;
  color?: string;
  logo?: string;
  link?: string;
  stats?: Record<string, string>;
  features?: string[];
  subjects?: string[];
  counter?: number;
  createdAt?: any;
  updatedAt?: any;
}

export async function getEResources(): Promise<DatabaseCardData[]> {
  const q = query(collection(db, "eResource"), orderBy("counter", "asc"));
  const snapshot = await getDocs(q);

  const data: DatabaseCardData[] = snapshot.docs.map((doc) => {
    const item = doc.data() as EResourceItem;

    return {
      id: doc.id,
      name: item.name || "",
      description: item.description || "",
      category: item.category || "",
      color: item.color || "#E0E7FF",
      // 👇 remap Cloudinary + URL fields
      logo: item.logoURL || "",
      link: item.linkURL || "",
      // pass through optional arrays + stats
      features: item.features || [],
      subjects: item.subjects || [],
      stats: item.stats || {},
      counter: item.counter || 0,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });

  return data;
}
