"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, autoComplete, ...props }, ref) => {
    // 컴포넌트 최상단에서 React Hook 호출
    const uniqueId = React.useId();
    
    // 입력 타입 안전성 보장
    const inputType = type || 'text';
    
    // 자동완성 속성 처리 (없으면 기본값 설정)
    const inputAutoComplete = autoComplete || 'off';
    
    // 입력 ID가 지정되지 않은 경우 생성된 ID 사용
    const inputId = id || `input-${uniqueId}`;
    
    return (
      <input
        id={inputId}
        type={inputType}
        autoComplete={inputAutoComplete}
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