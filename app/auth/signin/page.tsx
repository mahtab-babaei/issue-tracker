import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";

const SignInPage = () => {
  return (
    <Flex justify="center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Grid gap='6'>
          <Box>
            <label className="block text-gray-700 text-base font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="text-sm shadow  border rounded p-2 text-gray-700  focus:outline-none"
            />
          </Box>
          <Box>
            <label className="block text-gray-700 text-base font-bold mb-2">
              Password
            </label>
            <input
              type="text"
              placeholder="Password"
              className="text-sm shadow  border rounded p-2 text-gray-700  focus:outline-none"
            />
          </Box>
          <Button size="3">
            Sign in
          </Button>
          <Box className="text-sm">
            <Text>Don't Have An Account? </Text>
            <Link
              href="/auth/signup"
              className="text-amber-600 hover:underline"
            >
              Sign Up
            </Link>
          </Box>
        </Grid>
      </form>
    </Flex>
  );
};

export default SignInPage;
