"use client";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();

  return (
    <Flex justify="center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(
          async (data) => await axios.post("/api/register", data)
        )}
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
              className="text-sm shadow  border rounded p-2 text-gray-700  focus:outline-none"
            />
          </Box>
          <Box>
            <label className="block text-gray-700 text-base font-medium mb-2">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              className="text-sm shadow  border rounded p-2 text-gray-700  focus:outline-none"
            />
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
          </Box>
          <Box>
            <label className="block text-gray-700 text-base font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="text-sm shadow  border rounded p-2 text-gray-700  focus:outline-none"
            />
          </Box>
          <Button size="3">Sign Up</Button>
        </Grid>
      </form>
    </Flex>
  );
};

export default SignUpPage;
