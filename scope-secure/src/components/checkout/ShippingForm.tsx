"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CheckoutFormData } from "@/types";

const schema = z.object({
  email: z.string().email("Valid email required"),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  address: z.string().min(1, "Address required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(2, "State required"),
  zip: z.string().min(5, "ZIP code required"),
  phone: z.string().optional(),
});

interface ShippingFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isProcessing: boolean;
}

export function ShippingForm({ onSubmit, isProcessing }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(schema),
  });

  const inputClass =
    "w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-warm-gray-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm";
  const labelClass = "block text-sm font-medium text-warm-gray mb-1.5";
  const errorClass = "mt-1 text-xs text-red-cross";

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="checkout-form" className="space-y-5">
      <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
        Shipping Information
      </h3>

      {/* Email */}
      <div>
        <label className={labelClass}>Email</label>
        <input {...register("email")} type="email" placeholder="your@email.com" className={inputClass} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name</label>
          <input {...register("firstName")} placeholder="John" className={inputClass} />
          {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input {...register("lastName")} placeholder="Doe" className={inputClass} />
          {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className={labelClass}>Address</label>
        <input {...register("address")} placeholder="123 Main St" className={inputClass} />
        {errors.address && <p className={errorClass}>{errors.address.message}</p>}
      </div>

      {/* City / State / ZIP row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label className={labelClass}>City</label>
          <input {...register("city")} placeholder="City" className={inputClass} />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input {...register("state")} placeholder="TX" maxLength={2} className={inputClass} />
          {errors.state && <p className={errorClass}>{errors.state.message}</p>}
        </div>
        <div>
          <label className={labelClass}>ZIP Code</label>
          <input {...register("zip")} placeholder="78701" className={inputClass} />
          {errors.zip && <p className={errorClass}>{errors.zip.message}</p>}
        </div>
      </div>

      {/* Phone (optional) */}
      <div>
        <label className={labelClass}>Phone (optional)</label>
        <input {...register("phone")} type="tel" placeholder="(555) 123-4567" className={inputClass} />
      </div>

      {/* Submit is in the parent checkout page, triggered via form id */}
      <button
        type="submit"
        form="checkout-form"
        disabled={isProcessing}
        className="sr-only"
        aria-hidden
      >
        Submit
      </button>
    </form>
  );
}
