import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";


const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height='2rem' className="mb-2"/>
      <Skeleton height="20rem" />
      <Skeleton width='8rem' height='2rem' className="mt-14"/>
    </Box>
  );
};

export default LoadingNewIssuePage;
