"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function Loading() {
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <div>Loading......</div>
    </Modal>
  );
}
