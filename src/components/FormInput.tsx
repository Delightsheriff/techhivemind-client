import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={props.id}>{label}</Label>
        <Input
          ref={ref}
          className={cn(error && "border-red-500", className)}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export default FormInput;
