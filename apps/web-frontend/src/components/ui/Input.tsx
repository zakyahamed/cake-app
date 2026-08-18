import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#374151]"
          >
            {label}
            {props.required && (
              <span className="text-[#DC2626] ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            aria-invalid={!!error}
            className={cn(
              "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-[#111827]",
              "placeholder:text-[#9CA3AF]",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] focus:border-[#0D6E6E]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F7F8FA]",
              error
                ? "border-[#DC2626] focus:ring-[#DC2626] focus:border-[#DC2626]"
                : "border-[#E5E7EB]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[#DC2626]" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[#6B7280]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#374151]">
            {label}
            {props.required && (
              <span className="text-[#DC2626] ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          aria-invalid={!!error}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-[#111827]",
            "placeholder:text-[#9CA3AF] resize-none",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] focus:border-[#0D6E6E]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-[#DC2626] focus:ring-[#DC2626]"
              : "border-[#E5E7EB]",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[#DC2626]" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[#6B7280]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
