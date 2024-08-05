"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserFormValidationLogin } from "@/lib/validation"; 
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../forms/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "@/features/authSlice";
import { RootState } from "@/store";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidationLogin>>({
    resolver: zodResolver(UserFormValidationLogin),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.push(`/invoices`);
    }
  }, [authState.isAuthenticated, authState.access_token, router]);

  const onSubmit = async (values: z.infer<typeof UserFormValidationLogin>) => {
    setIsLoading(true);
    dispatch(loginRequest(values));
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section className="space-y-4">
              <h1 className="text-2xl font-bold text-center w-full">Login to Invoice SAAS Platform 👋</h1>
            </section>

            <section className="space-y-6">
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
            </section>
            <SubmitButton isLoading={isLoading}>Login</SubmitButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
