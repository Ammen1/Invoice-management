"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserFormDefaultValues } from "@/constants";
import { UserFormValidation } from "@/lib/validation";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../forms/SubmitButton";


async function registerUsers(values: any) {
  console.log("Registering user:", values);
  return { userId: "123" };
}

const RegisterForm = ({ user = { firstname: '', lastname: '', email: '', password: '' } }: { user?: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      ...UserFormDefaultValues,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email || '',
      password: user.password || ''
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      const response = await registerUsers(values);
      if (response) {
        router.push(`/invoice/${response.userId}/new-invoice`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-6">
      <div className="w-full max-w-md p-8 space-y-8  rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section className="space-y-4">
              <h1 className="text-2xl font-bold text-center w-full">Welcome To Invoice SAAS Platform 👋</h1>
            </section>

            <section className="space-y-6">
              {/* FIRST NAME */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="firstname"
                placeholder="First Name"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
              />
              {/* LAST NAME */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastname"
                placeholder="Last Name"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
              />
              {/* EMAIL */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                placeholder="amen@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />
              {/* PASSWORD */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                placeholder="••••••••"
                iconSrc="/assets/icons/eye.svg"
                iconAlt="password"
              />
              {/* PHONE */}
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                placeholder="(555) 123-4567"
              />
            </section>
            <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
