"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import * as Slider from "@radix-ui/react-slider"
import { SlidingNumber } from "@/components/ui/sliding-number"
import { cn } from "@/lib/utils"

interface BudgetSliderProps {
  onChange: (value: string) => void
  className?: string
}

export function BudgetSlider({ onChange, className }: BudgetSliderProps) {
  const [value, setValue] = useState<number>(1000) // Default value adjusted
  const previousRangeRef = useRef<string>("essential") // Track previous range
  
  // Budget ranges we want to represent - adjusted for Euros
  const budgetRanges = [
    { min: 300, max: 2000, label: "essential" }, // Essential Package
    { min: 2001, max: 5000, label: "business" }, // Business Growth
    { min: 5001, max: 8000, label: "advanced" }, // Advanced Solution
    { min: 8001, max: 10000, label: "premium" } // Premium
  ]
  
  // Find the current budget range based on the slider value
  const getCurrentBudgetRange = useCallback(() => {
    for (const range of budgetRanges) {
      if (value >= range.min && value <= range.max) {
        return range.label
      }
    }
    return "unsure" // Default if not in any range
  }, [value])
  
  // Update the form state only when the range changes
  useEffect(() => {
    const currentRange = getCurrentBudgetRange()
    
    // Only call onChange if the range has changed
    if (currentRange !== previousRangeRef.current) {
      previousRangeRef.current = currentRange
      onChange(currentRange)
    }
  }, [value, onChange, getCurrentBudgetRange])
  
  // Get the percentage progress for gradient positioning
  const getProgress = useCallback(() => {
    const min = budgetRanges[0].min
    const max = budgetRanges[budgetRanges.length - 1].max
    return ((value - min) / (max - min)) * 100
  }, [value])
  
  // Get label for current range
  const getCurrentRangeLabel = useCallback(() => {
    const range = budgetRanges.find(r => value >= r.min && value <= r.max)
    if (!range) return ""
    
    switch(range.label) {
      case "essential": return "Essential Presence"
      case "business": return "Business Growth"
      case "advanced": return "Advanced Solution"
      case "premium": return "Premium"
      default: return ""
    }
  }, [value, budgetRanges])
  
  return (
    <div className={cn("space-y-5", className)}>
      {/* Slider */}
      <div className="relative pt-5">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[value]}
          max={10000}
          min={300}
          step={100}
          onValueChange={(newValue) => setValue(newValue[0])}
        >
          <Slider.Track className="bg-[#141b27] relative grow rounded-full h-2 border border-[#2a3546]">
            <Slider.Range className="absolute bg-gradient-to-r from-[#a0b1c5] to-[#5d7b9c] rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-6 h-6 bg-white rounded-full border border-[#3d4f69] focus:outline-none focus:ring-2 focus:ring-[#5d7b9c] focus:ring-offset-2 focus:ring-offset-[#141b27] shadow-md" />
        </Slider.Root>
      </div>
      
      {/* Animated display of current value */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="text-[#a0b1c5] text-sm font-medium">
            {getCurrentRangeLabel()}
          </div>
          <div className="flex items-center text-white text-2xl font-medium">
            €<SlidingNumber value={value} />
          </div>
        </div>
        
        {/* Budget labels below slider */}
        <div className="space-y-2 text-right">
          <div className="text-[10px] text-[#a0b1c5] uppercase tracking-wide">
            Budget Range
          </div>
          <div className="text-[#c6d4e3] text-sm">
            €{budgetRanges[0].min.toLocaleString()} - €{budgetRanges[budgetRanges.length-1].max.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
} 