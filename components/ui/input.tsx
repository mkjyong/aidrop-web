"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // 입력 타입 안전성 보장
    const inputType = type || 'text';
    
    // 자동완성 속성 처리 (없으면 기본값 설정)
    const autoComplete = props.autoComplete || 'off';
    
    // 입력 ID가 지정되지 않은 경우 임의 ID 생성 (접근성)
    const id = props.id || `input-${React.useId()}`;
    
    return (
      <input
        id={id}
        type={inputType}
        autoComplete={autoComplete}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        aria-invalid={props['aria-invalid'] || (props.required && props.value === '')}
      />
    );
  }
);
Input.displayName = "Input";

export { Input }; 