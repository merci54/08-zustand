import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { menuTags } from "@/lib/api";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      {menuTags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
