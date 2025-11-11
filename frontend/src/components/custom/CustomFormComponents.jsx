import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils"; // Make sure `cn` is your className join utility
import { Label } from "../ui/label";
import { Info } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

function FormHeading({
    className,
    asChild = false,
    ...props
}) {
    const Comp = asChild ? Slot : "h2"; // Use semantic element
    return (
        <Comp
            data-slot="heading"
            className={cn("text-2xl font-semibold", className)}
            {...props}
        />
    );
}

function FormSubHeading({
    className,
    asChild = false,
    ...props
}) {
    const Comp = asChild ? Slot : "p";
    return (
        <Comp
            data-slot="subheading"
            className={cn("font-semibold text-muted-foreground", className)}
            {...props}
        />
    );
}

function FormField({
    subLabel,
  label,
  className,
  children,
  asChild = false,
  required = false,
  info=false,
  textRed=false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="form-field"
      className={cn("grid w-full max-w-md items-center gap-3", className)}
      {...props}
    >
      {label && <Label className={`${textRed && 'text-red-500 dark:text-red-400'}`} >{label}{subLabel && <span className="text-muted-foreground font-normal"> {subLabel}</span>} {required && <span className="text-red-500 dark:text-red-300" >*</span>} {info && <Info className="text-muted-foreground" size={'12'} />} </Label>}
      {children}
    </Comp>
  );
}

function FormCard({
    title,
    className,
    children,
    asChild = false,
    checkBox,
    value,
    setValue,
    ...props
}) {
    const Comp = asChild ? Slot : 'div'

    return (
        <Comp
            data-slot="card"
            className={cn('border rounded-2xl mt-2 w-full px-5 py-5', className)}
            {...props}
        >
            {title && <FormSubHeading>{checkBox && <Checkbox className={'mr-3'} id="terms" checked={value} onCheckedChange={setValue} />}{title}</FormSubHeading>}
            <div className="my-4">
                {children}
            </div>
        </Comp>
    )
}

export { FormHeading, FormSubHeading, FormCard, FormField };
