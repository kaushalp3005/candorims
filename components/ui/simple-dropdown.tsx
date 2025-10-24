"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface SimpleDropdownOption {
  value: string
  label: string
}

interface SimpleDropdownProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: SimpleDropdownOption[]
  loading?: boolean
  error?: string | null
  disabled?: boolean
  className?: string
}

export function SimpleDropdown({
  value,
  onValueChange,
  placeholder = "Select option...",
  options,
  loading = false,
  error = null,
  disabled = false,
  className,
}: SimpleDropdownProps) {
  const [open, setOpen] = React.useState(false)

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            error && "border-red-500",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          disabled={disabled || loading}
        >
          <span className="truncate">{selectedLabel}</span>
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 px-2 py-6 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            ) : options.length === 0 ? (
              <CommandEmpty>No options found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onValueChange?.(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
