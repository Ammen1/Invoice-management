"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserFormDefaultValues } from "@/constants";
import { UserFormValidation } from "@/lib/validation";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../forms/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
// import { signupRequest } from "@/redux/authSlice";
import { signupRequest } from "@/features/authSlice";
import { RootState } from "@/redux/store";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const RegisterForm = ({ user = { firstname: '', lastname: '', email: '', password: '' } }: { user?: User }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
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

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.push(`/invoice/${authState.access_token}/new-invoice`);
    }
  }, [authState.isAuthenticated, authState.access_token, router]);

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    dispatch(signupRequest(values));
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section className="space-y-4">
              <h1 className="text-2xl font-bold text-center w-full">Welcome To Invoice SAAS Platform 👋</h1>
            </section>

            <section className="space-y-6">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="firstname"
                placeholder="First Name"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastname"
                placeholder="Last Name"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                placeholder="amen@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                placeholder="••••••••"
                iconSrc="/assets/icons/eye.svg"
                iconAlt="password"
              />
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
