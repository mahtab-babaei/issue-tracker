"use client";
import { registerUserSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex, Grid, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

type SignUpForm = z.infer<typeof registerUserSchema>;

const SignUpForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(registerUserSchema),
  });

  return (
    <>
      <Flex justify="center">
        <Flex direction="column" gap="4">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl"
            onSubmit={handleSubmit(async (data) => {
              try {
                await axios.post("/api/register", data);
                router.push("/api/auth/signin");
              } catch (error) {
                toast.error("The user alredy exists.");
              }
            })}
          >
            <Grid gap="5">
              <Box>
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  className="text-sm shadow border rounded p-2 text-gray-700  focus:outline-none"
                />
                {errors.name && (
                  <Text color="red" as="p" size="1" mt="2">
                    {errors.name.message}
                  </Text>
                )}
              </Box>
              <Box>
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="text"
                  placeholder="Email"
                  className="text-sm shadow border rounded p-2 text-gray-700  focus:outline-none"
                />
                {errors.email && (
                  <Text color="red" as="p" size="1" mt="2">
                    {errors.email.message}
                  </Text>
                )}
              </Box>
              <Box>
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="text-sm shadow  border rounded p-2 text-gray-700  focus:outline-none"
                />
                {errors.password && (
                  <Text color="red" as="p" size="1" mt="2">
                    {errors.password.message}
                  </Text>
                )}
              </Box>
              <Box>
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="text-sm shadow  border rounded p-2 text-gray-700  focus:outline-none"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <Text color="red" as="p" size="1" mt="2">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </Box>
              <Button size="3">Sign Up</Button>
            </Grid>
          </form>
        </Flex>
      </Flex>
      <Toaster />
    </>
  );
};

export default SignUpForm;
