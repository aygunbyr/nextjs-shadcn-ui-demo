"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/store";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(50, { message: "Username must be at most 50 characters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(50, { message: "Password must be at most 50 characters." }),
});

function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin, setIsLogin, setUsername } = useGlobalContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    setTimeout(() => {
      setUsername(values.username);
      setIsLogin(true);
      router.push("/home");
    }, 1000);
  }

  // https://react.dev/reference/react/useLayoutEffect
  // useLayoutEffect(() => {
  //   if (isLogin) {
  //     router.push("/home");
  //   }
  // }, [isLogin, router]);

  useEffect(() => {
    if (isLogin) {
      router.push("/home");
    }
  }, [isLogin, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export default UserAuthForm;
