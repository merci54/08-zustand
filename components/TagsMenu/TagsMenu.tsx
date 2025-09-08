"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { menuTags } from "@/lib/api";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          {menuTags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
