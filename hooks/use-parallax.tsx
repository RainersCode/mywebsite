"use client"

import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface UseParallaxProps {
  offset?: [number, number]
  inputRange?: [number, number]
  outputRange?: [string | number, string | number]
}

export function useParallax({
  offset = ["start end", "end start"],
  inputRange = [0, 1],
  outputRange = [0, 100],
}: UseParallaxProps = {}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const transform = useTransform(scrollYProgress, inputRange, outputRange)

  return { ref, transform }
}

