"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  role: string
  content: string
  avatarSrc?: string
  position: "front" | "middle" | "back"
  id: number
  handleShuffle: () => void
}

export function TestimonialCard({
  name,
  role,
  content,
  avatarSrc,
  position,
  id,
  handleShuffle,
  className,
  ...props
}: TestimonialCardProps) {
  const dragRef = useRef(0)
  const isFront = position === "front"

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={cn(
        "absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center rounded-xl border-2 border-[#2a3546] bg-[#1c2534]/50 p-6 shadow-xl backdrop-blur-md space-y-6",
        isFront ? "cursor-grab active:cursor-grabbing" : "",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-[#3d4f69] bg-[#141b27] overflow-hidden">
        {avatarSrc && (
          <img 
            src={avatarSrc} 
            alt={`Avatar of ${name}`}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <p className="text-center text-lg italic text-[#c6d4e3]">"{content}"</p>
      <div className="text-center">
        <h3 className="text-base font-medium text-white">{name}</h3>
        <p className="text-sm text-[#a0b1c5]">{role}</p>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 fill-[#8faabe]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 1.5l2.85 6.36 7.15.99-5.29 4.8 1.55 7.04L12 17.51l-6.26 3.18 1.55-7.04-5.29-4.8 7.15-.99L12 1.5z" />
          </svg>
        ))}
      </div>
    </motion.div>
  )
} 